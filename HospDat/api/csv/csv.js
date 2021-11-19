
fetch("http://localhost:4567/Distribuicao_respiradores").then((response) =>
   response.json()).then((json) => {

      estados(json)


   }).catch((error) => {
      console.log(error)
   });

function apenasNumeros(string) {

   var numsStr = string.replace(/[^0-9]/g, '');

   return parseFloat(numsStr);
}


// function estados(value){

// const uf = {

//    bahia(){

//    }


// }

// }

function estados(value) {

   const ufs = {

      bahia() {
         let valorGasto;
         let soma = 0

         for (user of value) {
           
            if (user.DESTINO == 'BAHIA') {
               soma = soma + apenasNumeros(user.VALOR)
            }
         }
         valorGasto = soma
 

         return valorGasto
      }
   }


   chart(ufs);
}



function chart(object) {


   var data = [
      ['br-sp', 0],
      ['br-ma', 1],
      ['br-pa', 2],
      ['br-sc', 5],
      ['br-ba', 2],
      ['br-ap', 5],
      ['br-ms', 6],
      ['br-mg', 7],
      ['br-go', 8],
      ['br-rs', 9],
      ['br-to', 10],
      ['br-pi', 11],
      ['br-al', 12],
      ['br-pb', 13],
      ['br-ce', 14],
      ['br-se', 15],
      ['br-rr', 16],
      ['br-pe', 17],
      ['br-pr', 18],
      ['br-es', 19],
      ['br-rj', 20],
      ['br-rn', 21],
      ['br-am', 22],
      ['br-mt', 23],
      ['br-df', 24],
      ['br-ac', 25],
      ['br-ro', 26]
   ];

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
         min: 0
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

 