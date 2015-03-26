app.config(function($routeProvider) {
        $routeProvider
          .when('/', {
                templateUrl : 'pages/home.html',
            })

            .when('/item', {
                templateUrl : 'pages/item.html',
            })

            .when('/movies', {
                templateUrl : 'pages/filter.html',
            })

            .when('/games', {
                templateUrl : 'pages/filter.html',
            });


    });
