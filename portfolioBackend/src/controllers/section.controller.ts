import {Request, Response} from 'express';
const { Section } = require('../models/section.model');

export const createSection= async (req: Request, res: Response): Promise<void> => {
        try {
            console.log(req.body)
            const section = await Section.create(req.body);
            res.status(201).json(section);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
}
export const getSectionByTitle= async (req: Request, res: Response): Promise<void> => {
        try {
            const section = await Section.findOne({
                where: {
                    title: req.params.title,
                },
            });
            res.status(200).json(section);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
}
export const updateSection= async (req: Request, res: Response): Promise<void> => {
        try {
            const section = await Section.update(req.body, {
                where: {
                    title: req.params.title,
                },
            });
            res.status(200).json(section);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
}
export const deleteSection= async (req: Request, res: Response): Promise<void> => {
        try {
            const section = await Section.destroy({
                where: {
                    title: req.params.title,
                },
            });
            res.status(200).json(section);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

