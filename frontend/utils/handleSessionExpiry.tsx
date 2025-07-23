const SESSION_ERRORS = [
  "Your session is expired, please login again",
  "jwt malformed",
  "invalid token",
  "token expired",
];

export const handleSessionExpiry = (
  message: string,
  setAlertMessage: (msg: string) => void,
) => {
  if (SESSION_ERRORS.includes(message)) {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("")
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }, 3000);

    return true;
  }

  return false;
};
