var myApp = angular.module('myApp',["ngAnimate"]);

myApp.controller('AnimalsCtrl', ['$scope', function($scope) {
    $scope.log = [];

    $scope.visibleIndex = 0;
    $scope.visibleDirection = null;
    $scope.pageSize = 4;
    $scope.animals = [["bison","1"],["dodo","Dodo2"],["rtr","R3232323udolph the Reindeer"],["wbs1","1"],["sg","Silverback Gorilla"],["fb","Flying Beer"],["eo","European Ostrich"],["ut","Unicornian Tapir"],["bison","Bison"],["dodo","Dodo"],["rtr","Rudolph the Reindeer"],["wbs","Wild Boar-Shark"],["sg","Silverback Gorilla"],["fb","Flying Beer"],["eo","European Ostrich"],["ut","Unicornian Tapir"]];
    $scope.animalPages = [0,1,2,3];


    $scope.isSubmitted = false;
    $scope.animalsSelected = [];
    $scope.select = function(item){

        indexOfAniamal = $scope.animalsSelected.indexOf(item);
        if(indexOfAniamal > -1)
        {
            $scope.animalsSelected.splice(indexOfAniamal,1);
        }else{
            if($scope.animalsSelected.length == 3) return;
            $scope.animalsSelected.push(item);
        }

    }


    $scope.isAnimalInSelection = function(animal){
        return $scope.animalsSelected.indexOf(animal) > -1;
    }


    $scope.submitSelection = function(){
        if($scope.animalsSelected.length < 3) return;
        $scope.isSubmitted = true;
    }


    $scope.logUserAction = function(logText){
        $scope.log.push(logText);
        console.log("User Action:" + logText);
    }


    $scope.getMovementClass = function(index){
        return $scope.visibleDirection;
    }


    $scope.setVisibleIndex = function(direction){
           switch(direction){
               case "left":
                     if($scope.visibleIndex == 0){
                         $scope.visibleIndex = $scope.animalPages.length-1;
                     }else{
                         $scope.visibleIndex = $scope.visibleIndex-1;
                     }
                   break;
               case "right":

                   if($scope.visibleIndex == $scope.animalPages.length-1){
                       $scope.visibleIndex = 0;
                   }else{
                       $scope.visibleIndex = $scope.visibleIndex+1;
                   }
                   break;
           }
           $scope.visibleDirection= direction;
    }


}]);


myApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});


myApp.animation('.item_g', function() {
    return {
        addClass : function(element, className, done) {
            if(className == 'ng-hide') {
                jQuery(element).animate({
                    opacity:0
                }, done);
            }
            else {
                done();
            }
        },
        removeClass : function(element, className, done) {
            if(className == 'ng-hide') {
                element.css('opacity',0);

                /* remove it early so you can animate on it since
                 it is not possible using element.css() to set
                 a style using !important */
                element.removeClass('ng-hide');
                jQuery(element).animate({
                    opacity:1
                }, done);
            }
            else {
                done();
            }
        }
    };
});

