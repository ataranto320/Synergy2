// start point
var i = 0; 
var images = [];
var time = 5000;

//img lists
images[0] = 'city.jpg';
images[1] = 'town.jpg';
images[2] = 'village.jpg';
images[3] = 'beachhouse.jpg';
images[4] = 'oldworld.jpg';

//change img
function changeImg(){
    document.slide.src = images[i];
    if (i < images.length - 4){
        i++;
    } else {
        i = 0;
    }

    setTimeout("changeImg()", time);
}

window.onload = changeImg;