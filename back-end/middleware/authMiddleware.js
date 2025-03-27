const jwt = require("jsonwebtoken")

// exports.authenticateToken = async (req,res,next)=>{
//     const token = req.headers['authorization']
//     if(!token) return res.status(401).json({message:'Access denied'})
    
//     jwt.verify(token,'YOUR_SECRET_KEY',(err,user)=>{
//         if(err) return res.status(403)
//         req.user=user
//         next()
//     })
// }


exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(403).json({ message: "Token is required" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        
        req.user = decoded; // Attach the decoded user information to the request
        next();
    });
};