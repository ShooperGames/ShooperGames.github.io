/*
curScreen =
    OverView = 1
    Jobs = 2
    Orders = 3
    Research = 4
    Map = 5
    System = 6
*/

var curScreen = 1;
overviewButClick();

function drawScreen() {
    switch (curScreen) {
        case 1:

            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        default:

    }
}

function overviewButClick() {
    curScreen = 1;
    //var gameBlock = document.getElementById("gameBlock");
    //gameBlock.innerHTML = "";
    drawScreen();
    paused = false;
}

function jobButClick() {
    curScreen = 2;
    drawScreen();
    paused = false;
}

function orderButClick() {
    curScreen = 3;
    drawScreen();
    paused = false;
}

function systemButClick() {
    curScreen = 6;
    paused = true;
    drawScreen();
}