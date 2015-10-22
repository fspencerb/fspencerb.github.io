var app = angular.module('racingFrogs', []);
app.controller('MainController', MainController);
app.service('RacingService', RacingService);
//No need to change anything above this line.

function RacingService() {
    this.addTwoNumbers = function (x, y) {
        return x + y;
    }
}

function MainController($timeout, RacingService, BettingService) {
    var vm = this; //instead of using this when refering to the controller, let's use vm. It will make things easier.
    vm.bank = 200;
    vm.froglist = [];

    var finishLine = 93;
    var maxDistance = 97;
    var frogLimit = 9;

    //Adding customized frog to list.
    vm.addFrogToList = function (frogname) {
        if (vm.froglist.length === frogLimit || !vm.frogName) {
            return;
        }
        var newlaneNum = vm.froglist.length + 1;
        vm.froglist.push(new Racer(newlaneNum, frogname, 0));
        vm.frogName = '';
    }
    //   var frog1 = new Racer (1, {{frog.name}}, 1);
    //   Racer.name.push();
    
    
    vm.test = RacingService.addTwoNumbers(3, 3);


    // vm.froglist = [vm.frog1, vm.frog2, vm.frog3];
    // vm.frog1.push  is there a way to push the frogs to an array?
    
    function Racer(LaneNum, name, posX) {
        this.LaneNum = LaneNum;
        this.name = name;
        this.posX = posX;
    }

    function checkWinners() {
        var potentialWinners = [];
        vm.winners = [];
        vm.froglist.forEach(function (frog) {
            if (frog.posX >= finishLine) {
                potentialWinners.push(frog);
            }
        });
        if (potentialWinners.length > 0) {
            var firstToCross = 0;
            var firstPlace;
            potentialWinners.forEach(function (frog) {
                if (frog.posX > firstToCross) {
                    firstToCross = frog.posX;
                    firstPlace = frog;
                } else {
                    vm.winners.push(frog);
                }
            });
            vm.winners.unshift(firstPlace);
            vm.racing = false;
        } else {
            vm.winners = potentialWinners;
        }
    }

    function moveFrogs() {
        if (vm.racing) {
            var indexOfFrogToMove = Math.floor(Math.random() * vm.froglist.length);
            vm.froglist[indexOfFrogToMove].posX += Math.random() * 3;
            $timeout(moveFrogs, 50)
        }
        checkWinners();
        // vm.froglist.forEach(function(frog){
        //     frog.posX += Math.random();
        // })
    }

    vm.startRace = function () {
        vm.racing = true;
        moveFrogs();
    }

    vm.reset = function () {
        vm.froglist.forEach(function (frog) {
            frog.posX = 1;
        });
    }
    // Betters Below Here
    // -----------------------------------------------
    vm.joe = new Guy('joe', 100);
    vm.bob = new Guy('bob', 150);

    function Guy(name, startingCash) {
        this.name = name;
        this.cash = startingCash;
        this.giveCash = function (amount) {
            if (amount <= this.cash && amount > 0) {
                this.cash = this.cash - amount;
                return amount;
            } else {
                alert("I don't have enough cash to give you " + amount + ". " + this.name + " says...");
                return 0;
            }
        };
        this.receiveCash = function (amount) {
            if (amount > 0) {
                this.cash = this.cash + amount;
                return amount;
            } else {
                alert(amount + " isn't an amount I'll take " + this.name + " says...");
                return 0;
            }
        }
    }
    vm.giveMoneyToJoe = function () {
        if (vm.bank >= 10) {
            vm.bank -= vm.joe.receiveCash(10)
        } else {
            alert("The bank is out of money.")
        }
    }

    vm.receiveMoneyFromBob = function () {
        vm.bank += vm.bob.giveCash(5)
    }
}

app.service('BettingService', BettingService);
function BettingService() {
    var _races = {};
    var _raceId = 0;
    this.registerRace = function () {

    }
    this.getRace = function (raceId) {

    }
    var race = function () {
        this.id = _raceId;
        this.tickets = 1300;
        this.contestants = [];
        this.open = true;
        this.bets = {};
        _races[this.id] = this;
        _raceId++;
    }
}