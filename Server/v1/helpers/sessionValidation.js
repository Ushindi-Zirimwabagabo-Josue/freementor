const mentorId = /^[0-9]$/;
const questions = /^[a-zA-Z0-9_ ]+[\W\S]*$/;

class SessionValidation {
  /**
  * validation of Mentor can accept session
  * @param {object} req
  * @param {object} res
  * @param {object} next
  */
  static validateSessionRequest(req, res, next) {
    try {
      if (!mentorId.test(req.body.mentorId)) throw new Error('invalid mentorId');
      if (!questions.test(req.body.questions)) throw new Error('invalid questions');

      next();
    } catch (err) {
      res.status(400).json({
        status: 400,
        error: err.message,
      });
    }
  }
}

export default SessionValidation;
