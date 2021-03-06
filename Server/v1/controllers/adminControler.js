/* eslint-disable radix */
import users from '../models/userModel';
import mentors from '../models/mentorModel';

class AdminController {
  /**
  * Change user to mentor
  * @param {object} req
  * @param {object} res
  */
  static changeUserToMentor(req, res) {
    const findUser = users.find(m => m.userId === parseInt(req.params.userId));

    if (!findUser) {
      return res.status(404).json({
        status: 404,
        error: 'User Not Found',
      });
    }

    if (findUser.isAdmin === true) {
      return res.status(403).json({
        status: 403,
        error: 'Admin not allowed to be a mentor!',
      });
    }
    const newMentor = {
      mentorId: mentors.length + 1,
      email: findUser.email,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      address: findUser.address,
      bio: findUser.bio,
      occupation: findUser.occupation,
      expertise: findUser.expertise,
    };
    mentors.push(newMentor);
    users.splice(users.indexOf(findUser));
    return res.status(200).json({
      status: 200,
      data: {
        message: 'User Account changed to mentor successfully',
      },
    });
  }
}
export default AdminController;
