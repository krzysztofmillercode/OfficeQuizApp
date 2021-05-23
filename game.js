const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What nickname does Andy give Jim?',
        choice1: 'Prison Mike',
        choice2: 'Jameson',
        choice3: 'Jiminy Cricket',
        choice4: 'Big Tuna',
        answer: 4,
    },
    {
        question:
            "Who was on the jury for the Scranton Strangler case?",
        choice1: "Stanley",
        choice2: "Pam",
        choice3: "Toby",
        choice4: "Phyllis",
        answer: 3,
    },
    {
        question: "What is the name of Pam, Oscar and Toby’s club?",
        choice1: "The Finer Things Club",
        choice2: "Fight Club",
        choice3: "Hooters",
        choice4: "The Finer Literary Club",
        answer: 1,
    },
    {
        question: "What is Pam’s favorite yogurt flavor??",
        choice1: "Strawberry",
        choice2: "Mixed berry",
        choice3: "Vanilla",
        choice4: "Cookie dough",
        answer: 2,
    },
    {
        question: "What is the worst thing about prison, according to Prison Mike?",
        choice1: "The Dementors",
        choice2: "Watchmen",
        choice3: "Diabolical dinners",
        choice4: "Nazgûls",
        answer: 1,
    },
    {
        question: " Finish Dwight’s security code: “The tea in Nepal is very hot…”",
        choice1: "But so is Dwight's",
        choice2: "But the coffe in Peru is much hotter",
        choice3: "But water ain't boiled yet",
        choice4: "Just as Parkour",
        answer: 2,
    },
    {
        question: "What was Plop’s actual name?",
        choice1: "Cody",
        choice2: "Steven",
        choice3: "Pete",
        choice4: "Ron",
        answer: 3,
    },
    {
        question: "Who came up with Suck It?",
        choice1: "Toby Flenderson",
        choice2: "Michael Scott",
        choice3: "Ryan Howard",
        choice4: "David Wallace",
        answer: 4,
    },
    {
        question: "Michael likes waking up to the smell of what in the morning?",
        choice1: "French Toasts",
        choice2: "Bacon",
        choice3: "Garlic",
        choice4: "Freshly cut grass",
        answer: 2,
    },
    {
        question: "Dwight brought who as his date to Michael and Jan’s dinner party?",
        choice1: "His sister",
        choice2: "Jan's sister",
        choice3: "Mose",
        choice4: "His former babysitter",
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()