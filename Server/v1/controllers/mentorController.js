/* eslint-disable arrow-parens */
/* eslint-disable radix */
import mentors from '../models/mentorModel';

class MentorController {
  /**
  * Get all mentors
  * @param {object} req
  * @param {object} res
  */
  static getAllMentor(req, res) {
    const findMentors = mentors.filter((c) => c);
    let graber = new Array(findMentors);

    for (let i = 0; i < findMentors.length; i++) {
      let result = {
        mentorId: graber[0][i].mentorId,
        firstName: graber[0][i].firstName,
        lastName: graber[0][i].lastName,
        address: graber[0][i].address,
        email: graber[0][i].email,
        bio: graber[0][i].bio,
        occupation: graber[0][i].occupation,
        expertise: graber[0][i].expertise,
      };
      graber[0][i] = result;
    }
    return res.status(200).json({
      status: 200,
      data: graber,
    });
  }
}

export default MentorController;
