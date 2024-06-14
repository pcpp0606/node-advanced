import { prisma } from "../utils/prisma.util.js";
import bcrypt from 'bcrypt';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';


export class UsersRepository {
    create = async ({ email, password, name }) => {
        const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

        const data = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
            omit: { password: true },
        });

        data.password = undefined;
    }

    readOneByEmail = async (email) => {
        const data = await prisma.user.findUnique({ where: { email } });

        return data;
    };

    readOneById = async (id) => {
        const data = await prisma.user.findUnique({
            where: { id },
            omit: { password: true },
        });

        return data;
    }
}