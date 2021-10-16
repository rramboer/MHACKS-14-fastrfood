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
  

  // //UPDATE DATABASE
  // firebase.database().ref("Locations/").once("value").then((snapshot) => {
  //   var locations = snapshot.val() || 'No Data';
    
  //   console.log(locations);
  //   var n = locations[input_location].n_entries;
  //   var new_wait_time = (input_wait_time+(locations[input_location].AverageWaitTime*n))/(n+1);
  //   console.log("Old wait time for "+input_location+ ": "+locations[input_location].AverageWaitTime+" : n ="+n);
  //   console.log("New avg wait time for "+input_location+": "+new_wait_time);

  //   //optimization thoughts, probably doesn't matter

  //   var updates = {};
  //   updates["Locations/"+input_location+"/AverageWaitTime"]=new_wait_time;
  //   updates["Locations/"+input_location+"/n_entries"]=n+1;
  //   firebase.database().ref().update(updates);

    //Update displays
    var current_pos = locations[input_location].Position;
    var cost_map = [];

    for(const location in locations){
      loc_pos = locations[location].Position;
      // console.log(loc_pos);
      cost_map[location]=parseFloat(cost(current_pos,loc_pos,locations[location].AverageWaitTime));
    }

    cost_map[input_location]=input_wait_time;
    console.log(cost_map);


    //UPDATE WEBPAGE
    // console.log(cost_map);
    // document.getElementById("top-dining-hall").innerHTML = "Best dining hall";
    $("#top").html('<h3 class="text-center card-header" id="top-dining-hall">Top dining hall</h3>');
    $("#Mojo-cost").text("Mojo cost");
    $("#South-cost").text("South cost");
    $("#East-cost").text("East cost");
    $("#Bursley-cost").text("Bursley cost");

  // });




}

function cost(loc1,loc2,wait_time){
  const walk_speed = 1; //assumes how fast people walk, could be figured out later
  return ((dist(loc1,loc2)*walk_speed)+wait_time);
}

function dist(loc1,loc2){
  return Math.sqrt((loc1[0]-loc2[0])**2 + (loc1[1]-loc2[1])**2);
}

function print(){
    console.log("Pressed");
}