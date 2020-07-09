
var people
    ,jobs
    ,orders
    ,supplies
    ,research;

people = 25;
jobs.hunter = new Job("hunter", "food", null, null);
jobs.hunter.count = 15;
supplies.food.count = 0;
supplies.food.max = 0;

class Job {
    constructor(name, j1, j2, j3) {
        this.roles = [j1, j2, j3];
        this.name = name;
        this.count = 0;
    }
}

class Order {
    constructor(item, needs, priority, count) {
        this.item = item;
        this.needs = needs;
        this.priority = priority;
        this.count = count;
    }

    complete() {
        this.count--;
        supplies[this.item]++;
        return this.count;
    }
}

