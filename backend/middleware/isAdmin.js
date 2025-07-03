import Admin from '../models/admin.model.js';

const isAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.user._id);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Unauthorized to access"
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error in isAdmin middleware",
        });
    }
}

export default isAdmin; 