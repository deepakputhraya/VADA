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

app.factory('addToCart',function(){
   var items=[];
    return {
        getNumber: function () {
            return items.length;
        },
        add:function(data){
        	console.log(data);
        	items.push(data);
        }
    };
});
