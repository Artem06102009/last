const problemText = document.getElementById('problem-text');
const theoremImage = document.getElementById('theorem-image');
const stepInputsDiv = document.getElementById('step-inputs');
const resultText = document.getElementById('result');
const newProblemButton = document.getElementById('new-problem-button');
const solvedCountSpan = document.getElementById('solved-count');

let currentProblem = {};
let currentStep = 0;
let stepInputs = [];
let solvedCount = 0;
let currentProblemIndex = 0;
let solvedProblems = [];

const allProblems = {
    pythagorean: [
        {
            text: "Катеты прямоугольного треугольника равны 7 и 24. Найдите гипотенузу этого треугольника.",
            a: 7,
            b: 24,
            correctAnswer: 25,
            steps: [
                { label: "a² + b² = ", answer: 7*7 + 24*24 },
                { label: "c = ", answer: 25 }
            ],
            image: "scale_1200.jpg"
        },
        {
            text: "В прямоугольном треугольнике катет и гипотенуза равны 7 и 25 соответственно. Найдите другой катет этого треугольника.",
            a: 7,
            c: 25,
            correctAnswer: 24,
            steps: [
                { label: "c² - a² = ", answer: 25*25 - 7*7 },
                { label: "b = ", answer: 24 }
            ],
             image: "scale_1200.jpg"
        },
        {
            text: "Катеты прямоугольного треугольника равны 3 и 4. Найдите гипотенузу этого треугольника.",
            a: 3,
            b: 4,
            correctAnswer: 5,
            steps: [
                { label: "a² + b² = ", answer: 3*3 + 4*4 },
                { label: "c = ", answer: 5 }
            ],
            image: "scale_1200.jpg"
        },
        {
            text: "В прямоугольном треугольнике катет и гипотенуза равны 6 и 10 соответственно. Найдите другой катет этого треугольника.",
            a: 6,
            c: 10,
            correctAnswer: 8,
            steps: [
                { label: "c² - a² = ", answer: 10*10 - 6*6 },
                { label: "b = ", answer: 8 }
            ],
            image: "scale_1200.jpg"
        },
        {
            text: "Катеты прямоугольного треугольника равны 5 и 12. Найдите гипотенузу этого треугольника.",
            a: 5,
            b: 12,
            correctAnswer: 13,
            steps: [
                { label: "a² + b² = ", answer: 5*5 + 12*12 },
                { label: "c = ", answer: 13 }
            ],
             image: "scale_1200.jpg"
        },
        {
            text: "В треугольнике известно, что a = 5, b = 12. Найдите радиус описанной около этого треугольника окружности.",
            AB: 5,
            BC: 12,
            correctAnswer: 6.5,
            steps: [
                { label: "a² + b² = ", answer: 5 * 5 + 12 * 12 },
                { label: "c = ", answer: 13 },
                { label: "R = c / 2 = ", answer: 13 / 2 }
            ],
            image: "scale_1200.jpg"
        },
         {
            text: "В треугольнике известно, что c = 25, a = 7. Найдите синус угла напротив стороны a.",
            AB: 24,
            BC: 7,
            correctAnswer: 0.28,
            steps: [
                { label: "sin = a / c = ", answer: 7/25 }
            ],
            image: "scale_1200.jpg"
        }
        
    ],
    cosine: [
        {
            text: "В треугольнике ABC известно, что AB = 5, BC = 10, AC = 11. Найдите косинус угла ABC",
            AB: 5,
            BC: 10,
            AC: 11,
            correctAnswer: 0.04,
            steps: [
                { label: "AC² - AB² - BC² = ", answer: 11 * 11 - 5 * 5 - 10 * 10 },
                { label: "-2 * AB * BC = ", answer: -2 * 5 * 10 },
                { label: "cos(ABC) = ", answer: (11 * 11 - 5 * 5 - 10 * 10) / (-2 * 5 * 10) }
            ],
            image: "image002.jpg"
        },
        {
             text: "В треугольнике ABC известно, что AB = 4, BC = 6, AC = 5. Найдите косинус угла BAC",
            AB: 4,
            BC: 6,
            AC: 5,
            correctAnswer: 0.125,
            steps: [
                { label: "BC² - AB² - AC² = ", answer: 6*6 - 4*4 - 5*5 },
                { label: "-2 * AB * AC = ", answer: -2 * 4 * 5 },
                { label: "cos(BAC) = ", answer: (6*6 - 4*4 - 5*5) / (-2 * 4 * 5)}
            ],
             image: "image002.jpg"
        },
        {
            text: "Найдите неизвестную сторону треугольника ABC, если: AB = 5 см, BC = 8 см, ∠B = 60°",
            AB: 5,
            BC: 8,
            angleB: 60,
            correctAnswer: 7,
            steps: [
                { label: "AB² + BC² - 2 * AB * BC * cos(B) = ", answer: 5 * 5 + 8 * 8 - 2 * 5 * 8 * Math.cos(60 * Math.PI / 180) },
                { label: "AC = ", answer: 7 }
            ],
            image: "image002.jpg"
        },
        {
            text: "Найдите неизвестную сторону треугольника ABC, если: AB = 3 см, AC = 2√2 см, ∠A = 135°.",
            AB: 3,
            AC: 2 * Math.sqrt(2),
            angleA: 135,
            correctAnswer: 5,
            steps: [
                { label: "AB² + AC² - 2 * AB * AC * cos(A) = ", answer: 3 * 3 + (2 * Math.sqrt(2))**2 - 2 * 3 * (2 * Math.sqrt(2)) * Math.cos(135 * Math.PI / 180) },
                { label: "BC = √", answer: 29 }
            ],
             image: "image002.jpg"
        },
    ]
};

function checkAnswer(input, correctAnswer) {
    const userAnswer = parseFloat(input.value);
    const tolerance = 0.1;

    if (Math.abs(userAnswer - correctAnswer) < tolerance) {
        resultText.textContent = 'Правильно! Переходим к следующему шагу.';
        resultText.style.color = 'green';
        currentStep++;
        displayStep();
    } else {
        resultText.textContent = `Неправильно. Попробуйте еще раз.`;
        resultText.style.color = 'red';
        hasError = true;
    }
}

function displayStep() {
    stepInputsDiv.innerHTML = '';

    if (currentStep < currentProblem.steps.length) {
        const step = currentProblem.steps[currentStep];

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('step-input-container');

        const label = document.createElement('label');
        label.textContent = step.label;
        inputContainer.appendChild(label);

        const input = document.createElement('input');
        input.type = 'number';
        input.step = '0.01';
        inputContainer.appendChild(input);

        const checkButton = document.createElement('button');
        checkButton.textContent = "Проверить";
        checkButton.addEventListener('click', () => checkAnswer(input, step.answer));
        inputContainer.appendChild(checkButton);

        stepInputsDiv.appendChild(inputContainer);
    } else {
        resultText.textContent = "Задача решена!";
        if (!hasError) {
            solvedCount++;
            solvedCountSpan.textContent = solvedCount;
        }
        hasError = false;
    }
}

function loadNextProblem() {
    const allProblemsArray = [];

    for (const key in allProblems) {
        allProblemsArray.push(...allProblems[key]);
    }

    if (currentProblemIndex >= allProblemsArray.length) {
        problemText.textContent = "";
        theoremImage.src = "Foiz.Ru_Spasibo_za_uchastie.gif";
        stepInputsDiv.innerHTML = "";
        resultText.textContent = "";
        newProblemButton.disabled = true;
        return;
    }

    currentProblem = allProblemsArray[currentProblemIndex];
    problemText.textContent = currentProblem.text;
    theoremImage.src = currentProblem.image;
    currentStep = 0;
    displayStep();

    currentProblemIndex++;
    resultText.textContent = "";
}

newProblemButton.addEventListener('click', loadNextProblem);
loadNextProblem();