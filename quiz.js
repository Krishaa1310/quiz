document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        {
            question: "What is the correct way to declare a JavaScript variable?",
            options: ["var myVar;", "variable myVar;", "v myVar;", "let: myVar;"],
            answer: "var myVar;"
        },
        {
            question: "Which symbol is used for comments in JavaScript?",
            options: ["//", "<!-- -->", "**", "/* */"],
            answer: "//"
        },
        {
            question: "Which function is used to parse a string to an integer?",
            options: ["parseInt()", "toInteger()", "parseInteger()", "int()"],
            answer: "parseInt()"
        },
        {
            question: "What does 'DOM' stand for in JavaScript?",
            options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Data Oriented Model"],
            answer: "Document Object Model"
        },
        {
            question: "Which keyword is used to define a constant variable in JavaScript?",
            options: ["var", "let", "const", "static"],
            answer: "const"
        },
        {
            question: "Which method is used to add an element at the end of an array?",
            options: ["push()", "add()", "append()", "insert()"],
            answer: "push()"
        },
        {
            question: "What will `typeof null` return in JavaScript?",
            options: ["null", "undefined", "object", "string"],
            answer: "object"
        },
        {
            question: "How do you write a function in JavaScript?",
            options: ["function = myFunction()", "function myFunction() {}", "def myFunction()", "func myFunction() {}"],
            answer: "function myFunction() {}"
        },
        {
            question: "Which loop executes at least once, even if the condition is false?",
            options: ["for", "while", "do...while", "foreach"],
            answer: "do...while"
        },
        {
            question: "Which operator is used for strict equality comparison?",
            options: ["==", "===", "!=", "!=="],
            answer: "==="
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 1500; // 25 minutes in seconds

    const quizContainer = document.getElementById("quiz");
    const timerElement = document.getElementById("timer");
    const nextButton = document.getElementById("nextBtn");
    const prevButton = document.getElementById("prevBtn");
    const submitButton = document.getElementById("submitBtn");

    function startTimer() {
        const timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                endQuiz();
            }
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timeLeft--;
        }, 1000);
    }

    function showQuestion() {
        if (currentQuestionIndex < 0) {
            currentQuestionIndex = 0;
        }
        if (currentQuestionIndex >= questions.length) {
            endQuiz();
            return;
        }

        const questionObj = questions[currentQuestionIndex];
        quizContainer.innerHTML = `<h3>${questionObj.question}</h3>`;

        questionObj.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", () => checkAnswer(option));
            quizContainer.appendChild(button);
        });

        // Show/Hide buttons based on question index
        prevButton.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
        nextButton.style.display = currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";
        submitButton.style.display = currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
    }

    function checkAnswer(selectedOption) {
        if (selectedOption === questions[currentQuestionIndex].answer) {
            score++;
        }
    }

    nextButton.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        }
    });

    prevButton.addEventListener("click", () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
    });

    submitButton.addEventListener("click", () => {
        endQuiz();
    });

    function endQuiz() {
        quizContainer.innerHTML = `<h2>Quiz Over!</h2><p>Your Score: ${score} / ${questions.length}</p>`;
        nextButton.style.display = "none";
        prevButton.style.display = "none";
        submitButton.style.display = "none";
    }

    startTimer();
    showQuestion();
});