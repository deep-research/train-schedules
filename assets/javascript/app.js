$(document).ready( function() {

	// Initialize FireBase
	var config = {
	    apiKey: "AIzaSyB8hx1F9ar1GsikbMCFw1lK7k61lnAvxjQ",
	    authDomain: "firstdatabase-83848.firebaseapp.com",
	    databaseURL: "https://firstdatabase-83848.firebaseio.com",
	    storageBucket: "firstdatabase-83848.appspot.com"
	};
	
	firebase.initializeApp(config);;
	var database = firebase.database();

	// New Train Variables
	var trainName;
	var trainDestination;
	var startTime;
	var trainFrequency;

	// Submit Button Click Event
	$("#submit-btn").on("click", function(event) {
		event.preventDefault();
		trainName = $("#train-name").val().trim();
		trainDestination = $("#train-destination").val().trim();
		startTime = $("#start-time").val().trim();
		trainFrequency = $("#train-frequency").val().trim();

		database.ref().push({
			name: trainName,
			destination: trainDestination,
			time: startTime,
			frequency: trainFrequency
		});
	});

	database.ref().on("child_added", function(childSnapshot) {
	      var childData = childSnapshot.val();
	      $("#train-rows").append("<tr>" +
	      						  "<td>" + childData.name + "</td>" +
	      						  "<td>" + childData.destination + "</td>" +
	      						  "<td>" + childData.time + "</td>" +
	      						  "</tr>");
	});
});