import Sessions from '../models/session';
import dotenv from 'dotenv';

const SessionsData = [];
dotenv.config();

class SessionController{

    static createSession(req, res){
        const sessionId = SessionsData.length + 1;
        const status = "pending";

        const newSession = new Sessions(
            sessionId, 
            req.body.mentorId, 
            req.body.menteeId,
            req.body.questions, 
            status, 
            req.body.menteeEmail
        )
        SessionsData.push(newSession);
        return res.status(201).send({
            status: 201,
            data: newSession
        })
    }
}

export default {SessionController, SessionsData};