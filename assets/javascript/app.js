$(document).ready( function() {

	// Initialize Firebase
	var config = {
	    apiKey: "AIzaSyB8hx1F9ar1GsikbMCFw1lK7k61lnAvxjQ",
	    authDomain: "firstdatabase-83848.firebaseapp.com",
	    databaseURL: "https://firstdatabase-83848.firebaseio.com",
	    storageBucket: "firstdatabase-83848.appspot.com"
	};
	
	firebase.initializeApp(config);;
	var database = firebase.database();

	// Empty variables for data transfer
	var trainName;
	var trainDestination;
	var startTime;
	var trainFrequency;

	// Refresh Button
	$("#refresh-btn").click(function() {
    	location.reload();
	});

	// Delete button removes a train
	$("body").on("click", ".del-btn", function() {
		//From the table
		var rowId = $(this).closest("tr").children("td:first").text();
		$(this).closest("tr").remove();

		//And from the database
		var dataKey
		database.ref().orderByChild("name").equalTo(rowId).on("child_added", function(snapshot) {
  			dataKey = snapshot.key;
		});
		database.ref().child(dataKey).remove();
	});

	// Submit Button
	$("#submit-btn").on("click", function(event) {
		event.preventDefault();

		// Extract data from the web form
		trainName = $("#train-name").val().trim();
		trainDestination = $("#train-destination").val().trim();
		startTime = $("#start-time").val().trim();
		trainFrequency = $("#train-frequency").val().trim();

		// Reset form after submission
		$("#train-form").trigger("reset");

		// Send Data to Firebase
		database.ref().push({
			name: trainName,
			destination: trainDestination,
			time: startTime,
			frequency: trainFrequency
		});
	});

	// Data Retrieval
	database.ref().on("child_added", function(childSnapshot) {

		// Get the latest train information after any updates
	    var childData = childSnapshot.val();
	    var trainName = childData.name;
	    var trainDestination = childData.destination;
	    var startTime = childData.time;
	    var trainFrequency = childData.frequency;

	    // Moment.JS time calculations
		var startTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
    	var currentTime = moment();
	    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
	    var tRemainder = diffTime % trainFrequency;
	    var tMinutesTillTrain = trainFrequency - tRemainder;
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

	    // Display latest train information in the table
	    $("#train-rows").append("<tr train='" + trainName + "'>" +
	      						"<td>" + trainName + "</td>" +
	      						"<td>" + trainDestination + "</td>" +
	      						"<td>" + trainFrequency + " minutes" + "</td>" +
	      						"<td>" + moment(nextTrain).format("hh:mm a") + "</td>" +
	      						"<td>" + tMinutesTillTrain + " minutes" + "</td>" +
	      						"<td><i class='fa fa-window-close del-btn' aria-hidden='true'></i>" + "</td>" +
	      						"</tr>");
	});

	// Remove any train that was deleted from the database
	database.ref().on("child_removed", function(childSnapshot) {
		var deletedTrain = childSnapshot.val();
		var deletedName = deletedTrain.name;
		$("[train='"+ deletedName + "']").remove();
	});
});