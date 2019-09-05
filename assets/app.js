// Code to set up Firebase
console.log('hello');
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
var time = 8000;

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
    var img = document.getElementById("slide")
    img.setAttribute("src", images[i]);
    img.className = "fadeIn";
    if (i < images.length - 1) {
        i++;
    } else {
        i = 0;
    }

    setTimeout(function () {
        img.className = "fadeOut";
    }, 4000);

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


function clear() {
    $('.results-card').empty();
}



//USA Jobs API
function getJob() {
    var apiKey = "p7OF5vJVdOLJTzaO62kztnOMVmkGF6Nlt+fL0ThZRtg=";
    var position = $("#job").val().trim();
    var state = $("#state").val().trim();

    $.ajax({
        url: "https://data.usajobs.gov/api/Search?LocationName=" + state + "&PositionTitle=" + position,
        method: "GET",
        headers: {
            "Authorization-Key": apiKey
        }
    }).then(function (response) {
        console.log(response);
        console.log(response.SearchResult.SearchResultItems[0]);
        $("#position").append(`<div class='card mb-2'><div class='card-header text-white bg-dark'>USA Jobs Data </div><div class='card-body'><p>There are a total of ${response.SearchResult.SearchResultCountAll} ${position} jobs in the state of ${state}</p></div></div>`);
    });
}


//College API

function getSchool(name) {
    var queryURL = "https://api.data.gov/ed/collegescorecard/v1/schools?school.state=" + name + "&fields=school.name,school.city,school.school_url,school.price_calculator_url" + "&api_key=ugQuY3Rxl5tYqCXMIvIGfUGbL5t3hMrSFNlo5NBb";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response); {
            var len = 5 //response.results.length for all results //number
            for (var i = 0; i < len; i++) {
                var schoolObject = response.results[i];
                var price = schoolObject["school.price_calculator_url"]
                var school = schoolObject["school.school_url"]
                $("#colleges").append(`<div class='card mb-3'><div class='card-header text-white'>College - University, City, Website & Tuition</div><div class='card-body'><p>${schoolObject["school.name"]}</p><p>${schoolObject["school.city"]}</p><a href='${school}'>University Website</a><br><br><a href='${price}'>Tuition Price</a></div></div>`);
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
    var job = $("#job-status").val().trim();
    var position = $("#job").val().trim();

    var newSearch = {
        state: state,
        age: age,
        mstatus: status,
        kids: kids,
        job: job,
        position: position
    }

    console.log(newSearch);


    database.ref().push(newSearch);

    $(".results-card").append(`<div class='card text-white mb-3'><div class='card-header'>Your Profile</div><div class='card-body bg-white'><p>You are ${age} years old</p><p>You are ${status}</p><p>You have ${kids} children</p><p>You have are a ${job} individual</p><p>Your desired state to live is ${state}</p></div></div>`);

    getSchool(state);
    fbiCall();
    fbiCall2();
    fbiCall3();
    getJob();

    // $("#city").val("");
    // $("#age").val("");
    // $("#status").val("");
    // $("#kids").val("");
    // $('#job').val("");

})



$(document).on("click", "#clear", clear);



// *****************************************************************************
// Future possible code



// Zillow API call

// function zillowCall() {
//     var location = $("#state").val().trim();
//     var apiKey = "X1-ZWz1h4nz2xuyvf_aovt1";
//     queryURL = "https://cors-anywhere.herokuapp.com/http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1h4nz2xuyvf_aovt1&state=NY&output='json'";

//     $.ajax({
//         url: queryURL,
//         method: "GET",
//         // dataType: 'jsonp'

//     }).then(function (response) {
//         console.log(response);
//     })
// }

// // Changes XML to JSON
// // Modified version from here: http://davidwalsh.name/convert-xml-json
// function xmlToJson(xml) {

//     // Create the return object
//     var obj = {};

//     if (xml.nodeType == 1) { // element
//         // do attributes
//         if (xml.attributes.length > 0) {
//             obj["@attributes"] = {};
//             for (var j = 0; j < xml.attributes.length; j++) {
//                 var attribute = xml.attributes.item(j);
//                 obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
//             }
//         }
//     } else if (xml.nodeType == 3) { // text
//         obj = xml.nodeValue;
//     }

//     // do children
//     // If just one text node inside
//     if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
//         obj = xml.childNodes[0].nodeValue;
//     }
//     else if (xml.hasChildNodes()) {
//         for (var i = 0; i < xml.childNodes.length; i++) {
//             var item = xml.childNodes.item(i);
//             var nodeName = item.nodeName;
//             if (typeof (obj[nodeName]) == "undefined") {
//                 obj[nodeName] = xmlToJson(item);
//             } else {
//                 if (typeof (obj[nodeName].push) == "undefined") {
//                     var old = obj[nodeName];
//                     obj[nodeName] = [];
//                     obj[nodeName].push(old);
//                 }
//                 obj[nodeName].push(xmlToJson(item));
//             }
//         }
//     }
//     return obj;
// }






// Code to set up Firebase
// console.log('hello');
// var firebaseConfig = {
//     apiKey: "AIzaSyAUCTldkF68TYkegKmB2Sl6dF1xcGBq-y0",
//     authDomain: "bird-box-6d171.firebaseapp.com",
//     databaseURL: "https://bird-box-6d171.firebaseio.com",
//     projectId: "bird-box-6d171",
//     storageBucket: "bird-box-6d171.appspot.com",
//     messagingSenderId: "812439535096",
//     appId: "1:812439535096:web:8b5cf3ccbc3413d0"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// var database = firebase.database();


// var harp = new Audio("assets/Harp-sound-effect.mp3");


// // start point
// var i = 0;
// var images = [];
// var time = 8000;

//img lists

// images[0] = 'assets/images/sunset.jpg';
// images[1] = 'assets/images/village.jpg';
// images[2] = 'assets/images/beachhouse.jpg';
// images[3] = 'assets/images/oldworld.jpg';
// images[4] = 'assets/images/southerntrees.jpg';
// images[5] = 'assets/images/countryside.jpg';
// images[6] = 'assets/images/winter.jpg';
// images[7] = 'assets/images/townHD.jpg';
// images[8] = 'assets/images/cityHD.jpg';




//change img
// function changeImg() {
//     var img = document.getElementById("slide")
//     img.setAttribute("src", images[i]);
//     img.className = "fadeIn";
//     if (i < images.length - 1) {
//         i++;
//     } else {
//         i = 0;
//     }

//     setTimeout(function () {
//         img.className = "fadeOut";
//     }, 4000);

//     setTimeout("changeImg()", time);
// }

// window.onload = changeImg;

// Calls to FBI crime data API
// var startYear = "2010";
// var endYear = "2017";

// function fbiCall3() {
//     var offense = 'burglary';
//     var location = $("#state").val().trim();
//     queryURL = "https://cors-anywhere.herokuapp.com/https://api.usa.gov/crime/fbi/sapi/api/summarized/state/" + location + "/" + offense + "/" + startYear + "/" + endYear + "?api_key=ChwrQihADYg80bXGfi0547Dvxtx511wXFSmx7nYm";
//     $.ajax({
//         url: queryURL,
//         method: "GET",

//     }).then(function (response) {
//         var count = 0;
//         console.log(response);
//         for (var i = 0; i < response.results.length; i++) {
//             count += response.results[i].actual;
//         }
//         $("#crime-data").append(`<h1 class='fbi mx-2 my-5'>Total of ${count} ${offense} cases reported in ${location} from  ${startYear} to ${endYear}</h1></div></div>`);

//     })
// }

// function fbiCall2() {

//     var offense = 'rape';
//     var location = $("#state").val().trim();
//     queryURL = "https://cors-anywhere.herokuapp.com/https://api.usa.gov/crime/fbi/sapi/api/summarized/state/" + location + "/" + offense + "/" + startYear + "/" + endYear + "?api_key=ChwrQihADYg80bXGfi0547Dvxtx511wXFSmx7nYm";

//     $.ajax({
//         url: queryURL,
//         method: "GET",

//     }).then(function (response) {
//         var count = 0;
//         console.log(response);
//         for (var i = 0; i < response.results.length; i++) {
//             count += response.results[i].actual;
//         }
//         $("#crime-data").append(`<h1 class='fbi mx-2 my-5'>Total of ${count} ${offense} cases reported in ${location} from  ${startYear} to ${endYear}</h1>`);

//     })
// }

// function fbiCall() {
//     $("#spinner").show();
//     var offense = 'homicide';
//     var location = $("#state").val().trim();
//     queryURL = "https://cors-anywhere.herokuapp.com/https://api.usa.gov/crime/fbi/sapi/api/summarized/state/" + location + "/" + offense + "/" + startYear + "/" + endYear + "?api_key=ChwrQihADYg80bXGfi0547Dvxtx511wXFSmx7nYm";

//     $.ajax({
//         url: queryURL,
//         method: "GET",

//     }).then(function (response) {
//         var count = 0;
//         console.log(response);
//         for (var i = 0; i < response.results.length; i++) {
//             count += response.results[i].actual;
//         }
//         $(".results-card").append(`<div class='card'><div class='card-header text-white bg-primary'>FBI Crime Data Explorer</div><div id="crime-data"class=''card-body text-center> <h1 class='fbi mx-2 my-5'>Total of ${count} ${offense} cases reported in ${location} from  ${startYear} to ${endYear}</h1></div></div>`);
//         $("#spinner").hide();
//     })
// }


// function clear() {
//     $('.results-card').empty();
// }



//USA Jobs API
// function getJob() {
//     var apiKey = "p7OF5vJVdOLJTzaO62kztnOMVmkGF6Nlt+fL0ThZRtg=";
//     var position = $("#job").val().trim();
//     var state = $("#state").val().trim();

//     $.ajax({
//         url: "https://data.usajobs.gov/api/Search?LocationName=" + state + "&PositionTitle=" + position,
//         method: "GET",
//         headers: {
//             "Authorization-Key": apiKey
//         }
//     }).then(function (response) {
//         console.log(response);
//         console.log(response.SearchResult.SearchResultItems[0]);
//         $("#job-results").append(`<p> ${response.SearchResult.SearchResultCountAll} </p>`);
//     });
// }


//College API
// $( "#form" ).submit(function( event ) {
//     event.preventDefault();
//     var name = $( "#state" ).val()
//     ajaxCall(name);
//  });

// function getSchool(name) {
//     var queryURL = "http://api.data.gov/ed/collegescorecard/v1/schools?school.state=" + name + "&fields=school.name,school.city,school.school_url,school.price_calculator_url" + "&api_key=ugQuY3Rxl5tYqCXMIvIGfUGbL5t3hMrSFNlo5NBb";

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response); {
//             var len = 5 //response.results.length for all results //number
//             for (var i = 0; i < len; i++) {
//                 var schoolObject = response.results[i]
//                 var price = schoolObject["school.price_calculator_url"]
//                 var school = schoolObject["school.school_url"]
//                 $("#school-results").append("<p>" + schoolObject["school.name"])
//                 $("#school-results").append("<p>" + schoolObject["school.city"])
//                 $("#school-results").append('<a href="' + school + '">' + "University Website" + '</a>' + "<br>" + "<br>")
//                 $("#school-results").append('<a href="' + price + '">' + "Tuition Price" + '</a>')
//             }
//         }
//     });
// }

// $(document).on("click", "#search", function (event) {

//     event.preventDefault();

//     harp.play();
//     var state = $("#state").val().trim();
//     console.log(state);
//     var age = $("#age").val().trim();
//     var status = $("#status").val().trim();
//     var kids = $("#kids").val().trim();
//     var job = $("#job-status").val().trim();
//     var position = $("#job").val().trim();

//     var newSearch = {
//         state: state,
//         age: age,
//         mstatus: status,
//         kids: kids,
//         job: job,
//         position: position
//     }

//     console.log(newSearch);


//     database.ref().push(newSearch);

    // $(".results-card").append(`<div class='jumbotron bg-primary text-white col-6'><p class=''>Your Profile</p><p>You are ${age} years old</p><p>You are ${status}</p><p>You have ${kids} children</p><p>You have are a ${job} individual</p><p>Your desired state to live is ${state}</p></div>`);

    // getSchool(state);
    // fbiCall();
    // fbiCall2();
    // fbiCall3();
    // getJob();

    // $("#city").val("");
    // $("#age").val("");
    // $("#status").val("");
    // $("#kids").val("");
    // $('#job').val("");

// })



// $(document).ready(function () {
//     $("#spinner").hide();
// })


// $(document).on("click", "#clear", clear);



// *****************************************************************************
// Future possible code



// Zillow API call

// function zillowCall() {
//     var location = $("#state").val().trim();
//     var apiKey = "X1-ZWz1h4nz2xuyvf_aovt1";
//     queryURL = "https://cors-anywhere.herokuapp.com/http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1h4nz2xuyvf_aovt1&state=NY&output='json'";

//     $.ajax({
//         url: queryURL,
//         method: "GET",
//         // dataType: 'jsonp'

//     }).then(function (response) {
//         console.log(response);
//     })
// }

// // Changes XML to JSON
// // Modified version from here: http://davidwalsh.name/convert-xml-json
// function xmlToJson(xml) {

//     // Create the return object
//     var obj = {};

//     if (xml.nodeType == 1) { // element
//         // do attributes
//         if (xml.attributes.length > 0) {
//             obj["@attributes"] = {};
//             for (var j = 0; j < xml.attributes.length; j++) {
//                 var attribute = xml.attributes.item(j);
//                 obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
//             }
//         }
//     } else if (xml.nodeType == 3) { // text
//         obj = xml.nodeValue;
//     }

//     // do children
//     // If just one text node inside
//     if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
//         obj = xml.childNodes[0].nodeValue;
//     }
//     else if (xml.hasChildNodes()) {
//         for (var i = 0; i < xml.childNodes.length; i++) {
//             var item = xml.childNodes.item(i);
//             var nodeName = item.nodeName;
//             if (typeof (obj[nodeName]) == "undefined") {
//                 obj[nodeName] = xmlToJson(item);
//             } else {
//                 if (typeof (obj[nodeName].push) == "undefined") {
//                     var old = obj[nodeName];
//                     obj[nodeName] = [];
//                     obj[nodeName].push(old);
//                 }
//                 obj[nodeName].push(xmlToJson(item));
//             }
//         }
//     }
//     return obj;
// }



// // Code to set up Firebase

// var firebaseConfig = {
//     apiKey: "AIzaSyAUCTldkF68TYkegKmB2Sl6dF1xcGBq-y0",
//     authDomain: "bird-box-6d171.firebaseapp.com",
//     databaseURL: "https://bird-box-6d171.firebaseio.com",
//     projectId: "bird-box-6d171",
//     storageBucket: "bird-box-6d171.appspot.com",
//     messagingSenderId: "812439535096",
//     appId: "1:812439535096:web:8b5cf3ccbc3413d0"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// var database = firebase.database();


// var harp = new Audio("assets/Harp-sound-effect.mp3");


// // start point
// var i = 0;
// var images = [];
// var time = 8000;

// //img lists

// images[0] = 'assets/images/sunset.jpg';
// images[1] = 'assets/images/village.jpg';
// images[2] = 'assets/images/beachhouse.jpg';
// images[3] = 'assets/images/oldworld.jpg';
// images[4] = 'assets/images/southerntrees.jpg';
// images[5] = 'assets/images/countryside.jpg';
// images[6] = 'assets/images/winter.jpg';
// images[7] = 'assets/images/townHD.jpg';
// images[8] = 'assets/images/cityHD.jpg';




// //change img
// function changeImg() {
//     var img = document.getElementById("slide")
//     img.setAttribute("src", images[i]);
//     img.className = "fadeIn";
//     if (i < images.length - 1) {
//         i++;
//     } else {
//         i = 0;
//     }

//     setTimeout(function() {
//         img.className = "fadeOut";
//     }, 4000);

//     setTimeout("changeImg()", time);
// }

// window.onload = changeImg;

// // Calls to FBI crime data API
// var startYear = "2010";
// var endYear = "2017";

// function fbiCall3() {
//     var offense = 'burglary';
//     var location = $("#state").val().trim();
//     queryURL = "https://cors-anywhere.herokuapp.com/https://api.usa.gov/crime/fbi/sapi/api/summarized/state/" + location + "/" + offense + "/" + startYear + "/" + endYear + "?api_key=ChwrQihADYg80bXGfi0547Dvxtx511wXFSmx7nYm";
//     $.ajax({
//         url: queryURL,
//         method: "GET",

//     }).then(function (response) {
//         var count = 0;
//         console.log(response);
//         for (var i = 0; i < response.results.length; i++) {
//             count += response.results[i].actual;
//         }
//         $("#crime-data").append(`<h1 class='fbi mx-2 my-5'>Total of ${count} ${offense} cases reported in ${location} from  ${startYear} to ${endYear}</h1></div></div>`);

//     })
// }

// function fbiCall2() {

//     var offense = 'rape';
//     var location = $("#state").val().trim();
//     queryURL = "https://cors-anywhere.herokuapp.com/https://api.usa.gov/crime/fbi/sapi/api/summarized/state/" + location + "/" + offense + "/" + startYear + "/" + endYear + "?api_key=ChwrQihADYg80bXGfi0547Dvxtx511wXFSmx7nYm";

//     $.ajax({
//         url: queryURL,
//         method: "GET",

//     }).then(function (response) {
//         var count = 0;
//         console.log(response);
//         for (var i = 0; i < response.results.length; i++) {
//             count += response.results[i].actual;
//         }
//         $("#crime-data").append(`<h1 class='fbi mx-2 my-5'>Total of ${count} ${offense} cases reported in ${location} from  ${startYear} to ${endYear}</h1>`);

//     })
// }

// function fbiCall() {
//     $("#spinner").show();
//     var offense = 'homicide';
//     var location = $("#state").val().trim();
//     queryURL = "https://cors-anywhere.herokuapp.com/https://api.usa.gov/crime/fbi/sapi/api/summarized/state/" + location + "/" + offense + "/" + startYear + "/" + endYear + "?api_key=ChwrQihADYg80bXGfi0547Dvxtx511wXFSmx7nYm";

//     $.ajax({
//         url: queryURL,
//         method: "GET",

//     }).then(function (response) {
//         var count = 0;
//         console.log(response);
//         for (var i = 0; i < response.results.length; i++) {
//             count += response.results[i].actual;
//         }
//         $(".results-card").append(`<div class='card'><div class='card-header text-white bg-primary'>FBI Crime Data Explorer</div><div id="crime-data"class=''card-body text-center> <h1 class='fbi mx-2 my-5'>Total of ${count} ${offense} cases reported in ${location} from  ${startYear} to ${endYear}</h1></div></div>`);
//         $("#spinner").hide();
//     })
// }


// // Zillow API call

// function zillowCall() {
//     var location = $("#state").val().trim();
//     var apiKey = "X1-ZWz1h4nz2xuyvf_aovt1";
//     queryURL = "https://cors-anywhere.herokuapp.com/http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1h4nz2xuyvf_aovt1&state=NY&output='json'";

//     $.ajax({
//         url: queryURL,
//         method: "GET",
//         // dataType: 'jsonp'

//     }).then(function (response) {
//         console.log(response);
//         var zillowObj  = xmlToJson(response);
//         console.log(zillowObj);
//     })
// }

// // Changes XML to JSON
// // Modified version from here: http://davidwalsh.name/convert-xml-json
// function xmlToJson(xml) {

//     // Create the return object
//     var obj = {};

//     if (xml.nodeType == 1) { // element
//         // do attributes
//         if (xml.attributes.length > 0) {
//             obj["@attributes"] = {};
//             for (var j = 0; j < xml.attributes.length; j++) {
//                 var attribute = xml.attributes.item(j);
//                 obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
//             }
//         }
//     } else if (xml.nodeType == 3) { // text
//         obj = xml.nodeValue;
//     }

//     // do children
//     // If just one text node inside
//     if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
//         obj = xml.childNodes[0].nodeValue;
//     }
//     else if (xml.hasChildNodes()) {
//         for (var i = 0; i < xml.childNodes.length; i++) {
//             var item = xml.childNodes.item(i);
//             var nodeName = item.nodeName;
//             if (typeof (obj[nodeName]) == "undefined") {
//                 obj[nodeName] = xmlToJson(item);
//             } else {
//                 if (typeof (obj[nodeName].push) == "undefined") {
//                     var old = obj[nodeName];
//                     obj[nodeName] = [];
//                     obj[nodeName].push(old);
//                 }
//                 obj[nodeName].push(xmlToJson(item));
//             }
//         }
//     }
//     return obj;
// }

// // function clear() {
// //    $('.results-card').empty(); 
// // }


// function clear() {
//    $('.results-card').empty(); 

// //USA Jobs API
// function getJob(job) {
//     var apiKey = 'p7OF5vJVdOLJTzaO62kztnOMVmkGF6Nlt+fL0ThZRtg=';

//     $.ajax({
//         url: 'https://data.usajobs.gov/api/Search?PositionTitle=' + job,
//         method: 'GET',
//         headers: {
//             "Authorization-Key": apiKey
//         }
//     }).then(function (response) {
//         console.log(response);
//         console.log(response.SearchResult.SearchResultCountAll);
//         console.log(response.SearchResult.SearchResultItems[0]);
//         $("#job-results").append("<p>" + response.SearchResult.SearchResultCountAll + "</p>");
//     });

// }

// //College API
// // $( "#form" ).submit(function( event ) {
// //     event.preventDefault();
// //     var name = $( "#state" ).val()
// //     ajaxCall(name);
// // });

// function getSchool(name) {
//     var queryURL = "http://api.data.gov/ed/collegescorecard/v1/schools?school.state=" + name + "&fields=school.name,school.city,school.school_url" + "&api_key=ugQuY3Rxl5tYqCXMIvIGfUGbL5t3hMrSFNlo5NBb";
//     // var queryURL = "https://api.data.gov/ed/collegescorecard/v1/schools?school.state=" + name + "&fields=school.name,school.city,school.school_url,school.price_calculator_url" + "&api_key=ugQuY3Rxl5tYqCXMIvIGfUGbL5t3hMrSFNlo5NBb";
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response){
//         console.log(response); {
//             var len = 5 //response.results.length for all results //number
//             for (var i = 0; i < len; i++){
//                 var schoolObject = response.results[i]
//                 var price = schoolObject["school.price_calculator_url"]
//                 var school = schoolObject["school.school_url"]
//                 $("#school-results").append("<p>" + schoolObject["school.name"])
//                 $("#school-results").append("<p>" + schoolObject["school.city"])
//                 $("#school-results").append('<a href="' + school + '">' + "University Website" + '</a>' + "<br>" + "<br>")
//                 $("#school-results").append('<a href="' + price + '">' + "Tuition Price" + '</a>')

//                 //smaller text size
//                 // function smallText(){
//                 //     document.getElementById("#school-results").style.fontSize = "xx-small";

//                 // $("#slide").fadeOut("slow");
//                 }

//             }
        
        
//     });
// } 

// $(document).on("click", "#search", function (event) {
//     event.preventDefault();

//     harp.play();
//     var state = $("#state").val().trim();
//     var age = $("#age").val().trim();
//     var status = $("#status").val().trim();
//     var kids = $("#kids").val().trim();
//     var job = $("job").val().trim();
//     // var job = $("#job-status").val().trim();
//     // var position = $("#job").val().trim();

//     var newSearch = {
//         state: state,
//         age: age,
//         mstatus: status,
//         kids: kids,
//         job: job
//         // position: position
//     }

//     console.log(newSearch);


//     database.ref().push(newSearch);

//     $(".results-card").append(`<div class='jumbotron bg-primary text-white col-6'><p class='
//     ]'>Your Profile</p><p>You are ${age} years old</p><p>You are ${status}</p><p>You have ${kids} children</p><p>You have are a ${job} individual</p><p>Your desired state to live is ${state}</p></div>`);
    
//     getSchool(state);
//     fbiCall();
//     fbiCall2();
//     fbiCall3();
//     getJob();

//     $("#city").val("");
//     $("#age").val("");
//     $("#status").val("");
//     $("#kids").val("");
//     $('#job').val("");

// })

// $(document).ready(function () {

//     $("#spinner").hide();
// })

// $(document).on("click", "#clear", clear);
   
// }
