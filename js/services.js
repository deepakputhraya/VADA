app.factory('menuSelected',function(){
 var menu="home";
 return {
  get: function () {
    return menu;
  },
  set: function (data) {
    menu=data;
  }
};
});


//---------------------------------------

app.factory('addToCart',function($http,ipCookie){
  var cartCount=0;
  var movies=[];
  var games=[];
  cart= $http({
    withCredentials:true,
    method: 'POST',
    url: 'http://localhost:8000/api/getCart',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken' : ipCookie('csrftoken')
          }}); //

  cart.success(function(data, status, headers, config) {
    console.log(data);
    cartCount= data.movies.length+data.games.length;
    games=data.games;
    movies=data.movies;
  });
  cart.error(function(data, status, headers, config) {
    console.log( "failure message");
  });

  return {
    getNumber: function () {
      return cartCount;
    },

    add:function(product){
      var res= $http({
      withCredentials:true,
      method: 'POST',
      url: 'http://localhost:8000/api/authenticate',
      headers: {
        'Content-Type': 'application/json'
          }}); //

    res.success(function(data, status, headers, config) {
      var flag=1;
      console.log(product);
      if(product.type=='movie')
        for(i=0;i<movies.length;++i){
          if(movies[i]==product.id){
            flag=0;
            break;
          }
        }
        else
         for(i=0;i<games.length;++i){
          if(games[i]==product.id){
            flag=0;
            break;
          }
        }

        if(flag){
          var csrf=ipCookie('csrftoken');
          cart= $http({
            withCredentials:true,
            method: 'POST',
            data:{
              "type":product.type,
              "id":product.id
            },
            url: 'http://localhost:8000/api/addToCart',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken' : csrf
          }}); //

          cart.success(function(data, status, headers, config) {
            if(product.type=='movie')
              movies.push(product.id);
            else
              games.push(product.id);
            cartCount++;
          });
          cart.error(function(data, status, headers, config) {
            console.log( "failure to add to cart");
            alert('Item out of Stock');
          });
        }

    });
    res.error(function(data, status, headers, config) {
    alert('Please Register or Login');
    console.log( "Please Sign In");
    });
      }
    };
  });
