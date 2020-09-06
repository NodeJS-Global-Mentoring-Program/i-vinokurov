import express from 'express';
import users from "../users.json";

const router = express.Router();
const userList = users.users;

router.get('/', async (req, res, next) => {
  const id = req.query.id;
  if (id) {
    const user = userList.find(user => user.id === id);
    if (user) {
      res.status(200).json(user);
    } else {
      next();
    }

  } else {
    await res.json(userList);
  }
});

export default router;
