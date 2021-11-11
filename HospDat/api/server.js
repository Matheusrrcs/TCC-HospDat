const cors = require('cors')
const express = require('express')
const app = express()
const result = [];
const CSVToJSON = require('csvtojson')

const fs = require('fs');

CSVToJSON().fromFile("HospDat\\api\\distribuicao_respiradores.csv").then(source => {
    result.push(source)
})


app.use(cors())

app.get('/titulos', (req, res) => {
    return res.json([
        { name: 'Distribuição de respiradores' },
        { name: 'Unidades Básicas de Saúde - UBS' },
        { name: 'Campanha Nacional de Vacinação contra Covid-19' },
        { name: 'Registro de Ocupação Hospitalar COVID-19' }

    ])
})

app.get('/Distribuicao_respiradores', (req, res) => {
    return res.json(result)
})


app.listen('4567')




