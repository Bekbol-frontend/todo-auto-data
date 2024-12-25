// Create an API using Node.js and Express:
// 1. POST /user - adds a user.
// 2. GET /users - returns all users.

// Use Express library

import express, { Request, Response } from "express";
const app = express();

app.use(express.json());

interface IUser {
  name: string;
}

const users: IUser[] = [];

app.post("/user", (req: Request, res: Response) => {
  try {
    const user: IUser = req.body;

    if (!user.name) {
      res.status(400).json({ message: "Invalid input" });
      return;
    }

    users.push(user);

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

if (process.env.NODE_ENV !== "test") {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
