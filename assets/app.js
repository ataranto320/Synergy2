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
var time = 10000;

//img lists

images[0] = 'assets/images/sunset.jpg';
images[1] = 'assets/images/village.jpg';
images[2] = 'assets/images/beachhouse.jpg';
images[3] = 'assets/images/oldworld.jpg';
images[4] = 'assets/images/southerntrees.jpg';
images[5] = 'assets/images/countryside.jpg';
images[6] = 'assets/images/winter.jpg';
images[7] = 'assets/images/townHD.jpg';
images[8] = 'assets/images/cityHD.jpg';




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

// Calls to FBI crime data API
var startYear = "2010";
var endYear = "2017";

function fbiCall3() {
    var offense = 'burglary';
    var location = $("#state").val().trim();
    queryURL = "https://cors-anywhere.herokuapp.com/https://api.usa.gov/crime/fbi/sapi/api/summarized/state/" + location + "/" + offense + "/" + startYear + "/" + endYear + "?api_key=ChwrQihADYg80bXGfi0547Dvxtx511wXFSmx7nYm";
    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function (response) {
        var count = 0;
        console.log(response);
        for (var i = 0; i < response.results.length; i++) {
            count += response.results[i].actual;
        }
        $("#crime-data").append(`<h1 class='fbi mx-2 my-5'>Total of ${count} ${offense} cases reported in ${location} from  ${startYear} to ${endYear}</h1></div></div>`);

    })
}

function fbiCall2() {

    var offense = 'rape';
    var location = $("#state").val().trim();
    queryURL = "https://cors-anywhere.herokuapp.com/https://api.usa.gov/crime/fbi/sapi/api/summarized/state/" + location + "/" + offense + "/" + startYear + "/" + endYear + "?api_key=ChwrQihADYg80bXGfi0547Dvxtx511wXFSmx7nYm";

    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function (response) {
        var count = 0;
        console.log(response);
        for (var i = 0; i < response.results.length; i++) {
            count += response.results[i].actual;
        }
        $("#crime-data").append(`<h1 class='fbi mx-2 my-5'>Total of ${count} ${offense} cases reported in ${location} from  ${startYear} to ${endYear}</h1>`);

    })
}

function fbiCall() {
    $("#spinner").show();
    var offense = 'homicide';
    var location = $("#state").val().trim();
    queryURL = "https://cors-anywhere.herokuapp.com/https://api.usa.gov/crime/fbi/sapi/api/summarized/state/" + location + "/" + offense + "/" + startYear + "/" + endYear + "?api_key=ChwrQihADYg80bXGfi0547Dvxtx511wXFSmx7nYm";

    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function (response) {
        var count = 0;
        console.log(response);
        for (var i = 0; i < response.results.length; i++) {
            count += response.results[i].actual;
        }
        $(".results-card").append(`<div class='card'><div class='card-header text-white bg-primary'>FBI Crime Data Explorer</div><div id="crime-data"class=''card-body text-center> <h1 class='fbi mx-2 my-5'>Total of ${count} ${offense} cases reported in ${location} from  ${startYear} to ${endYear}</h1></div></div>`);
        $("#spinner").hide();
    })
}

// Zillow API call

function zillowCall() {
    var location = $("#state").val().trim();
    var apiKey = "X1-ZWz1h4nz2xuyvf_aovt1";
    queryURL = "https://cors-anywhere.herokuapp.com/http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1h4nz2xuyvf_aovt1&state=NY&output='json'";

    $.ajax({
        url: queryURL,
        method: "GET",
        // dataType: 'jsonp'

    }).then(function (response) {
        console.log(response);
    })
}

function clear() {
   $('.results-card').empty(); 
}


$(document).on("click", "#search", function (event) {

    event.preventDefault();

    harp.play();
    var state = $("#state").val().trim();
    var age = $("#age").val().trim();
    var status = $("#status").val().trim();
    var kids = $("#kids").val().trim();
    var job = $("#job").val().trim();


    var newSearch = {
        state: state,
        age: age,
        mstatus: status,
        kids: kids,
        job: job
    }

    console.log(newSearch);


    database.ref().push(newSearch);

    $(".results-card").append(`<div class='jumbotron bg-primary text-white col-6'><p class=''>Your Profile</p><p>You are ${age} years old</p><p>You are ${status}</p><p>You have ${kids} children</p><p>You have are a ${job} individual</p><p>Your desired state to live is ${state}</p></div>`);

    fbiCall();
    fbiCall2();
    fbiCall3();
    zillowCall();


    // $("#age").val("");
    // $("#state").val("");
    // $("#status").val("");
    // $("#kids").val("");
    // $("#job").val("");

})

$(document).ready(function () {
    $("#spinner").hide();
})

$(document).on("click", "#clear", clear);