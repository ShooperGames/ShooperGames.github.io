
var people
    ,happiness
    ,jobs
    ,crafts
    ,supplies
    ,research
    ,paused;

people = 25;
happiness = 75;
paused = true;
jobs = rawJobs;
crafts = rawCrafts;
supplies = rawSupplies;
research = rawResearch;
loadGame();

function loadGame() {
    
}

function saveGame() {
    
}

function tickTock() {
    if (!paused) {
        drawScreen();
    }
}