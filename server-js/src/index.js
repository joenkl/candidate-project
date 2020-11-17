import express, { Router } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './models/User';

const PORT = 8000;

const wrapErrors = (fn) => (...args) => fn(...args).catch(args[2]);

export const routes = () => {
  const api = Router();

  api.get(
    '/health',
    /**
     * @param {express.Response} res
     */
    (_, res) =>
      res.send({
        status: 200,
        message: 'OK',
      }),
  );

  api.get(
    '/users/:id',
    wrapErrors(
      /**
       * @param {express.Response} res
       */
      async (req, res) => {
        var id = mongoose.Types.ObjectId(req.params.id);
        const user = await User.findOne({"_id":id},(err,doc)=>{
          if (err){
            return res.status(400).send(err);
          }else {
            return res.send(doc);
          }
        });
      },
    ),
  );

  api.post(
    '/users',
    wrapErrors(
      /**
       * @param {express.Response} res
       */
      async (req, res) => {
        const user = new User(req.body)
        user.save((err,doc)=>{
          if (err){
            return res.status(400).send(err.message);
          }else {
            return res.send(doc);
          }
        });
      },
    )
  )
  /**
   * Create endpoints here
   * 
   */
  return api;
};

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(routes());

const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true, useUnifiedTopology: true});
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();

export default app;
