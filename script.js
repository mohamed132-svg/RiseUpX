// ======== INITIAL SETUP ========
let username = localStorage.getItem('username') || '';
let userPath = localStorage.getItem('userPath') || '';
let currentLevel = parseInt(localStorage.getItem('currentLevel')) || 1;
let currentXP = parseInt(localStorage.getItem('currentXP')) || 0;
let currentStreak = parseInt(localStorage.getItem('currentStreak')) || 0;
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || {};
let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || {};

// ======== PATH SELECTION ========
document.querySelectorAll('.path-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.path-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    userPath = btn.dataset.path;
  });
});

document.getElementById('startBtn')?.addEventListener('click', () => {
  const nameInput = document.getElementById('username')?.value.trim();
  if (!nameInput || !userPath) {
    alert('Enter your name and choose one path.');
    return;
  }
  username = nameInput;
  localStorage.setItem('username', username);
  localStorage.setItem('userPath', userPath);
  localStorage.setItem('currentLevel', 1);
  localStorage.setItem('currentXP', 0);
  localStorage.setItem('currentStreak', 0);
  localStorage.setItem('completedTasks', JSON.stringify({}));
  window.location.href = 'dashboard.html';
});

// ======== DASHBOARD ========
document.getElementById('welcomeUser')?.innerText = `Hello, ${username}`;
document.getElementById('userPath')?.innerText = userPath;
document.getElementById('currentLevel')?.innerText = currentLevel;
document.getElementById('currentXP')?.innerText = currentXP;
document.getElementById('currentStreak')?.innerText = currentStreak;

// ======== NAVIGATION ========
function navigate(page) {
  window.location.href = page;
}

// ======== MASTER PATHS ========
const masteryPaths = {
  coding: [
    {level:1, tasks:[{title:"Install VSCode", explanation:"Download and install Visual Studio Code from official site."},{title:"Hello World", explanation:"Create a simple JS program that prints 'Hello World'."}]},
    {level:2, tasks:[{title:"Variables & Data Types", explanation:"Learn about strings, numbers, arrays."},{title:"Functions", explanation:"Write functions and call them."}]},
    {level:3, tasks:[{title:"Loops & Conditions", explanation:"Practice for-loops, while-loops, if-else."}]},
    {level:4, tasks:[{title:"DOM Manipulation", explanation:"Use JS to change HTML content."}]},
    {level:5, tasks:[{title:"Build a To-Do App", explanation:"Combine HTML, CSS, JS to make a simple app."}]},
    {level:6, tasks:[{title:"Fetch API Data", explanation:"Learn to use fetch() and display API data."}]},
    {level:7, tasks:[{title:"Async/Await", explanation:"Understand asynchronous code in JS."}]},
    {level:8, tasks:[{title:"Project: Portfolio Website", explanation:"Build your own portfolio website."}]},
    {level:9, tasks:[{title:"Debugging & Testing", explanation:"Learn debugging tools and unit tests."}]},
    {level:10, tasks:[{title:"Mastery Project", explanation:"Build a fully functional web app with multiple features."}]}
  ],
  digitalart: [
    {level:1, tasks:[{title:"Basic Shapes", explanation:"Draw circles, squares, and triangles digitally."}]},
    {level:2, tasks:[{title:"Shading Techniques", explanation:"Learn to shade shapes for depth."}]},
    {level:3, tasks:[{title:"Color Theory", explanation:"Learn primary, secondary, complementary colors."}]},
    {level:4, tasks:[{title:"Character Design", explanation:"Design simple characters with proportions."}]},
    {level:5, tasks:[{title:"Perspective Drawing", explanation:"Apply 1-point and 2-point perspective."}]},
    {level:6, tasks:[{title:"Digital Painting", explanation:"Paint a simple scene digitally."}]},
    {level:7, tasks:[{title:"Story Illustration", explanation:"Illustrate a short scene/story."}]},
    {level:8, tasks:[{title:"Portfolio Project", explanation:"Create a mini art portfolio."}]},
    {level:9, tasks:[{title:"Advanced Techniques", explanation:"Use textures, lighting, advanced brushes."}]},
    {level:10, tasks:[{title:"Mastery Project", explanation:"Create a fully polished art piece as portfolio showcase."}]}
  ],
  sales: [
    {level:1, tasks:[{title:"Learn Sales Terms", explanation:"Understand basic sales terminology."}]},
    {level:2, tasks:[{title:"Create Sales Pitch", explanation:"Draft a short sales pitch."}]},
    {level:3, tasks:[{title:"Cold Calling", explanation:"Practice cold calls with scripts."}]},
    {level:4, tasks:[{title:"Objection Handling", explanation:"Learn to handle common objections."}]},
    {level:5, tasks:[{title:"Closing Deals", explanation:"Practice closing deals in mock scenarios."}]},
    {level:6, tasks:[{title:"CRM Software", explanation:"Learn basic CRM usage."}]},
    {level:7, tasks:[{title:"Negotiation Skills", explanation:"Practice negotiations."}]},
    {level:8, tasks:[{title:"Sales Project", explanation:"Create a full sales plan for a product."}]},
    {level:9, tasks:[{title:"Team Leadership", explanation:"Learn to lead a sales team."}]},
    {level:10, tasks:[{title:"Mastery Project", explanation:"Run a full sales campaign with strategy and report."}]}
  ],
  design: [
    {level:1, tasks:[{title:"Basic Shapes & Colors", explanation:"Learn basic shapes and color usage in design."}]},
    {level:2, tasks:[{title:"Typography Basics", explanation:"Learn fonts, spacing, and hierarchy."}]},
    {level:3, tasks:[{title:"Layouts & Grids", explanation:"Design simple layouts using grids."}]},
    {level:4, tasks:[{title:"UI Elements", explanation:"Design buttons, forms, and icons."}]},
    {level:5, tasks:[{title:"Wireframing", explanation:"Create wireframes for a small app."}]},
    {level:6, tasks:[{title:"Branding Basics", explanation:"Learn logos, color palettes, and style guides."}]},
    {level:7, tasks:[{title:"Interactive Prototype", explanation:"Create a clickable prototype."}]},
    {level:8, tasks:[{title:"Portfolio Project", explanation:"Assemble your design projects."}]},
    {level:9, tasks:[{title:"Advanced Design", explanation:"Learn motion, animation, and advanced UX."}]},
    {level:10, tasks:[{title:"Mastery Project", explanation:"Create a professional design portfolio project."}]}
  ],
  marketing: [
    {level:1, tasks:[{title:"Marketing Basics", explanation:"Learn fundamentals of marketing."}]},
    {level:2, tasks:[{title:"Audience Research", explanation:"Identify target audience."}]},
    {level:3, tasks:[{title:"Content Creation", explanation:"Create marketing content."}]},
    {level:4, tasks:[{title:"Social Media Marketing", explanation:"Plan posts and campaigns."}]},
    {level:5, tasks:[{title:"Email Campaigns", explanation:"Create sample email campaigns."}]},
    {level:6, tasks:[{title:"Analytics & Metrics", explanation:"Track engagement."}]},
    {level:7, tasks:[{title:"Advertising Basics", explanation:"Learn paid advertising techniques."}]},
    {level:8, tasks:[{title:"Marketing Project", explanation:"Plan and run a mock campaign."}]},
    {level:9, tasks:[{title:"Brand Strategy", explanation:"Create brand guidelines."}]},
    {level:10, tasks:[{title:"Mastery Project", explanation:"Run a full campaign, analyze results, report."}]}
  ]
};

// ======== LEVELS PAGE ========
function loadLevels() {
  const levelsList = document.getElementById('levelsList');
  if (!levelsList || !userPath) return;
  levelsList.innerHTML = '';
  masteryPaths[userPath].forEach(lvl => {
    const div = document.createElement('div');
    div.className = 'level-box';
    div.innerHTML = `<h3>Level ${lvl.level}</h3>
                     <ul>${lvl.tasks.map(t => `<li>${t.title}: ${t.explanation}</li>`).join('')}</ul>`;
    levelsList.appendChild(div);
  });
}
if (document.getElementById('levelsList')) loadLevels();

// ======== TASKS PAGE ========
function loadTasks() {
  const tasksList = document.getElementById('tasksList');
  if (!tasksList || !userPath) return;
  tasksList.innerHTML = '';
  const lvl = masteryPaths[userPath].find(l=>l.level===currentLevel);
  lvl.tasks.forEach((task,i)=>{
    const div = document.createElement('div');
    div.className = 'task-box';
    div.innerHTML = `<h4>${task.title}</h4><p>${task.explanation}</p>
                     <button onclick="completeTask(${i})">${completedTasks[i]?'Completed':'Mark Complete'}</button>`;
    tasksList.appendChild(div);
  });
}
function completeTask(taskIndex){
  completedTasks[taskIndex]=true;
  localStorage.setItem('completedTasks',JSON.stringify(completedTasks));
  currentXP+=10;
  localStorage.setItem('currentXP',currentXP);
  if(currentXP>=currentLevel*100){
    currentLevel++;
    localStorage.setItem('currentLevel',currentLevel);
  }
  currentStreak++;
  localStorage.setItem('currentStreak',currentStreak);
  loadTasks();
}
if(document.getElementById('tasksList')) loadTasks();

// ======== PROGRESS PAGE ========
if(document.getElementById('progressLevel')){
  document.getElementById('progressLevel').innerText=currentLevel;
  document.getElementById('progressXP').innerText=currentXP;
  document.getElementById('progressStreak').innerText=currentStreak;
  const masteryPercent = Math.floor((currentLevel-1)/10*100);
  document.getElementById('progressMastery').innerText=masteryPercent+'%';
}

// ======== PROFILE PAGE ========
if(document.getElementById('profileName')) document.getElementById('profileName').innerText=username;
if(document.getElementById('profilePath')) document.getElementById('profilePath').innerText=userPath;
if(document.getElementById('profileLevel')) document.getElementById('profileLevel').innerText=currentLevel;
if(document.getElementById('profileXP')) document.getElementById('profileXP').innerText=currentXP;
if(document.getElementById('profileStreak')) document.getElementById('profileStreak').innerText=currentStreak;

function resetProgress(){
  if(confirm('Are you sure you want to reset your progress?')){
    localStorage.clear();
    window.location.href='index.html';
  }
    }
