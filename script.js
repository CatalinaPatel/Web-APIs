// Getting elements
const quizBody = document.getElementById("quiz");
const resultsEl = document.getElementById("result");
const finalScoreEl = document.getElementById("finalScore");
const gameoverDiv = document.getElementById("gameover");
const questionsEl = document.getElementById("questions");
const quizTimer = document.getElementById("timer");
const startQuizButton = document.getElementById("startBtn");
const startQuizDiv = document.getElementById("startpage");
const highscoreContainer = document.getElementById("highscoreContainer");
const highscoreDiv = document.getElementById("high-scorePage");
const highscoreInputName = document.getElementById("initials");
const highscoreDisplayName = document.getElementById("highscore-initials");
const endGameBtns = document.getElementById("endGameBtns");
const submitScoreBtn = document.getElementById("submitScore");
const highscoreDisplayScore = document.getElementById("highscore-score");
const buttonA = document.getElementById("a");
const buttonB = document.getElementById("b");
const buttonC = document.getElementById("c");
const buttonD = document.getElementById("d");

//Quiz questions and correct answers
const quizQuestions = [{
    question: "What are variables?",
    choiceA: "Containers for storing data values.",
    choiceB: "The region of light.",
    choiceC: "An action box.",
    choiceD: "A special kind of music from Asia.",
    correctAnswer: "a"
},
{
    question: "Is Java and Javascript the same?",
    choiceA: "True.",
    choiceB: "False.",
    choiceC: "A and B are true.",
    choiceD: "A and B are false.",
    correctAnswer: "b"
},
{
    question: "Which company developed JavaScript?",
    choiceA: "Netscape.",
    choiceB: "Sony.",
    choiceC: "Amazon.",
    choiceD: "Apple.",
    correctAnswer: "a"
},
{
    question: "What is a prompt box?",
    choiceA: "An area in a theatre in which a prompter sits, located in front of the footlights beneath the stage.",
    choiceB: "A music box.",
    choiceC: "A popup that has a notice within it.",
    choiceD: "A box which allows the user to enter input by providing a text box.",
    correctAnswer: "d"
},
{
    question: "What is a function?",
    choiceA: "A block of code designed to perform a particular task.",
    choiceB: "An activity that is natural to or the purpose of a person.",
    choiceC: " A large or formal social event or ceremony.",
    choiceD: "An Array.",
    correctAnswer: "a"
},
];

// Variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

// Question generation
function generateQuizQuestion() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start quiz 
function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function () {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}

// Show quiz score
function showScore() {
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// Record score with name initials
submitScoreBtn.addEventListener("click", function highscore() {


    if (highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});

function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// Scores and initials display
function showHighscore() {
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

//Score and name initials are clreared
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// Go back to play again
function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// Function booleans for question answers
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        currentQuestionIndex++;
        generateQuizQuestion();

        //Answer correct or if incorrect deduct 10 seconds
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        timeLeft = timeLeft - 10;
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    } else {
        showScore();
    }
}

// Start quiz button
startQuizButton.addEventListener("click", startQuiz);