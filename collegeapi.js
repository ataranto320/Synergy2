// var college = "college";
// var queryURL = "http://api.data.gov/ed/collegescorecard/v1/schools" + location + name + id + city + state + zip +  + "ugQuY3Rxl5tYqCXMIvIGfUGbL5t3hMrSFNlo5NBb" + degrees_awarded.predominant_recorded + degrees_awarded.predominat + degrees_awarded.highest + "/v1/schools" + "&sort=latest.completion.rate_suppressed.overall:desc"


// https://api.data.gov/ed/collegescorecard/v1/schools?fields=school.name,id,latest.student.demographics.race_ethnicity.white,latest.student.demographics.race_ethnicity.black,latest.student.demographics.race_ethnicity.hispanic,latest.student.demographics.race_ethnicity.asian,latest.student.demographics.race_ethnicity.aian,latest.student.demographics.race_ethnicity.nhpi,latest.student.demographics.race_ethnicity.two_or_more,latest.student.demographics.race_ethnicity.non_resident_alien,latest.student.demographics.race_ethnicity.unknown,latest.student.demographics.race_ethnicity.white_non_hispanic,latest.student.demographics.race_ethnicity.black_non_hispanic,latest.student.demographics.race_ethnicity.asian_pacific_islander&sort=latest.completion.rate_suppressed.overall:desc

// var apiKey = "ugQuY3Rxl5tYqCXMIvIGfUGbL5t3hMrSFNlo5NBb";

// $.ajax({
//     url: 'http://api.data.gov/ed/collegescorecard/v1/schools',
//     method: ‘GET’,
//     headers: {
//         “Authorization-Key”: apiKey
//     }
//  }).then(function (response) {
//         console.log(response);
//     });
 
//  });

//  var queryURL = "http://api.data.gov/ed/collegescorecard/v1/schools?ugQuY3Rxl5tYqCXMIvIGfUGbL5t3hMrSFNlo5NBb";

//  $.ajax({
//      url: queryURL,
//      method: "GET"
//  }).then(function(response){
//      console.log(response);
//  });


//  var college = "college";
//  var name = "ny"
//  var queryURL = "http://api.data.gov/ed/collegescorecard/v1/schools/search?" + name + "&api_key=ugQuY3Rxl5tYqCXMIvIGfUGbL5t3hMrSFNlo5NBb";
// var queryURL = "http://api.data.gov/ed/collegescorecard/v1/schools?school.state=" + name + "&fields=school.name,school.city,school.school_url" + "&api_key=ugQuY3Rxl5tYqCXMIvIGfUGbL5t3hMrSFNlo5NBb";

//college api
$(document).ready(function() {
   $( "#test" ).submit(function( event ) {
        event.preventDefault();
        var name = $( "input:first" ).val()
        ajaxCall(name);
    });

    function ajaxCall(name) {
        var queryURL = "http://api.data.gov/ed/collegescorecard/v1/schools?school.state=" + name + "&fields=school.name,school.city,school.school_url" + "&api_key=ugQuY3Rxl5tYqCXMIvIGfUGbL5t3hMrSFNlo5NBb";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response.results);
        });
    } 
})
    

