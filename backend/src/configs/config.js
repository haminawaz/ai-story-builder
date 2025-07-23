const salt = parseInt(process.env.USER_PASSWORD_SALT || 10);
const mongoDbUrl = process.env.MONGODB_URL;
const jwtSecret = process.env.JWT_SECRET;

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const openAiKey = process.env.OPENAI_API_KEY;

const gmailUser = process.env.GMAIL_USER;
const gmailPassword = process.env.GMAIL_PASSWORD;

const configurations = {
  salt,
  mongoDbUrl,
  jwtSecret,
  googleClientId,
  openAiKey,
  gmailUser,
  gmailPassword,
};

module.exports = {
  configurations,
};
