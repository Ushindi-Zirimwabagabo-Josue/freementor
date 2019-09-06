/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable radix */
import mentors from '../models/mentorModel';
import session from '../models/sessionModel';

class SessionController {
  /**
  * Create mentorship session
  * @param {object} req
  * @param {object} res
  */
  static createSession(req, res) {
    const mentee = req.user;
    const isMentorExist = mentors.find(m => m.mentorId === parseInt(req.body.mentorId));
    const isSessionExist = session.find(s => s.mentorId === parseInt(req.body.mentorId) && s.questions === req.body.questions && mentee.userId === s.menteeId);

    if (mentee.isAdmin === true) {
      return res.status(403).json({
        status: 403,
        error: 'Admin not allowed to request session',
      });
    }

    if (isMentorExist) {
      if (isSessionExist) {
        return res.status(409).json({
          status: 409,
          error: 'Session already requested with this mentor',
        });
      }
      let newSession = {
        sessionId: session.length + 1,
        mentorId: isMentorExist.mentorId,
        mentorEmail: isMentorExist.email,
        menteeId: mentee.userId,
        questions: req.body.questions,
        menteeEmail: mentee.email,
        status: 'pending',
      };
      session.push(newSession);
      return res.status(200).json({
        status: 200,
        data: newSession,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Mentor not found',
    });
  }

  /**
  * Accept mentorship session request
  * @param {object} req
  * @param {object} res
  */
  static acceptSession(req, res) {
    const getMentor = req.user.email;
    let graber = session;
    const isSessionRequested = graber.find(s => s.sessionId === parseInt(req.params.sessionId));
    graber = new Array(isSessionRequested);
    if (isSessionRequested) {
      if (getMentor !== isSessionRequested.mentorEmail) {
        return res.status(403).json({
          status: 403,
          error: 'You cannot accept the request',
        });
      } else {
        if (isSessionRequested.status === 'accepted') {
          return res.status(400).json({
            status: 400,
            error: 'Session Already accepted',
          });
        } else {
          const result = graber.map(s => {
            s.status = 'accepted';
            return s;
          });
          return res.status(200).json({
            status: 200,
            data: result,
          });
        }
      }
    }
    return res.status(404).json({
      status: 404,
      error: 'Session not found',
    });
  }

  /**
  * Reject mentorship session request
  * @param {object} req
  * @param {object} res
  */
  static rejectSession(req, res) {
    const getMentor = req.user.email;
    let graber = session;
    const isSessionRequested = graber.find(s => s.sessionId === parseInt(req.params.sessionId));
    graber = new Array(isSessionRequested);
    if (isSessionRequested) {
      if (getMentor !== isSessionRequested.mentorEmail) {
        return res.status(403).json({
          status: 403,
          error: 'Sorry, you are not allowed to reject this request',
        });
      } else {
        if (isSessionRequested.status === 'rejected') {
          return res.status(400).json({
            status: 400,
            error: 'Session Already rejected',
          });
        } else {
          const result = graber.map(s => {
            s.status = 'rejected';
            return s;
          });
          return res.status(200).json({
            status: 200,
            data: result,
          });
        }
      }
    }
    return res.status(404).json({
      status: 404,
      error: 'Session not found',
    });
  }
}

export default SessionController;
