import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
    port: process.env.PORT || 5000,
    dbUrl: process.env.DBURL,
    jwtSecret: process.env.JWTSECRET
};
export default config;