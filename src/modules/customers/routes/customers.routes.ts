import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CustomerController from '../controller/CustomerController';

const customerRoutes = Router();
const customerController = new CustomerController();

customerRoutes.use(isAuthenticated);
customerRoutes.get('/', customerController.index);

customerRoutes.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required().uuid(),
        },
    }),
    customerController.show,
);

customerRoutes.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required().uuid(),
        },
    }),
    customerController.delete,
);

customerRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
    }),
    customerController.create,
);

customerRoutes.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().required().uuid(),
        },
    }),
    customerController.update,
);

export default customerRoutes;
