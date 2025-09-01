import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bookRouter from './routes/book.routes.js';
import { notFound, errorHandler } from './middlewares/error.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ status: "success", data: { service: "book" }}));

app.use("/books", bookRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`))