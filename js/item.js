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

vm.wishlist=function(itemSelected){
 itemSelected.inWatchlist=!itemSelected.inWatchlist;
 console.log(vm.featuredProducts);
}

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
app.controller("selectedItem", function($scope){

});
