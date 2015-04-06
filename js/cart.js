app.controller("cart", function($scope,$http,menuSelected,ipCookie){
 var vm = this;
 menuSelected.set('cart');

 vm.cart=[];
 vm.total=0;
 var csrf=ipCookie('csrftoken');
 res= $http({
  withCredentials:true,
  method: 'POST',
  url: 'http://localhost:8000/api/getCart',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken' : ipCookie('csrftoken')
          }}); //

 res.success(function(data, status, headers, config) {
  console.log(data);
  cartCount= data.movies.length+data.games.length;
  games=data.games;
  movies=data.movies;

  for(i=0;i<movies.length;++i){
    $http({withCredentials: true, method: 'GET', url: "http://localhost:8000/api/movies/"+movies[i] })
    .success(function(data, status, headers, config) {
      vm.total=vm.total+data.deposit+data.rent;
      vm.cart.push(
      {
        type: 'game',
        poster: 'http://localhost:8000'+data.poster,
        title:data.title,
        deposit: data.deposit,
        rent:data.rent,
        url: "#/movies"+movies[i]
      });
    }).error(function(data, status, headers, config) {
      console.log( "failure message");
    });

  }

  for(i=0;i<games.length;++i){
    $http({withCredentials: true, method: 'GET', url: "http://localhost:8000/api/games/"+games[i] })
    .success(function(data, status, headers, config) {
      vm.total=vm.total+data.deposit+data.rent;
      vm.cart.push(
      {
        type:'game',
        poster: 'http://localhost:8000'+data.poster,
        title:data.title,
        deposit: data.deposit,
        rent:data.rent,
        url: "#/games"+games[i]
      });
    }).error(function(data, status, headers, config) {
      console.log( "failure message");
    });
  }
});
 res.error(function(data, status, headers, config) {
  console.log( "Please Sign In");
});
});