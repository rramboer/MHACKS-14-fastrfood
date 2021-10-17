// import { getDatabase, ref, set } from "firebase/database";

function calc_locations() {
    console.log("Calculating Locations");
    //using user info to update database

    //FILL IN WITH MIZUKI/RYAN
    var input_location = document.getElementById("input_location").value;
    var input_wait_time = parseInt(document.getElementById("wait_time").value);

    console.log(input_location);
    console.log(input_wait_time);


    //pulling whole db each time, eventually think of optimization


    //UPDATE DATABASE
    firebase.database().ref("Locations/").once("value").then((snapshot) => {
        var locations = snapshot.val() || 'No Data';

        console.log(locations);
        var n = locations[input_location].n_entries;
        var new_wait_time = (input_wait_time + (locations[input_location].AverageWaitTime * n)) / (n + 1);
        console.log("Old wait time for " + input_location + ": " + locations[input_location].AverageWaitTime + " : n =" + n);
        console.log("New avg wait time for " + input_location + ": " + new_wait_time);

        //optimization thoughts, probably doesn't matter

        var updates = {};
        updates["Locations/" + input_location + "/AverageWaitTime"] = new_wait_time;
        updates["Locations/" + input_location + "/n_entries"] = n + 1;
        firebase.database().ref().update(updates);

        //Update displays
        var current_pos = locations[input_location].Position;
        var cost_map = [];

        for (const location in locations) {
            loc_pos = locations[location].Position;
            cost_map[location] = parseInt(cost(current_pos, loc_pos, locations[location].AverageWaitTime));
        }

        cost_map[input_location] = input_wait_time;
        console.log(cost_map);


        //UPDATE WEBPAGE
        var min_loc = input_location;
        for (const cost in cost_map) {
            if (cost_map[cost] < cost_map[min_loc]) {
                min_loc = cost
            }
        }

        var formatting = [];
        formatting["MoJo"] = "Mosher-Jordan";
        formatting["SouthQuad"] = "South Quad";
        formatting["EastQuad"] = "East Quad";
        formatting["Bursley"] = "Bursley";

        //different response: stay or go
        if (min_loc == input_location) {
            $("#top").html('<h3 class="text-center card-header" id="top-dining-hall"><small>You Should Stay At</small><br>' + formatting[min_loc] + '<br><small>for Fastest Food.</small></h3>');
        } else {
            $("#top").html('<h3 class="text-center card-header" id="top-dining-hall"><small>You Should Go To</small><br>' + formatting[min_loc] + '<br><small>for Fastest Food.</small></h3>');
        }

        //update wait time for each
        $("#Mojo-cost").text("Time till Food: " + cost_map["MoJo"] + " mins");
        $("#South-cost").text("Time till Food: " + cost_map["SouthQuad"] + " mins");
        $("#East-cost").text("Time till Food: " + cost_map["EastQuad"] + " mins");
        $("#Bursley-cost").text("Time till Food: " + cost_map["Bursley"] + " mins");

    });

}

function cost(loc1, loc2, wait_time) {
    const walk_speed = 1; //assumes how fast people walk, could be figured out later
    return ((dist(loc1, loc2) * walk_speed) + wait_time);
}

function dist(loc1, loc2) {
    return Math.sqrt((loc1[0] - loc2[0]) ** 2 + (loc1[1] - loc2[1]) ** 2);
}

function print() {
    console.log("Pressed");
}