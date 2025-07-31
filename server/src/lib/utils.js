import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  //generate token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  //send to use cookie
  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true, //avoid XSS
    sameSite: "strict", //avoid CDRF
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
