import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";

const app = express();

// perser
app.use(express.json());
app.use(cors());

app.use('/api', router)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Gym Management server is running",
    timestamp: new Date().toISOString(),
  });
});

// global error handler
app.use(globalErrorHandler)


// 404 Not Found
app.use(notFound)

export default app;
