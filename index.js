const localStorage = window.localStorage;

const players = ['Shweta', 'Nikhil', 'Joy', 'Shaanika', 'Adib', 'Janna', 'Kevin', 'Lynn', 'Shawn', 'Medha'];
const startingCoins = 4;

const resultMap = {
	1: 'shin',
  2: 'hei',
  3: 'gimel',
  4: 'nun',
}

const hiddenClass = 'hidden';

function getTurn() {
  return localStorage.getItem('turn');
}

$(document).ready(function() {
	if (getTurn() == null) {
  	restartGame();
  }
	populateTurn();
  updateScores();
  
  $('#resetButton').click(function() {
  	restartGame();
  });

	$('#spinButton').click(function() {
    disableButton(true);
    
  	spinTime = Math.ceil(Math.random() * 3000 + 2000);
    spinResult = resultMap[Math.ceil(Math.random() * 4)];
    
    // go to spinning state
    spinningState();
    
    // in some seconds, go to spin state
    window.setTimeout(() => {
    	spunState(spinResult);
      disableButton(false);
    }, spinTime);
  });
});

function disableButton(disabledState) {
	$('#spinButton').prop("disabled", disabledState);
}

function spinningState() {
 // Set display states
 $('#marqueeTitle').removeClass(hiddenClass);
 $('<iframe class="hidden" width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/926563318&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>')
     .appendTo('.scrollable');
  $('#pageTitle').addClass(hiddenClass);
     
 $('#steadyState').addClass(hiddenClass);
 $('#spinningState').removeClass(hiddenClass);
 $('#spunState').addClass(hiddenClass);
 
 
}

function spunState(spinResult) {
  // Update spreadsheet
  updateSpreadsheet(spinResult);

  // Set display states
  $('#result').removeClass().addClass(spinResult);
  $('#steadyState').addClass(hiddenClass);
 
 $('#spinningState').addClass(hiddenClass);
  $('#spunState').removeClass(hiddenClass);
  $('#marqueeTitle').addClass(hiddenClass);
  $('#pageTitle').removeClass(hiddenClass);
  setTimeout(() => {
  	$('.scrollable').children().last().remove();
  }, 20000)

	return Promise.resolve();
}

function populateTurn(opt_updates) {
  const turn = getTurn();
	$('#turn').html((opt_updates ? opt_updates : '') + ".<br/>Now, it's <b>" + turn + "</b>'s turn!");
}

function restartGame() {
	players.forEach(player => localStorage.setItem(player, startingCoins));
  localStorage.setItem('center', 1);
  localStorage.setItem('turn', players[0]);
  populateTurn();
  updateScores();
}

function updateSpreadsheet(spinResult) {
	let updatesStr = '';
  const playerPoints = getPlayerScore(getTurn());
  const centerPoints = getPlayerScore('center');
  
  switch(spinResult) {
    case 'shin':
      // Player adds to pot
      if (playerPoints > 0) {
      	localStorage.setItem(getTurn(), playerPoints - 1);
      	localStorage.setItem('center', centerPoints + 1);
				updatesStr = (getTurn() + ' put 1 into the center');
      }
      break;
    case 'hei':
      // Player gets half of what's in the center
      const halfCenter = Math.ceil(centerPoints / 2);
      localStorage.setItem(getTurn(), playerPoints + halfCenter);
      localStorage.setItem('center', centerPoints - halfCenter);
			updatesStr = (getTurn() + ' got ' + halfCenter + ' from the center');
      break;
    case 'gimel':
      // Player gets all of the center pot
      localStorage.setItem(getTurn(), playerPoints + centerPoints);
      localStorage.setItem('center', 0);
			updatesStr = (getTurn() + ' got all ' + centerPoits + ' from the center 🤑🤑🤑');
      break;
    case 'nun':
      updatesStr = ("Nothing happened (that means you're boring, " + getTurn() + ')');
      break;
    default:
      // why tho. 
  }
  
  // If pot is near empty, everyone's gotta put one coin in
	const pointsInCenter = getPlayerScore('center');
  if (pointsInCenter <= 1) {
		let pointsToAddToCenter = 0;
  	players.forEach(player => {
    	const playerPoints = getPlayerScore(player);
			if (playerPoints > 0) {
				localStorage.setItem(player, playerPoints - 1);
				pointsToAddToCenter++;
			}
			localStorage.setItem('center', pointsInCenter + pointsToAddToCenter);
    });
  }
  
  // Next person's turn
  const playerIndex = players.indexOf(getTurn());
  let nextPlayer = null;
	let i = playerIndex < players.length - 1 ? playerIndex++ : 0;
  while (i != playerIndex) {
		if (getPlayerScore(player) > 0) {
			nextPlayer = players[i];
			break;
		}
		i++;
	}

	// see if game is over
	let numPeopleWithCoins = 0;
	let potentialWinner = null;
	players.forEach(player => {
		if (getPlayerScore(player) > 0) {
			numPeopleWithCoins++;
			potentialWinner = player;
		}
	});
	if (numPeopleWithCoins === 1) {
		alert(potentialWinner + ' wins with a total of ' + getPlayerScore(potentialWinner) + '! Woohoo!');
		restartGame();
		return;
	}

  localStorage.setItem('turn', nextPlayer);
  
  updateScores();
  populateTurn(updatesStr);
}

function updateScores() {
	let str = '<tr id="centerRow"><td>CENTER</td><td>' + getPlayerScore('center') + '</td></tr>';
  players.forEach(player => {
  	str += '<tr><td>' + player + '</td><td class="score">' + getPlayerScore(player) + '</td></tr>';
  });
	$('#scoreTable').html(str);
}

function getPlayerScore(player) {
	return parseInt(localStorage.getItem(player));
}
