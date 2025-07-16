const salt = parseInt(process.env.USER_PASSWORD_SALT || 10);
const mongoDbUrl = process.env.MONGODB_URL;

const jwtSecret = process.env.JWT_SECRET;
const frontendBaseUrl = process.env.FRONTEND_BASE_URL;
const backendBaseUrl = process.env.BACKEND_BASE_URL;

const profilePictureUploadPath = process.env.PROFILE_PICTURE_UPLOAD_PATH;
const localFileDeleteDir = process.env.LOCAL_FILE_DELETE_DIR;

const configurations = {
  salt,
  mongoDbUrl,
  jwtSecret,
  frontendBaseUrl,
  bucketName,
  backendBaseUrl,
  profilePictureUploadPath,
  localFileDeleteDir,
};

module.exports = {
  configurations,
};
