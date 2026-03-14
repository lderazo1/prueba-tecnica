import { Router } from 'express';
import * as c from '../controllers/proceso.controller';
const router = Router();
router.get('/', c.getAll);
router.post('/', c.create);
router.put('/:id', c.update);
router.get('/:id/history', c.getHistory);
router.delete('/:id', c.remove);
export default router;
