import dotenv from 'dotenv'
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET;
export const githubClient = process.env.GH_ID
export const githubClientSecret = process.env.GH_CS
