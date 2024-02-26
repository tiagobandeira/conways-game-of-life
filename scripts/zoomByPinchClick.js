/*
    Script for zoom by pinch touch
*/

var grade = document.getElementById("grade");

grade.addEventListener("touchstart", touchStartHandler)
grade.addEventListener("touchmove", touchMoveHandler)

var startingDistance;
var finalDistance;
var zoom = parseInt(grade.style.zoom.replace("%",""))*0.01 || 1;


function touchStartHandler(e) {
    if (e.touches.length !== 2) {
        return;
    }

    let points = getPincerTouchPoints(e)

    startingDistance = calculateDistanceBetweenTwoPoints(...points);
}

function touchMoveHandler(e) {
    if (e.touches.length != 2) {
        return;
    }

    let points = getPincerTouchPoints(e)
    finalDistance = calculateDistanceBetweenTwoPoints(...points);

    let delta = Math.round((finalDistance - startingDistance)*10)/10

    zoom += delta * 0.01;
    zoom  = Math.min(Math.max(0.3, zoom), 4);
    grade.style.zoom = zoom
    
    startingDistance = finalDistance
}

function getPincerTouchPoints(event) {
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];

    let x1 = touch1.pageX;
    let x2 = touch2.pageX;
    let y1 = touch1.pageY;
    let y2 = touch2.pageY;

    return [x1,y1,x2,y2]
}

function calculateDistanceBetweenTwoPoints(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))
}