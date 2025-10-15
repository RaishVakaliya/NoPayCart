async function userLogout(req, res) {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 8 * 60 * 60 * 1000, // 8 hours in milliseconds
      path: '/',
    };
    
    res.clearCookie("token", cookieOptions);
    res.json({
      message: "Logged out successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: false,
      success: true,
    });
  }
}

module.exports = userLogout;
