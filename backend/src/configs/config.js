const salt = parseInt(process.env.USER_PASSWORD_SALT || 10);
const mongoDbUrl = process.env.MONGODB_URL;

const jwtSecret = process.env.JWT_SECRET;
const frontendBaseUrl = process.env.FRONTEND_BASE_URL;
const backendBaseUrl = process.env.BACKEND_BASE_URL;

const googleClientId = process.env.GOOGLE_CLIENT_ID

const configurations = {
  salt,
  mongoDbUrl,
  jwtSecret,
  frontendBaseUrl,
  backendBaseUrl,
  googleClientId,
};

module.exports = {
  configurations,
};
