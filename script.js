function renderStartPage() {
  $('main').html(`
  <section class="start-page">
    <h1>Think you know the stats of the axe?<br>Well let's just see!</h1>
    <button type="button" class="start-button">Let's Rock!</button>
  </section>
  `)
}

function renderQuestion() {
  let question = getCurrentQuestion()
  $('main').html(`
  <section class="question-screen">
    <form class="question-form">
      <fieldset class="radio">
        <legend>${question.text}</legend><br>
        <label>
        <input type="radio" value="${question.answer1}" name="choices" required>${question.answer1}<br>
        </label>
        <label>
        <input type="radio" value="${question.answer2}" name="choices" required>${question.answer2}<br>
        </label>
        <label>
        <input type="radio" value="${question.answer3}" name="choices" required>${question.answer3}<br>
        </label>
        <label>
        <input type="radio" value="${question.answer4}" name="choices" required>${question.answer4}<br>
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  </section>
    
  `)
}

function renderAnswer(answer, correctAnswer) {
  if (answer === correctAnswer) {
    $('main').html(`
    <section class="correct-answer-screen">
      <h1 class="correct">Correct!</h1>
      <div class="confirm-answer">The answer is:</div>
      <div>${correctAnswer}</div>
      <br>
      <button type="button" class="next-question">Next</button
    </section>
    `)
  }else {
    $('main').html(`
    <section class="wrongAnswerScreen">
      <h1 class="incorrect">Wrong!</h1>
      <div class="compare-answers">You answered:</div>
      <div>${answer}</div>
      <br>
      <div>The correct answer was:</div>
      <div>${correctAnswer}</div>
      <br>
      <button type="button" class="next-question">Next</button>
    </section>
    `)
  }
}


function getFeedback() {
  let passed = getScore() === totalQuestions()
  $('main').html(`
  <section class="pass-fail-screen">
    <h1 class="pass-message"> ${passed ? "You passed the guitar quiz! Standing ovation!" : "You failed! Better break out the wah wah pedal...get it??"}</h1>
    <br>
    <br>
    <div><span class="final-score">Final Score</span>: <span class="score">${getScore()}</span>/${totalQuestions()}</div>
    <br>
    <button type="button" class="start-button">Play Again</button>
    </section>
  `)
}

function updateScore() {
  $('.score').html(currentScore)
  let questionNumber = currentQuestion + 1
  questionNumber = Math.min(questionNumber, totalQuestions())
  $('.questionNumber').html(questionNumber)
}

function handleStartQuiz() {
  $('main').on('click', '.start-button', event => {
    currentScore = 0
    currentQuestion = 0
    updateScore()
    renderQuestion()
  })
}

function handleAnswerSubmit() {
  $('main').on('submit','form', event => {
    event.preventDefault()
    let answer = $('input[name="choices"]:checked', '.question-form').val()
    let isCorrect = checkAnswer(answer, currentQuestion)
    if (isCorrect) {
      currentScore += 1
      updateScore()
    }
    renderAnswer(answer, getCorrectAnswer(currentQuestion))
  })
}

function handleNextQuestion() {
  $('main').on('click', '.next-question', event => {
    currentQuestion += 1
    updateScore()
    if (currentQuestion >= STORE.length) {
      getFeedback()
    }else {
      renderQuestion()
    }
  })
}
/////////////////////////////////////////////////////////////

// Utility functions to get data to populate with jQuery
function checkAnswer(answer, questionNumber) {
  let question = STORE[questionNumber]
  let correctAnswer = getCorrectAnswer(questionNumber)
  return correctAnswer === answer
}

function getCorrectAnswer(questionNumber) {
  return ANSWERS[questionNumber]
}

function getCurrentQuestion() {
  return STORE[currentQuestion]
}

function getScore() {
  return currentScore
}

function totalQuestions(){
  return STORE.length
}

// Another way to interpret $(function() { }) is like this:
//
//Hey $ or jQuery, can you please call this function I am passing as an argument once the DOM has loaded?
// function handleSetup() {
$(function handleSetup() {
    handleStartQuiz()
    handleAnswerSubmit()
    handleNextQuestion()
    updateScore()
    renderStartPage()
  })