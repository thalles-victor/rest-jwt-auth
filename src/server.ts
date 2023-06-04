import "dotenv/config";
import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocumentJSON from "./swagger.json";
import { authRouter } from "./Application/Routes/authRouter";
import { postRouter } from "./Application/Routes/postRouter";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocumentJSON));

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:${3000}`);
});
