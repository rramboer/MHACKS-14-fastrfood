// import { getDatabase, ref, set } from "firebase/database";


function callback(response, status) {
    if (status == 'OK') {
        console.log(response);
    }
}


function gmaps_call() {
    var input_location = document.getElementById("input_location").value;

    firebase.database().ref("Locations/").once("value").then((snapshot) => {
        var locations = snapshot.val() || 'No Data';
        origin = [];
        destination = [];

        for (const location in locations) {
            if (location == input_location) {
                origin.push(locations[location].Address);
            } else {
                destination.push(locations[location].Address);
            }
        }

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: origin,
            destinations: destination,
            travelMode: 'WALKING',
        }, calc_locations);
    });
}

function calc_locations(response, status) {

    // var origin = "600 E Madison St, Ann Arbor, MI 48109";//south quad
    // var destinationA = "701 E University Ave, Ann Arbor, MI 48109";//east quad
    // var destinationB = "200 Observatory St, Ann Arbor, MI 48109";//mojo
    // var destinationC = "1931 Duffield St, Ann Arbor, MI 48109"; //bursley

    console.log("Calculating Locations");
    //using user info to update database

    var input_location = document.getElementById("input_location").value;
    var input_wait_time = parseInt(document.getElementById("wait_time").value);

    console.log(input_location);
    console.log(input_wait_time);


    //pulling whole db each time, eventually think of optimization

    //UPDATE DATABASE
    firebase.database().ref("Locations/").once("value").then((snapshot) => {

        if (status == "OK") {
            console.log(response);
        }
        var locations = snapshot.val() || 'No Data';

        console.log(locations);

        var now = Date();

        var newEntryRef = firebase.database().ref("Entry_Logs/" + input_location + "/").push();
        newEntryRef.set({
            wait_time: input_wait_time,
            timestamp: now
        });


        firebase.database().ref("Entry_Logs/" + input_location + "/").once("value").then((entry_snapshot) => {
            var entries = entry_snapshot.val() || 'No Data';
            // console.log(entries);
            var sum = 0;
            var n = 0;
            const decay_time_minutes = 30;
            var newList = [];

            for (const entry in entries) {
                console.log(Math.abs(Date.parse(now) - Date.parse(entries[entry].timestamp)));
                if (Math.abs(Date.parse(now) - Date.parse(entries[entry].timestamp)) < decay_time_minutes * 1000 * 60) {
                    newList.push(entries[entry]);
                    sum += entries[entry].wait_time;
                    n++;
                }
            }

            console.log(newList);


            if (n > 0) {
                var updates = {};
                updates["Locations/" + input_location + "/AverageWaitTime"] = sum / n;
                updates["Entry_Logs/" + input_location + "/"] = newList;
                firebase.database().ref().update(updates);
            }

        });




        //this allows us to not need to regrab database, since old average wait for location is irrelevant
        current_pos = locations[input_location].Position;
        cost_map = [];
        console.log(cost_map);

        for (const location in locations) {
            var travel_time = 0;
            for (var i = 0; i < response.destinationAddresses.length; i++) {
                console.log(response.destinationAddresses[i]);
                console.log(locations[location].Address);
                var dest_address = response.destinationAddresses[i];
                var loc_address = locations[location].Address;
                if (dest_address.slice(dest_address.length - 30) == loc_address.slice(loc_address.length - 30)) {
                    travel_time = response.rows[0].elements[i].duration.value / 60;
                }
            }
            cost_map[location] = parseInt(travel_time + locations[location].AverageWaitTime);
        }
        cost_map[input_location] = input_wait_time;

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