const cors = require('cors')
const express = require('express')
const app = express()
const CSVToJSON = require('csvtojson')
const path = require("path");

CSVToJSON().fromFile(path.join(__dirname, "csv", "distribuicao_respiradores.csv")).then(source => {
    Respiradores(source)
   
})

CSVToJSON().fromFile(path.join(__dirname, "csv", "DistribuicaoCloroquinaOseltamivir.csv")).then(source => {
    Medicamentos(source)
   
})




app.use(cors())

app.set("view options", { layout: false });
app.use(express.static(path.join(__dirname, "..", "assets")));

app.get('/', (req, res) => {
    res.render("index.html")
})

app.get('/titulos', (req, res) => {
    return res.json([
        { name: 'Distribuição de respiradores' },
        {name:'Distribuição de Medicamentos COVID-19'}


    ])
})

function Respiradores(valor) {

    app.get('/distribuicao_respiradores', (req, res) => {
        return res.json(valor)
    })

}
 
function Medicamentos(valor){
    app.get('/distribuicao_medicamentos', (req, res) => {
        return res.json(valor)
    })
}

// app.listen('4567')


const port = process.env.PORT || 80;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));

 