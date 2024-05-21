import jwt from "jsonwebtoken";

const jwtauth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unathorizatiod" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(408).json({ error: "invelid token" });
  }
};


const genToken = (userData)=>{
    return jwt.sign(userData, process.env.JWT_SECRET_KEY)
}

export { jwtauth, genToken };
