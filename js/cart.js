app.controller("cart", function($scope,$http,addToCart,menuSelected,ipCookie){
 var vm = this;
 menuSelected.set('cart');
 vm.methodSelected=0;
  var auth= $http({
      withCredentials:true,
      method: 'POST',
      url: 'http://localhost:8000/api/authenticate',
      headers: {
        'Content-Type': 'application/json'
          }}); //

auth.success(function(data,status,headers,config){

});

auth.error(function(data,status,headers,config){
  console.log("Cant Access Cart");
  window.location="/";
});
  vm.address="";
  vm.city="";
  vm.pin="";
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
        id:data.id,
        type: 'movie',
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
        id:data.id,
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


vm.removeItem=function(item){
  console.log(item);
  var csrf=ipCookie('csrftoken');
 res= $http({
  withCredentials:true,
  method: 'POST',
  url: 'http://localhost:8000/api/removeCart',
  data:{
    "id":item.id,
    "type":item.type
  },
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken' : ipCookie('csrftoken')
          }}); //

 res.success(function(data, status, headers, config) {
  console.log("Item removed");
  addToCart.remove(item.id,item.type);
  vm.total=vm.total-item.rent-item.deposit;
  for(i=0;i<vm.cart.length;++i){
    if(vm.cart[i].id==item.id){
      vm.cart.splice(i,1);
      break;
    }
  }
});
 res.error(function(data, status, headers, config) {
  console.log( "Please Sign In");
});
}

vm.checkout=function(){
  console.log(vm.address);
  if(vm.methodSelected!=0&&vm.address.length>0&&vm.city.length>0&&vm.pin.length>0){
      ck= $http({
      withCredentials:true,
      method: 'POST',
      url: 'http://localhost:8000/api/checkOut',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken' : ipCookie('csrftoken')
          }}); //

ck.success(function(data,status,headers,config){
 console.log("Checkout");
    alert("Thank you for Renting");
    window.location="/";

});

ck.error(function(data,status,headers,config){
  console.log("No checkout");
});


  }
  else{
    alert("Please fill all the details!");
  }
}

});