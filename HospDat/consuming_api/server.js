const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.get('/titulos', (req, res) => {
    return res.json([
        { name: 'Distribuição de respiradores' },
        { name: 'Unidades Básicas de Saúde - UBS' } ,
        { name: 'Campanha Nacional de Vacinação contra Covid-19' } ,
        { name: 'Registro de Ocupação Hospitalar COVID-19' } 

    ])
})

app.get('/Distribuicao_respiradores', (req, res) => {
    return res.json({ message: 'distribuição' })
})


app.listen('4567')