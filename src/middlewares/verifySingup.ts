import { Handler } from "express";
import { ROLES } from "../models/Role";
import User from "../models/User";

//Verifica si el rol que le mandamos existe..
export const checkRolesExisted: Handler = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({ message: "El rol no existe" });
      }
    }
  }
  next();
};
//verificamos user y email
export const checkDuplicateUserEmail: Handler = async (
  req,
  res,
  next
) => {
  
  const email = await User.findOne({ email: req.body.email });
  if (email)
    return res.status(400).json({ message: "The email already exits" });
  next();
};
