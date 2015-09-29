var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
body = document.body;
 var showLeft = $('#showLeft');
 var classie = $('#classie')
showLeft.on('click', function() {
  classie.toggle( this, 'active' );
  classie.toggle( menuLeft, 'cbp-spmenu-open' );
  disableOther( 'showLeft' );
});
 
function disableOther( button ) {
  if( button !== 'showLeft' ) {
    classie.toggle( showLeft, 'disabled' );
  }
}


// var PlayersService = function(endpointUri){
// 	
// 	var playersData = [];
// ​
// 	
// 	this.getPlayersByTeam = function(teamName){
// 		var filteredPlayers = playersData.filter(function(player){
// 			return player.team === teamName;
// 		});
// 	
// 		return filteredPlayers;
// 	}
// ​
// 	
// 	this.getPlayersByPosition = function(position){
// 		var filteredPlayers = playersData.filter(function(player){
// 			return player.position === position;
// 		});
// ​
// 		return filteredPlayers;
// 	}
// 	
// 	function loadPlayersData(){
// 		$.getJSON(endpointUri,function(data){
// 			playersData = data.body.players; //maybe play with this
// 		});
// 	};	
// 	loadPlayersData();
// }
// ​
// //consumer
// //service already linked in HTML
// var prodUrl = "cbs.com....";
// var testUrl = "test.cbs.com....";
// ​
// var playerService = new PlayerService(testUrl);
// ​
// $('some-button').on('click',function(){
// 	var sf = playerService.getPlayersByTeam("SF");
// }
// 
// var roster = {
//   players:{},
//   addPlayer :function(player){
//     if(player.name && player.position && player.number){
//       this.players[player.id] = player;
//       updatePlayers();
//     }else{
//       alert("Invalid Player Data");
//     }
//   }
// }
// ​
// var Player = function(name,position,number,id){
//   this.name = name;
//   this.position = position;
//   this.number = number;
//   this.id = id;
// }
// ​
// ​
// var PlayerFactory = {
//   _uniqueId:0,
//   createPlayer:function(name,position,number){
//     this._uniqueId++;
//         return new Player(name,position,number,this._uniqueId);
//   }
// }
// ​
// ​
// function updatePlayers(){
//   var rosterDiv = $(".player-roster");
//   rosterDiv.html('');
//   for(var id in roster.players){
//       var player = roster.players[id];
//       //without the if statement this loop throws an error
//       if(!player){
//         //continue;
//       }
//       var html = '<div class="player-card">'+
//             '<button class="btn btn-xs btn-danger remove" id="'+player.id+'">Remove</button>'+
//             '<div>'+
//               '<img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" />'+
//             '</div>'+
//             '<div>'+
//               '<span>'+player.name+'</span>'+
//             '</div>'+
//             '<div>'+
//               '<span>'+player.position+'</span>'+
//             '</div>'+
//             '<div>'+
//               '<span>'+player.number+'</span>'+
//            '</div>'+
//           '</div>';
//           
//       rosterDiv.append(html);
//   }
// }
// ​
// $(function(){
//   
//   $("#add-player-form").on('submit',function(event){
//       event.preventDefault();
//       var values = $(this).serializeArray();
//       var name = values[0].value;
//       var position = values[1].value;
//       var number = values[2].value;
//       roster.addPlayer(PlayerFactory.createPlayer(name,position,number));
//   });
//   
//   $(".expand-player-panel").on('click',function(){
//     $(".panel-add-player .panel-body").toggle(200)
//   });
//   
//   $(".player-roster").on('click','.remove',function(event){
//     delete roster.players[this.id];
//     updatePlayers();
//   })
//     
//   
// })

var playerService = function () {
  var _players = [];
  return {
    loadPlayers: function (cb) {
      var url = "http://bcw-getter.herokuapp.com/?url=";
      var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
      var apiUrl = url + encodeURIComponent(url2);
      $.getJSON(apiUrl, function (response) {
        _players = response.body.players;
        console.log(_players);
        cb();
      });
    },
    getPlayers: function () {
      return _players;
    },
    getPlayersByTeam: function (team) {
      var requestedTeam = _players.filter(function (player) {
        if (player.pro_team === team) {
          return true;
        }
      });
      return requestedTeam;
    }
  }
}



var ps = playerService();

ps.loadPlayers(function () {

// needs to be within the API retriever PlayerService but, where?
// $('#APIlist').load(function(e) {
//   e.preventDefault();
//   $('#APIlist').parent().append();
  
//   var APIname = $('#playerAPIName').val();
//   var APIposition = $('#playerAPIPosition').val();
//   var APInum = $('#playerAPINum').val();
// // need to iterate through each player by putting the players in an array 
// // and using foreach adding 1 (Do I need to put unique "id"s to each player?) 
// // put an add button next to each player and link it to the list.

  var players = ps.getPlayers();
  players.forEach(function(player){
    var html = '<tr><td><button class="btn btn-success"><i class="glyphicon glyphicon-plus-sign"></i></button></td>' +
             '<td>' + player.fullname + '</td>' +
             '<td>' + player.position + '</td>' +
             '<td>' + player.jersey + '</td><tr>';
   $('#APIlist').append(html);  
  })
  
});
$('#addPlayer').on('click', function (e) {
  e.preventDefault();
  var name = $('#playerName').val();
  var position = $('#playerPosition').val();
  var num = $('#playerNumber').val();

  var html = '<div class="player-card">' +
    '<button type="button" class="btn btn-danger btn-xs remove-player">Remove</button>' +
    '<img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"/>' +
    '<div>' +
    '<span style="text-align:center">' + name + '</span>' +
    '</div>' +
    '<div>' +
    '<span style="text-align:center">' + position + '</span>' +
    '</div>' +
    '<div>' +
    '<span style="text-align:center">' + num + '</span>' +
    '</div></div>';
  $('.player-roster').append(html);
});


$(".player-roster").on('click', '.remove-player', function (e) {
  e.preventDefault();
  var removebtn = $(this);
  removebtn.parent().remove();
});

