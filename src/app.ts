import express from "express";
import cors from "cors";
import router from "./app/route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";

const app = express();

// perser
app.use(express.json());
app.use(cors());

app.use('/api', router)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// global error handler
app.use(globalErrorHandler)


// 404 Not Found
app.use(notFound)

export default app;
