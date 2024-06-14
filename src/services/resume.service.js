import { prisma } from '../utils/prisma.util.js';
import { MESSAGES } from '../constants/message.constant.js';
import { HttpError } from '../errors/http.error.js';

export class ResumesService {
    create = async ({ authorId, title, content }) => {
        const data = await prisma.resume.create({
            data: {
                authorId,
                title,
                content,
            },
        });

        return data;
    };

    readMany = async ({ authorId, sort }) => {
        let data = await prisma.resume.findMany({
            where: { authorId },
            orderBy: {
                createdAt: sort,
            },
            include: {
                author: true,
            },
        });

        data = data.map((resume) => {
            return {
                id: resume.id,
                authorName: resume.author.name,
                title: resume.title,
                content: resume.content,
                status: resume.status,
                createdAt: resume.createdAt,
                updatedAt: resume.updatedAt,
            };
        });

        return data;
    };

    readOne = async ({ id, authorId }) => {
        let data = await prisma.resume.findUnique({
            where: { id: +id, authorId },
            include: { author: true },
        });

        if (!data) {
            throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
        }

        data = {
            id: data.id,
            authorName: data.author.name,
            title: data.title,
            content: data.content,
            status: data.status,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };

        return data;
    };

    update = async ({ id, authorId, title, content }) => {
        let existedResume = await prisma.resume.findUnique({
            where: { id: +id, authorId },
        });

        if (!existedResume) {
            throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
        }

        const data = await prisma.resume.update({
            where: { id: +id, authorId },
            data: {
                ...(title && { title }),
                ...(content && { content }),
            },
        });

        return data;
    };

    delete = async ({ id, authorId }) => {
        let existedResume = await prisma.resume.findUnique({
            where: { id: +id, authorId },
        });

        if (!existedResume) {
            throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
        }

        const data = await prisma.resume.delete({ where: { id: +id, authorId } });

        return { id: data.id };
    };
}