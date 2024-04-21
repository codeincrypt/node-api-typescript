import express, { Request, Response } from 'express';
const routes = express.Router();

routes.get('/todos', async (req: Request, res: Response) => {
  // const todos = await TodoModel.find();
  res.json({get:"todos"});
});

routes.post('/todos', async (req: Request, res: Response) => {
  res.json({post:"todos"});
})

routes.get("/getdata", (req: Request, res: Response) => {
  res.status(200).json({ message: "<h1>{TS-NODE-EXPRESS}</h1>" });
});

module.exports = routes