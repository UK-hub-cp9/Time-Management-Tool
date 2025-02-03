/* script.js */

// Wait for the DOM content to load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the form and result div
    const timeForm = document.getElementById('timeForm');
    const resultDiv = document.getElementById('result');

    // Add an event listener to handle form submission
    timeForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Retrieve values from the form inputs
        const role = document.getElementById('role').value;
        const sleepHours = parseFloat(document.getElementById('sleepHours').value);
        const eatingHours = parseFloat(document.getElementById('eatingHours').value);
        const travelHours = parseFloat(document.getElementById('travelHours').value);
        const leisureHours = parseFloat(document.getElementById('leisureHours').value);
        const goalSpan = parseInt(document.getElementById('goalSpan').value);
        const timeUnit = document.getElementById('timeUnit').value;

        // Calculate total non-working hours per day
        const nonWorkingHoursPerDay = sleepHours + eatingHours + travelHours + leisureHours;

        // Total hours in a day
        const totalHoursPerDay = 24;

        // Calculate available working hours per day
        const workingHoursPerDay = totalHoursPerDay - nonWorkingHoursPerDay;

        // Convert goal span to days
        let totalDays;
        if (timeUnit === 'days') {
            totalDays = goalSpan;
        } else if (timeUnit === 'weeks') {
            totalDays = goalSpan * 7;
        } else if (timeUnit === 'months') {
            totalDays = goalSpan * 30; // Approximating a month as 30 days
        }

        // Calculate total available working hours
        const totalWorkingHours = workingHoursPerDay * totalDays;

        //comparison days for understanding
        const CompDays = 24 * totalDays;

        // Calculate total working days (excluding weekends if applicable)
        let workingDays = totalDays;
        if (role === 'employee') {
            // Assuming employees have weekends off
            const weeks = totalDays / 7;
            const weekendDays = Math.floor(weeks) * 2;
            workingDays = totalDays - weekendDays;
        }

        // Recalculate total working hours based on working days
        const adjustedTotalWorkingHours = workingHoursPerDay * workingDays;

        // Prepare the result message
        let resultMessage = `
            <p>As a <strong>${role}</strong>, over a period of <strong>${goalSpan} ${timeUnit}</strong>:</p>
            <ul>
                <li>Total Hours: <strong>${CompDays.toFixed(2)} hours</strong></li><br>
                <li>Total Available Working Hours: <strong>${adjustedTotalWorkingHours.toFixed(2)} hours</strong></li>
            </ul>
            <p>Make the most of your time to achieve your goals!</p>
        `;

        // Display the result on the webpage
        resultDiv.innerHTML = resultMessage;
    });
});
