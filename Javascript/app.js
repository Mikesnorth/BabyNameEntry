(function(){
    var app = angular.module("babyApp", []);
    
    var BabyNames = function($scope) {
        
        var load = function() {
            if(typeof(Storage) !== "undefined") {
                var hisData = JSON.parse(localStorage.getItem("hisData")) || [];
                var herData = JSON.parse(localStorage.getItem("herData")) || [];
                var matches = JSON.parse(localStorage.getItem("matches")) || [];
                $scope.hisList = hisData;
                $scope.herList = herData;
                $scope.matches = matches;
            } else {
                console.log("Local Storage Unavailable");
            }
        };
        
        var save = function() {
            if(typeof(Storage) !== "undefined") {
                var hisData = $scope.hisList || [];
                var herData = $scope.herList || [];
                var matches = $scope.matches || [];  
                localStorage.setItem("hisData", JSON.stringify(hisData));
                localStorage.setItem("herData", JSON.stringify(herData));
                localStorage.setItem("matches", JSON.stringify(matches));  
            }
        };
        
        var clearMessages = function() {
            $scope.message = null;
            $scope.hisError = null;
            $scope.herError = null;
        };   
        
        var clearStorage = function() {
            if(typeof(Storage) !== "undefined") {
                localStorage.clear();
            }
        };
           
        load();
        
        $scope.addHis = function() {
            clearMessages();
            
            if(!$scope.hisNameToAdd || $scope.hisNameToAdd.trim() == '') {
                return;
            }
            
            $scope.herNameToAdd = null;
            $scope.hisList.push($scope.hisNameToAdd);
            $scope.message = $scope.hisNameToAdd + " added to His list";
            
            if($scope.herList.indexOf($scope.hisNameToAdd) != -1){
                $scope.message = "It's a match!";
                $scope.matches.push($scope.hisNameToAdd);
            } else {
                $scope.hisError = "No match found (yet)";
            }
            
            save();
            $scope.hisNameToAdd = null;
        }; 
             
        $scope.addHer = function() {
            clearMessages();
            
            if(!$scope.herNameToAdd || $scope.herNameToAdd.trim() == '') {
                return;
            }
            
            $scope.hisNameToAdd = null;
            $scope.herList.push($scope.herNameToAdd);
            $scope.message = $scope.herNameToAdd + " added to Her list";          
            
            if($scope.hisList.indexOf($scope.herNameToAdd) != -1){
                $scope.message = "It's a match!";
                $scope.matches.push($scope.herNameToAdd);
            } else {
                $scope.herError = "No match found (yet)";
            }
            
            save();
            $scope.herNameToAdd = null;
        };      
        
        $scope.clearLists = function() {
            $scope.matches = [];
            $scope.hisList = [];
            $scope.herList = [];
            clearStorage();
            clearMessages();
        };
         
    };
     
    app.controller("BabyNames", ["$scope", BabyNames]);
    
}());
