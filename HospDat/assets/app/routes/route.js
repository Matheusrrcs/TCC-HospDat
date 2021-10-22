app.config(function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'app/views/home.html'
            
        })

        .when('/dataBase', {
            templateUrl: 'app/views/dataBase.html'
            

        })

        .otherwise({ redirectTo: '/' });
});