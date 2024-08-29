import dotenv from 'dotenv';
import path from 'path';
import os from 'os';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

const isProduction = process.env.NODE_ENV === 'production';
let frontendUrl: string;

if (isProduction) {
  const hostname = os.hostname();
  if (hostname.includes('rent-ride-client')) {
    frontendUrl = process.env.FRONTEND_URL_PROD_1!;
  } else {
    frontendUrl = process.env.FRONTEND_URL_PROD_2!;
  }
} else {
  frontendUrl = process.env.FRONTEND_URL!;
}

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASS,
  frontendUrl,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};
