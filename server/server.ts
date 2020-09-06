import express from "express";
import router from "../src/routers/main";

// Create a new express app instance
const app: express.Application = express();
const PORT = 1502;
const port = process.env.PORT || PORT;

app.use(express.json());
app.use('/users', router);

app.all('*', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`App is listening http://localhost:${port}`);
});
