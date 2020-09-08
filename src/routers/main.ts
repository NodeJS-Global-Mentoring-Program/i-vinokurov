import express from 'express';
import users from "../users.json";
import { uuid } from 'uuidv4';
import * as Joi from '@hapi/joi';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator
} from 'express-joi-validation';

const router = express.Router();
const userList = users.users;

const validator = createValidator();
const querySchema = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().trim().alphanum().min(8).required(),
  age: Joi.number().greater(4).less(130).required(),
});

interface IUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    // id: string;
    login: string;
    password: string;
    age: number;
    // isDeleted: boolean;
  }
}

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
  const validate = querySchema.validate(req.query);
  console.log('req.query', req.query);
  console.log('validate', validate);
  if (validate.error) {
    res.status(400).send(validate.error);
    return null;
  }

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

router.delete('/', async (req, res, next) => {
  const { id } = req.query;
  const deleteUserIndex = userList.findIndex(user => user.id === id);

  if (deleteUserIndex > -1) {
    userList[deleteUserIndex].isDeleted = true;
    await res.status(200).send(userList[deleteUserIndex]);
  } else {
    await res.status(500).send('User is not found');
  }
});

export default router;
