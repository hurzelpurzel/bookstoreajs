app.controller("myCtrl", function($scope,$http) {
var Book = function() {
   return { author: "",
   description: "",
   genre: "",
   price: 0.00,
   publish_date: new Date(),
   title: ""} ;
};	
		
    var url="http://localhost:3000/BookSet";
     
    $scope.Bookset=[];
    
    $scope.load=function(){
    
    	  
    	    $http.get(url).success( function(response) {
    	    		    $scope.Bookset = response.value;
    	    });
    	   
    }
    $scope.clearEditor=function(){
    	     $scope.editBook = new Book();
    }
    $scope.edit=function(book){
    	    $scope.editBook=book;
    }
    $scope.remove=function(book){
     //if editBook has no id -> post
  
     
     	      $http.delete(url+"("+book.id+")").success( function(response) {
    	    		    $scope.load();
    	    		     $scope.clearEditor();
    	    		     
    	    });
     }
    $scope.store=function(){
     //if editBook has no id -> post
  
     if($scope.editBook.id){
     	      $http.put(url+"("+$scope.editBook.id+")",$scope.editBook).success( function(response) {
    	    		    $scope.load();
    	    		     $scope.clearEditor();
    	    		     
    	    });
     }else{
     	      $http.post(url,$scope.editBook).success( function(response) {
    	    		    $scope.load();
    	    		     $scope.clearEditor();
    	    		     
    	    });
     }
    
    
    }
    
}); 
