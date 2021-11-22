// const cors = require('cors')
const express = require('express')
const app = express()
// const CSVToJSON = require('csvtojson')

// CSVToJSON().fromFile("csv\\distribuicao_respiradores.csv").then(source => {
//     Respiradores(source)
// })


// app.use(cors())

app.get('/titulos', (req, res) => {
    return res.json([
        { name: 'Distribuição de respiradores' }


    ])
})

// function Respiradores(valor) {

//     app.get('/distribuicao_respiradores', (req, res) => {
//         return res.json(valor)
//     })

// }

// app.listen('4567')


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));


