


const express = require("express");
const https = require("https");

const app = express();
const port = 8080;


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, function () {
    console.log("Server is started at port" + port);
});

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

})

app.post("/", function (req, res) {
    let id = Number(req.body.pokemon);
    let url = "https://pokeapi.co/api/v2/pokemon/" + id;


    https.get(url, function (response) {
        var responseData = "";
        response.on("data", function (dataChunk) {
            responseData += dataChunk;

        })
        response.on("end", function () {

            var pokeInfo = JSON.parse(responseData);
            var pokeName = pokeInfo.name;
            var pokeType = pokeInfo.types[0].type.name
            let pokeImg = "https://img.pokemondb.net/artwork/large/" + pokeName + ".jpg"
            res.write(`<h1 style="text-align:center; margin-top:5vh;">Name of the pokemon you searched is ${pokeName} </h1>`);

            res.write("<img  style='width: 500px;height: 500px; margin-left: calc(50% - 250px);'  src=" + pokeImg + ">");

            res.write(`<h3 style="text-align:center;">The main type of the pokemon :   ${pokeType} </h3>`);

            res.send();

        })
    })


})
