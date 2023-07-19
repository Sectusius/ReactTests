import {Request, Response} from 'express';
const  Section = require('../models/section.model');

export const createSection= async (req: Request, res: Response): Promise<void> => {
        try {
            const {title, content} = req.body;
            console.log({title, content})
            const section = await Section.create({title, content});
            res.status(201).json(section);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
}
export const getSectionByTitle= async (req: Request, res: Response): Promise<void> => {
        try {
            const title = req.params.title;
            const section = await Section.findOne({title});
            if(!section) {
                res.status(404).json({message: 'Section not found'});
                return;
            }
            res.status(200).json(section);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
}
export const updateSection= async (req: Request, res: Response): Promise<void> => {
        try {
            const {title} = req.params;
            const {content} = req.body;
            const section = await Section.findOneAndUpdate({title}, {content}, {new : true});
            if(!section) {
                res.status(404).json({message: 'Section not found'});
                return;
            }
            res.status(200).json(section);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
}
export const deleteSection= async (req: Request, res: Response): Promise<void> => {
        try {
            const {title} = req.params;
            const section = await Section.findOneAndDelete({title});
            if(!section) {
                res.status(404).json({message: 'Section not found'});
                return;
            }
            res.status(200).json({message: 'Section deleted successfully'});
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
}

module.exports ={
    createSection,
    getSectionByTitle,
    updateSection,
    deleteSection
}

