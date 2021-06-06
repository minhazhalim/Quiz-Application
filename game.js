const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score-text');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestions = {};
let availableQuestions = [];
let questions = [];
let questionCounter = 0;
let score = 0;
let acceptingAnswers = false;
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
.then((response) => {
     return response.json();
})
.then((loadedQuestions) => {
     questions = loadedQuestions.results.map((loadedQuestion) => {
          const formattedQuestion = {
               question: loadedQuestion.question
          };
          const answerChoices = [...loadedQuestion.incorrect_answers];
          formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
          answerChoices.splice(formattedQuestion.answer - 1,0,loadedQuestion.correct_answer);
          answerChoices.forEach((choice,index) => {
               formattedQuestion['choice' + (index + 1)] = choice;
          });
          return formattedQuestion;
     });
     startGame();
})
.catch((error) => {
     console.error(error);
});
const correctBonus = 10;
const maxQuestions = 3;
startGame = () => {
     questionCounter = 0;
     score = 0;
     availableQuestions = [...questions];
     getNewQuestion();
     game.classList.remove('hidden');
     loader.classList.add('hidden');
};
getNewQuestion = () => {
     if(availableQuestions.length === 0 || questionCounter >= maxQuestions){
          localStorage.setItem('mostRecentScore',score);
          return window.location.assign('end.html');
     }
     questionCounter++;
     progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;
     progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;
     const questionIndex = Math.floor(Math.random() * availableQuestions.length);
     currentQuestion = availableQuestions[questionIndex];
     question.innerText = currentQuestion.question;
     choices.forEach((choice) => {
          const number = choice.dataset['number'];
          choice.innerText = currentQuestion['choice' + number];
     });
     availableQuestions.splice(questionIndex,1);
     acceptingAnswers = true;
};
choices.forEach((choice) => {
     choice.addEventListener('click',(event) => {
          if(!acceptingAnswers) return;
          acceptingAnswers = false;
          const selectedChoice = event.target;
          const selectedAnswer = selectedChoice.dataset['number'];
          const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
          if(classToApply === 'correct'){
               incrementScore(correctBonus);
          }
          selectedChoice.parentElement.classList.add(classToApply);
          setTimeout(() => {
               selectedChoice.parentElement.classList.remove(classToApply);
               getNewQuestion();
          },1000);
     });
});
incrementScore = (number) => {
     score += number;
     scoreText.innerText = score;
};