import Admin from '../models/admin.model.js';

export const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      return next();
    } else {
      return res.status(403).json({
        message: "Forbidden: Only admins can perform this action"
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Middleware Error",
      error: error.message
    });
  }
};

export default isAdmin; 