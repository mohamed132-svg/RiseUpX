// --- User Setup ---
function start() {
  const goals = [];
  document.querySelectorAll('#goalSelection input:checked').forEach(input => goals.push(input.value));
  if(goals.length===0){ alert("Select at least one goal!"); return; }
  localStorage.setItem('userGoals', JSON.stringify(goals));
  localStorage.setItem('level', 1);
  localStorage.setItem('xp', 0);
  localStorage.setItem('streak', 0);
  localStorage.setItem('tasksDone', 0);
  localStorage.setItem('journal', '');
  localStorage.setItem('lastDate', new Date().toDateString());
  localStorage.setItem('completedLevels', JSON.stringify([1])); // Level 1 unlocked
  window.location.href='./dashboard.html';
}

// --- Mindset Lessons ---
const mindsetLessons = {
  1:"Start building discipline today!",
  2:"Keep pushing, consistency is key!",
  3:"Small daily wins create momentum!",
  4:"Focus sharpens skill!",
  5:"Your habits define your future!",
  6:"Challenge yourself and grow!",
  7:"Discipline beats motivation!",
  8:"Reflect and improve every day!",
  9:"Level up and inspire others!",
  10:"Mastery is achieved through persistence!"
};

// --- Tasks per Level ---
const tasksPerLevel = {
  1:["Complete 10 push-ups","Read 10 pages","Meditate 5 min","Write morning plan","Connect with a friend"],
  2:["Draw 1 sketch","Try new brush in digital art","Design a simple logo","Organize workspace","Watch tutorial video"],
  3:["Complete 2 sketches","Create moodboard","Share design on social media","Get feedback","Reflect in journal"],
  4:["Design Instagram post","Experiment with color palette","Design a thumbnail","Fix alignment in previous work","Try typography pairing"],
  5:["Redesign old poster","Create small logo set","Start mini portfolio","Track time spent on design","Journal progress"],
  6:["Client project simulation","Design banner","Use advanced colors","Share for review","Reflect daily habits"],
  7:["Create 3 social media posts","Brand a concept","Try 1 new design tool","Improve old design","Write lesson learned"],
  8:["Make full portfolio page","Design poster series","Collaborate with friend","Test new typography","Journal insights"],
  9:["Design branding kit","Create real thumbnail","Offer design for mock client","Review & improve","Reflect on growth"],
  10:["Complete master project","Showcase work","Teach mini-lesson","Analyze improvement","Plan next steps"]
};

// --- Dashboard ---
if(document.getElementById('welcome')){
  const goals = JSON.parse(localStorage.getItem('userGoals')) || [];
  document.getElementById('welcome').innerText = "Welcome, " + (goals.join(', ') || 'User');
  const level = parseInt(localStorage.getItem('level'));
  document.getElementById('level').innerText = level;
  document.getElementById('xp').innerText = localStorage.getItem('xp');
  document.getElementById('streak').innerText = localStorage.getItem('streak');
  document.getElementById('mindset').innerText = mindsetLessons[level];
}

// --- Levels Page ---
if(document.getElementById('levelsList')){
  const list = document.getElementById('levelsList');
  list.innerHTML='';
  const completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || [1];
  for(let i=1;i<=10;i++){
    const li = document.createElement('li');
    li.innerText = `Level ${i} ${completedLevels.includes(i)?'✅':'🔒'}`;
    li.style.cursor = completedLevels.includes(i)?'pointer':'not-allowed';
    if(completedLevels.includes(i)){
      li.onclick = ()=>{ enterLevel(i); };
    }
    list.appendChild(li);
  }
}

// --- Enter Level ---
function enterLevel(lvl){
  localStorage.setItem('level', lvl);
  alert(`Entered Level ${lvl}`);
  window.location.href='tasks.html';
}

// --- Tasks Page ---
if(document.getElementById('taskList')){
  const level = parseInt(localStorage.getItem('level'));
  const tasks = tasksPerLevel[level] || [];
  const list = document.getElementById('taskList');
  list.innerHTML='';
  tasks.forEach((task,i)=>{
    const li = document.createElement('li');
    li.innerText=task;
    li.onclick=()=>{
      if(li.style.textDecoration==='line-through') return;
      li.style.textDecoration='line-through';
      let xp = parseInt(localStorage.getItem('xp')) + 20;
      let tasksDone = parseInt(localStorage.getItem('tasksDone')) +1;
      localStorage.setItem('xp', xp);
      localStorage.setItem('tasksDone', tasksDone);
      checkLevelUp();
    };
    list.appendChild(li);
  });
}

function completeAll(){
  const level = parseInt(localStorage.getItem('level'));
  const tasks = tasksPerLevel[level] || [];
  let xp = parseInt(localStorage.getItem('xp')) + 20*tasks.length;
  let tasksDone = parseInt(localStorage.getItem('tasksDone')) + tasks.length;
  localStorage.setItem('xp', xp);
  localStorage.setItem('tasksDone', tasksDone);
  alert("All tasks completed! XP earned.");
  checkLevelUp();
}

// --- Level-Up Logic ---
function checkLevelUp(){
  let xp = parseInt(localStorage.getItem('xp'));
  let level = parseInt(localStorage.getItem('level'));
  if(xp >= level*100 && level <10){
    level++;
    localStorage.setItem('level', level);
    // Unlock next level
    const completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || [1];
    if(!completedLevels.includes(level)) completedLevels.push(level);
    localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
    alert(`🎉 Level Up! You reached Level ${level}`);
    window.location.href='dashboard.html';
  }
}

// --- Streak Logic ---
function updateStreak(){
  const lastDate = localStorage.getItem('lastDate');
  const today = new Date().toDateString();
  let streak = parseInt(localStorage.getItem('streak'));
  if(lastDate!==today){
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    if(lastDate===yesterday.toDateString()){ streak+=1; } else { streak=1; }
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastDate', today);
  }
}
updateStreak();

// --- Progress Page ---
if(document.getElementById('progressLevel')){
  document.getElementById('progressLevel').innerText = localStorage.getItem('level');
  document.getElementById('progressXP').innerText = localStorage.getItem('xp');
  document.getElementById('progressStreak').innerText = localStorage.getItem('streak');
  document.getElementById('tasksDone').innerText = localStorage.getItem('tasksDone');
}

// --- Profile / Journal ---
if(document.getElementById('profileGoals')){
  document.getElementById('profileGoals').innerText = (JSON.parse(localStorage.getItem('userGoals'))||[]).join(', ');
  document.getElementById('journal').value = localStorage.getItem('journal');
}

function saveJournal(){
  const text = document.getElementById('journal').value;
  localStorage.setItem('journal', text);
  alert("Journal saved!");
}
