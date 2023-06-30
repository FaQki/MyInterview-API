import { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

export const singUp: RequestHandler = async (req, res) => {
  const { firstName, lastName, email, password, roles } = req.body;

  const userFound = await User.findOne({ email });

  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hash,
  });

  if (roles) {
    const foundRol = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRol.map((role) => role._id);
  } else {
    const role: any = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const saveUser = await newUser.save();
  console.log(saveUser);

  const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.status(200).json({ token });
};

export const singIn: RequestHandler = async (req, res) => {

  const comparePassword = async (password:string, receivedPassword:any) => {
    return await bcrypt.compare(password, receivedPassword);
  };
  const userFound = await User.findOne({ email: req.body.email }).populate("roles");
  if (!userFound) return res.status(400).json({ message: "User not found" });
  const matchPassword = await comparePassword(req.body.password, userFound.password)
  if(!matchPassword) return res.status(401).json({token: null, message: 'invalid password'})
  const token = jwt.sign({id: userFound._id}, config.SECRET, {expiresIn: 86400})
  res.json({ token });
};
