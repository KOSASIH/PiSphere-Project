import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Middleware to protect routes
export const authMiddleware = async (req, res, next) => {
    try {
        // Get token from the Authorization header
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied.' });
        }

        // Verify the token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        
        // Attach user information to the request object
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token is not valid.' });
    }
};
