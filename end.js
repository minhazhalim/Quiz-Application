const username = document.getElementById('username');
const saveScoreButton = document.getElementById('saveScoreButton');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const saveScoreButton = document.getElementById('saveScoreButton');
const maxHighScores = 5;
saveScoreButton.addEventListener('click',saveHighScore);
finalScore.innerText = mostRecentScore;
username.addEventListener('keyup',() => {
     saveScoreButton.disabled = !username.value;
});
function saveHighScore(event){
     event.preventDefault();
     const score = {score: mostRecentScore,name: username.value};
     highScores.push(score);
     highScores.sort((a,b) => b.score - a.score);
     highScores.splice(5);
     localStorage.setItem('highScores',JSON.stringify(highScores));
     window.location.assign('/');
};