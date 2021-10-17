// import { getDatabase, ref, set } from "firebase/database";

function calc_locations() {
    console.log("Calculating Locations");
    //using user info to update database

  var input_location = document.getElementById("input_location").value;
  var input_wait_time = parseInt(document.getElementById("wait_time").value);

    console.log(input_location);
    console.log(input_wait_time);


    //pulling whole db each time, eventually think of optimization

  //UPDATE DATABASE
  firebase.database().ref("Locations/").once("value").then((snapshot) => {
    var locations = snapshot.val() || 'No Data';
    
    console.log(locations);
    
    const decay_time_seconds = 30;
    var now = Date();

    var newEntryRef = firebase.database().ref("Entry_Logs/"+input_location+"/").push();
    newEntryRef.set({
      wait_time: input_wait_time,
      timestamp: now
    })
    

    firebase.database().ref("Entry_Logs/"+input_location+"/").once("value").then((entry_snapshot) =>{
        var entries = entry_snapshot.val() || 'No Data';
        // console.log(entries);
        var sum = 0;
        var n = 0;
        const decay_time_seconds = 30;
        var newList = [];

        for(const entry in entries){
          console.log(Math.abs(Date.parse(now) - Date.parse(entries[entry].timestamp)));
          if(Math.abs(Date.parse(now) - Date.parse(entries[entry].timestamp))<decay_time_seconds*1000){
            newList.push(entries[entry]);
            sum += entries[entry].wait_time;
            n++;
          }
        }

        console.log(newList);


        if(n>0){
          var updates = {};
          updates["Locations/"+input_location+"/AverageWaitTime"]=sum/n;
          updates["Entry_Logs/"+input_location+"/"]=newList;
          firebase.database().ref().update(updates);
        }
      })

        //optimization thoughts, probably doesn't matter

        var updates = {};
        updates["Locations/" + input_location + "/AverageWaitTime"] = new_wait_time;
        updates["Locations/" + input_location + "/n_entries"] = n + 1;
        firebase.database().ref().update(updates);

    //this allows us to not need to regrab database, since old average wait for location is irrelevant
    cost_map[input_location]=input_wait_time;
    console.log(cost_map);

        for (const location in locations) {
            loc_pos = locations[location].Position;
            cost_map[location] = parseInt(cost(current_pos, loc_pos, locations[location].AverageWaitTime));
        }

    //UPDATE WEBPAGE
    var min_loc = input_location;
    for(const cost in cost_map){
      if(cost_map[cost]<cost_map[min_loc]){
        min_loc = cost;
      }
    }


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

