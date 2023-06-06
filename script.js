$(document).ready(function() {
  var timeList = $("#time");
  var currentDay = $('#currentDay');
  var currentHour = dayjs().hour();

  currentDay.text(dayjs().format("MMM DD, YYYY HH:mm a"));
  // Function to update time intervals
  function updateTimeIntervals() {
    var timeSlots = 9; // 8-hour work day has 9 1-hour time slots
    for (var i = 9; i < timeSlots + 9; i++) {
    var hourElement = $('#hour-' + i);
    hourElement.addClass(getTimeClass(i));
    getLocal(i);
    }
  }
  // Function to determine the CSS class for the time slot based on the current hour
  function getTimeClass(hour) {
    if (currentHour < hour) {
      return 'future';
    } else if (currentHour === hour) {
      return 'present';
    } else {
      return 'past';
    }
  }
   // Function to save the input value in local storage
  function saveLocal(event) {
    event.preventDefault();
    var hour = $(this).closest('.time-slot').attr('id').split('-')[1];
    var hourInput = $('#input-' + hour).val();
    localStorage.setItem(hour, hourInput);
  }
 // Function to retrieve the value from local storage and populate the input element
  function getLocal(hour) {
    var hourValue = localStorage.getItem(hour);
    var inputElement = $('#input-' + hour);
    inputElement.val(hourValue);
  }

  updateTimeIntervals();
  $(":button").on("click", saveLocal);
});
