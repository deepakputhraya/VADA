app.controller("navigationController",function(ipCookie,$http,$scope,menuSelected,addToCart){
  var vm=this;
  var csrf=ipCookie('csrftoken');
  console.log(csrf);
  vm.cartCount=addToCart.getNumber();
  vm.navSelected='home';
     $scope.$watch(function () { return menuSelected.get(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) vm.navSelected = newValue;
    });

  $scope.$watch(function () { return addToCart.getNumber(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) vm.cartCount = newValue;
    });



vm.loggedIn=false;
//Check for Login
var res= $http({
      withCredentials:true,
      method: 'POST',
      url: 'http://localhost:8000/api/authenticate',
      headers: {
        'Content-Type': 'application/json'
          }}); //

    res.success(function(data, status, headers, config) {
      console.log(data);
      vm.name=data;
      vm.loggedIn=true;
    });
    res.error(function(data, status, headers, config) {
      console.log( "failure message");
    });

vm.logout=function(){
  console.log('logout');
  res= $http({
      withCredentials:true,
      method: 'POST',
      url: 'http://localhost:8000/api/logout',
      headers: {
        'Content-Type': 'application/json'
          }}); //

    res.success(function(data, status, headers, config) {
      console.log("successfully Loggedout");
      window.location=('signin.html')

      vm.loggedIn=false;
    });
    res.error(function(data, status, headers, config) {
      console.log( "failure message");
    });
}

});

//--------------------------------------

app.controller("mainController", function($scope,$http,addToCart,menuSelected){
menuSelected.set('home');
  var vm = this;
  vm.addToCart=addToCart;
  /*
   vm.featuredProducts = [{
    	title: "Latest Releases",
    	products:[
    	{
    		title: "Inception",
    		image: "images/posters/Inception-poster.jpg",
    		inWatchlist: 1
    	},
    	{
    		title: "Avengers",
    		image: "images/posters/avengers-poster.jpg",
    		inWatchlist: 0

    	},
    	{
    		title: "Skyfall",
    		image: "images/posters/skyfall-poster.jpg",
    		inWatchlist: 1

    	},
    	{
    		title: "Lego",
    		image: "images/posters/Lego-poster.jpg",
    		inWatchlist: 0
    	},
    	{
    		title: "Fury",
    		image: "images/posters/Fury-poster.jpg",
    		inWatchlist: 0
    	},
    	{
    		title: "Thor",
    		image: "images/posters/thor-poster.jpg",
    		inWatchlist: 1
    	}]
    },
    {
    	title: "Popular",
    	products:[
    	{
    		title: "Silence of the lambs",
    		image: "images/posters/silence-of-the-lambs-poster.jpg",
    		inWatchlist: 0
    	},
    	{
    		title: "Johnny English Reborn",
    		image: "images/posters/Johnny-English-Reborn-poster.jpg",
    		inWatchlist: 0
    	},
    	{
    		title: "Avatar",
    		image: "images/posters/avatar-poster.jpg",
    		inWatchlist: 1
    	},
    	{
    		title: "Dark Knight",
    		image: "images/posters/dark-knight-poster.png",
    		inWatchlist: 1
    	},
    	{
    		title: "Leon the Profesional",
    		image: "images/posters/leon-the-professional-poster.jpg",
    		inWatchlist: 0
    	},
    	{
    		title: "Shutter Island",
    		image: "images/posters/shutter-island-poster.jpg",
    		inWatchlist: 1
    	}
    	]
    },
    {
    	title: "Games",
    	products:[
    	{
    		title: "BioShock",
    		image: "images/game-posters/bio-shock-poster.jpg",
    		inWatchlist: 1
    	},
    	{
    		title: "Batman Arkham Origins",
    		image: "images/game-posters/batman-arkham-origins-poster.jpg",
    		inWatchlist: 1
    	},
    	{
    		title: "Fallout 3",
    		image: "images/game-posters/fallout3-poster.jpg",
    		inWatchlist: 1
    	},
    	{
    		title: "Skyrim",
    		image: "images/game-posters/skyrim-poster.jpg",
    		inWatchlist: 1
    	},
    	{
    		title: "WatchDogs",
    		image: "images/game-posters/watchdogs-poster.JPG",
    		inWatchlist: 1
    	},
    	{
    		title: "Medal of Honour",
    		image: "images/game-posters/medal-of-honour-poster.jpg",
    		inWatchlist: 0
    	}
    	]
    }
    ];
  */

  //Get  Latest Releases;
vm.movies=[];
vm.games=[];

vm.featuredProducts=[];
var responsePromise=$http({withCredentials: true, method: 'GET', url: "http://localhost:8000/api/movies" });
  //var responsePromise = $http.get("http://localhost:8000/api/movies");
  responsePromise.success(function(data, status, headers, config) {
    for(i=0;i<6;++i){
      vm.movies.push({
        url: "/movies/"+data[i].id,
        type: "movie",
        id:data[i].id,
        genre: data[i].genre,
        title : data[i].title,
        image: data[i].poster,
        inWatchlist: 0,
        display: true
      });
    }
     vm.featuredProducts.push({
        title: 'Movies',
        products: vm.movies
      });
     console.log(vm.featuredProducts);
  });

  responsePromise.error(function(data, status, headers, config) {
    alert("AJAX failed!");
  });


var gameRequest=$http({withCredentials: true, method: 'GET', url: "http://localhost:8000/api/games" });
  //var responsePromise = $http.get("http://localhost:8000/api/movies");
  gameRequest.success(function(data, status, headers, config) {
    for(i=0;i<6;++i){
      vm.games.push({
        url: "/games/"+data[i].id,
        type: "game",
        id:data[i].id,
        genre: data[i].genre,
        title : data[i].title,
        image: data[i].poster,
        inWatchlist: 0,
        display: true
      });
    }
     vm.featuredProducts.push({
        title: 'Games',
        products: vm.games
      });
     console.log(vm.featuredProducts);
  });

  gameRequest.error(function(data, status, headers, config) {
    alert("AJAX failed!");
  });


    vm.wishlist=function(itemSelected){
      itemSelected.inWatchlist=!itemSelected.inWatchlist;
   }
});


//Banner Controller
angular.module('featured').controller('CarouselDemoCtrl', function ($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [{
  	image: "images/banners/The-Expendables-2-banner.jpg",
  	text: "The Expendables-2"
  },
  {
  	image: "images/banners/fallout3-banner.jpg",
  	text: "Highway"
  },
   {
  	image: "images/banners/Highway-banner.jpg",
  	text: "Highway"
  },
  {
  	image: "images/banners/COD-MW-banner.jpg",
  	text: "Tron Legacy"
  },
  {
  	image: "images/banners/transformers-age-of-extinction-banner.jpg",
  	text: "Tranformers Age of Extinction"
  },
  {
  	image: "images/banners/tron-legacy-banner.jpg",
  	text: "Tron Legacy"
  },
  {
  	image: "images/banners/skyrim-banner.jpg",
  	text: "Tranformers Age of Extinction"
  }
  ];
});
