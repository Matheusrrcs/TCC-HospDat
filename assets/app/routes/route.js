app.config(function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'app/views/home.html'
            
        })

        .when('/dataBase', {
            templateUrl: 'app/views/dataBase.html'
            

        })
        .when('/dashBoard',{
            templateUrl: 'app/views/dashBoard.html'
        })
        .when('/distribuicao_de_respiradores',{
            
            templateUrl: 'app/views/distribuicao_de_respiradores.html'
        })
        .when('/distribuicao_de_medicamentos_covid_19',{
            templateUrl:'app/views/distribuicao_de_medicamentos–covid-19.html'
        })
   
        .otherwise({ redirectTo: '/' });
        
});