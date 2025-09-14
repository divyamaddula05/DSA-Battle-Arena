// Application State
let currentUser = null;
let selectedTopic = null;
let selectedDifficulty = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let gameState = {
    score: 0,
    monstersSize: 100,
    correctAnswers: 0,
    totalAnswered: 0,
    timeLeft: 30,
    timer: null
};

// API Configuration
let apiKey = '';

// DSA Topics Data
const dsaTopics = [
    {
        id: 'arrays',
        name: 'Arrays',
        description: 'Master array operations, searching, and sorting algorithms',
        icon: '📊',
        color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
    },
    {
        id: 'linked-lists',
        name: 'Linked Lists',
        description: 'Understand pointers, traversal, and list manipulations',
        icon: '🔗',
        color: 'linear-gradient(135deg, #22c55e, #15803d)'
    },
    {
        id: 'stacks-queues',
        name: 'Stacks & Queues',
        description: 'Learn LIFO and FIFO data structures and their applications',
        icon: '📚',
        color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    },
    {
        id: 'trees',
        name: 'Trees',
        description: 'Binary trees, BST, AVL trees, and tree traversals',
        icon: '🌳',
        color: 'linear-gradient(135deg, #f97316, #ea580c)'
    },
    {
        id: 'graphs',
        name: 'Graphs',
        description: 'Graph representation, DFS, BFS, and shortest paths',
        icon: '🕸️',
        color: 'linear-gradient(135deg, #ef4444, #dc2626)'
    },
    {
        id: 'dynamic-programming',
        name: 'Dynamic Programming',
        description: 'Optimization problems and memoization techniques',
        icon: '⚡',
        color: 'linear-gradient(135deg, #eab308, #ca8a04)'
    },
    {
        id: 'sorting',
        name: 'Sorting Algorithms',
        description: 'Quick sort, merge sort, heap sort, and more',
        icon: '🔄',
        color: 'linear-gradient(135deg, #6366f1, #4f46e5)'
    },
    {
        id: 'searching',
        name: 'Searching Algorithms',
        description: 'Binary search, linear search, and advanced techniques',
        icon: '🔍',
        color: 'linear-gradient(135deg, #14b8a6, #0f766e)'
    }
];

// Sample Questions Data
const sampleQuestions = [
    // Arrays - Easy
    {
        id: '1',
        question: 'What is the time complexity of accessing an element in an array by index?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        difficulty: 'easy',
        topic: 'arrays',
        explanation: 'Array elements can be accessed directly using their index, making it a constant time operation.'
    },
    {
        id: '2',
        question: 'Which of the following is NOT a valid way to declare an array in most programming languages?',
        options: ['int arr[10]', 'int arr[] = {1,2,3}', 'int arr = [1,2,3]', 'int* arr = new int[10]'],
        correctAnswer: 2,
        difficulty: 'easy',
        topic: 'arrays',
        explanation: 'Arrays cannot be assigned using the assignment operator with square brackets directly.'
    },
    // Arrays - Medium
    {
        id: '3',
        question: 'What is the time complexity of finding the maximum element in an unsorted array?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 2,
        difficulty: 'medium',
        topic: 'arrays',
        explanation: 'We need to examine each element at least once to find the maximum, resulting in O(n) time complexity.'
    },
    {
        id: '4',
        question: 'In the two-pointer technique for arrays, what is the main advantage?',
        options: ['Reduces space complexity', 'Reduces time complexity', 'Makes code readable', 'All of the above'],
        correctAnswer: 3,
        difficulty: 'medium',
        topic: 'arrays',
        explanation: 'Two-pointer technique often reduces time complexity from O(n²) to O(n) and uses O(1) extra space.'
    },
    // Linked Lists - Easy
    {
        id: '5',
        question: 'In a singly linked list, what does each node contain?',
        options: ['Only data', 'Only pointer to next node', 'Data and pointer to next node', 'Data and pointer to previous node'],
        correctAnswer: 2,
        difficulty: 'easy',
        topic: 'linked-lists',
        explanation: 'Each node in a singly linked list contains data and a pointer/reference to the next node.'
    },
    {
        id: '6',
        question: 'What is the time complexity of inserting an element at the beginning of a linked list?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        difficulty: 'easy',
        topic: 'linked-lists',
        explanation: 'Inserting at the beginning only requires updating the head pointer, which is O(1).'
    },
    // Stacks - Easy
    {
        id: '7',
        question: 'What principle does a stack follow?',
        options: ['FIFO', 'LIFO', 'Random access', 'Priority based'],
        correctAnswer: 1,
        difficulty: 'easy',
        topic: 'stacks-queues',
        explanation: 'Stack follows Last In First Out (LIFO) principle - the last element added is the first one to be removed.'
    },
    {
        id: '8',
        question: 'Which operation is NOT typically associated with a queue?',
        options: ['Enqueue', 'Dequeue', 'Push', 'Front'],
        correctAnswer: 2,
        difficulty: 'easy',
        topic: 'stacks-queues',
        explanation: 'Push is a stack operation. Queues use enqueue to add elements and dequeue to remove them.'
    },
    // Trees - Medium
    {
        id: '9',
        question: 'In a binary search tree, what is the maximum number of comparisons needed to find an element in the worst case?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        difficulty: 'medium',
        topic: 'trees',
        explanation: 'In the worst case (skewed tree), we might need to traverse all nodes, making it O(n).'
    },
    {
        id: '10',
        question: 'What is the height of a complete binary tree with n nodes?',
        options: ['log₂(n)', '⌊log₂(n)⌋', '⌈log₂(n+1)⌉', 'n'],
        correctAnswer: 2,
        difficulty: 'medium',
        topic: 'trees',
        explanation: 'The height of a complete binary tree with n nodes is ⌈log₂(n+1)⌉.'
    },
    // Dynamic Programming - Hard
    {
        id: '11',
        question: 'What is the main principle behind dynamic programming?',
        options: ['Divide and conquer', 'Overlapping subproblems and optimal substructure', 'Greedy choice', 'Backtracking'],
        correctAnswer: 1,
        difficulty: 'hard',
        topic: 'dynamic-programming',
        explanation: 'Dynamic programming requires both overlapping subproblems and optimal substructure properties.'
    },
    {
        id: '12',
        question: 'In the 0/1 Knapsack problem, what does the DP table dp[i][w] represent?',
        options: ['Weight of item i', 'Value of item i', 'Maximum value using first i items with weight limit w', 'Number of items'],
        correctAnswer: 2,
        difficulty: 'hard',
        topic: 'dynamic-programming',
        explanation: 'dp[i][w] represents the maximum value achievable using the first i items with a weight limit of w.'
    },
    // Sorting - Medium
    {
        id: '13',
        question: 'Which sorting algorithm has the best average-case time complexity?',
        options: ['Bubble Sort O(n²)', 'Quick Sort O(n log n)', 'Selection Sort O(n²)', 'Insertion Sort O(n²)'],
        correctAnswer: 1,
        difficulty: 'medium',
        topic: 'sorting',
        explanation: 'Quick Sort has an average-case time complexity of O(n log n), which is optimal for comparison-based sorting.'
    },
    {
        id: '14',
        question: 'Which sorting algorithm is stable?',
        options: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort'],
        correctAnswer: 2,
        difficulty: 'medium',
        topic: 'sorting',
        explanation: 'Merge Sort is stable, meaning it preserves the relative order of equal elements.'
    },
    // Searching - Easy
    {
        id: '15',
        question: 'What is the time complexity of binary search?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        difficulty: 'easy',
        topic: 'searching',
        explanation: 'Binary search eliminates half of the search space in each iteration, resulting in O(log n) complexity.'
    },
    {
        id: '16',
        question: 'Binary search can only be applied to:',
        options: ['Any array', 'Sorted arrays only', 'Arrays with unique elements', 'Arrays with even length'],
        correctAnswer: 1,
        difficulty: 'easy',
        topic: 'searching',
        explanation: 'Binary search requires the array to be sorted to work correctly.'
    }
];

// Utility Functions
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    setTimeout(() => {
        errorElement.classList.remove('show');
    }, 3000);
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function showModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// Authentication Functions
function handleAuth(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const isSignup = document.querySelector('.auth-tab.active').dataset.tab === 'signup';
    
    // Show loading state
    const button = document.querySelector('.auth-button');
    const buttonText = button.querySelector('.button-text');
    const spinner = button.querySelector('.loading-spinner');
    
    button.disabled = true;
    buttonText.style.display = 'none';
    spinner.style.display = 'inline-block';
    
    // Simulate API call
    setTimeout(() => {
        if (username && password && (!isSignup || email.includes('@'))) {
            currentUser = { username, email: email || `${username}@example.com` };
            localStorage.setItem('dsaUser', JSON.stringify(currentUser));
            
            // Show API key modal first
            showModal('api-key-modal');
        } else {
            showError(isSignup ? 'Please fill all fields correctly' : 'Invalid credentials');
        }
        
        // Reset button state
        button.disabled = false;
        buttonText.style.display = 'inline';
        spinner.style.display = 'none';
    }, 1000);
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('dsaUser');
    localStorage.removeItem('dsaApiKey');
    apiKey = '';
    showPage('auth-page');
    resetGameState();
}

// API Key Functions
function saveApiKey() {
    const apiKeyInput = document.getElementById('api-key-input');
    apiKey = apiKeyInput.value.trim();
    
    if (apiKey) {
        localStorage.setItem('dsaApiKey', apiKey);
    }
    
    hideModal('api-key-modal');
    initializeTopicsPage();
    showPage('topics-page');
}

function skipApiKey() {
    hideModal('api-key-modal');
    initializeTopicsPage();
    showPage('topics-page');
}

// Topics Page Functions
function initializeTopicsPage() {
    document.getElementById('username-display').textContent = `Welcome, ${currentUser.username}`;
    renderTopics();
}

function renderTopics() {
    const topicsGrid = document.getElementById('topics-grid');
    topicsGrid.innerHTML = '';
    
    dsaTopics.forEach(topic => {
        const topicCard = document.createElement('div');
        topicCard.className = 'topic-card';
        topicCard.onclick = () => selectTopic(topic);
        
        topicCard.innerHTML = `
            <div class="topic-icon" style="background: ${topic.color}">
                ${topic.icon}
            </div>
            <h3>${topic.name}</h3>
            <p>${topic.description}</p>
            <div class="topic-action">Start Challenge</div>
        `;
        
        topicsGrid.appendChild(topicCard);
    });
}

function selectTopic(topic) {
    selectedTopic = topic;
    document.getElementById('selected-topic-name').textContent = topic.name;
    document.getElementById('selected-topic-desc').textContent = topic.description;
    showPage('difficulty-page');
}

// Difficulty Page Functions
function selectDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    loadQuestions();
}

async function loadQuestions() {
    try {
        // Show loading state
        showPage('quiz-page');
        document.querySelector('.quiz-content').classList.add('loading');
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        let questions = [];
        
        if (apiKey) {
            // Try to fetch from API (placeholder for actual API integration)
            try {
                questions = await fetchQuestionsFromAPI(selectedTopic.id, selectedDifficulty, 10);
            } catch (error) {
                console.log('API failed, falling back to sample questions');
                questions = getFilteredSampleQuestions();
            }
        } else {
            questions = getFilteredSampleQuestions();
        }
        
        currentQuestions = questions;
        
        // Initialize quiz
        resetGameState();
        initializeQuiz();
        
        document.querySelector('.quiz-content').classList.remove('loading');
        
    } catch (error) {
        console.error('Error loading questions:', error);
        showError('Failed to load questions. Please try again.');
    }
}

function getFilteredSampleQuestions() {
    // Filter questions by topic and difficulty
    let filteredQuestions = sampleQuestions.filter(q => 
        q.topic === selectedTopic.id && q.difficulty === selectedDifficulty
    );
    
    // If not enough questions, add from other difficulties
    if (filteredQuestions.length < 8) {
        const additionalQuestions = sampleQuestions.filter(q => 
            q.topic === selectedTopic.id && q.difficulty !== selectedDifficulty
        );
        filteredQuestions = [...filteredQuestions, ...additionalQuestions];
    }
    
    // If still not enough, add from other topics
    if (filteredQuestions.length < 8) {
        const moreQuestions = sampleQuestions.filter(q => 
            q.difficulty === selectedDifficulty && q.topic !== selectedTopic.id
        );
        filteredQuestions = [...filteredQuestions, ...moreQuestions];
    }
    
    // Shuffle and take required number
    return shuffleArray(filteredQuestions).slice(0, 10);
}

async function fetchQuestionsFromAPI(topic, difficulty, count) {
    // Placeholder for actual API integration
    // Replace this with your actual API endpoint and logic
    
    const response = await fetch('https://your-api-endpoint.com/questions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            topic: topic,
            difficulty: difficulty,
            count: count
        })
    });
    
    if (!response.ok) {
        throw new Error('API request failed');
    }
    
    const data = await response.json();
    return data.questions;
}

// Quiz Functions
function resetGameState() {
    gameState = {
        score: 0,
        monstersSize: 100,
        correctAnswers: 0,
        totalAnswered: 0,
        timeLeft: 30,
        timer: null
    };
    currentQuestionIndex = 0;
    
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }
}

function initializeQuiz() {
    updateQuizUI();
    displayCurrentQuestion();
    startTimer();
}

function updateQuizUI() {
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    
    // Update stats
    document.getElementById('current-score').textContent = gameState.score;
    document.getElementById('player-score').textContent = gameState.score;
    document.getElementById('correct-answers').textContent = gameState.correctAnswers;
    document.getElementById('total-answered').textContent = gameState.totalAnswered;
    document.getElementById('time-left').textContent = `${gameState.timeLeft}s`;
    
    // Update monster
    updateMonster();
    
    // Update question info
    document.getElementById('current-question-num').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = currentQuestions.length;
    document.getElementById('question-topic').textContent = `${selectedTopic.name} • ${selectedDifficulty}`;
}

function updateMonster() {
    const monsterAvatar = document.getElementById('monster-avatar');
    const monsterSize = document.getElementById('monster-size');
    const healthFill = document.getElementById('health-fill');
    const monsterPower = document.getElementById('monster-power');
    
    // Update size display
    monsterSize.textContent = gameState.monstersSize;
    
    // Update avatar size
    const fontSize = Math.max(2, gameState.monstersSize * 0.04);
    monsterAvatar.style.fontSize = `${fontSize}rem`;
    
    // Update health bar
    const healthPercentage = Math.min(100, gameState.monstersSize);
    healthFill.style.width = `${healthPercentage}%`;
    
    // Update health bar color
    if (gameState.monstersSize > 150) {
        healthFill.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
    } else if (gameState.monstersSize > 100) {
        healthFill.style.background = 'linear-gradient(90deg, #f59e0b, #d97706)';
    } else if (gameState.monstersSize > 50) {
        healthFill.style.background = 'linear-gradient(90deg, #eab308, #ca8a04)';
    } else {
        healthFill.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
    }
    
    // Update power description
    let powerLevel;
    if (gameState.monstersSize > 150) {
        powerLevel = 'Overwhelming';
    } else if (gameState.monstersSize > 100) {
        powerLevel = 'Strong';
    } else if (gameState.monstersSize > 50) {
        powerLevel = 'Moderate';
    } else {
        powerLevel = 'Weak';
    }
    monsterPower.textContent = `⚡ Power: ${powerLevel}`;
}

function displayCurrentQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    
    // Update question text
    document.getElementById('question-text').textContent = question.question;
    
    // Create answer options
    const answersGrid = document.getElementById('answers-grid');
    answersGrid.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-option';
        answerDiv.onclick = () => selectAnswer(index);
        
        answerDiv.innerHTML = `
            <div class="answer-letter">${String.fromCharCode(65 + index)}</div>
            <div class="answer-text">${option}</div>
        `;
        
        answersGrid.appendChild(answerDiv);
    });
    
    // Hide explanation and next button
    document.getElementById('explanation-section').style.display = 'none';
    document.getElementById('question-actions').style.display = 'none';
}

function selectAnswer(selectedIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const answerOptions = document.querySelectorAll('.answer-option');
    
    // Disable all options
    answerOptions.forEach(option => {
        option.classList.add('disabled');
        option.onclick = null;
    });
    
    // Stop timer
    clearInterval(gameState.timer);
    
    // Mark correct and incorrect answers
    answerOptions.forEach((option, index) => {
        if (index === question.correctAnswer) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
    });
    
    // Update game state
    const isCorrect = selectedIndex === question.correctAnswer;
    gameState.totalAnswered++;
    
    if (isCorrect) {
        gameState.correctAnswers++;
        gameState.score += 100;
        gameState.monstersSize = Math.max(10, gameState.monstersSize - 15);
    } else {
        gameState.monstersSize = Math.min(200, gameState.monstersSize + 20);
    }
    
    // Update UI
    updateQuizUI();
    
    // Show explanation if available
    if (question.explanation) {
        document.getElementById('explanation-text').textContent = question.explanation;
        document.getElementById('explanation-section').style.display = 'block';
    }
    
    // Show next button
    document.getElementById('question-actions').style.display = 'block';
    
    // Check win condition
    if (gameState.monstersSize <= 10) {
        setTimeout(() => showGameOver(true), 1500);
        return;
    }
    
    // Update next button text
    const nextBtn = document.getElementById('next-question-btn');
    if (currentQuestionIndex + 1 >= currentQuestions.length) {
        nextBtn.textContent = 'Finish Battle';
    } else {
        nextBtn.textContent = 'Next Question';
    }
}

function nextQuestion() {
    if (currentQuestionIndex + 1 >= currentQuestions.length) {
        showGameOver(false);
        return;
    }
    
    currentQuestionIndex++;
    gameState.timeLeft = 30;
    displayCurrentQuestion();
    updateQuizUI();
    startTimer();
}

function startTimer() {
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        document.getElementById('time-left').textContent = `${gameState.timeLeft}s`;
        
        // Change color when time is running out
        const timeElement = document.getElementById('time-left');
        if (gameState.timeLeft <= 10) {
            timeElement.style.color = '#ef4444';
        } else {
            timeElement.style.color = '';
        }
        
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer);
            selectAnswer(-1); // Time's up - wrong answer
        }
    }, 1000);
}

function showGameOver(victory) {
    const modal = document.getElementById('game-over-modal');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    
    // Update modal content
    if (victory) {
        resultIcon.textContent = '🏆';
        resultTitle.textContent = 'Victory!';
        resultTitle.style.color = '#22c55e';
        resultMessage.textContent = 'Congratulations! You have defeated the code monster!';
    } else {
        resultIcon.textContent = '💀';
        resultTitle.textContent = 'Defeat!';
        resultTitle.style.color = '#ef4444';
        resultMessage.textContent = 'The monster has grown too powerful. Better luck next time!';
    }
    
    // Update final stats
    document.getElementById('final-score').textContent = gameState.score;
    document.getElementById('final-correct').textContent = `${gameState.correctAnswers}/${gameState.totalAnswered}`;
    const accuracy = gameState.totalAnswered > 0 ? Math.round((gameState.correctAnswers / gameState.totalAnswered) * 100) : 0;
    document.getElementById('final-accuracy').textContent = `${accuracy}%`;
    
    // Show modal
    showModal('game-over-modal');
}

function hideGameOver() {
    hideModal('game-over-modal');
}

function playAgain() {
    hideGameOver();
    loadQuestions();
}

function chooseNewTopic() {
    hideGameOver();
    showPage('topics-page');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Check for stored user and API key
    const storedUser = localStorage.getItem('dsaUser');
    const storedApiKey = localStorage.getItem('dsaApiKey');
    
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        if (storedApiKey) {
            apiKey = storedApiKey;
        }
        initializeTopicsPage();
        showPage('topics-page');
    }
    
    // Auth form
    document.getElementById('auth-form').addEventListener('submit', handleAuth);
    
    // Auth tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide email field
            const emailGroup = document.getElementById('email-group');
            const buttonText = document.querySelector('.button-text');
            
            if (tabType === 'signup') {
                emailGroup.style.display = 'block';
                buttonText.textContent = 'Join the Fight';
                document.getElementById('email').required = true;
            } else {
                emailGroup.style.display = 'none';
                buttonText.textContent = 'Enter Battle';
                document.getElementById('email').required = false;
            }
        });
    });
    
    // API Key modal buttons
    document.getElementById('save-api-key-btn').addEventListener('click', saveApiKey);
    document.getElementById('skip-api-key-btn').addEventListener('click', skipApiKey);
    
    // Navigation buttons
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    document.getElementById('back-to-topics').addEventListener('click', () => showPage('topics-page'));
    document.getElementById('back-to-difficulty').addEventListener('click', () => showPage('difficulty-page'));
    
    // Difficulty selection
    document.querySelectorAll('.difficulty-card').forEach(card => {
        card.addEventListener('click', function() {
            const difficulty = this.dataset.difficulty;
            selectDifficulty(difficulty);
        });
    });
    
    // Quiz navigation
    document.getElementById('next-question-btn').addEventListener('click', nextQuestion);
    
    // Game over modal
    document.getElementById('play-again-btn').addEventListener('click', playAgain);
    document.getElementById('choose-topic-btn').addEventListener('click', chooseNewTopic);
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });
});

// Export for potential external use
window.DSABattle = {
    setApiKey: (key) => {
        apiKey = key;
        localStorage.setItem('dsaApiKey', key);
    },
    getCurrentUser: () => currentUser,
    getGameState: () => gameState
};