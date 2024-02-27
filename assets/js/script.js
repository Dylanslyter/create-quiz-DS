
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;
let questions = [ 
    {"question":"Which planet is known as the Red Planet?","answers":["Earth", "Pluto", "Venus", "Mars"], correctAnswerIndex:3},
    {"question":"What is the largest animal?","answers":["Whale", "Skunk", "Turtle", "Dog"], correctAnswerIndex:0},
    {"question":"What is the smallest animal?","answers":["Ryno", "Cat", "Mouse", "turtle"], correctAnswerIndex:2}
]
let responses = []
function startQuiz(){
  displayQuestion();
  startTimer();
}
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
  
    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.addEventListener("click", () => {
        checkAnswer(index);
      });
      optionsContainer.appendChild(button);
    });
  }
function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctAnswerIndex) {
    responses.push(true) 
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        endGame();
      }
    } else { 
        responses.push(false)
      timeLeft -= 10; 
      if (timeLeft <= 0) {
        endGame();
    }
  }
}
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}
function endGame() {
    clearInterval(timerInterval);
    saveScore(); 
  }
  
  function saveScore() {
    const initials = prompt("Enter your initials:");
    let score = 0;
    responses.forEach(response => {
      if (response === true) {
        score++;
      }
    });
    score =  (score/responses.length) *100
    document.getElementById('question').innerHTML = ''
    document.getElementById('options').textContent = initials + " " + score
    document.getElementById('timer').innerHTML = ''
    localStorage.setItem('score', score);
  }
  
  document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById('start-button').style.display = 'none';
    startQuiz();
  });
