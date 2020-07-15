var app = angular.module("myapp", [ "chart.js" ])

app
		.controller(
				"pollingController",
				function($scope, $http) {

					
					var request = {
						method : 'get',
						url : '/poll.json',
						dataType : 'json',
						contentType : "application/json",
						headers:{'Cache-Control': 'no-cache'}
					};

					$http(request)
							.success(
									function(jsonData) {
										$scope.pollDetails = jsonData;
										$scope.pollList = $scope.pollDetails.polls;
										for (var j = 0; j < $scope.pollList.length; j++) {
											for (var i = 0; i < $scope.pollList[j].answer.options.length; i++) {
												if (!$scope.pollList[j].answer.options[i]
														.hasOwnProperty('votes')) {
													$scope.pollList[j].answer.options[i].votes = 0;
												}
											}
										}

									}).error(function() {

							});

					$scope.save = function(choices, pollData) {
						$scope.pollQuest = pollData;
						$scope.selectedChoice = choices;

						for (var i = 0; i < pollData.answer.options.length; i++) {
							if (pollData.answer.options[i].label == choices) {
								pollData.answer.options[i].votes++;

							}
						}

						$scope.saveResult($scope.pollQuest);
						$scope.chartForPoll(pollData);

					}

					$scope.chartForPoll = function(pollData) {
						$scope.diskDataJson = {
							"data" : []
						};
						$scope.diskDataJson = {
							"label" : []
						};
						$scope.diskDataJson = {}
						$scope.pollDetails = pollData;
						$scope.quantityForPoll = [];
						$scope.labelForPoll = [];
						for (var i = 0; i < pollData.answer.options.length; i++) {
							$scope.quantityForPoll[i] = pollData.answer.options[i].votes;
							$scope.labelForPoll[i] = pollData.answer.options[i].label;
						}
						$scope.diskDataJson = {
							"data" : $scope.quantityForPoll,
							"labels" : $scope.labelForPoll,

						}

					}

					$scope.saveResult = function(updatedPollDetails) {
						$scope.resultData = {};
						$scope.resultData.polls = updatedPollDetails;
						;

						$http
								.put(
										'http://localhost:3000/polls' + "/"
												+ $scope.resultData.polls.id,
										JSON.stringify($scope.resultData.polls))
								.then(
										function(response) {
											$scope.status = response.status;
											console.log("success",$scope.status)

										},
										function(response) {
										
											$scope.msg = "There is some problem in processing your request";

										});

					}

				});
