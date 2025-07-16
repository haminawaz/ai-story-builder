const noreplyEmail = process.env.NOREPLY_EMAIL;
const adminToEmail = process.env.ADMIN_TO_EMAIL;

const configs = {
  adminToEmail,
  mailgunConfig: {
    domain: process.env.MAILGUN_DOMAIN,
    apiKey: process.env.MAILGUN_API_KEY,
  },
  templates: {
    verifyEmail: {
      from: noreplyEmail,
      name: "verify email",
    },
    userForgotPassword: {
      from: noreplyEmail,
      name: "password forgot",
    },
    userResetPasswordConfirmation: {
      from: noreplyEmail,
      name: "password reset confirmation",
    },
  },
};

module.exports = configs;
