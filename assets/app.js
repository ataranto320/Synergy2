// Code to set up Firebase

var firebaseConfig = {
    apiKey: "AIzaSyAUCTldkF68TYkegKmB2Sl6dF1xcGBq-y0",
    authDomain: "bird-box-6d171.firebaseapp.com",
    databaseURL: "https://bird-box-6d171.firebaseio.com",
    projectId: "bird-box-6d171",
    storageBucket: "bird-box-6d171.appspot.com",
    messagingSenderId: "812439535096",
    appId: "1:812439535096:web:8b5cf3ccbc3413d0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


var harp = new Audio("assets/Harp-sound-effect.mp3");


// start point
var i = 0;
var images = [];
var time = 5000;

//img lists
images[0] = 'assets/images/city.jpg';
images[1] = 'assets/images/town.jpg';
images[2] = 'assets/images/village.jpg';
images[3] = 'assets/images/beachhouse.jpg';
images[4] = 'assets/images/oldworld.jpg';

//change img
function changeImg() {
    document.getElementById("slide").setAttribute("src", images[i]);
    if (i < images.length - 1) {
        i++;
    } else {
        i = 0;
    }

    setTimeout("changeImg()", time);
}

window.onload = changeImg;

function logResults(json) {
    console.log(json);
}


function fbiCall() {
    $(".results-card").show();
    var location = $("#state").val().trim();
    queryURL = "https://cors-anywhere.herokuapp.com/http://api.usa.gov/crime/fbi/sapi/api/summarized/state/" + location + "/burglary/2005/2012?api_key=ChwrQihADYg80bXGfi0547Dvxtx511wXFSmx7nYm";

    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function (response) {
        console.log(response.results);
        for (var i = 0; i < response.results.length; i++) {
            $("#crime-results").append("<p>") + response.results[i];
        }
    })
}

//USA Jobs API
function getJob() {
    var apiKey = 'p7OF5vJVdOLJTzaO62kztnOMVmkGF6Nlt+fL0ThZRtg=';
    var position = $("#job").val().trim();
    var state = $("#state").val().trim();

    $.ajax({
        url: 'https://data.usajobs.gov/api/Search?LocationName=' + state + '&PositionTitle=' + position,
        method: 'GET',
        headers: {
            "Authorization-Key": apiKey
        }
    }).then(function (response) {
        console.log(response);
        console.log(response.SearchResult.SearchResultCountAll);
        console.log(response.SearchResult.SearchResultItems[0]);
        $("#job-results").append("<p>" + response.SearchResult.SearchResultCountAll + "</p>");
    });
}


$(document).on("click", "#search", function (event) {
    event.preventDefault();
    harp.play();
    var state = $("#state").val().trim();
    var age = $("#age").val().trim();
    var status = $("#status").val().trim();
    var kids = $("#kids").val().trim();
    var position = $("#job").val().trim();

    var newSearch = {
        state: state,
        age: age,
        status: status,
        kids: kids,
        position: position
    }

    console.log(newSearch);

    database.ref().push(newSearch);

    fbiCall();
    getJob();

    $("#city").val("");
    $("#age").val("");
    $("#status").val("");
    $("#kids").val("");
    $('#job').val("");

})

$(document).ready(function () {
    $(".results-card").hide();
})