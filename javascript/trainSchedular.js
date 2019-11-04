
var firebaseConfig = {
    apiKey: "AIzaSyD2brbPibssmTgEIWG5SYmbDhPa7tOf_YQ",
    authDomain: "trainschedular-3c29f.firebaseapp.com",
    databaseURL: "https://trainschedular-3c29f.firebaseio.com",
    projectId: "trainschedular-3c29f",
    storageBucket: "trainschedular-3c29f.appspot.com",
    messagingSenderId: "184354036566",
    appId: "1:184354036566:web:84090c39b5a2cf13c314f7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let database = firebase.database()
  let trains = new Array()
  
$(document).ready(function() {
    $('#addTrainButton').click(function() {
        $('#exampleModal').modal('show')
    })
    database.ref('/trains').on('value', function(snap) {
        snap.forEach(element => {
            let startHours = parseInt (element.val().startsAt.split(":")[0].trim())
            let startMinutes = parseInt (element.val().startsAt.split(":")[1].trim())
            let totalStartMinutes = startHours * 60 + startMinutes
            
            let currentHours = parseInt (moment().hour())
            let currentMinutes = parseInt (moment().minute())
            let totalCurrentMinutes = currentHours * 60 + currentMinutes
            while(totalStartMinutes < totalCurrentMinutes) {
                totalStartMinutes = totalStartMinutes + element.val().frequency
            }
            if (!trains.includes({
                trainName: element.val().trainName,
                destination: element.val().destination,
                arrivesIn: (totalStartMinutes - totalCurrentMinutes)
            })) {
                trains.push({
                    trainName: element.val().trainName,
                    destination: element.val().destination,
                    arrivesIn: (totalStartMinutes - totalCurrentMinutes)
                })
            }
        })
        trains.sort((a, b) => (a.arrivesIn > b.arrivesIn) ? 1 : -1)
       displayTable()
    })
})

function displayTable() {
    for(let i=0; i<trains.length; i++) {
        let trainName = $('<td>' + trains[i].trainName + '</td>')
        let frequency = $('<td>' + trains[i].arrivesIn + ' Minutes</td>')
        let destination = $('<td>' + trains[i].destination + '</td>')
        let row = $('<tr>')
        row.append(trainName)
        row.append(destination)
        row.append(frequency)
        $('#table').append(row)
    }
}

$(function () {
    $('#datetimepicker1').datetimepicker({
        viewMode: 'times',
        format: 'HH:mm'
    });

    $('.dropdown-toggle').dropdown()

    $('.dropdown-item').click(function() {
        $('#dropDownButton').text(this.textContent)
    })

    $('#submitButton').click(function() {
        let string = $('#dropDownButton').text()
        let frequency = -1
        if(string === "30 Minutes") {
            frequency = 30
        } else if (string === "1 Hour") {
            frequency = 60
        } else if (string === "2 Hours") {
            frequency = 120
        } else if (string === "12 Hours") {
            frequency = 720
        } else if (string === "24 Hours") {
            frequency = 1440
        }
        firebase.database().ref('/trains').push({
            trainName: $('#train-name').val(),
            destination: $('#destination-name').val(),
            startsAt: $('#date-text').val(),
            frequency: frequency
        })
    })
});