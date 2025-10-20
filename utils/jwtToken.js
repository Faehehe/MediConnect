export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
  const expireDays = Number(process.env.COOKIE_EXPIRE?.trim()) || 5;

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + expireDays * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
    });
};
