import express, {Router} from 'express';
import { statusPage } from '../status';
import { CATEGORIES } from './category';
import {
  getCategories,
  getCardsById,
  deleteCategory,
  createCategory, 
  loginAdmin
} from './repository';

const router = Router();
const jsonParser = express.json();

router.post('/login', jsonParser, async (req, res) => {
  if(!req.body) {
    return res.sendStatus(400);
  };
  statusPage.statusUser = loginAdmin(req.body);
  res.json(statusPage.statusUser);
});

router.get('/categories', async (req, res) => {
  const categories = await getCategories();
  res.json(categories);
});

router.get('/categories/:nameCategory', async (req, res) => {
  const nameCategory = req.params.nameCategory;
  if (!nameCategory) {
    return res.sendStatus(400);
  }
  const cardsByCategory = await getCardsById(CATEGORIES.indexOf(nameCategory));
  if (!cardsByCategory) {
    return res.sendStatus(404);
  }
  res.json(cardsByCategory);
});

router.delete('/:nameCategory', async (req, res) => {
  const nameCategory = req.params.nameCategory;
  if (!nameCategory) {
    return res.sendStatus(400);
  }
  try {
    await deleteCategory(CATEGORIES.indexOf(nameCategory));
  } catch (error) {
    return res.status(404).send(error)
  }
});

router.post('/', jsonParser, async (req, res) => {
  if(!req.body || !req.body.nameCategory) {
    return res.sendStatus(400);
  };
  try {
    const nameCategory = req.body.nameCategory;
    await createCategory(nameCategory);
    return res.json(nameCategory);
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;