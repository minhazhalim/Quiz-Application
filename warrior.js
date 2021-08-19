const quizDatabase = [
     {
          question: "Q1: What is the full form of HTML?",
          a: "Hello to my Land",
          b: "Hey Text Markup Language",
          c: "HyperStyle Markup Language",
          d: "HyperText Markup Language",
          answer: "answer4",
     },
     {
          question: "Q2: What is the full form of CSS?",
          a: "Cascading Style Sheets",
          b: "Cascading Style Sheep",
          c: "Cartoon Style Sheets",
          d: "Cascading Super Sheets",
          answer: "answer1",
     },
     {
          question: "Q3: What is the full form of HTTP?",
          a: "HyperLink Transfer Protocol",
          b: "HyperText Test Protocol",
          c: "Hey Transfer Protocol",
          d: "HyperText Transfer Protocol",
          answer: "answer4",
     },
     {
          question: "Q4: What is the full form of JS?",
          a: "JavaScript",
          b: "JavaSuper",
          c: "JustScript",
          d: "JordanShoes",
          answer: "answer1",
     },
];
const question = document.querySelector('.question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const submit = document.querySelector('#submit');
const scoreArea = document.querySelector('#scoreArea');
const answer = document.querySelectorAll('.answer');
let questionCount = 0;
let score = 0;
const loadQuestion = () => {
     const questionList = quizDatabase[questionCount];
     question.innerText = questionList.question;
     option1.innerText = questionList.a;
     option2.innerText = questionList.b;
     option3.innerText = questionList.c;
     option4.innerText = questionList.d;
};
loadQuestion();
const getCheckAnswer = () => {
     let results;
     answer.forEach((currentAnswerElement) => {
          if(currentAnswerElement.checked){
               results = currentAnswerElement.id;
          }
     });
     return results;
};
const deselectAll = () => {
     answer.forEach((currentAnswerElement) => {
          currentAnswerElement.checked = false;
     });
};
submit.addEventListener('click',() => {
     const checkedAnswer = getCheckAnswer();
     if(checkedAnswer === quizDatabase[questionCount].answer){
          score++;
     }
     questionCount++;
     deselectAll();
     if(questionCount < quizDatabase.length){
          loadQuestion();
     }else{
          showScore.innerHTML = `
               <h3>Your Scored ${score}/${quizDatabase.length}</h3>
               <button class="button" onclick="location.reload()">Play Again</button>
          `;
          showScore.classList.remove('scoreArea');
     }
});