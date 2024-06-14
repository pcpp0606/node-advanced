import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constansts/message.constant.js'

import { AuthService } from '../services/auth.service.js';

const authService = new AuthService();

export class AuthController {
    signUp = async (req, res, next) => {
        try {
            const { email, password, name } = req.body;

            // service
            const data = await authService.signUp({ email, password, name });

            return res.status(HTTP_STATUS.CREATED).json({
                status: HTTP_STATUS.CREATED,
                message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
                data,
            });
        } catch (error) {
            next(error);
        }
    };
    singIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const data = await authService.signIn({ email, password });

            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
                data,
            });
        } catch (error) {
            next(error);
        }
    };
}