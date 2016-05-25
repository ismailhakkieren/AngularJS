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
