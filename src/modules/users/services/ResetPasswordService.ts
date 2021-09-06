import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'data-fns';
import { hash } from 'bcryptjs';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UsersTokensRepository from '../typeorm/repositories/UsersTokensRepository';

interface IRequest {
    token: string;
    password: string;
}
export default class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const usersTokenRepository = getCustomRepository(UsersTokensRepository);

        const userToken = await usersTokenRepository.findByToken(token);
        if (!userToken) {
            throw new AppError('User Token does not exists.');
        }
        const user = await usersRepository.findById(userToken.user_id);
        if (!user) {
            throw new AppError('User does not exists');
        }
        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);
        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Tokne expired.');
        }
        user.password = await hash(password, 8);
    }
}
