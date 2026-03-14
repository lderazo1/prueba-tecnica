import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../datasource';
import { BusinessProcess } from '../entities/LogicaNegocio';
import { ProcessHistory } from '../entities/Procesos';
import { generateHash } from '../utils/blockchain';

const repo = () => AppDataSource.getRepository(BusinessProcess);
const histRepo = () => AppDataSource.getRepository(ProcessHistory);

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await repo().find({ order: { order: 'ASC' } }));
    } catch (e) { next(e); }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, order } = req.body;
        if (!name || !order) throw { status: 400, message: 'name y order son requeridos' };

        //const last = await repo().findOne({ order: { createdAt: 'DESC' } });
        const [last] = await repo().find({ order: { createdAt: 'DESC' }, take: 1 });
        const previousHash = last?.currentHash || '0';
        const currentHash = generateHash({ name, description, order }, previousHash);

        const process = repo().create({ name, description, order, currentHash, previousHash });
        await repo().save(process);

        await histRepo().save(histRepo().create({
            processId: process.id, action: 'CREATE',
            snapshot: { name, description, order }, hash: currentHash, previousHash
        }));

        res.status(201).json(process);
    } catch (e) { next(e); }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //const process = await repo().findOne({ where: { id: parseInt(req.params.id) } });
        const process = await repo().findOne({ where: { id: parseInt(req.params.id as string) } });
        if (!process) throw { status: 404, message: 'Proceso no encontrado' };

        const { name, description, order } = req.body;
        const previousHash = process.currentHash;
        const currentHash = generateHash({ name, description, order }, previousHash);

        Object.assign(process, { name, description, order, currentHash, previousHash });
        await repo().save(process);

        await histRepo().save(histRepo().create({
            processId: process.id, action: 'UPDATE',
            snapshot: { name, description, order }, hash: currentHash, previousHash
        }));

        res.json(process);
    } catch (e) { next(e); }
};

export const getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await histRepo().find({
            where: { processId: parseInt(req.params.id as string) },
            //where: { processId: parseInt(req.params.id) },
            order: { createdAt: 'ASC' }
        }));
    } catch (e) { next(e); }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    await histRepo().delete({ processId: id });
    await repo().delete(id);
    res.json({ message: 'Eliminado' });
  } catch (e) { next(e); }
};

