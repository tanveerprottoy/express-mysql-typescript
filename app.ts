import express from "express";
import userRouter from './src/routers/user-router';
import cors from 'cors';
import { Constants } from './src/utils/constants';

const app = express();
const port = 8080;

// enabling cors for all requests by using cors middleware
app.use(cors())
// Enable pre-flight
// app.options("*", cors());
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json())
// parse requests of application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}))

app.use(Constants.API + Constants.VERSION_1 + '/auth', userRouter)

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
})
