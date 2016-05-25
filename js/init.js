var denemeModel = {
    user: "İsmail",
    items: [{ action: "Yapılacak 1", done: true },
                { action: "Yapılacak 2", done: true },
                { action: "Yapılacak 3", done: false },
                { action: "Yapılacak 4", done: false },
                { action: "Yapılacak 5", done: false },
            ]
    };
    var deneme = angular.module("deneme", []);

    deneme.controller("ToDoCtrl", function ($scope) {
    $scope.todo = denemeModel;
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
