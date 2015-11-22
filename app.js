(function(){
	var app = angular.module('MemoryGame', []);

	app.controller('CardsController', function() {	// Class
		this.score = 0;
		this.randomCards = genCards(8);	// Usar numero par

		this.genAgain = function(qtd) {
			this.randomCards = genCards(qtd);
		}

		function genCards(qtd) {
			if (qtd%2 != 0) qtd ++;
			var cardsArray = [];

			for (var i=1; i<=qtd/2; i++) {
				var newCard = {
					"id": i,
					"img": "img/"+i+".jpg",
					"imgToShow": "img/faceDown.jpg",
					"faceUp": false,
					"complete": false
				}
				cardsArray.push(newCard);

				var newCard2 = JSON.parse(JSON.stringify(newCard));	//Create a copy
				cardsArray.push(newCard2);	//Guarda dois de cada
			}
			return shuffleArray(cardsArray);
		}

		this.isComplete = function() { //bool
			var count = 0;
			for (var i=0; i<this.randomCards.length; i++) {
				if (this.randomCards[i].complete == true) { count++; }
			}
			if (count == this.randomCards.length) {
				return true;
			} else {
				return false;
			}
		}

		this.faceUpCard = function(card) {
			if (this.haveToFaceDown() == true) {
				if (this.isComplete() == false) {	//Se ainda nao completou
					for (var i=0; i<this.randomCards.length; i++) {
						var c = this.randomCards[i];
						if (c.faceUp == true && c.complete == false) {
							c.faceUp = false;
							c.imgToShow = "img/faceDown.jpg";
						}
					}
					this.score -= 5;
				}
			} else {
				card.faceUp = true;
				card.imgToShow = card.img;

				for (var i=0; i<this.randomCards.length; i++) {
					var par = this.randomCards[i];
					if (par != card && par.id == card.id && par.faceUp == true) {	//For the pair of this card
						card.complete = true;
						par.complete = true;
						this.score += 20;
					}
				}
				if (this.isComplete() == true) {
					alert("You Win!");
					this.score += 50;
				}
			}
		}
		
		this.haveToFaceDown = function() {	//Bool
			var faceUp = 0;
			for (var i=0; i<this.randomCards.length; i++) {
				var c = this.randomCards[i];

				if (c.faceUp == true && c.complete == false) {
					faceUp++;
				}
			}
			if (faceUp == 2) {
				return true
			} else {
				return false;
			}
		}
	});

})();


// Implementing Fisher–Yates shuffle
function shuffleArray(array) {
	var arr = array;
	for (var i = arr.length - 1; i > 0; i--) {
	  var index = random(0, i+1);
	  var a = arr[index];	// Simple swap
	  arr[index] = arr[i];
	  arr[i] = a;
	}
	return arr;
}

function random(inferior, superior) {
    var numPossib = superior - inferior;
	var aleat = Math.random() * numPossib;
	aleat = Math.floor(aleat);
	return parseInt(inferior) + aleat;
}








