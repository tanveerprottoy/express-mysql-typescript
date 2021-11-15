import express from "express";

const app = express();
const port = 8080;

let i: number = 0;

console.log(i);

app.get("/", (req, res) => {
    res.send("Hello");
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
})
