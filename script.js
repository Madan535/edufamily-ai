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
  {name:'Indian Institute of Technology Bombay',state:'Maharashtra',city:'Mumbai',kind:'IIT · Public institute',url:'https://www.iitb.ac.in/'},
  {name:'Indian Institute of Technology Delhi',state:'Delhi',city:'New Delhi',kind:'IIT · Public institute',url:'https://home.iitd.ac.in/'},
  {name:'Indian Institute of Technology Madras',state:'Tamil Nadu',city:'Chennai',kind:'IIT · Public institute',url:'https://www.iitm.ac.in/'},
  {name:'Indian Institute of Technology Kanpur',state:'Uttar Pradesh',city:'Kanpur',kind:'IIT · Public institute',url:'https://www.iitk.ac.in/'},
  {name:'Indian Institute of Technology Kharagpur',state:'West Bengal',city:'Kharagpur',kind:'IIT · Public institute',url:'https://www.iitkgp.ac.in/'},
  {name:'Indian Institute of Technology Hyderabad',state:'Telangana',city:'Sangareddy',kind:'IIT · Public institute',url:'https://www.iith.ac.in/'},
  {name:'Indian Institute of Technology Roorkee',state:'Uttarakhand',city:'Roorkee',kind:'IIT · Public institute',url:'https://www.iitr.ac.in/'},
  {name:'Indian Institute of Technology (BHU) Varanasi',state:'Uttar Pradesh',city:'Varanasi',kind:'IIT · Public institute',url:'https://www.iitbhu.ac.in/'},
  {name:'National Institute of Technology Tiruchirappalli',state:'Tamil Nadu',city:'Tiruchirappalli',kind:'NIT · Public institute',url:'https://www.nitt.edu/'},
  {name:'National Institute of Technology Warangal',state:'Telangana',city:'Warangal',kind:'NIT · Public institute',url:'https://www.nitw.ac.in/'},
  {name:'National Institute of Technology Karnataka, Surathkal',state:'Karnataka',city:'Surathkal',kind:'NIT · Public institute',url:'https://www.nitk.ac.in/'},
  {name:'National Institute of Technology Calicut',state:'Kerala',city:'Kozhikode',kind:'NIT · Public institute',url:'https://nitc.ac.in/'},
  {name:'National Institute of Technology Rourkela',state:'Odisha',city:'Rourkela',kind:'NIT · Public institute',url:'https://www.nitrkl.ac.in/'},
  {name:'National Institute of Technology Andhra Pradesh',state:'Andhra Pradesh',city:'Tadepalligudem',kind:'NIT · Public institute',url:'https://www.nitandhra.ac.in/'},
  {name:'Andhra University College of Engineering',state:'Andhra Pradesh',city:'Visakhapatnam',kind:'University engineering college',url:'https://www.andhrauniversity.edu.in/'},
  {name:'Anil Neerukonda Institute of Technology and Sciences (ANITS)',state:'Andhra Pradesh',city:'Visakhapatnam',kind:'Engineering college',url:'https://www.anits.edu.in/'},
  {name:'Gayatri Vidya Parishad College of Engineering',state:'Andhra Pradesh',city:'Visakhapatnam',kind:'Engineering college',url:'https://gvpce.ac.in/'},
  {name:'GMR Institute of Technology',state:'Andhra Pradesh',city:'Rajam',kind:'Autonomous engineering college',url:'https://gmrit.edu.in/'},
  {name:'Vignan’s Foundation for Science, Technology and Research',state:'Andhra Pradesh',city:'Vadlamudi, Guntur',kind:'Deemed university',url:'https://vignan.ac.in/'},
  {name:'R.V.R. & J.C. College of Engineering',state:'Andhra Pradesh',city:'Guntur',kind:'Autonomous engineering college',url:'https://www.rvrjc.ac.in/'},
  {name:'Vasireddy Venkatadri Institute of Technology',state:'Andhra Pradesh',city:'Nambur, Guntur',kind:'Autonomous engineering college',url:'https://www.vvitguntur.com/'},
  {name:'N.B.K.R. Institute of Science and Technology',state:'Andhra Pradesh',city:'Vidyanagar, Nellore district',kind:'Autonomous engineering college',url:'https://www.nbkrist.org/'},
  {name:'Sree Vidyanikethan Engineering College',state:'Andhra Pradesh',city:'Tirupati district',kind:'Engineering college',url:'https://www.svec.education/'},
  {name:'Sri Venkateswara University College of Engineering',state:'Andhra Pradesh',city:'Tirupati',kind:'University engineering college',url:'https://svuniversity.edu.in/'},
  {name:'GITAM (Deemed to be University)',state:'Andhra Pradesh',city:'Visakhapatnam',kind:'Deemed university',url:'https://www.gitam.edu/'},
  {name:'Visvesvaraya National Institute of Technology',state:'Maharashtra',city:'Nagpur',kind:'NIT · Public institute',url:'https://vnit.ac.in/'},
  {name:'Indian Institute of Information Technology Hyderabad',state:'Telangana',city:'Hyderabad',kind:'IIIT · Public-private partnership',url:'https://www.iiit.ac.in/'},
  {name:'International Institute of Information Technology Bangalore',state:'Karnataka',city:'Bengaluru',kind:'IIIT · Institute of higher education',url:'https://www.iiitb.ac.in/'},
  {name:'Birla Institute of Technology and Science, Pilani',state:'Rajasthan',city:'Pilani',kind:'Deemed university',url:'https://www.bits-pilani.ac.in/'},
  {name:'Vellore Institute of Technology',state:'Tamil Nadu',city:'Vellore',kind:'Private university',url:'https://vit.ac.in/'},
  {name:'Amrita Vishwa Vidyapeetham',state:'Tamil Nadu',city:'Coimbatore',kind:'Deemed university',url:'https://www.amrita.edu/'},
  {name:'SRM Institute of Science and Technology',state:'Tamil Nadu',city:'Kattankulathur',kind:'Deemed university',url:'https://www.srmist.edu.in/'},
  {name:'Anna University',state:'Tamil Nadu',city:'Chennai',kind:'State university',url:'https://www.annauniv.edu/'},
  {name:'Jadavpur University',state:'West Bengal',city:'Kolkata',kind:'State university',url:'https://jadavpuruniversity.in/'},
  {name:'Delhi Technological University',state:'Delhi',city:'Delhi',kind:'State university',url:'https://dtu.ac.in/'},
  {name:'Netaji Subhas University of Technology',state:'Delhi',city:'New Delhi',kind:'State university',url:'https://nsut.ac.in/'},
  {name:'College of Engineering Pune Technological University',state:'Maharashtra',city:'Pune',kind:'State public university',url:'https://www.coeptech.ac.in/'},
  {name:'Punjab Engineering College',state:'Chandigarh',city:'Chandigarh',kind:'Deemed-to-be university',url:'https://pec.ac.in/'},
  {name:'Dayananda Sagar University',state:'Karnataka',city:'Bengaluru',kind:'Private university',url:'https://www.dsu.edu.in/'},
  {name:'VNR Vignana Jyothi Institute of Engineering and Technology',state:'Telangana',city:'Hyderabad',kind:'Autonomous engineering college',url:'https://www.vnrvjiet.ac.in/'},
  {name:'Bharat Institute of Engineering and Technology',state:'Telangana',city:'Ibrahimpatnam',kind:'Engineering college',url:'https://biet.ac.in/'},
  {name:'National Institute of Technology Durgapur',state:'West Bengal',city:'Durgapur',kind:'NIT · Public institute',url:'https://nitdgp.ac.in/'},
  {name:'Indian Institute of Technology Gandhinagar',state:'Gujarat',city:'Gandhinagar',kind:'IIT · Public institute',url:'https://iitgn.ac.in/'},
  {name:'Indian Institute of Technology Indore',state:'Madhya Pradesh',city:'Indore',kind:'IIT · Public institute',url:'https://www.iiti.ac.in/'},
  {name:'Indian Institute of Technology Guwahati',state:'Assam',city:'Guwahati',kind:'IIT · Public institute',url:'https://www.iitg.ac.in/'},
  {name:'Indian Institute of Technology Bhubaneswar',state:'Odisha',city:'Bhubaneswar',kind:'IIT · Public institute',url:'https://www.iitbbs.ac.in/'}
];
const collegeSearch = document.getElementById('collegeSearch');
const collegeState = document.getElementById('collegeState');
const collegePriority = document.getElementById('collegePriority');
const collegeResults = document.getElementById('collegeResults');
const states = [...new Set(colleges.map(c => c.state))].sort((a,b)=>a.localeCompare(b));
states.forEach(state => { const option = document.createElement('option'); option.value = state; option.textContent = state; collegeState.appendChild(option); });
function renderColleges(){
  const query = collegeSearch.value.trim().toLowerCase();
  const state = collegeState.value;
  const sort = collegePriority.value;
  let list = colleges.filter(c => (state === 'all' || c.state === state) && `${c.name} ${c.state} ${c.city} ${c.kind}`.toLowerCase().includes(query));
  list.sort((a,b) => sort === 'region' ? a.state.localeCompare(b.state) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name));
  document.getElementById('collegeCount').textContent = `${list.length} of ${colleges.length} institutions shown · official links included`;
  if(!list.length){collegeResults.innerHTML='<div class="panel"><h2>No matching colleges</h2><p class="muted">Try a different college name or select “All India”.</p></div>';return;}
  collegeResults.innerHTML = list.map(c => `<article class="college-card"><div class="college-symbol">⌂</div><h3>${c.name}</h3><div class="college-type">${c.kind}</div><div class="college-details"><div><span>State / region</span><b>${c.state}</b></div><div><span>City</span><b>${c.city}</b></div><div><span>Fees and branches</span><b>Check official website</b></div></div><span class="college-tag">Official website linked</span><p class="small-note">Course availability, tuition, hostel costs, admissions, and placement outcomes can change. Verify the exact program and academic year directly with the institution.</p><a class="btn secondary full college-website" href="${c.url}" target="_blank" rel="noopener noreferrer">Visit official website ↗</a></article>`).join('');
}
collegeSearch.addEventListener('input',renderColleges);collegeState.addEventListener('change',renderColleges);collegePriority.addEventListener('change',renderColleges);renderColleges();

const budgetForm = document.getElementById('budgetForm');
const budgetFields = ['tuition','stay','living','other','years','support'];
function getBudget(){const vals={};budgetFields.forEach(id=>vals[id]=Math.max(0,Number(document.getElementById(id).value)||0));const gross=vals.tuition+vals.stay+vals.living+vals.other;const net=Math.max(0,gross-vals.support);return {...vals,gross,net,total:net*vals.years};}
function renderBudget(){const b=getBudget();document.getElementById('annualCost').textContent=rupees(b.net);document.getElementById('totalCost').textContent=rupees(b.total);document.getElementById('costBreakdown').innerHTML=[['Tuition fees',b.tuition],['Accommodation',b.stay],['Food and travel',b.living],['Other expenses',b.other],['Estimated gross annual cost',b.gross],['Annual support deducted',-Math.min(b.support,b.gross)]].map(([label,value])=>`<div class="breakdown-row"><span>${label}</span><b>${value<0?'− ':''}${rupees(Math.abs(value))}</b></div>`).join('');document.getElementById('copyStatus').textContent='';}
budgetForm.addEventListener('submit',e=>{e.preventDefault();renderBudget()});budgetFields.forEach(id=>document.getElementById(id).addEventListener('input',renderBudget));renderBudget();
document.getElementById('copySummary').addEventListener('click',async()=>{const b=getBudget();const summary=`EduFamily AI — Family budget discussion\nEstimated gross annual cost: ${rupees(b.gross)}\nAnnual support/scholarship: ${rupees(Math.min(b.support,b.gross))}\nEstimated net annual cost: ${rupees(b.net)}\nCourse duration: ${b.years} years\nEstimated full-course net cost: ${rupees(b.total)}\nNote: These are estimates, not an official fee quote.`;const status=document.getElementById('copyStatus');try{await navigator.clipboard.writeText(summary);status.textContent='Summary copied. You can paste it into your family discussion.';}catch{status.textContent=summary;}});
