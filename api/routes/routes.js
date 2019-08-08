import Router from 'express';
import usercontroller from '../controller/user';
import admincontroller from '../controller/admin';
import sessionController from '../controller/session';
import Auth from '../middleware/auth';


const routes = Router();

// Landing Urls
routes.get("/", (req, res) => res.status(301).redirect("/api/v1"));
routes.get("/api/v1", (req, res) =>
  res.status(200).send({
    status: res.statusCode,
    message: "Welcome to FreeMentor"
  })
);

routes.post('/api/v1/auth/signup', usercontroller.UserController.RegisterUser);
routes.post('/api/v1/auth/login', usercontroller.UserController.UserLogin); 

routes.post('/api/v1/auth/admin/signup', admincontroller.AdminController.RegisterAdmin);
routes.post('/api/v1/auth/admin/login', admincontroller.AdminController.AdminLogin);

routes.get('/api/v1/admin/users/all',Auth.verifyAdmin, admincontroller.AdminController.GetAllUsers);
routes.get('/api/v1/admin/users/:id',Auth.verifyAdmin, admincontroller.AdminController.GetOneUser);
routes.patch('/api/v1/admin/users/:id',Auth.verifyAdmin, admincontroller.AdminController.CheckToMentor);
routes.delete('/api/v1/admin/users/:id',Auth.verifyAdmin, admincontroller.AdminController.DeleteOneUser);

routes.get('/api/v1/mentors',Auth.verifyUser, usercontroller.UserController.GetAvailableMentors);
routes.get('/api/v1/mentors/:id',Auth.verifyUser, usercontroller.UserController.GetOneMentor);

// sessions
routes.post('/api/v1/sessions',Auth.verifyUser, sessionController.SessionController.createSession)

export default routes;