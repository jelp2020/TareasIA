// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state){
   	if (state=="DIRTY") return "CLEAN";
   	else if (location=="A") return "RIGHT";
   	else if (location=="B") return "LEFT";
}

function ensuciar(states, peso) {
   // body...
   if (peso == 50){
      if (states[1] == "CLEAN"){
         states[1]="DIRTY";
      }
      if(states[2] == "CLEAN"){
         states[2]="DIRTY";
      }
   }
}

var peso = 0;
function test(states){
         
         var ciclo = true;

      	var location = states[0];		
      	var state = states[0] == "A" ? states[1] : states[2];
      	var action_result = reflex_agent(location, state);
      	document.getElementById("log").innerHTML+="<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
      	if (action_result == "CLEAN"){
        	   if (location == "A") states[1] = "CLEAN";
         	else if (location == "B") states[2] = "CLEAN";
      	}
      	else if (action_result == "RIGHT") states[0] = "B";
      	else if (action_result == "LEFT") states[0] = "A";	
         peso = peso + 10;
         ensuciar(states, peso);
         if (states[1]=="CLEAN" && states[2]=="CLEAN" && peso>50){
            console.log("entro");
            ciclo = false;
         }
         console.log(ciclo);	
	if(ciclo){setTimeout(function(){ test(states) }, 2000);}
   else{document.getElementById("log").innerHTML+="<br>Visito los 8 estados";}
}

var states = ["A","DIRTY","DIRTY"];
test(states);
