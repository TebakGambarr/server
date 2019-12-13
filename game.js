"use strict"

function randomizer(round) {
  while (used.length < round) {
    let word = nouns[Math.floor(Math.random() * nouns.length)]
    if (!used.includes(word)) {
      used.push(word)
    }
  }
  return used
}

function setPoint(playersNum) {
  let points;
  if (playersNum === 2) {
    points = [20, 10]
  } else if (playersNum === 3) {
    points = [30, 20, 10]
  } else if (playersNum === 4) {
    points = [40, 30, 20, 10]
  } else {
    points = [50, 40, 30, 20, 10]
  }
  return points;
}

function timer(time) {
  var timeleft = time;
  var downloadTimer = setInterval(function(){
  console.log(timeleft)
  // document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  timeleft--;
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    console.log('finished')
    // document.getElementById("countdown").innerHTML = "Finished"
  }
}, 1000);
}

function startGame(round, players, time) {
  let points = setPoint(playersNum);
  let words = randomizer(round*players.length)
  let timer;
  let players = []
  //listen to answer
  var startDate = new Date();
  var endDate   = new Date();
  var seconds = (endDate - startDate) / 1000; //seconds
  for (let i = 0; i < words.length) {

    // while(timer !== 0) {
    //   if (answer === words[i]) {

    //   }
    // }
  }
}

console.log(startGame(2, ['a', 'b', 'c'], 20))


