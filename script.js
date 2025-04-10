document.getElementById('training-plan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const raceType = document.getElementById('race-type').value;
    const averageMileage = parseInt(document.getElementById('average-mileage').value);
    const raceWeeks = parseInt(document.getElementById('race-weeks').value);

    // Call function to generate the training plan table
    const trainingPlan = generateTrainingPlan(raceType, averageMileage, raceWeeks);

    // Display the generated plan
    displayTrainingPlan(trainingPlan);
});

function generateTrainingPlan(raceType, averageMileage, raceWeeks) {
    const today = new Date();
    const raceDate = new Date();
    raceDate.setDate(today.getDate() + (raceWeeks * 7));

    const trainingPlanTable = createTrainingPlanTable(today, raceDate, averageMileage, raceType);

    return trainingPlanTable;
}

function createTrainingPlanTable(startDate, endDate, averageMileage, raceType) {
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Week</th>
                    <th>Date</th>
                    <th>Weekly Mileage</th>
                </tr>
            </thead>
            <tbody>
    `;

    let currentDate = new Date(startDate);
    let weekNumber = 1;

    while (currentDate <= endDate) {
        let weekRow = `
            <tr>
                <td>Week ${weekNumber}</td>
                <td>${currentDate.toDateString()}</td>
                <td>${weekNumber === raceWeeks ? raceType : averageMileage} miles</td>
            </tr>
        `;

        tableHTML += weekRow;

        // Move to the next week
        currentDate.setDate(currentDate.getDate() + 7);
        weekNumber++;
    }

    tableHTML += `</tbody></table>`;

    return tableHTML;
}

function displayTrainingPlan(plan) {
    document.getElementById('training-plan-display').innerHTML = plan;
}
