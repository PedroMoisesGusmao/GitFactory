const express = require("express");
const fs = require("fs");
const server = express();

server.use(express.json());

server.get("/telas", function(req, res) {
    const { nome } = req.query;
    const { id } = req.query;
    fs.readFile(`telas/${nome}/${nome}-${id}.json`, "utf-8", function(error, data) {
        if (error) {
            return res.json({mensagem: "Ocorreu um erro inesperado ao carregar a tela"})
        }
        return res.json(JSON.parse(data));
    })
})

server.listen(8080)