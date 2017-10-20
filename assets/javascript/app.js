$(document).ready( function() {

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

		console.log("Train Name: " + trainName)
		console.log("Train Destination: " + trainDestination)
		console.log("Start Time: " + startTime)
		console.log("Train Frequency: " + trainFrequency)
	});
});