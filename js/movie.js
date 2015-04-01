app.controller("movieController", function($scope,$http,menuSelected,addToCart){
var vm = this;
vm.addToCart=addToCart;
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
        type: 'movie',
        id:data[i].id,
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

vm.wishlist=function(itemSelected){
  itemSelected.inWatchlist=!itemSelected.inWatchlist;
  console.log(vm.featuredProducts);
}

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
