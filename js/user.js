var app=angular.module('app',['ipCookie']);

app.factory('checkAuthentication',function($http){
	return {
		check:function(){
			var res=$http({
				withCredentials:true,
				method: 'POST',
				url: 'http://localhost:8000/api/authenticate',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			res.success(function(data, status, headers, config) {
					window.location='index.html';
				});
			res.error(function(data, status, headers, config) {
			});
		}
	}
});


app.controller("signinController", function($http,checkAuthentication,ipCookie){
	checkAuthentication.check();
	var csrf=ipCookie('csrftoken');
	var vm = this;
	vm.email=null;
	vm.password=null;
	vm.signin=function(){
		console.log(vm);
		if(vm.email!=null&&vm.password!=null){
		console.log(vm);
		var data={
			"username": vm.email,
			"password":vm.password
		};
		console.log(data);
		var res= $http({
			withCredentials:true,
			method: 'POST',
			url: 'http://localhost:8000/api/login',
			data: data,
			headers: {
				      'X-CSRFToken' : ipCookie('csrftoken'),
				'Content-Type': 'application/json'
					}}); //

		res.success(function(data, status, headers, config) {
			console.log("success");
			window.location='index.html';
		});
		res.error(function(data, status, headers, config) {
			console.log( "failure message");
		});
	}};
});


app.controller("signupController", function($http,checkAuthentication,ipCookie){
	checkAuthentication.check();
	var vm = this;
	vm.register=function(){
		console.log(vm);

		if(vm.firstname&&vm.lastname&&vm.email){
			if(vm.password&&(vm.password==vm.cpassword)){
				var user={
					"first_name":vm.firstname,
					"last_name":vm.lastname,
					"password":vm.password,
					"username":vm.email,
					"email":vm.email
				};

				var res= $http({
					withCredentials:true,
					method: 'POST',
					url: 'http://localhost:8000/api/create_auth',
					data: user,
					headers: {
						'Content-Type': 'application/json'
					}}); //
				//var res = $http.post('http:localhost:8000/users/register', user);


				res.success(function(data, status, headers, config) {
					alert("Your account has been created Successfully");
					window.location="/";
					console.log("success");
				});
				res.error(function(data, status, headers, config) {
					console.log( "failure message");
				});
			}
		}
	}
});
