import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UserController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.index);
usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

export default usersRouter;
