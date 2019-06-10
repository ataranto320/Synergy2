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
images[0] = 'assets/images/cityHD.jpg';
images[1] = 'assets/images/townHD.jpg';
images[2] = 'assets/images/village.jpg';
images[3] = 'assets/images/beachhouse.jpg';
images[4] = 'assets/images/oldworld.jpg';
images[5] = 'assets/images/southerntrees.jpg';
images[6] = 'assets/images/countryside.jpg';





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
var endYear = "2010";

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
        $("#crime-data").append(`<p class='fbi mx-2 mt-2'>Total of ${count} ${offense} cases reported from ${location} from  ${startYear} to ${endYear}</p></div></div>`);

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
        $("#crime-data").append(`<p class='fbi mx-2 mt-2'>Total of ${count} ${offense} cases reported from ${location} from  ${startYear} to ${endYear}</p>`);

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
        $(".results-card").append(`<div class='card'><div class='card-header text-white bg-primary'>FBI Crime Stats</div><div id="crime-data"class=''card-body text-center> <p class='fbi mx-2 mt-2'>Total of ${count} ${offense} cases reported from ${location} from  ${startYear} to ${endYear}</p></div></div>`);
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

        }).then(function (response) {
            console.log(response);
        })
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
        status: status,
        kids: kids,
        job: job
    }

    console.log(newSearch);

    database.ref().push(newSearch);

    fbiCall();
    fbiCall2();
    fbiCall3();
    zillowCall();

    $("#city").val("");
    $("#age").val("");
    $("#status").val("");
    $("#kids").val("");
})

$(document).ready(function() {
    $("#spinner").hide();
})
