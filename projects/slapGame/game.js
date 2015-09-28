/*Javascript page*/

var firstName = prompt("Please enter the name of the person you'd like to Slap, Punch and Kick:", "");


function update() {
	document.getElementById("hp").innerText = player.health;
	document.getElementById("hitshow").innerText = player.hits;
	document.getElementById("name").innerText = player.name;
	document.getElementById("prog").innerText = player.health;
	document.getElementById("prog").style.width = player.health;
}	

function showHumbled(id) {
document.getElementById(id).classList.remove("hide");
  var hideHumbled = function() {
  document.getElementById(id).classList.add("hide");
  }
}

function showHide(id) {
document.getElementById(id).classList.remove("hide");

  var hide = function() {
  document.getElementById(id).classList.add("hide");
  }
 
  setTimeout(hide, 500)
}

var player = 
{
	name: firstName,
	hits: 0,
	health: 100,
	slap:function(){
		showHide("slapshow");
		this.health-=1;
		this.hits+=1;
		this.knockedOut();
		if (this.health <= 0) {
			this.health = 0;
			this.sickPerson();
		}
		update();
	},
	punch:function() {
		showHide("punchshow");
		this.health-=5;
		this.hits+=1;
		this.knockedOut();
		if (this.health <= 0) {
			this.health = 0;
			this.sickPerson();
		}
		update();
	},
	kick:function(){
		showHide("kickshow");
		this.health-=10;
		this.hits+=1;
		if (this.health <= 0) {
			this.health = 0;
			this.knockedOut();
			this.sickPerson();
			
		}
		update();
	},
	reset:function() {
		if (this.health < 100) {
			this.hits = 0;
			this.health = 100;
			}		
		update();
	},
	knockedOut:function() {
		if (this.health <= 0) {
			this.health = 0;
			alert("You KO'd " + firstName + "! Now did you really want to go and do that?");
			showHumbled();
		} 
	},
	sickPerson:function() {
		if (this.health = 0) {
			alert("What are you?! SICK and TWISTED?! Messing with a person while they're down and out? Just refill their health and go at it again. Or refresh the page and put in someone else's name.")
		}
	}
}

update();