
const questions = [
{
    question: "Which tag makes the biggest heading?",
    options: ["<h6>", "<h1>", "<p>"],
    answer: 1
},
{
    question: "Which property changes an element's text color in CSS?",
    options: ["color", "font-color", "text-color"],
    answer: 0
},
{
    question: "Which method adds an item to the end of an array?",
    options: ["shift()", "push()", "pop()"],
    answer: 1
},
{
    question: "What does `===` check?",
    options: ["Value only", "Value and type", "Type only"],
    answer: 1
},
{
    question: "Which keyword declares a variable that cannot be reassigned?",
    options: ["let", "var", "const"],
    answer: 2
},
{
    question: "Which of these selects an element by its id?",
    options: ["querySelector('.id')", "getElementById()", "getElementsByClassName()"],
    answer: 1
}
];


const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");
const restartBtn = document.getElementById("restart");

let current = 0;
let score = 0;

function showQuestion() {
    if (current >= questions.length) {
        progressEl.textContent = "Quiz complete";
        questionEl.textContent = `You scored ${score} out of ${questions.length} questions.`;
        scoreEl.textContent = `Score: ${score}`;
        optionsEl.innerHTML = "";
        restartBtn.hidden = false;
        return;
    }

    const q = questions[current];
    progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.addEventListener("click", () => {
            if (index === q.answer) {
                score++;
            }
            current++;
            showQuestion();
        });
        btn.textContent = option;
        optionsEl.appendChild(btn);
    });
}

restartBtn.addEventListener("click", () => {
    current = 0;
    score = 0;
    scoreEl.textContent = "";
    restartBtn.hidden = true;
    showQuestion();
});

showQuestion();
