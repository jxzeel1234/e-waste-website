// Quiz functionality
let currentQuestion = 1;
let totalQuestions = 5;
let userAnswers = {};
let answeredQuestions = 0;

const correctAnswers = {
    1: 'a', // Less than 20%
    2: 'c', // Used paper
    3: 'a', // Lead
    4: 'b', // Back up data and remove personal info
    5: 'b'  // Authorized e-waste collection centers
};

const questionTexts = {
    1: "What percentage of global e-waste is properly recycled?",
    2: "Which of these is NOT considered e-waste?",
    3: "What toxic chemical is commonly found in e-waste?",
    4: "What should you do before disposing of a mobile phone?",
    5: "Where is the best place to dispose of e-waste?"
};

// Initialize quiz
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    setupQuizOptions();
});

function setupQuizOptions() {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            const question = this.dataset.question;
            const answer = this.dataset.answer;
            
            // Remove selected class from other options in this question
            const questionOptions = document.querySelectorAll(`[data-question="${question}"]`);
            questionOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store answer
            userAnswers[question] = answer;
            
            // Update answered count if this is a new answer
            if (!option.classList.contains('answered')) {
                answeredQuestions++;
                option.classList.add('answered');
            }
            
            updateProgress();
            updateNavigationButtons();
        });
    });
}

function updateProgress() {
    const progressBar = document.getElementById('quiz-progress-bar');
    const currentQuestionSpan = document.getElementById('current-question');
    const answeredCountSpan = document.getElementById('answered-count');
    
    const progress = (currentQuestion / totalQuestions) * 100;
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);
    
    currentQuestionSpan.textContent = currentQuestion;
    answeredCountSpan.textContent = answeredQuestions;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    // Show/hide previous button
    if (currentQuestion > 1) {
        prevBtn.style.display = 'inline-block';
    } else {
        prevBtn.style.display = 'none';
    }
    
    // Show/hide next and submit buttons
    if (currentQuestion < totalQuestions) {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    }
}

function showQuestion(questionNumber) {
    // Hide all questions
    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById(`question-${i}`).style.display = 'none';
    }
    
    // Show current question with fade effect
    const currentQuestionElement = document.getElementById(`question-${questionNumber}`);
    currentQuestionElement.style.display = 'block';
    currentQuestionElement.style.opacity = '0';
    
    setTimeout(() => {
        currentQuestionElement.style.opacity = '1';
    }, 50);
    
    updateProgress();
    updateNavigationButtons();
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function submitQuiz() {
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Hide question container
    document.getElementById('question-container').style.display = 'none';
    document.querySelector('.quiz-navigation').style.display = 'none';
    document.querySelector('.quiz-progress').style.display = 'none';
    
    // Show results
    const resultsDiv = document.getElementById('quiz-results');
    const finalScoreSpan = document.getElementById('final-score');
    const scoreText = document.getElementById('score-text');
    const feedbackText = document.getElementById('feedback-text');
    
    finalScoreSpan.textContent = percentage + '%';
    scoreText.innerHTML = `<strong>Score: ${score}/${totalQuestions}</strong>`;
    
    if (percentage >= 80) {
        feedbackText.innerHTML = "Excellent! You have great knowledge about e-waste disposal. Keep spreading awareness!";
    } else if (percentage >= 60) {
        feedbackText.innerHTML = "Good job! You know quite a bit about e-waste. There's always room to learn more!";
    } else if (percentage >= 40) {
        feedbackText.innerHTML = "Not bad! You have some knowledge about e-waste. Check out our disposal guide to learn more!";
    } else {
        feedbackText.innerHTML = "Keep learning! E-waste disposal is important for our environment. Explore our resources to improve your knowledge!";
    }
    
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

function calculateScore() {
    let score = 0;
    for (let question in correctAnswers) {
        if (userAnswers[question] === correctAnswers[question]) {
            score++;
        }
    }
    return score;
}

function resetQuiz() {
    currentQuestion = 1;
    userAnswers = {};
    answeredQuestions = 0;
    
    // Reset all options
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('selected', 'answered');
    });
    
    // Show first question
    showQuestion(1);
    
    // Show all containers
    document.getElementById('question-container').style.display = 'block';
    document.querySelector('.quiz-navigation').style.display = 'block';
    document.querySelector('.quiz-progress').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';
}

function showAnswers() {
    // This function can be expanded to show correct answers
    alert('Correct Answers:\n1. A) Less than 20%\n2. C) Used paper\n3. A) Lead\n4. B) Back up data and remove personal info\n5. B) Authorized e-waste collection centers');
} 