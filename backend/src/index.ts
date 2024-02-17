import express from "express";
import { test } from './util'

let app = express();

app.get('/', (req, res) => {
    res.send(test());
})

app.listen(3000, () => {
    console.log("ехал гослинг навстречу концовке\n сценарист сказал не переживай\n гослинг ответил не переживу")
})