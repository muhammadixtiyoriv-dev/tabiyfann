const stages = [
    {
        organ: "Og‘iz",
        title: "Oziq-ovqat og‘izga kirdi!",
        description:
            "Og‘izda ovqat chaynaladi va so‘lak bilan aralashadi. So‘lak tarkibidagi fermentlar hazm jarayonini boshlaydi.",
        question: "So‘lakning hazmdagi asosiy vazifalaridan biri nima?",
        answers: [
            "Ovqat hazmini boshlash",
            "Qonni tozalash",
            "Kislorod yetkazish",
            "Suvni ichakdan chiqarish"
        ],
        correct: 0,
        emoji: "👄"
    },

    {
        organ: "Qizilo‘ngach",
        title: "Ovqat qizilo‘ngachdan o‘tmoqda!",
        description:
            "Yutilgan ovqat qizilo‘ngach orqali oshqozon tomon harakat qiladi.",
        question: "Ovqat qizilo‘ngach bo‘ylab qanday harakat qiladi?",
        answers: [
            "Peristaltik harakat bilan",
            "Qon orqali",
            "Nafas olish orqali",
            "Faqat tortishish kuchi bilan"
        ],
        correct: 0,
        emoji: "⬇️"
    },

    {
        organ: "Oshqozon",
        title: "Ovqat oshqozonga tushdi!",
        description:
            "Oshqozon ovqatni aralashtiradi. Oshqozon shirasi va fermentlar ovqatning parchalanishida ishtirok etadi.",
        question: "Oshqozon shirasi tarkibidagi qaysi modda muhim?",
        answers: [
            "Xlorid kislota",
            "Kislorod",
            "Gemoglobin",
            "Kalsiy"
        ],
        correct: 0,
        emoji: "🥣"
    },

    {
        organ: "Ingichka ichak",
        title: "Eng muhim bosqich — ingichka ichak!",
        description:
            "Ingichka ichakda hazm jarayoni davom etadi va oziq moddalarning katta qismi qonga so‘riladi.",
        question: "Oziq moddalarning asosiy qismi qayerda so‘riladi?",
        answers: [
            "Ingichka ichakda",
            "Og‘izda",
            "Qizilo‘ngachda",
            "Yo‘g‘on ichakda"
        ],
        correct: 0,
        emoji: "〰️"
    },

    {
        organ: "Yo‘g‘on ichak",
        title: "Ovqat qoldiqlari yo‘g‘on ichakka yetdi!",
        description:
            "Yo‘g‘on ichakda suv va ayrim elektrolitlar so‘riladi. Qoldiq massa shakllanadi.",
        question: "Yo‘g‘on ichakning muhim vazifalaridan biri nima?",
        answers: [
            "Suvni so‘rish",
            "Kislorod ishlab chiqarish",
            "Ovqatni og‘izda chaynash",
            "Qonni yurakka haydash"
        ],
        correct: 0,
        emoji: "🌀"
    },

    {
        organ: "To‘g‘ri ichak",
        title: "Hazm yo‘lining oxirgi qismi!",
        description:
            "Hazm bo‘lmagan qoldiqlar to‘g‘ri ichakka kelib, chiqarilishidan oldin vaqtincha saqlanadi.",
        question: "To‘g‘ri ichakning asosiy vazifasi nima?",
        answers: [
            "Qoldiqlarni vaqtincha saqlash",
            "So‘lak ishlab chiqarish",
            "Oshqozon shirasi ishlab chiqarish",
            "Oziqni chaynash"
        ],
        correct: 0,
        emoji: "🔄"
    },

    {
        organ: "Anal teshik",
        title: "Sarguzasht yakunlandi!",
        description:
            "Hazm bo‘lmagan qoldiqlar organizmdan chiqariladi. Sen ovqatning hazm tizimidagi yo‘lini to‘liq bosib o‘tding!",
        question: "Hazm tizimining oxirida qoldiqlar qayerdan chiqariladi?",
        answers: [
            "Anal teshik orqali",
            "Burun orqali",
            "Qizilo‘ngach orqali",
            "Oshqozon orqali"
        ],
        correct: 0,
        emoji: "🚪"
    }
];


let currentStage = 0;
let score = 0;
let lives = 3;
let locked = false;


const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const stageName = document.getElementById("stageName");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

const questionNumber = document.getElementById("questionNumber");
const questionTitle = document.getElementById("questionTitle");
const description = document.getElementById("description");
const answersBox = document.getElementById("answers");
const message = document.getElementById("message");
const food = document.getElementById("food");

const resultScreen = document.getElementById("resultScreen");
const finalScore = document.getElementById("finalScore");
const resultText = document.getElementById("resultText");
const restartBtn = document.getElementById("restartBtn");


function showStage() {

    locked = false;

    const stage = stages[currentStage];

    questionNumber.textContent =
        `BOSQICH ${currentStage + 1}`;

    stageName.textContent =
        `${currentStage + 1} / ${stages.length} — ${stage.organ}`;

    const percent =
        Math.round(((currentStage + 1) / stages.length) * 100);

    progressText.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;

    questionTitle.textContent = stage.title;
    description.textContent = stage.description;

    food.textContent = stage.emoji;

    message.textContent = "";

    answersBox.innerHTML = "";

    stage.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer";
        button.type = "button";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersBox.appendChild(button);
    });

    updateOrgans();
}


function updateOrgans() {

    const organs =
        document.querySelectorAll(".organ");

    organs.forEach((organ, index) => {

        organ.classList.remove("active");

        if (index < currentStage) {
            organ.classList.add("done");
        }

        if (index === currentStage) {
            organ.classList.add("active");
        }
    });
}


function checkAnswer(index, button) {

    if (locked) return;

    locked = true;

    const stage = stages[currentStage];
    const allButtons =
        document.querySelectorAll(".answer");

    if (index === stage.correct) {

        score += 10;

        scoreElement.textContent = score;

        button.classList.add("correct");

        message.textContent =
            "✅ To‘g‘ri! +10 ball";

        message.style.color = "#61e6c4";

        setTimeout(() => {

            if (currentStage < stages.length - 1) {

                currentStage++;
                showStage();

            } else {

                finishGame();
            }

        }, 900);

    } else {

        lives--;

        livesElement.textContent = lives;

        button.classList.add("wrong");

        message.textContent =
            "❌ Noto‘g‘ri javob!";

        message.style.color = "#ff7b88";

        allButtons[stage.correct].classList.add("correct");

        if (lives <= 0) {

            setTimeout(() => {
                finishGame();
            }, 1000);

        } else {

            setTimeout(() => {
                locked = false;
                message.textContent =
                    "Yana bir marta urinib ko‘r!";
            }, 900);
        }
    }
}


function finishGame() {

    finalScore.textContent = score;

    if (score === 70) {

        resultText.textContent =
            "🔥 Ajoyib! Sen hazm tizimining barcha bosqichlarini juda yaxshi bilasan!";

    } else if (score >= 50) {

        resultText.textContent =
            "👏 Juda yaxshi! Hazm tizimi haqida yaxshi bilimga egasan.";

    } else if (score >= 30) {

        resultText.textContent =
            "👍 Yaxshi harakat! Mavzuni yana bir marta takrorlasang yanada yaxshi bo‘ladi.";

    } else {

        resultText.textContent =
            "📚 Hazm tizimi mavzusini yana bir bor o‘rganib chiq va qayta urinib ko‘r!";
    }

    resultScreen.classList.add("show");
}


restartBtn.addEventListener("click", () => {

    currentStage = 0;
    score = 0;
    lives = 3;

    scoreElement.textContent = score;
    livesElement.textContent = lives;

    resultScreen.classList.remove("show");

    showStage();
});


showStage();