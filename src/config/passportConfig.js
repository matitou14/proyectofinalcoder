import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GitHubStrategy } from 'passport-github2';
import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';
import {jwtSecret, githubClient, githubClientSecret  }from './config.js';
import dotenv from 'dotenv'


dotenv.config();
// Estrategia local
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return done(null, false, { message: 'User not found' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return done(null, false, { message: 'Incorrect password' });
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
});

// Estrategia JWT
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret 
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await UserModel.findById(payload.id).lean().exec();
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Estrategia GitHub
passport.use(new GitHubStrategy({
  clientID: githubClient,
  clientSecret:githubClientSecret ,
  callbackURL: 'http://localhost:8080/session/githubcallback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await UserModel.findOne({ email: profile.emails[0].value }).lean().exec();
    if (!user) {
      const newUser = {
        first_name: profile.displayName,
        last_name: '',
        email: profile.emails[0].value,
        age: 0,
        password: '', // Establece una contraseña temporal o genera una aleatoria
      };
      const createdUser = await UserModel.create(newUser);
      user = createdUser.toObject();
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));


export default passport