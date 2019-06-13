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
function getJob(job) {
    var apiKey = 'p7OF5vJVdOLJTzaO62kztnOMVmkGF6Nlt+fL0ThZRtg=';

    $.ajax({
        url: 'https://data.usajobs.gov/api/Search?PositionTitle=' + job,
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

//College API
$( "#form" ).submit(function( event ) {
    event.preventDefault();
    var name = $( "#state" ).val()
    ajaxCall(name);
});

function getSchool(name) {
    var queryURL = "http://api.data.gov/ed/collegescorecard/v1/schools?school.state=" + name + "&fields=school.name,school.city,school.school_url,school.price_calculator_url" + "&api_key=ugQuY3Rxl5tYqCXMIvIGfUGbL5t3hMrSFNlo5NBb";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response); {
            var len = 5 //response.results.length for all results //number
            for (var i = 0; i < len; i++){
                var schoolObject = response.results[i]
                $("#school-results").append("<p>" + schoolObject["school.name"])
                $("#school-results").append("<p>" + schoolObject["school.city"])
                $("#school-results").append("<p>" + schoolObject["school.school_url"])
                $("#school-results").append("<p>" + schoolObject["school.price_calculator_url"])

                //smaller text size
                // function smallText(){
                //     document.getElementById("#school-results").style.fontSize = "xx-small";

                // $("#slide").fadeOut("slow");
                }

            }
        
        
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
    getJob(position);
    getSchool(state);

    $("#city").val("");
    $("#age").val("");
    $("#status").val("");
    $("#kids").val("");
    $('#job').val("");

})

$(document).ready(function () {
    $(".results-card").hide();

    // $( "#form" ).submit(function( event ) {
    //     event.preventDefault();
    //     var name = $( "#state" ).val()
    //     getSchool(name);
    // });

    // function getSchool(name) {
    //     var queryURL = "http://api.data.gov/ed/collegescorecard/v1/schools?school.state=" + name + "&fields=school.name,school.city,school.school_url" + "&api_key=ugQuY3Rxl5tYqCXMIvIGfUGbL5t3hMrSFNlo5NBb";
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function(response){
    //         console.log(response.results);
    //     });
    // } 

    // $(changeImg(){
    //     images = $("#slide").hide();
    //     var current = 0;
    //     setInterval(function({
    //         var next = ((current + 1) % images.length);
    //         images.eq(current).fadeOut();
    //         images.eq(next).fadeIn();
    //         current = next;
    //     }));
    // });

    // slide fade effect 
    // var current = 0,
    // // slides = document.getElementById("slide");

    // setInterval(function(){
    //     for (var i = 0; i < images.length; i++){
    //         images[i].style.opacity = 0;
    //     }
    //     current =(current != images.length - 1) ?
    //     current + 1 : 0;
    //     images[current].style.opacity = 1;
    // }, 5000);

    // var links = schoolObject.links;
    // for (var i = 0; i < links.length; i++) {
    //     var linkHref = 
    // }
})