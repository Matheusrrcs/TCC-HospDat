const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.get('/titulos', (req, res) => {
    return res.json([
        { name: 'Distribuição de respiradores' },
        { name: 'Distribuição de respiradores' } ,
        { name: 'Distribuição de respiradores' } ,
        { name: 'Distribuição de respiradores' } 

    ])
})

app.get('/Distribuicao_respiradores', (req, res) => {
    return res.json({ message: 'distribuição' })
})


app.listen('4567')