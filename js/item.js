app.controller("recommendedItems", function($scope,menuSelected){
 var vm = this;
 menuSelected.set('');

 vm.cart=[];

 vm.products = [
 {
   title: "People who rented this also rented",
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
  }
  ]
},
{
 title: "Recommended For You",
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
}
]
}
];

vm.addToCart=function(itemSelected){
 vm.cart.push(itemSelected);
 vm.inCartCount++;
}

});

/*Advertisement Controller*/
app.controller("advertisements", function($scope){
 var vm = this;
 vm.adds = [
 {
  title: "Inception",
  image: "images/posters/Inception-poster.jpg",
},
{
  title: "Avengers",
  image: "images/posters/avengers-poster.jpg",
},
{
  title: "Skyfall",
  image: "images/posters/skyfall-poster.jpg",
},
{
  title: "Lego",
  image: "images/posters/Lego-poster.jpg",
}
];
});

//About the The item that the user selected
app.controller("selectedItem", function($scope,$route,$routeParams,$http,addToCart){
  var vm=this;
  vm.addToCart=addToCart;
  vm.f1=false;
  vm.f2=false;
  vm.filters=[];
  var filterNames=[];
  vm.product=[];
  var res=$http({withCredentials: true, method: 'GET', url: "http://localhost:8000/api/movies/"+$routeParams.id });
  res.success(function(data, status, headers, config) {
    vm.f1=true;
    vm.product=data;
    vm.product.type="movie";
    vm.product.stock=parseInt(vm.product.stock);
    vm.product.poster='http://localhost:8000'+data.poster;

    fil=$http({withCredentials: true, method: 'GET', url: "http://localhost:8000/api/movies/genre/"});
    fil.success(function(data, status, headers, config) {
      vm.f2=true;
      vm.filters=data;
      for(i=0;i<vm.product.genre.length;++i){
      for(j=0;j<vm.filters.length;++j){
        if(parseInt(vm.filters[j].id)==parseInt(vm.product.genre[i])){
          filterNames.push(vm.filters[j].name);
        }
      }
      }
      vm.product.genre=filterNames;
    });
    fil.error(function(data, status, headers, config) {
      console.log( "failure message");
    });
      });
  res.error(function(data, status, headers, config) {
    console.log( "failure message");
  });

});

app.controller("selectedGame", function($scope,$route,$routeParams,$http,addToCart){
  var vm=this;
  vm.addToCart=addToCart;
  vm.f1=false;
  vm.f2=false;
  vm.filters=[];
  var filterNames=[];
  vm.product=[];
  var res=$http({withCredentials: true, method: 'GET', url: "http://localhost:8000/api/games/"+$routeParams.id });
  res.success(function(data, status, headers, config) {
    vm.f1=true;
    vm.product=data;
    vm.product.type='game';
    vm.product.stock=parseInt(vm.product.stock);
    vm.product.poster='http://localhost:8000'+data.poster;

    fil=$http({withCredentials: true, method: 'GET', url: "http://localhost:8000/api/games/genre/"});
    fil.success(function(data, status, headers, config) {
      vm.f2=true;
      vm.filters=data;
      for(i=0;i<vm.product.genre.length;++i){
      for(j=0;j<vm.filters.length;++j){
        if(parseInt(vm.filters[j].id)==parseInt(vm.product.genre[i])){
          filterNames.push(vm.filters[j].name);
        }
      }
      }
      vm.product.genre=filterNames;
      console.log(vm.product);
    });
    fil.error(function(data, status, headers, config) {
      console.log( "failure message");
    });
      });
  res.error(function(data, status, headers, config) {
    console.log( "failure message");
  });

});