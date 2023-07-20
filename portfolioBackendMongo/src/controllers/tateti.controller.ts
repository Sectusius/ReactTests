import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';
const tatetiModel = require('../models/tateti.model');



export const createTaTeTi = async (req: Request, res: Response): Promise<void> => {
    try {
        const { winner, cantMovements } = req.body;
        console.log({ winner, cantMovements })
        const tateti = await tatetiModel.create({ winner, cantMovements });
        res.status(201).json(tateti);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const getAllWinsByPlayer = async (req: Request, res: Response): Promise<void> => {
    const player = req.params.player;
    const moves = req.body;
    try{
        const client = await MongoClient.connect(process.env.MONGO_URI as string);
        await client.connect();
        const db = client.db('react');
        const collection = db.collection('tatetis');
        const aggregationResult = await collection.aggregate([
            {
                $match: {
                    winner: player,
                }
            },
            {
                $group: {
                    _id: "$winner",
                    totalWins: { $sum: 1 },
                    totalMovesMade: { $sum: "$cantMovements" }
                }
            }
        ]).toArray();
        client.close();
        if(aggregationResult.length === 0){
            res.status(404).json({message: `No se registran victorias para el jugador ${player}'`});
            return;
        }
        res.status(200).json(aggregationResult[0]);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

export const getAllData = async (req: Request, res: Response): Promise<void> => {
    try{
        const games = await tatetiModel.find({});
        if(games.length === 0){
            res.status(404).json({message: 'No se registran partidas'});
            return;
        }
        res.status(200).json(games);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};
