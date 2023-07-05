const Token = require("../models/token");
const Admin = require("../models/Admin");

async function authenticator(req, res, next) {
  try {
    const userToken = req.headers["authorization"];

    if (!userToken) {
      throw new Error("User not authenticated.");
    }

    const token = await Token.getOneByToken(userToken);
    if (!token) {
      throw new Error("Invalid token.");
    }

    const admin = await Admin.getOneByAdminId(token.admin_id);
    if (!admin) {
      throw new Error("Admin not found.");
    }

  
    req.admin = admin;

    next();

  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

module.exports = authenticator;
