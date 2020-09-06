import express from 'express';
import users from "../users.json";
import { uuid } from 'uuidv4';

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

router.post('/', async (req, res, next) => {
  const { login, password, age } = req.query;

  if(userList.find(user => user.login === login)) {
    await res.status(500).send(`there is a user with the login "${login}"`);
    return null;
  }

  if (login && password) {
    const newUser = {
      id: uuid(),
      login: String(login),
      password: String(password),
      age: Number(age),
      isDeleted: false,
    }
    userList.push(newUser);

    console.log('userList', userList);
    await res.status(200).send(newUser);
  }
});

router.put('/', async (req, res, next) => {
  const { id, login, password, age } = req.query;
  const updateUserIndex = userList.findIndex(user => user.id === id);

  if(updateUserIndex > -1) {
    userList[updateUserIndex].login = login ? login.toString() : userList[updateUserIndex].login;
    userList[updateUserIndex].password = password ? password.toString() : userList[updateUserIndex].password;
    userList[updateUserIndex].age = Number(age);
    await res.status(200).send(userList[updateUserIndex]);
  } else {
    await res.status(500).send('User is not found');
  }
});

export default router;
