import { MESSAGES } from '../constants/message.constant.js';
import { HttpError } from '../errors/http.error.js';
import { ResumeRepository } from '../repositories/resumes.repository.js';

const resumesRepository = new ResumeRepository();

export class ResumesService {
    create = async ({ authorId, title, content }) => {
        const data = await resumesRepository.create({ authorId, title, content });

        return data;
    };

    readMany = async ({ authorId, sort }) => {
        const data = await resumesRepository.readMany({ authorId, sort });

        return data;
    };

    readOne = async ({ id, authorId }) => {
        let data = await resumesRepository.readOne(id, authorId);

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
        let existedResume = await resumesRepository.readOne({ id, authorId });

        if (!existedResume) {
            throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
        }

        const data = await resumesRepository.update({ id, authorId, title, content });

        return data;
    };

    delete = async ({ id, authorId }) => {
        const existedResume = await resumesRepository.readOne({ id, authorId });

        if (!existedResume) {
            throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
        }

        const data = await resumesRepository.delete({ id, authorId });

        return data;
    };
}