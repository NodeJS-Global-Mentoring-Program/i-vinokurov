import express from 'express';
import users from "../users.json";

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('get users', users);
  await res.send(users);
});

export default router;
