

import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const { token } = req.cookies;
        // const token = localStorage.getItem("token");


    if (!token) {
        return res.json({ success: false, message: 'Not Authorized' });
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.userId = tokenDecode.id;  // ✅ yaha fix
        } else {
            return res.json({ success: false, message: 'Not Authorized' });
            
        }
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });

    }
}

export default authUser;

// import jwt from "jsonwebtoken";

// const authUser = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       success: false,
//       message: "Not Authorized",
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid Token",
//     });
//   }
// };

// export default authUser;
