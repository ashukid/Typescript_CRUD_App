import { CommonRoutesConfig } from '../config/routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import { body } from 'express-validator';

import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/users`)
            .get(
                UsersController.listUsers
            )
            .post(
                body('email').isEmail(),
                body('password')
                    .isLength({ min: 5 })
                    .withMessage('Password must be 5+ characters'),
                UsersMiddleware.validateBodyFields,
                UsersMiddleware.validateEmailDoesntExist,
                UsersController.createUser
            );

        this.app.param(`userId`, UsersMiddleware.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(
                UsersMiddleware.validateUserExists
            )
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app.put(`/users/:userId`, [
            body('email').isEmail(),
            body('password')
                .isLength({ min: 5 })
                .withMessage('Password must be 5+ characters'),
            body('firstName').isString(),
            body('lastName').isString(),
            UsersMiddleware.validateBodyFields,
            UsersMiddleware.validateEmailBelongToUser,
            UsersController.put,
        ]);

        return this.app;
    }
}
