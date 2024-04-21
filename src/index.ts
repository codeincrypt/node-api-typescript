import express, { Application } from "express";
import helmet from "helmet";

// Initialize Express app
const app: Application = express();

// Middleware
app.use(express.json());
app.use(helmet());

app.use("/user", require("./routes/user"));
app.use("/stream", require("./routes/stream"));

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});