const startButton = document.querySelector(".start_button button");
const info_box = document.querySelector(".info_box");
const exitButton = info_box.querySelector(".buttons .quit");
const continueButton = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeLine = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
startButton.onclick = () => {
    info_box.classList.add("activeInfo");
}
exitButton.onclick = () => {
    info_box.classList.remove("activeInfo");
}
continueButton.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    questionCounter(1);
    startTimer(15);
    startTimerLine(0);
}
let timeValue =  15;
let questionCount = 0;
let questionNumber = 1;
let userScore = 0;
let widthValue = 0;
let counter;
let counterLine;
const restartQuiz = result_box.querySelector(".buttons .restart");
const quitQuiz = result_box.querySelector(".buttons .quit");
restartQuiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue = 15; 
    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(questionCount);
    questionCounter(questionNumber);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    nextButton.classList.remove("show");
}
quitQuiz.onclick = () => {
    window.location.reload();
}
const nextButton = document.querySelector("footer .next_button");
const bottomQuestionCounter = document.querySelector("footer .total_que");
nextButton.onclick = () => {
    if(questionCount < questions.length - 1){
        questionCount++;
        questionNumber++;
        showQuestions(questionCount);
        questionCounter(questionNumber);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        nextButton.classList.remove("show");
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for(i=0;i < option.length;i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    const allOptions = option_list.children.length;
    if(userAnswer == correctAnswer){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend",tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend",crossIconTag);
        console.log("Wrong Answer");
        for(i=0;i < allOptions;i++){
            if(option_list.children[i].textContent == correctAnswer){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0;i < allOptions;i++){
        option_list.children[i].classList.add("disabled");
    }
    nextButton.classList.add("show");
}
function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }else if(userScore > 1){
        let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }else{
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeText.textContent = "Time Off";
            const allOptions = option_list.children.length;
            let correctAnswer = questions[questionCount].answer;
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correctAnswer){
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend",tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
            nextButton.classList.add("show");
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}
function questionCounter(index){
    let totalQuestionCountTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottomQuestionCounter.innerHTML = totalQuestionCountTag;
}