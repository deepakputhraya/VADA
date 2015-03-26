app.controller("filterController", function($scope,$http,menuSelected){
var vm = this;
vm.navSelected='movies';
menuSelected.set(vm.navSelected);
$scope.$watch('navSelected', function (newValue, oldValue) {
        if (newValue !== oldValue){
          menuSelected.set(newValue);
        }
    });


  vm.genres=[];           //List with Genre
  vm.filters=[];          //List containing filters and their title
  vm.filterProducts=[];   //List containing all Movies
  vm.checkedTags=[];
  //----------------Getting List of Movies-------------------------------
  var responsePromise=$http({withCredentials: true, method: 'GET', url: "http://localhost:8000/api/movies" });
  //var responsePromise = $http.get("http://localhost:8000/api/movies");
  responsePromise.success(function(data, status, headers, config) {
    console.log(data);
    for(i=0;i<data.length;++i){
      vm.filterProducts.push({
        genre: data[i].genre,
        title : data[i].title,
        image: data[i].poster,
        inWatchlist: 0,
        display: true
      });
    }
  });
  responsePromise.error(function(data, status, headers, config) {
    alert("AJAX failed!");
  });

  //-------------Getting All genres------------------------
  responsePromise = $http.get("http://localhost:8000/api/movies/genre");
  responsePromise.success(function(data, status, headers, config) {
    for(i=0;i<data.length;++i){
      vm.genres.push({
        id: data[i].id,
        property: data[i].name,
        checked: false
      });
    }
    console.log(vm.genres);
    vm.filters.push({
      title: "Genres",
      properties: vm.genres
    });
  });
  responsePromise.error(function(data, status, headers, config) {
    alert("AJAX failed!");
  });

  //----------

  /*
  vm.filterProducts = [
  {
  title: "Inception",
  image: "static/images/posters/Inception-poster.jpg",
  inWatchlist: 1
},
{
title: "Avengers",
image: "static/images/posters/avengers-poster.jpg",
inWatchlist: 0
},
{
title: "Skyfall",
image: "static/images/posters/skyfall-poster.jpg",
inWatchlist: 1
},
{
title: "Lego",
image: "static/images/posters/Lego-poster.jpg",
inWatchlist: 0
},
{
title: "Fury",
image: "static/images/posters/Fury-poster.jpg",
inWatchlist: 0
},
{
title: "Thor",
image: "static/images/posters/thor-poster.jpg",
inWatchlist: 1
},
{
title: "Silence of the lambs",
image: "static/images/posters/silence-of-the-lambs-poster.jpg",
inWatchlist: 0
},
{
title: "Johnny English Reborn",
image: "static/images/posters/Johnny-English-Reborn-poster.jpg",
inWatchlist: 0
},
{
title: "Avatar",
image: "static/images/posters/avatar-poster.jpg",
inWatchlist: 1
},
{
title: "Dark Knight",
image: "static/images/posters/dark-knight-poster.png",
inWatchlist: 1
},
{
title: "Leon the Profesional",
image: "static/images/posters/leon-the-professional-poster.jpg",
inWatchlist: 0
},
{
title: "Shutter Island",
image: "static/images/posters/shutter-island-poster.jpg",
inWatchlist: 1
}
];
*/
vm.wishlist=function(itemSelected){
  itemSelected.inWatchlist=!itemSelected.inWatchlist;
  console.log(vm.featuredProducts);
}

vm.addToCart=function(itemSelected){
  vm.cart.push(itemSelected);
  vm.inCartCount++;
}
/*
vm.filters=[{
title: "Genre",
properties:[{
property: "Horror",
checked : false
},{
property: "Thriller",
checked : false
},{
property: "Mystery",
checked : false
},{
property: "Action",
checked : false
},{
property: "Drama",
checked : false
},{
property: "Crime",
checked : false
},{
property: "Animated",
checked : false
}
]
}];
*/

vm.filterMovies=function(){


  if(vm.checkedTags.length==0){
    for(i=0;i<vm.filterProducts.length;++i)
      vm.filterProducts[i].display=true;
  }
  else{
  for(i=0;i<vm.filterProducts.length;++i){
    for(j=0;j<vm.filterProducts[i].genre.length;++j){
      for(k=0;k<vm.checkedTags.length;++k){
        if(vm.checkedTags[k]==vm.filterProducts[i].genre[j])
        break;
      }
      if(k<vm.checkedTags.length)
      break;
    }
    if(j<vm.filterProducts[i].genre.length){
      vm.filterProducts[i].display=true;
    }
    else{
      vm.filterProducts[i].display=false;
    }
  }
  }

}

vm.addFilter=function(item){
  item.checked=!item.checked;
  if(item.checked){
    vm.checkedTags.push(item.id);
    vm.filterMovies();
  }
  else{
    for(i=0;i<vm.checkedTags.length;++i){
      if(vm.checkedTags[i]==item.id)
      break;
    }
    vm.checkedTags.splice(i,1);
    vm.filterMovies();
  }
}

});
