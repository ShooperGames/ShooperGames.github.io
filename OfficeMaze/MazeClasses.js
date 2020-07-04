/*
Dev Versions 0.1 through 0.3 written in VB
Version 0.1 JavaScript (0.4 Dev)
TopDown view to Canvas Element
Basic 2d Maze Generation
Item order is Desk=>Phone=>Desk=>Stairs
Movement Functions
*/

/*
Import Statements
V 0.1 None
*/

/*
Global Declaration Statements
V 0.1 
Locations of player, desk, phone(1), stairs, & wall arrays
Used and Found status for desk, phone(1), & stairs
*/

var playerXLocation,
    playerYLocation,
    deskXLocation,
    deskYLocation,
    deskFound,
    deskUsed,
    phone1XLocation,
    phone1YLocation,
    phone1Found,
    phone1Used,
    stairsXLocation,
    stairsYLocation,
    stairsFound,
    stairsUsed,
    vWalls,
    hWalls,
    canvasEle,
    ctx,
    playerImg = new Image(),
    phoneImg = new Image(),
    deskImg = new Image(),
    stairsImg = new Image(),
    playerStairsImg = new Image(),
    playerPhoneImg = new Image(),
    playerDeskImg = new Image(),
    firstStart = true;
    playerImg.src = "Player1.png";
    phoneImg.src = "Phone1.png";
    deskImg.src = "Desk1.png";
    stairsImg.src = "Stairs1.png";
    playerStairsImg.src = "PlayerStairs1.png";
    playerPhoneImg.src = "PlayerPhone1.png";
    playerDeskImg.src = "PlayerDesk1.png";

/*
Maze TopDown View Functions
*/

function drawTotalMaze() {
    var rowCounter = 0,
        colCounter = 0;
    ctx.beginPath();
    ctx.clearRect(0, 0, 420, 420);
    while (rowCounter < vWalls.length) {
        while (colCounter < vWalls[rowCounter].length) {
            if (vWalls[rowCounter][colCounter] === 1) {
                ctx.moveTo((rowCounter * 21) + 21, (colCounter * 21));
                ctx.lineTo((rowCounter * 21) + 21, ((colCounter * 21) + 21));
            }
            colCounter++;
        }
        colCounter = 0;
        rowCounter++;
    }
    rowCounter = 0;
    while (rowCounter < hWalls.length) {
        while (colCounter < hWalls[rowCounter].length) {
            if (hWalls[rowCounter][colCounter] === 1) {
                ctx.moveTo((rowCounter * 21), (colCounter * 21) + 21);
                ctx.lineTo(((rowCounter * 21) + 21), (colCounter * 21) + 21);
            }
            colCounter++;
        }
        colCounter = 0;
        rowCounter++;
    }
    ctx.stroke();
    ctx.drawImage(playerImg, (playerXLocation * 21), (playerYLocation * 21));
    ctx.drawImage(phoneImg, (phone1XLocation * 21), (phone1YLocation * 21));
    ctx.drawImage(deskImg, (deskXLocation * 21), (deskYLocation * 21));
    ctx.drawImage(stairsImg, (stairsXLocation * 21), (stairsYLocation * 21));
    blackOutMaze();
}

function blackOutMaze() {
    var counter = 0,
        notWall = true;
    ctx.fillRect(0, 0, (playerXLocation * 21), (playerYLocation * 21));
    ctx.fillRect((playerXLocation * 21 + 21), 0, (420 - (playerXLocation * 21 + 21)), (playerYLocation * 21));
    ctx.fillRect(0, (playerYLocation * 21 + 21), (playerXLocation * 21), (420 - (playerYLocation * 21 + 21)));
    ctx.fillRect((playerXLocation * 21 + 21), (playerYLocation * 21 + 21), (420 - (playerXLocation * 21 + 21)), (420 - (playerYLocation * 21 + 21)));
    while (notWall && (counter < playerXLocation)) {
        if (vWalls[(playerXLocation - 1 - counter)][playerYLocation] === 1) {
            notWall = false;
        } else {
            counter++;
        }
    }
    ctx.fillRect(0, (playerYLocation * 21), ((playerXLocation * 21) - (counter * 21)), 21);
    counter = 0;
    notWall = true;
    while (notWall && (counter < playerYLocation)) {
        if (hWalls[playerXLocation][(playerYLocation - 1 - counter)] === 1) {
            notWall = false;
        } else {
            counter++;
        }
    }
    ctx.fillRect((playerXLocation * 21), 0, 21, ((playerYLocation * 21) - (counter * 21)));
    counter = 0;
    notWall = true;
    while (notWall && (counter < (21 - playerXLocation))) {
        if (vWalls[playerXLocation + counter][playerYLocation] === 1) {
            notWall = false;
        } else {
            counter++;
        }
    }
    ctx.fillRect((playerXLocation * 21) + 21 + (counter * 21), (playerYLocation * 21), (420 - ((playerXLocation * 21) + 21 + (counter * 21))), 21);
    counter = 0;
    notWall = true;
    while (notWall && (counter < (21 - playerYLocation))) {
        if (hWalls[playerXLocation][playerYLocation + counter] === 1) {
            notWall = false;
        } else {
            counter++;
        }
    }
    ctx.fillRect((playerXLocation * 21), (playerYLocation * 21) + 21 + (counter * 21), 21, (420 - (playerYLocation * 21) + 21 + (counter * 21)));


}

/*
2d Maze Generation Functions
x and y set in main function, 
input boxes for custom size for future updates
*/

function mainMakeMaze() {
    var x = 20,
        y = 20;
    playerXLocation = 0;
    playerYLocation = 0;
    deskFound = false;
    deskUsed = false;
    phone1Found = false;
    phone1Used = false;
    stairsFound = false;
    stairsUsed = false;
    vWalls = [];
    hWalls = [];
    initMaze(x,y);
    placeDesk(x,y);
    placePhone1(x,y);
    placeStairs(x,y);
    if (firstStart) {
        canvasEle = document.getElementById("mazeMap");
        ctx = canvasEle.getContext("2d");
        document.addEventListener("keyup", moveFunc);
        firstStart = false;
    }
    drawTotalMaze();
    alert("The beeping of your alarm wakes you.");
    alert("Today is the day that you are going to get your dream vacation approved!");
    alert("If only you knew where your desk was moved to.");
}

function initMaze(x,y) {
    var spaces = [],
        counter = 0,
        counter2 = 0;
    spaces.push([]);
    hWalls.push([]);
    while (counter < (x - 1)) {
        spaces.push([]);
        hWalls.push([]);
        vWalls.push([]);
        counter++;
    }
    counter = 0;
    while (counter < x) {
        while (counter2 < y) {
            if (counter === (x - 1)) {
                if (counter2 === (y - 1)) {
/* Do Nothing */
                } else {
                    hWalls[counter].push(0);
                }
            } else {
                if (counter2 === (y - 1)) {
                    vWalls[counter].push(0);
                } else {
                    hWalls[counter].push(0);
                    vWalls[counter].push(0);
                }
            }
            counter2++;
        }
        counter2 = 0;
        counter++;
    }
    counter = 1;
    while (counter <= (x * y)) {
        spaces[(counter % x)].push(counter);
        counter++;
    }
    placeWalls(x,y,spaces);
}

function placeWalls(x,y,spaceArray) {
    var ranNum = 0,
        counter = -1, /*counter at -1 due to initial increment*/
        changeNum1 = 0,
        changeNum2 = 0,
        tWalls = (2 * x * y) - x - y;
    while (tWalls > 0) {
        ranNum = Math.floor(Math.random() * (tWalls));
        while (ranNum >= 0) {
            counter++;
            if (counter < ((x - 1) * y)) {
                if (vWalls[counter % (x - 1)][Math.floor(counter / (x - 1))] === 0) {
                    ranNum--;
                }
            } else {
                if (hWalls[counter % x][Math.floor((counter - ((x - 1) * y)) / x)] === 0) {
                    ranNum--;
                }
            }
        }
        if (counter < ((x - 1) * y)) {
            if (spaceArray[(counter % (x - 1))][Math.floor(counter / (x - 1))] === spaceArray[((counter % (x - 1)) + 1)][Math.floor(counter / (x - 1))]) {
                vWalls[counter % (x - 1)][Math.floor(counter / (x - 1))] = 1;
            } else {
                vWalls[counter % (x - 1)][Math.floor(counter / (x - 1))] = -1;
                changeNum1 = spaceArray[(counter % (x - 1))][Math.floor(counter / (x - 1))];
                changeNum2 = spaceArray[((counter % (x - 1)) + 1)][Math.floor(counter / (x - 1))];
                counter = 0;
                while (counter <= (x * y)) {
                    if (spaceArray[(counter % x)][Math.floor(counter / x)] === changeNum1) {
                        spaceArray[(counter % x)][Math.floor(counter / x)] = changeNum2;
                    }
                    counter++;
                }
            }
        } else {
            if (spaceArray[(counter % x)][Math.floor((counter - ((x - 1) * y)) / x)] === spaceArray[(counter % x)][Math.floor(((counter - ((x - 1) * y)) / x) + 1)]) {
                hWalls[(counter % x)][Math.floor((counter - ((x - 1) * y)) / x)] = 1;
            } else {
                hWalls[(counter % x)][Math.floor((counter - ((x - 1) * y)) / x)] = -1;
                changeNum1 = spaceArray[(counter % x)][Math.floor((counter - ((x - 1) * y)) / x)];
                changeNum2 = spaceArray[(counter % x)][(Math.floor((counter - ((x - 1) * y)) / x) + 1)];
                counter = 0;
                while (counter <= (x * y)) {
                    if (spaceArray[(counter % x)][Math.floor(counter / x)] === changeNum1) {
                        spaceArray[(counter % x)][Math.floor(counter / x)] = changeNum2;
                    }
                    counter++;
                }
            }
        }
        counter = -1;
        tWalls--;
    }
}

/*
Item Placement/Utilization Functions
V 0.1
Placement of desk, phone(1), & stairs
     Not using generalized functions for preventing duplicate item placements.
Item usage and finding for desk, phone(1), & stairs
*/

function placeDesk(x,y) {
    var ranLoc = 0;
    ranLoc = Math.floor(Math.random() * (x - 1)); // 1 is how many items have been placed before this one
    ranLoc++; // Person is at 0,0
    deskXLocation = ranLoc;
    ranLoc = 0;
    ranLoc = Math.floor(Math.random() * (y - 1)); // 1 is how many items have been placed before this one
    ranLoc++; // Person is at 0,0
    deskYLocation = ranLoc;
}

function placePhone1(x,y) {
    var ranLoc = 0,
        badRan = true;
    while (badRan) {
        ranLoc = Math.floor(Math.random() * (x - 2)); // 2 is how many items have been placed before this one
        ranLoc++; // Person is at 0,0
        if (ranLoc >= deskXLocation) {
            ranLoc++;
        }
        if (ranLoc === deskXLocation) {
            // Nothing happens
        } else {
            badRan = false;
        }
    }
    phone1XLocation = ranLoc;
    badRan = true;
    ranLoc = 0;
    while (badRan) {
        ranLoc = Math.floor(Math.random() * (y - 2)); // 2 is how many items have been placed before this one
        ranLoc++; // Person is at 0,0
        if (ranLoc >= deskYLocation) {
            ranLoc++;
        }
        if (ranLoc === deskYLocation) {
            // Nothing happens
        } else {
            badRan = false;
        }
    }
    phone1YLocation = ranLoc;
}

function placeStairs(x,y) {
    var ranLoc = 0,
        badRan = true;
    while (badRan) {
        ranLoc = Math.floor(Math.random() * (x - 3)); // 3 is how many items have been placed before this one
        ranLoc++; // Person is at 0,0
        if (ranLoc >= deskXLocation || ranLoc >= phone1XLocation) {
            ranLoc++;
        }
        if (ranLoc >= deskXLocation && ranLoc >= phone1XLocation) {
            ranLoc++;
        }
        if (ranLoc === deskXLocation || ranLoc === phone1XLocation) {
            // Nothing happens
        } else {
            badRan = false;
        }
    }
    stairsXLocation = ranLoc;
    badRan = true;
    ranLoc = 0;
    while (badRan) {
        ranLoc = Math.floor(Math.random() * (y - 3)); // 3 is how many items have been placed before this one
        ranLoc++; // Person is at 0,0
        if (ranLoc >= deskYLocation || ranLoc >= phone1YLocation) {
            ranLoc++;
        }
        if (ranLoc >= deskYLocation && ranLoc >= phone1YLocation) {
            ranLoc++;
        }
        if (ranLoc === deskYLocation || ranLoc === phone1YLocation) {
            // Nothing happens
        } else {
            badRan = false;
        }
    }
    stairsYLocation = ranLoc;
}

function checkDesk() {
    if (deskUsed) {
        // Nothing happens
    } else if (phone1Used) {
        alert("You found your desk!");
        alert("Your vacation request is now in hand.");
        alert("You are just a signaute away from Maui.");
        alert("Now where were those Stairs?");
        deskUsed = true;
    } else if (deskFound) {
        // Nothing happens
    } else {
        alert("This desk is unoccupied.");
        alert("You are not sure if it is yours though.");
        alert("You should call the Desk Assignment Meta-Manager to find out.");
        alert("If only there was a phone here.");
        deskFound = true;
    }
}

function checkPhone1() {
    if (phone1Used) {
        // Nothing happens
    } else if (deskFound) {
        alert("You quickly call the Desk Assignment Meta-Manager.");
        alert("You are told that you are the last one to work today.");
        alert("Yours is the only empty desk");
        alert("DAM-Manager");
        phone1Used = true;
    } else if (phone1Found) {
        // Nothing happens
    } else {
        alert("There is a phone here.");
        alert("You should remember this.");
        phone1Found = true;
    }
}

function checkStairs() {
    if (stairsUsed) {
        alert("How did you get here?"); // Returned to stairs after use?
    } else if (deskUsed) {
        alert("You begin walking up the stairs.");
        alert("You here an annoying beep with each step.");
        alert("The walls begin to fade as you feel a sinking dread.");
        stairsUsed = true;
        mainMakeMaze();
    } else if (stairsFound) {
        // Nothing happens
    } else {
        alert("These are stairs going up.");
        alert("Your manager works on the floor above.");
        stairsFound = true;
    }
}

/*
Movement Functions
*/

function moveFunc(event) {
    var key = event.keyCode;
    switch(key) {
        case 37:
            moveLeft();
        break;
        case 38:
            moveUp();
        break;
        case 39:
            moveRight();
        break;
        case 40:
            moveDown();
    }
}

function moveLeft() {
    if (playerXLocation === 0) {
        alert("Thwack!");
    } else {
        if (vWalls[(playerXLocation - 1)][playerYLocation] === 1) {
            alert("Thwack!");
        } else {
            playerXLocation--;
            drawTotalMaze();
            checkItems();
        }
    }
}

function moveUp() {
    if (playerYLocation === 0) {
        alert("Thwack!");
    } else {
        if (hWalls[playerXLocation][(playerYLocation - 1)] === 1) {
            alert("Thwack!");
        } else {
            playerYLocation--;
            drawTotalMaze();
            checkItems();
        }
    }
}

function moveRight() {
    if (playerXLocation === 20) {
        alert("Thwack!");
    } else {
        if (vWalls[playerXLocation][playerYLocation] === 1) {
            alert("Thwack!");
        } else {
            playerXLocation++;
            drawTotalMaze();
            checkItems();
        }
    }
}

function moveDown() {
    if (playerYLocation === 20) {
        alert("Thwack!");
    } else {
        if (hWalls[playerXLocation][playerYLocation] === 1) {
            alert("Thwack!");
        } else {
            playerYLocation++;
            drawTotalMaze();
            checkItems();
        }
    }
}

function checkItems() {
    switch(playerXLocation) {
        case deskXLocation:
            if (playerYLocation === deskYLocation) {
                ctx.drawImage(playerDeskImg, (playerXLocation * 21), (playerYLocation * 21));
                checkDesk();
            }
        break;
        case phone1XLocation:
            if (playerYLocation === phone1YLocation) {
                ctx.drawImage(playerPhoneImg, (playerXLocation * 21), (playerYLocation * 21));
                checkPhone1();
            }
        break;
        case stairsXLocation:
            if (playerYLocation === stairsYLocation) {
                ctx.drawImage(playerStairsImg, (playerXLocation * 21), (playerYLocation * 21));
                checkStairs();
            }
        break;
    }
}