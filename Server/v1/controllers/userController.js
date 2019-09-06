/* eslint-disable arrow-parens */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mentors from '../models/mentorModel';
import users from '../models/userModel';

dotenv.config();

class UserController {
  /**
  * Sign up a user
  * @param {object} req
  * @param {object} res
  */
  static signup(req, res) {
    const isUserExist = users.find(u => u.email === req.body.email);
    const isMentor = mentors.find(m => m.email === req.body.email);

    if (isUserExist || isMentor) {
      return res.status(409).json({
        status: 409,
        error: 'Email is already taken',
      });
    }
    const password = bcrypt.hashSync(req.body.password, 10);
    const newUser = {
      userId: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password,
      address: req.body.address,
      bio: req.body.bio,
      occupation: req.body.occupation,
      expertise: req.body.expertise,
      isAdmin: false,
    };
    users.push(newUser);
    const token = jwt.sign({
      userId: newUser.userId,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      isAdmin: false,

    }, process.env.secretKey, { expiresIn: '1d' });
    res.status(201).json({
      status: 201,
      message: 'User created succefully',
      data: {
        token,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        address: newUser.address,
        bio: newUser.bio,
        occupation: newUser.occupation,
        expertise: newUser.expertise,
        isAdmin: false,

      },
    });
  }
}
export default UserController;
