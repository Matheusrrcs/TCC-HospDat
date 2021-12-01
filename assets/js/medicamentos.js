
const uf = ["ACRE", "ALAGOAS", "AMAPA", "AMAZONAS", "BAHIA", "CEARA", "ESPIRITO SANTO", "DISTRITO FEDERAL", "GOIAS", "MARANHÃO", "MINAS GERAIS", "MATO GROSSO DO SUL", "MATO GROSSO", "PARA", "PARAIBA", "PERNAMBUCO", "PIAUI", "PARANA", "RIO DE JANEIRO", "RIO GRANDE DO NORTE", "RONDONIA", "RORAIMA", "RIO GRANDE DO SUL", "SANTA CATARINA", "SERGIPE", "SÃO PAULO", "TOCANTINS"]

fetch("https://hospdata.vercel.app/distribuicao_medicamentos").then((response) =>
   response.json()).then((json) => {

      init(json)

   }).catch((error) => {
      console.log(error)
   });


function init(json) {
   dados.states(json)
   dados.amount(json)
 
}

function apenasNumeros(string) {

   if (string != undefined)
      var numsStr = string.replace(/[^0-9]/g, '');

   return parseFloat(numsStr);
}
const dados = {

   states(value) {
      let soma = 0
      let dados = []
      let aux = []


      for (let i = 0; i < uf.length; i++) {

         for (user of value) {

            if (user.UF == uf[i]) {
               aux = apenasNumeros(user.field12)
               if (!isNaN(aux)) {
                  soma = soma + aux
               }


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

            if (user.UF == uf[i]) {

               soma = soma + apenasNumeros(user.QUANTIDADE)

            }

         }

         dados[i] = soma;

         soma = 0;

      }

      chartPiza(dados)
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
         text: 'Valor Total gasto'
      },

      subtitle: {
         text: 'Por estado do Brasil'
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



   Highcharts.chart('cont', {
      chart: {
         type: 'column'

      },
      title: {
         text: 'Quantidade de medicamentos enviados'
      }, subtitle: {
         text: 'por estado do Brasil'
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
            text: 'Quantidade'
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

 