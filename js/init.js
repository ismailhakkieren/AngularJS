 //Angular_2.html   
var denemeModel = {
    user: "İsmail",
    items: [{ tamamlama: "Yapılacak 1", yapildi: true },
            { tamamlama: "Yapılacak 2", yapildi: true },
            { tamamlama: "Yapılacak 3", yapildi: false },
            { tamamlama: "Yapılacak 4", yapildi: false },
            { tamamlama: "Yapılacak 5", yapildi: false }]
};
var deneme = angular.module("denemeModel", []);

deneme.controller("ToDoCtrl", function ($scope) {
    $scope.todo = denemeModel;

    $scope.incompleteCount = function () {
        var count = 0;
        angular.forEach($scope.todo.items, function (item) {
            if (!item.yapildi) { count++ }
        });
        return count;
    }
    $scope.warningLevel = function () {
        return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
    }
    $scope.addNewItem = function (actionText) {
        $scope.todo.items.push({ tamamlama: actionText, yapildi: false });
    }
});

//Angular_3.html
var ismailDeneme = {
    user: "İsmail Hakkı EREN",
    items: [{ action: "Yapılacak 1", done: true },
            { action: "Yapılacak 2", done: true },
            { action: "Yapılacak 3", done: false },
            { action: "Yapılacak 4", done: false },
            { action: "Yapılacak 5", done: false }]
};
var deneme2 = angular.module("ismailDeneme", []);

deneme2.filter("checkedItems", function () {
    return function (items, showComplete) {
        var resultArr = [];
        angular.forEach(items, function (item) {
            if (item.done == false || showComplete == true) {
                resultArr.push(item);
            }
        });
        return resultArr;
    }
});
deneme2.controller("ismailControl", function ($scope) {
    $scope.todo = ismailDeneme;
    $scope.incompleteCount = function () {
        var count = 0;
        angular.forEach($scope.todo.items, function (item) {
                if (!item.done) { count++ }
        });
        return count;
    }
    $scope.warningLevel = function () {
        return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
    }
    $scope.addNewItem = function (actionText) {
        $scope.todo.items.push({ action: actionText, done: false });
    }
});

//Sipariş Formu 
function OrderFormController($scope){
    $scope.services = [{
        name: 'Geliştirme',
        price: 500,
        active:true
    },{
        name: 'Dizayn',
        price: 300,
        active:false
    },{
        name: 'Kod Entegrasyonu',
        price: 250,
        active:false
    },{
        name: 'Test',
        price: 220,
        active:false
    }];

    $scope.toggleActive = function(s){
        s.active = !s.active;
    };
    $scope.total = function(){
        var total = 0;
        angular.forEach($scope.services, function(s){
            if (s.active){
                total+= s.price;
            }
        });
        return total;
    };
}

//Anguar Directives 
var ornek = angular.module("ornekDirectives", ['ngSanitize']);
ornek.controller("ornekController", function ($scope) {
    $scope.myText2 = "İsim Soyisim: <span class='ornek'>İsmail Hakkı EREN</span>";
    $scope.firstName = "İsmail Hakkı";
    $scope.lastName = "EREN";
    $scope.change = 0;
    $scope.myFunc = function() {
        $scope.change++;
    };
    $scope.records = [{
      "Name" : "İsmail Hakkı EREN",
      "Country" : "Türkiye"
    },{
      "Name" : "İsmail Hakkı EREN",
      "Country" : "Fas"
    },{
      "Name" : "İsmail Hakkı EREN",
      "Country" : "Suriye"
    },{
      "Name" : "İsmail Hakkı EREN",
      "Country" : "ABDs"
    }]

    var kullanicilar = [{ 
        isim: 'İsmail EREN',
        email: ''
    },{
        isim: 'Hakkı EREN',
        email: ''
    }];  
    $scope.formDatalari = {};
    $scope.formDatalari.kullanicilar = kullanicilar;
    $scope.name = "İsmail Hakkı EREN";
});