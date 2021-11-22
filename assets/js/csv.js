
const uf = ["ACRE", "ALAGOAS", "AMAPA", "AMAZONAS", "BAHIA", "CEARA", "ESPIRITO SANTO", "DISTRITO FEDERAL", "GOIAS", "MARANHÃO", "MINAS GERAIS", "MATO GROSSO DO SUL", "MATO GROSSO", "PARA", "PARAIBA", "PERNAMBUCO", "PIAUI", "PARANA", "RIO DE JANEIRO", "RIO GRANDE DO NORTE", "RONDONIA", "RORAIMA", "RIO GRANDE DO SUL", "SANTA CATARINA", "SERGIPE", "SÃO PAULO", "TOCANTINS"]

fetch("http://localhost:3000/distribuicao_respiradores").then((response) =>
   response.json()).then((json) => {

      init(json)



   }).catch((error) => {
      console.log(error)
   });

function apenasNumeros(string) {

   var numsStr = string.replace(/[^0-9]/g, '');

   return parseFloat(numsStr);
}

function init(json) {
   dados.states(json)
   dados.amount(json)
}

const dados = {

   states(value) {
      let soma = 0
      let dados = []

      for (let i = 0; i < uf.length; i++) {

         for (user of value) {

            if (user.DESTINO == uf[i]) {

               soma = soma + apenasNumeros(user.VALOR)

            }

         }

         dados[i] = soma;

         soma = 0;

      }

      chartMap(dados);
   },
   amount(value) {
      let soma = 0
      let dados = []

      for (let i = 0; i < uf.length; i++) {

         for (user of value) {

            if (user.DESTINO == uf[i]) {

               soma = soma + apenasNumeros(user.QUANTIDADE)

            }

         }

         dados[i] = soma;

         soma = 0;

      }
      chartPiza(dados);
   }

}

function chartMap(object) {

   var ufData = ['br-ac', 'br-al', 'br-ap', 'br-am', 'br-ba', 'br-ce', 'br-es', 'br-df', 'br-go', 'br-ma', 'br-mg', 'br-ms', 'br-mt', 'br-pa', 'br-pb', 'br-pe', 'br-pi', 'br-pr', 'br-rj', 'br-rn', 'br-ro', 'br-rr', 'br-rs', 'br-sc', 'br-se', 'br-sp', 'br-to']


   var data = [];


   for (let i = 0; i < object.length; i++) {

      data[i] = [ufData[i], object[i]]

   }


   // Create the chart
   Highcharts.mapChart('container', {
      chart: {
         map: 'countries/br/br-all'
      },

      title: {
         text: 'Valor gasto por respiradores'
      },

      subtitle: {
         text: 'Por estado do Brasil 2020/2021'
      },

      mapNavigation: {
         enabled: true,
         buttonOptions: {
            verticalAlign: 'bottom'
         }
      },

      colorAxis: {
         min: 100000
      },

      series: [{
         data: data,
         name: 'Valor gasto',
         states: {
            hover: {
               color: '#e17468'
            }
         },
         dataLabels: {
            enabled: true,
            format: '{point.name}'
         }
      }]
   });


}



function chartPiza(object) {
   var data = []

   for (let i = 0; i < object.length; i++) {

      data[i] = [uf[i], object[i]]

   }

   for (let i = 0; i < object.length; i++) {
      Highcharts.chart('cont', {
         chart: {
            type: 'column' 
             
         },
         title: {
            text: 'Quantidade de respiradores'
         }, subtitle: {
            text: 'Entregues por estado do Brasil 2020/2021'
         },
         xAxis: {
            type: 'category',
            labels: {
               rotation: -45,
               style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
               }
            }
         },
         yAxis: {
            min: 0,
            title: {
               text: 'Quantidade de respiradores'
            }
         },
         legend: {
            enabled: false
         },
         tooltip: {
            pointFormat: 'Quantidade: <b>{point.y}</b>'
         },
         series: [{
            name: 'Respiradores',
            data: data,
            dataLabels: {
               enabled: false,
               rotation: -90,
               color: '#FFFFFF',
               align: 'right',
               format: '{point.y}', // one decimal
               y: 10, // 10 pixels down from the top
               style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
               }
            }
         }]
      });
   }
}