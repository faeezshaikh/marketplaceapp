// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','timer','LocalStorageModule','ionic.contrib.ui.tinderCards'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  
  });
})
.constant('topicMap', {
    1 : 'data/route53.js',
    2 : 'data/rds.js',
    3 : 'data/iam.js',
    4 : 'data/ec2.js',
    5 : 'data/s3.js',
    6 : 'data/vpc.js',
    7 : 'data/beanstalk.js',
    8 : 'data/sqs.js',
    9 : 'data/sns.js',
    10 : 'data/swf.js',
    11 : 'data/dynamoDb.js',
    12 : 'data/cf.js',
    100 : 'data/practice1.js',
    200 : 'data/practice2.js',
    300 : 'data/exam.js'
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.ebook', {
      url: '/ebook',
      views: {
        'menuContent': {
          templateUrl: 'templates/ebook.html'
        }
      }
    })
  .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html'
        }
      }
    })
    .state('app.share', {
      url: '/share',
      views: {
        'menuContent': {
          templateUrl: 'templates/share.html'
        }
      }
    })
    .state('app.topics', {
      url: '/topics',
      views: {
        'menuContent': {
          templateUrl: 'templates/topics.html'
        }
      }
    })
    .state('app.chat', {
				url : '/chat',
				views : {
					'menuContent' : {
						templateUrl : 'templates/chat.html'
					}
				}
			})
			 .state('app.cards', {
				url : '/cards',
				views : {
					'menuContent' : {
						templateUrl : 'templates/cards.html'
					}
				}
			})

  .state('app.single', {
    url: '/topics/:topicId',
    views: {
      'menuContent': {
        templateUrl: 'templates/topic.html',
        controller: 'AppCtrl'
       }
    }
  });
  // if none of the above states are matched, use this as the fallback
//  $urlRouterProvider.otherwise('/app/topics');
//this is due to the chatUI widget with hyperlinks, so if anytime other than the first login a link is clicked go to chat.
	$urlRouterProvider.otherwise(function($injector, $location){
		   var state = $injector.get('$state');
		   if(state.current.name == '') {
			   state.go('app.topics');
		   }
		   else {
			   state.go('app.chat');
		   }
		   return $location.path();
		});
})

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
});
