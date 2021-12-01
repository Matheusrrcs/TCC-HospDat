
const uf = ["ACRE", "ALAGOAS", "AMAPA", "AMAZONAS", "BAHIA", "CEARA", "ESPIRITO SANTO", "DISTRITO FEDERAL", "GOIAS", "MARANHÃO", "MINAS GERAIS", "MATO GROSSO DO SUL", "MATO GROSSO", "PARA", "PARAIBA", "PERNAMBUCO", "PIAUI", "PARANA", "RIO DE JANEIRO", "RIO GRANDE DO NORTE", "RONDONIA", "RORAIMA", "RIO GRANDE DO SUL", "SANTA CATARINA", "SERGIPE", "SÃO PAULO", "TOCANTINS"]

fetch("https://hospdata.vercel.app/distribuicao_respiradores").then((response) =>
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
   dados.amountState(json)
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
 ,amountState(value){
   let somaQuant = 0
   let somaPre = 0
   let result
   let dados = []

   for (let i = 0; i < uf.length; i++) {

      for (user of value) {

         if (user.DESTINO == uf[i]) {

            somaQuant = somaQuant + apenasNumeros(user.QUANTIDADE)
            somaPre = somaPre + apenasNumeros(user.VALOR)
           
         }

      }
       result =  somaPre /somaQuant ;
      dados[i] = parseInt(result);

      somaQuant = 0
      somaPre = 0
       

   }
   chartsRing(dados);
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
            text: 'Quantidade de respiradores'
         }, subtitle: {
            text: 'Entregues por estado do Brasil'
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

function chartsRing(object){
   

   var data = [];

   for (let i = 0; i < object.length; i++) {

      data[i] = [uf[i], object[i],object[i]]

   }

   console.log(data);
   Highcharts.chart('contPizza', {
      chart: {
        type: 'variablepie'
      },
      title: {
        text: 'Quantidade media gasta por unidade'
      }, 

      subtitle: {
         text: 'Por estado do Brasil'
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          'Quantidade gasta: {point.y} '  
      },
      series: [{
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        name: 'countries',
        data: data
      }]
    });
}