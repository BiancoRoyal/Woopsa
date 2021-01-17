/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
(function ($, axios, global) {
	$(document).ready(function (){	
		//var woopsa = new WoopsaClient("/woopsa", jQuery);
		//The more complicated, more customizeable way
		/*
		woopsa.createSubscriptionChannel(200, function (channelId) {
			console.log("Created subscription channel with id " + channelId);
			this.registerSubscription("/Child1/Property1", function (value) {
				console.log("The new value is " + value);
			})
		})
		*/
		var subscriptionRegistered = null;

		$("#urlForm").submit(function (){

			global.axiosService = woopsaClient.open( axios, { url: $("#serverUrl").val() } );
			
			//The very easy way of making a subscription
			/* this.onChange($("#subscribePath").val(), function (value){
				console.log("Received notification, new value = " + value);
				$("#variableValue").html(value);
			},1,1, function (subscription){
				console.log("Created ok");
				console.log(subscription);
				subscriptionRegistered = subscription;
			}); */
			
			$("input, textarea").each(function (){
				$(this).removeAttr("disabled");
			})
			
			$("#subscribePath").attr("disabled","disabled");
			$("#urlForm input").each(function (){ $(this).attr("disabled","disabled")});
		
			/* global.axiosService.onError(function (type, errorThown){
				$(".log").prepend("<b>" + (new Date().toUTCString()) + ": </b>" + type + " - " + errorThown + "<br>");
			}) */
			
			return false;
		});
		
		$("#readForm").submit(function (){
			woopsaClient.read($("#readPath").val(), function(value) {
				$("#readValue").html('Read: ' + value);
			}, function(err) {
				$("#readError").html('Error: ' + err.message);
			});
			return false;
		});
		
		$("#writeForm").submit(function (){
			woopsaClient.write($("#writePath").val(), $("#writeValue").val(), function(value){
				$("#writeSuccess").html(value + ' success writing');
				console.log(value);
			}, function(err) {
				$("#writeError").html('Error: ' + err.message);
			});
			return false;
		});		
		
		$("#invokeForm").submit(function (){
			var invArgs = {};
			invArgs[$("#invokeArgumentName").val()] = $("#invokeArgumentValue").val();
			woopsaClient.invoke($("#invokePath").val(), invArgs, function (value){
				$("#invokeValue").html(JSON.stringify(value, null, 2));
			}, function(err) {
				$("#invokeError").html('Error: ' + err.message);
			}, 10000);
			return false;
		})
		
		$("#metaForm").submit(function (){
			woopsaClient.meta($("#metaPath").val(), function (value){
				$("#metaValue").html(JSON.stringify(value, null, 2));
			})
			return false;
		});
	});
})(jQuery, axios, window);