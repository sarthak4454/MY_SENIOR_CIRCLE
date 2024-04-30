import { User } from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const secret = "test";

export const signin = async (req, res) => {
  const { emailid, password } = req.body;
  try {
    const user = await User.findOne({ emailid });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1h" });
      return res.status(200).json({ result: user, token });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }

  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const signup = async (req, res) => {
  const { firstname, lastname, emailid, password } = req.body;
  try {
    const oldUser = await User.findOne({ emailid });
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      firstname,
      lastname,
      emailid,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const signwithGoogle = async (req, res) => {
  const { firstname, lastname, emailid, password } = req.body;

  try {
    const oldUser = await User.findOne({ emailid });

    if (oldUser) {
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
      return res.status(200).json({ result: oldUser, token });
    }
    else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await User.create({
        firstname,
        lastname,
        emailid,
        password: hashedPassword,
      });
      const token = jwt.sign({ email: result.email, id: result._id }, secret, {
        expiresIn: "1h",
      });
      res.status(201).json({ result, token });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const OldUser = await User.findById(id);
    if (!OldUser)
      return res.status(404).json({ message: "user doesn't exist" });

    res.status(201).json(OldUser);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
export const updateUser = async (req, res) => {
  const { emailid, photo, Experience, collegeName, token } = req.body;
  try {
    const OldUser =
      await User.findOne({ emailid });
    if (!OldUser)
      return res.status(400).json({
        message: "User doesn't exists"
      });

    OldUser.photo = photo;
    OldUser.Experience = Experience;
    OldUser.collegeName = collegeName;

    const updatedUser =
      await User.findByIdAndUpdate(
        OldUser._id, OldUser, { new: true });
    res.status(201).json({ result: updatedUser, token, message: "Profile updated successfully !!" });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}