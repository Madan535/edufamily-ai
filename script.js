const views = {
  home: document.getElementById('homeView'),
  career: document.getElementById('careerView'),
  colleges: document.getElementById('collegesView'),
  budget: document.getElementById('budgetView')
};
const nav = document.querySelector('.topnav');
function showView(name) {
  if (!views[name]) return;
  Object.entries(views).forEach(([key, el]) => el.classList.toggle('active', key === name));
  document.querySelectorAll('[data-view]').forEach(btn => {
    if (btn.classList.contains('nav-link')) btn.classList.toggle('active', btn.dataset.view === name);
  });
  nav.classList.remove('open');
  document.getElementById('menuToggle').setAttribute('aria-expanded', 'false');
  window.scrollTo({top: 0, behavior: 'smooth'});
}
document.querySelectorAll('[data-view]').forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.view)));
document.getElementById('menuToggle').addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  document.getElementById('menuToggle').setAttribute('aria-expanded', String(opened));
});

const branchInfo = {
  CSE: {name:'Computer Science Engineering (CSE)', tags:['coding','computers','maths'], reasons:['Software, applications, and computing fundamentals','Problem-solving through programming and algorithms'], next:'Try a small programming project and explore data structures.'},
  AI: {name:'Artificial Intelligence & Data Science', tags:['coding','computers','maths','business'], reasons:['Working with data, patterns, and intelligent systems','Combines programming, mathematics, and practical analysis'], next:'Explore Python, statistics, and a beginner data project.'},
  ECE: {name:'Electronics & Communication Engineering (ECE)', tags:['electronics','physics','machines'], reasons:['Circuits, communication systems, and embedded devices','Can connect hardware, robotics, and software'], next:'Try basic electronics concepts and a simple circuit simulation.'},
  MECH: {name:'Mechanical Engineering', tags:['machines','physics','creative'], reasons:['Designing, analysing, and improving physical systems','Useful for manufacturing, mechanics, and product design'], next:'Explore CAD concepts, mechanics, and design projects.'},
  BIOTECH: {name:'Biotechnology / Bioengineering', tags:['biology','chemistry','impact'], reasons:['Connects biology with engineering and technology','Can support healthcare, laboratory, and research applications'], next:'Review biology and chemistry course content and lab requirements.'},
  CIVIL: {name:'Civil / Environmental Engineering', tags:['environment','physics','impact','machines'], reasons:['Infrastructure, water, materials, and sustainable systems','Can contribute to safer and more sustainable communities'], next:'Explore structures, water systems, and sustainability projects.'}
};
const interestMap = {coding:['CSE','AI'], machines:['MECH','CIVIL','ECE'], electronics:['ECE','CSE'], biology:['BIOTECH'], environment:['CIVIL','BIOTECH'], business:['AI','CSE']};
const subjectMap = {maths:['CSE','AI','MECH'], physics:['ECE','MECH','CIVIL'], computers:['CSE','AI'], biology:['BIOTECH'], chemistry:['BIOTECH','CIVIL']};
const priorityMap = {creative:['MECH','ECE','CSE'], research:['AI','BIOTECH','ECE'], impact:['CIVIL','BIOTECH']};
document.getElementById('careerForm').addEventListener('submit', e => {
  e.preventDefault();
  const interest = document.getElementById('interest').value;
  const subject = document.getElementById('subject').value;
  const priority = document.getElementById('priority').value;
  if (!interest || !subject) return;
  const scores = {};
  Object.keys(branchInfo).forEach(key => scores[key] = 0);
  (interestMap[interest] || []).forEach(k => scores[k] += 3);
  (subjectMap[subject] || []).forEach(k => scores[k] += 2);
  (priorityMap[priority] || []).forEach(k => scores[k] += 1);
  const sorted = Object.keys(scores).sort((a,b) => scores[b]-scores[a]).slice(0,3);
  const results = document.getElementById('careerResults');
  results.innerHTML = `<h2 class="result-heading">Your possible paths</h2><p class="result-intro">Based on your selected interests. These are suggestions, not a prediction of success.</p>` + sorted.map((key, index) => {
    const item = branchInfo[key];
    const fit = Math.round((scores[key] / 6) * 100);
    return `<article class="recommendation ${index===0?'best':''}"><div class="rec-top"><h3>${item.name}</h3><span class="fit-pill">${index===0?'Top match':'Also explore'}</span></div><p>${item.reasons.join('. ')}.</p><ul><li>${item.next}</li><li>Check the actual syllabus, labs, fees, and career paths before deciding.</li></ul></article>`;
  }).join('') + `<p class="small-note">Matching method: your interest contributes 3 points, favourite subject 2 points, and priority 1 point. The label is a simple match score, not a probability or AI prediction.</p>`;
});

const colleges = [
  {name:'Riverstone Institute',type:'Fictional example · Engineering',fee:95000,location:'Near home',hostel:'Available',branches:'CSE, ECE, Civil',tag:'Lower estimated cost',symbol:'⌂'},
  {name:'Northstar Technical College',type:'Fictional example · Engineering',fee:145000,location:'Another city',hostel:'Available',branches:'CSE, AI, ECE',tag:'Technology-focused',symbol:'✦'},
  {name:'Greenfield Engineering School',type:'Fictional example · Engineering',fee:120000,location:'Near home',hostel:'Limited',branches:'Mechanical, Civil, ECE',tag:'Hands-on focus',symbol:'⌁'}
];
const maxFee = document.getElementById('maxFee');
const maxFeeLabel = document.getElementById('maxFeeLabel');
function rupees(n){return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n)}
function renderColleges(){
  const max = Number(maxFee.value); const priority = document.getElementById('collegePriority').value;
  maxFeeLabel.textContent = rupees(max);
  let list = colleges.filter(c => c.fee <= max);
  if(priority==='cost') list.sort((a,b)=>a.fee-b.fee);
  if(priority==='hostel') list.sort((a,b)=>(b.hostel==='Available')-(a.hostel==='Available'));
  if(priority==='location') list.sort((a,b)=>(b.location==='Near home')-(a.location==='Near home'));
  if(priority==='balanced') list.sort((a,b)=>Math.abs(a.fee-120000)-Math.abs(b.fee-120000));
  const target = document.getElementById('collegeResults');
  if(!list.length){target.innerHTML='<div class="panel"><h2>No examples fit this budget</h2><p class="muted">Increase the maximum annual budget to view the fictional sample profiles.</p></div>';return;}
  target.innerHTML=list.map(c=>`<article class="college-card"><div class="college-symbol">${c.symbol}</div><h3>${c.name}</h3><div class="college-type">${c.type}</div><div class="college-fee">${rupees(c.fee)} <small>/ year (example)</small></div><div class="college-details"><div><span>Location</span><b>${c.location}</b></div><div><span>Accommodation</span><b>${c.hostel}</b></div><div><span>Example branches</span><b>${c.branches}</b></div></div><span class="college-tag">${c.tag}</span><p class="small-note">Compare real colleges using verified fee details, accreditation, course syllabus, facilities, and official placement reports.</p></article>`).join('');
}
maxFee.addEventListener('input',renderColleges);document.getElementById('collegePriority').addEventListener('change',renderColleges);renderColleges();

const budgetForm = document.getElementById('budgetForm');
const budgetFields = ['tuition','stay','living','other','years','support'];
function getBudget(){const vals={};budgetFields.forEach(id=>vals[id]=Math.max(0,Number(document.getElementById(id).value)||0));const gross=vals.tuition+vals.stay+vals.living+vals.other;const net=Math.max(0,gross-vals.support);return {...vals,gross,net,total:net*vals.years};}
function renderBudget(){const b=getBudget();document.getElementById('annualCost').textContent=rupees(b.net);document.getElementById('totalCost').textContent=rupees(b.total);document.getElementById('costBreakdown').innerHTML=[['Tuition fees',b.tuition],['Accommodation',b.stay],['Food and travel',b.living],['Other expenses',b.other],['Estimated gross annual cost',b.gross],['Annual support deducted',-Math.min(b.support,b.gross)]].map(([label,value])=>`<div class="breakdown-row"><span>${label}</span><b>${value<0?'− ':''}${rupees(Math.abs(value))}</b></div>`).join('');document.getElementById('copyStatus').textContent='';}
budgetForm.addEventListener('submit',e=>{e.preventDefault();renderBudget()});budgetFields.forEach(id=>document.getElementById(id).addEventListener('input',renderBudget));renderBudget();
document.getElementById('copySummary').addEventListener('click',async()=>{const b=getBudget();const summary=`EduFamily AI — Family budget discussion\nEstimated gross annual cost: ${rupees(b.gross)}\nAnnual support/scholarship: ${rupees(Math.min(b.support,b.gross))}\nEstimated net annual cost: ${rupees(b.net)}\nCourse duration: ${b.years} years\nEstimated full-course net cost: ${rupees(b.total)}\nNote: These are estimates, not an official fee quote.`;const status=document.getElementById('copyStatus');try{await navigator.clipboard.writeText(summary);status.textContent='Summary copied. You can paste it into your family discussion.';}catch{status.textContent=summary;}});
