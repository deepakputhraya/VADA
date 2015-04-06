app.config(function($routeProvider) {
        $routeProvider
          .when('/', {
                templateUrl : 'pages/home.html',
            })

            .when('/item', {
                templateUrl : 'pages/item.html',
            })

            .when('/movies', {
                templateUrl : 'pages/movie.html',
            })

            .when('/games', {
                templateUrl : 'pages/game.html',
            })
             .when('/movies/:id', {
                templateUrl : 'pages/movieDetails.html',
            })
            .when('/games/:id', {
                templateUrl : 'pages/gameDetails.html',
            })
            .when('/cart', {
                templateUrl : 'pages/cart.html',
            });

    });
