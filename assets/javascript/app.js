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

	// New Train Information
	var trainName;
	var trainDestination;
	var startTime;
	var trainFrequency;

	// Refresh Button
	$("#refresh-btn").click(function() {
    	location.reload();
	});

	// Submit Button
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

	// Data Retrieval
	database.ref().on("child_added", function(childSnapshot) {
	    var childData = childSnapshot.val();
	    var trainName = childData.name
	    var trainDestination = childData.destination
	    var startTime = childData.time
	    var trainFrequency = childData.frequency

		var startTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");

    	var currentTime = moment();

	    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

	    var tRemainder = diffTime % trainFrequency;

	    var tMinutesTillTrain = trainFrequency - tRemainder;

	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

	    // Display in the Table
	    $("#train-rows").append("<tr>" +
	      						"<td>" + trainName + "</td>" +
	      						"<td>" + trainDestination + "</td>" +
	      						"<td>" + trainFrequency + " minutes" + "</td>" +
	      						"<td>" + moment(nextTrain).format("HH:mm") + "</td>" +
	      						"<td>" + tMinutesTillTrain + " minutes" + "</td>" +
	      						"</tr>");
	});
});