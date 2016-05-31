angular.module('modalTest',['ui.bootstrap','dialogs'])
.controller('dialogServiceTest',function($scope,$rootScope,$timeout,$dialogs){
	$scope.confirmed = 'Hiç bir modal Onaylanmadı';
	$scope.name = 'İsminiz buraya gelecek.';
	
	$scope.launch = function(which){
		var dlg = null;
		switch(which){
			// Error Dialog
			case 'error':
			dlg = $dialogs.error('Bu bir hata mesajıdır');
			
			break;
        
			// Wait / Progress Dialog
			case 'wait':
			dlg = $dialogs.wait(msgs[i++],progress);
			fakeProgress();
			break;

			// Notify Dialog
			case 'notify':
			dlg = $dialogs.notify('Bir şey oldu','Bir şey oldu anam bir şey oldu dur sana bir diyim bunu...');
			break;

			// Confirm Dialog
			case 'confirm':
			dlg = $dialogs.confirm('Modal Örneği','Şıncık sen bunu onayladığında buradaki modal kapanır kapanmaz alt sayfada olaylar olaylar olur.');
			dlg.result.then(function(btn){
			  $scope.confirmed = 'Onayladın ya la aferin minnoş...';
			},function(btn){
			  $scope.confirmed = 'Utan utan insan onaylar';
			});
			break;

			// Create Your Own Dialog
			case 'create':
			dlg = $dialogs.create('/dialogs/whatsyourname.html','whatsYourNameCtrl',{},{key: false,back: 'static'});
			dlg.result.then(function(name){
			  $scope.name = name;
			},function(){
			  $scope.name = 'La oğlum ismini istedik sanırsın TC kimlik numaranı istedik...';
			});
			break;
		};
	};
  
	// Progress Bar için bekleme mesajları
	var progress = 25;
	var msgs = [
		'OOOOOOoooooo daha çok var...',
		'Hai yarıladın...',
		'Bitti bitecek...',
		'Vay anasını yaptın yal la...'
	];
	var i = 0;
  
	var fakeProgress = function(){
		$timeout(function(){
			if(progress < 100){
				progress += 25;
				$rootScope.$broadcast('dialogs.wait.progress',{msg: msgs[i++],'progress': progress});
				fakeProgress();
			}else{
				$rootScope.$broadcast('dialogs.wait.complete');
			}
		},1000);
	};
}) // end dialogsServiceTest

.controller('whatsYourNameCtrl',function($scope,$modalInstance,data){
	$scope.user = {name : ''};

	$scope.cancel = function(){
		$modalInstance.dismiss('canceled');  
	}; // end cancel

	$scope.save = function(){
		$modalInstance.close($scope.user.name);
	}; // end save
  
	$scope.hitEnter = function(evt){
	if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.name,null) || angular.equals($scope.name,'')))
		$scope.save();
	}; // end hitEnter
	
}) // end whatsYourNameCtrl


.run(['$templateCache',function($templateCache){
	$templateCache.put('/dialogs/whatsyourname.html','<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> Kullanıcı Adı</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><label class="control-label" for="username">İsim Soyisim:</label><input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required><span class="help-block">Sadece isim istiyoruz ha tribe girme</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Kapat</button><button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Kaydet</button></div></div></div></div>');
}]); // end run / module