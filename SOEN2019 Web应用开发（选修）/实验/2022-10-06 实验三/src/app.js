// constants
const divTest = document.querySelector('#test')
const divReadme = document.querySelector('#readme')
const divQuestion = document.querySelector('#question')
const divResult = document.querySelector('#result')
const operators = ['+', '-', '*', '/']

// global variables
let questionCount = 0
/**
 * @type {number}
 */
let questionNum
/**
 * @type {number}
 */
let expectedAnswer
/**
 * @type {string}
 */
let question
/**
 * Used to store question, expectedAnswer and userAnswer
 * @type {[string, number, number][]}
 */
const answers = []

// main logic
init()

const startButton = document.querySelector('#start-button')
startButton.addEventListener('click', start)

const nextButton = document.querySelector('#next-button')
nextButton.addEventListener('click', () => {
  // return if answer invalid
  if (!saveUserAnswer()) {
    return
  }

  questionCount++

  // commit when all questions are answered
  if (questionCount === questionNum) {
    commit()
  } else {
    generateQuestion()
  }
})

const commitButton = document.querySelector('#commit-button')
commitButton.addEventListener('click', commit)

// helper functions
/**
 * Enumerate an iterable
 * @param {Iterable<T>} iter
 * @returns {[number, T]}
 */
function * enumerate (iter) {
  let i = 0
  for (const v of iter) {
    yield [i, v]
    i++
  }
}

/**
 * Initialize the app
 * @returns {void}
 */
function init () {
  divTest.style.display = 'none'
  divResult.style.display = 'none'
}

/**
 * Start the app
 * @returns {void}
 */
function start () {
  const userInput = document.querySelector('#question-num').value
  // convert the input to number
  questionNum = Number.parseFloat(userInput)

  if (Number.isNaN(questionNum)) {
    // if user does not input questionNum
    alert('请输入题数')
    return
  } else if (questionNum <= 0) {
    // if questionNum is negative
    alert('题数不能是非正数')
    return
  } else if (questionNum !== Math.floor(questionNum)) {
    // if questionNum is not integer
    alert('题数必须是整数')
    return
  }

  divTest.style.display = 'block'
  divReadme.style.display = 'none'

  generateQuestion()
}

/**
 * Save user answer from input.
 * Returns false if answer not valid
 * @returns {boolean} saved
 */
function saveUserAnswer () {
  const userAnswer = Number.parseFloat(document.querySelector('#answer').value)
  if (Number.isNaN(userAnswer)) {
    alert('请输入答案')
    return false
  }

  answers.push([question, expectedAnswer, userAnswer])
  return true
}

/**
 * Commit answers and display results
 * @returns {void}
 */
function commit () {
  if (questionCount !== questionNum && !saveUserAnswer()) {
    return
  }

  // log expected answers and user answers
  console.log('[' + answers.map(a => '[' + a.join(', ') + ']').join(', ') + ']')

  divTest.style.display = 'none'
  divResult.style.display = 'block'

  const divAnsweredQuestions = document.querySelector('#answered-questions')
  divAnsweredQuestions.textContent = questionCount.toString()

  const divTotalQuestions = document.querySelector('#total-questions')
  divTotalQuestions.textContent = questionNum.toString()

  // use Array#reduce to calculate correct answers
  const correctAnswers = answers.reduce(
    (correctCount, [_, expectedAnswer, userAnswer]) =>
      expectedAnswer === userAnswer ? correctCount + 1 : correctCount,
    0
  )
  const divCorrectAnswers = document.querySelector('#correct-answers')
  divCorrectAnswers.textContent = correctAnswers.toString()

  const divResultDetails = document.querySelector('#result-details')
  for (const [index, [question, expectedAnswer, userAnswer]] of enumerate(answers)) {
    if (expectedAnswer !== userAnswer) {
      const divDetail = document.createElement('div')
      divDetail.textContent = `第${index +
        1}题 ${question} 错误，正确答案为${expectedAnswer}，您的答案为${userAnswer}`
      divResultDetails.appendChild(divDetail)
    }
  }
  if (divResultDetails.childElementCount === 0) {
    const divResultInfo = document.querySelector('#result-info')
    divResultInfo.textContent = '恭喜您，全部答对！'
  }
}

/**
 * Generate a new question and display
 * @returns {void}
 */
function generateQuestion () {
  // generate v2 (0~9)
  // v2 is generated first to make sure that v1 is an integer
  const v2 = Math.floor(Math.random() * 10)

  // make sure that division is not 0
  const optIndex =
    v2 === 0 ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 4)
  const opt = operators[optIndex]

  // make sure that the answer is not negative and is an integer
  const v1 = generateV1By(opt, v2)

  // calculate the answer
  // eval() is not used here to avoid security issues
  // though it might seem easier to use eval()
  if (opt === '+') {
    expectedAnswer = v1 + v2
  } else if (opt === '-') {
    expectedAnswer = v1 - v2
  } else if (opt === '*') {
    expectedAnswer = v1 * v2
  } else if (opt === '/') {
    expectedAnswer = v1 / v2
  }

  // display the question and expected answer
  console.log({ v1, opt, v2, answer: expectedAnswer })

  question = `${v1} ${opt} ${v2} = ?`
  divQuestion.textContent = question

  /**
   * Generate v1 by operator and v2 (will make sure that the answer is non-negative and integer)
   * @param {number} operator
   * @param {string} v2
   * @returns {number} v1
   */
  function generateV1By (operator, v2) {
    switch (operator) {
      case '+':
        return Math.floor(Math.random() * 10)
      case '-':
        // answer should be positive
        return Math.floor(v2 + Math.random() * (10 - v2))
      case '*':
        return Math.floor(Math.random() * 10) * v2
      case '/':
        // answer should be integer
        if (v2 > 4) {
          return v2 * Math.ceil(Math.random() * 1)
        } else if (v2 > 3) {
          return v2 * Math.ceil(Math.random() * 2)
        } else if (v2 > 2) {
          return v2 * Math.ceil(Math.random() * 3)
        } else if (v2 > 1) {
          return v2 * Math.ceil(Math.random() * 4)
        } else {
          return v2 * Math.ceil(Math.random() * 4)
        }
    }
  }
}
