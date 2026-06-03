// =========================================================================
// 1. BASE DE DATOS DEL QUIZ (20 Preguntas)
// =========================================================================
const quizData = [
    { q: "¿Cuál es el nombre completo de Kenia Os?", correct: "Kenia Guadalupe Flores Osuna", wrong: ["Kenia María Flores Osuna", "Kenia Guadalupe Osuna Flores", "Kenia Daniela Flores Osuna"] },
    { q: "¿En qué ciudad y estado nació?", correct: "Mazatlán, Sinaloa, México", wrong: ["Culiacán, Sinaloa, México", "Tijuana, Baja California, México", "Monterrey, Nuevo León, México"] },
    { q: "¿Cómo se llamaba el grupo de creadores del que formó parte?", correct: "Jukilop", wrong: ["Team Os", "Los Polinesios", "Badabun"] },
    { q: "¿Cuál fue el motivo principal de su salida de Jukilop?", correct: "Diferencias y conflictos con el equipo de trabajo de Jukilop.", wrong: ["Quería iniciar su carrera solista de inmediato.", "Se mudó a otro país.", "Problemas de salud personales."] },
    { q: "¿Cómo se llamó el canal que creó junto a su hermana Eloísa?", correct: "Kenia OS Team", wrong: ["Las Osuna", "Kenia y Eloísa", "Hermanas OS"] },
    { q: "¿Qué récord consiguió el concierto virtual 'MelanKOs' en 2021?", correct: "Fue uno de los conciertos virtuales de una artista mexicana con mayor audiencia en línea.", wrong: ["El concierto virtual más largo de la historia.", "La mayor cantidad de boletos físicos vendidos simultáneamente.", "El primer concierto realizado en el metaverso."] },
    { q: "¿Cuál fue su primer álbum de estudio?", correct: "Cambios de Luna (2022)", wrong: ["K23 (2022)", "Pink Aura (2024)", "K de Karma (2026)"] },
    { q: "¿Con qué discográfica firmó en 2021?", correct: "Sony Music México", wrong: ["Universal Music", "Warner Music", "Lizos Music"] },
    { q: "¿Qué carrera estudió por un corto tiempo?", correct: "Mercadotecnia", wrong: ["Diseño Gráfico", "Ciencias de la Comunicación", "Administración de Empresas"] },
    { q: "¿Cómo se llama su marca de maquillaje?", correct: "K Os Beauty", wrong: ["Kenini Cosmetics", "Osuna Beauty", "K Glow"] },
    { q: "¿En qué año abrió Kenia su canal principal de YouTube?", correct: "2015", wrong: ["2014", "2016", "2017"] },
    { q: "¿Cuál fue la primera canción que lanzó como solista?", correct: "“Por Siempre” (2018)", wrong: ["Bonita (2019)", "Mentiroso (2019)", "Cócteles (2020)"] },
    { q: "¿Cómo se llama el álbum que lanzó después de Cambios de Luna?", correct: "K23 (2022)", wrong: ["Pink Aura", "MelanKOs", "K de Karma"] },
    { q: "¿Qué significa el 'OS' de su nombre artístico?", correct: "Proviene de su apellido materno: Osuna.", wrong: ["Son las iniciales de una marca.", "Es una palabra inventada por ella.", "Significa 'Original Star'."] },
    { q: "¿Qué canción de Kenia incluye la frase 'ya no somos ni seremos'?", correct: "Ninguna; esa canción es de Christian Nodal.", wrong: ["Llévatelo", "La Noche", "Malas Decisiones"] },
    { q: "¿Cuál fue el nombre de la gira con la que recorrió varios países en 2023?", correct: "K23 Tour", wrong: ["Cambios de Luna Tour", "Keninis Tour", "Pink Aura Tour"] },
    { q: "¿Cómo se llama la canción que lanzó junto a Gera MX?", correct: "“Diamantes”", wrong: ["Los Santos", "Plutón", "Rumores"] },
    { q: "¿Cuál es el signo zodiacal de Kenia Os?", correct: "Cáncer", wrong: ["Leo", "Géminis", "Virgo"] },
    { q: "¿Cuántos hermanos tiene Kenia?", correct: "Dos: una hermana llamada Eloísa y un hermano llamado César.", wrong: ["Solo una hermana llamada Eloísa.", "Tres hermanos.", "Es hija única."] },
    { q: "¿Cuál es el nombre de su fandom oficial?", correct: "Keninis", wrong: ["Osunas", "K-lovers", "Kenia Fans"] }
];

// =========================================================================
// 2. MOTOR LÓGICO
// =========================================================================

function shuffleArray(array) {
    let curId = array.length;
    while (0 !== curId) {
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}

let selectedQuestions = [];

function loadQuiz() {
    const quizForm = document.getElementById('quiz-form');
    selectedQuestions = shuffleArray([...quizData]).slice(0, 10);
    quizForm.innerHTML = ""; 

    selectedQuestions.forEach((item, index) => {
        let options = shuffleArray([item.correct, ...item.wrong]);
        let questionHTML = `
            <div class="question-block" id="q-block-${index}">
                <div class="question-text">${index + 1}. ${item.q}</div>
                <div class="options-grid">
        `;

        options.forEach((opt) => {
            questionHTML += `
                <label class="option-label" onclick="selectOption(this, ${index})">
                    <input type="radio" name="question${index}" value="${opt}">
                    <span>${opt}</span>
                </label>
            `;
        });

        questionHTML += `</div></div>`;
        quizForm.innerHTML += questionHTML;
    });

    document.getElementById('submit-quiz-btn').style.display = "block";
}

function selectOption(labelElement, questionIndex) {
    let labels = document.querySelectorAll(`#q-block-${questionIndex} .option-label`);
    labels.forEach(lbl => lbl.classList.remove('selected'));
    labelElement.classList.add('selected');
}

// =========================================================================
// 3. EVALUACIÓN Y RESULTADOS
// =========================================================================

document.getElementById('submit-quiz-btn').addEventListener('click', () => {
    let score = 0;
    selectedQuestions.forEach((item, index) => {
        let selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === item.correct) {
            score++;
        }
    });
    showResults(score);
});

function showResults(score) {
    document.getElementById('quiz-form').style.display = "none";
    document.getElementById('submit-quiz-btn').style.display = "none";
    document.querySelector('.quiz-main-title').style.display = "none";
    
    const resultsBox = document.getElementById('quiz-results');
    const scoreText = document.getElementById('score-text');
    const rankText = document.getElementById('rank-text');
    const resultGif = document.getElementById('result-gif'); // Busca la etiqueta IMG

    resultsBox.style.display = "block";
    scoreText.innerText = `${score} / 10`;

    // Forzamos la carga del GIF en el recuadro
    if (resultGif) {
        resultGif.src = "images/kenia_quiz.gif";
    }

    if (score === 10) {
        rankText.innerText = "¡Kenini desde la cuna! 👶✨ Sabes absolutamente todo.";
    } else if (score === 9) {
        rankText.innerText = "Kenini veterano 👑. Casi perfecto, ¡mis respetos!";
    } else if (score >= 7) {
        rankText.innerText = "Kenini de corazón ❤️. Conoces muy bien su historia.";
    } else if (score >= 4) {
        rankText.innerText = "Kenini en proceso 🎧. ¡Te falta escuchar un poco más de su discografía!";
    } else {
        rankText.innerText = "¿Villano encubierto? 🦂 Ouch, toca repasar la historia de Kenia.";
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onload = loadQuiz;