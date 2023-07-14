import dotenv from 'dotenv'


dotenv.config();

export default  {
    app: {
        persistence:process.env.PERSISTENCE
    },
    mongo:{
        url: process.env.MONGO_URI || 'mongodb://localhost:27017/serverPedro'
}
}

export const jwtSecret = process.env.JWT_SECRET;
export const githubClient = process.env.GH_ID
export const githubClientSecret = process.env.GH_CS


