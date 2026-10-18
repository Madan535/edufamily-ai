// Format amounts as Indian rupees (used by the budget planner).
const rupees = value => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
}).format(Number(value) || 0);

const views = {
  home: document.getElementById('homeView'),
  career: document.getElementById('careerView'),
  colleges: document.getElementById('collegesView'),
  budget: document.getElementById('budgetView')
};
const nav = document.querySelector('.bottom-nav');
function showView(name) {
  if (!views[name]) return;
  Object.entries(views).forEach(([key, el]) => el.classList.toggle('active', key === name));
  document.querySelectorAll('[data-view]').forEach(btn => {
    if (btn.classList.contains('bottom-link')) btn.classList.toggle('active', btn.dataset.view === name);
  });
  window.scrollTo({top: 0, behavior: 'smooth'});
}
document.querySelectorAll('[data-view]').forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.view)));

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
  {name:'Indian Institute of Technology Bombay',state:'Maharashtra',district:'Mumbai City',city:'Mumbai',kind:'IIT · Public institute',url:'https://www.iitb.ac.in/'},
  {name:'Indian Institute of Technology Delhi',state:'Delhi',district:'New Delhi',city:'New Delhi',kind:'IIT · Public institute',url:'https://home.iitd.ac.in/'},
  {name:'Indian Institute of Technology Madras',state:'Tamil Nadu',district:'Chennai',city:'Chennai',kind:'IIT · Public institute',url:'https://www.iitm.ac.in/'},
  {name:'Indian Institute of Technology Kanpur',state:'Uttar Pradesh',district:'Kanpur Nagar',city:'Kanpur',kind:'IIT · Public institute',url:'https://www.iitk.ac.in/'},
  {name:'Indian Institute of Technology Kharagpur',state:'West Bengal',district:'Paschim Medinipur',city:'Kharagpur',kind:'IIT · Public institute',url:'https://www.iitkgp.ac.in/'},
  {name:'Indian Institute of Technology Hyderabad',state:'Telangana',district:'Sangareddy',city:'Sangareddy',kind:'IIT · Public institute',url:'https://www.iith.ac.in/'},
  {name:'Indian Institute of Technology Roorkee',state:'Uttarakhand',district:'Haridwar',city:'Roorkee',kind:'IIT · Public institute',url:'https://www.iitr.ac.in/'},
  {name:'Indian Institute of Technology (BHU) Varanasi',state:'Uttar Pradesh',district:'Varanasi',city:'Varanasi',kind:'IIT · Public institute',url:'https://www.iitbhu.ac.in/'},
  {name:'National Institute of Technology Tiruchirappalli',state:'Tamil Nadu',district:'Tiruchirappalli',city:'Tiruchirappalli',kind:'NIT · Public institute',url:'https://www.nitt.edu/'},
  {name:'National Institute of Technology Warangal',state:'Telangana',district:'Hanamkonda',city:'Warangal',kind:'NIT · Public institute',url:'https://www.nitw.ac.in/'},
  {name:'National Institute of Technology Karnataka, Surathkal',state:'Karnataka',district:'Dakshina Kannada',city:'Surathkal',kind:'NIT · Public institute',url:'https://www.nitk.ac.in/'},
  {name:'National Institute of Technology Calicut',state:'Kerala',district:'Kozhikode',city:'Kozhikode',kind:'NIT · Public institute',url:'https://nitc.ac.in/'},
  {name:'National Institute of Technology Rourkela',state:'Odisha',district:'Sundargarh',city:'Rourkela',kind:'NIT · Public institute',url:'https://www.nitrkl.ac.in/'},
  {name:'National Institute of Technology Andhra Pradesh',state:'Andhra Pradesh',district:'West Godavari',city:'Tadepalligudem',kind:'NIT · Public institute',url:'https://www.nitandhra.ac.in/'},
  {name:'Andhra University College of Engineering',state:'Andhra Pradesh',district:'Visakhapatnam',city:'Visakhapatnam',kind:'University engineering college',url:'https://www.andhrauniversity.edu.in/'},
  {name:'Anil Neerukonda Institute of Technology and Sciences (ANITS)',state:'Andhra Pradesh',district:'Visakhapatnam',city:'Visakhapatnam',kind:'Engineering college',url:'https://www.anits.edu.in/'},
  {name:'Gayatri Vidya Parishad College of Engineering',state:'Andhra Pradesh',district:'Visakhapatnam',city:'Visakhapatnam',kind:'Engineering college',url:'https://gvpce.ac.in/'},
  {name:'GMR Institute of Technology',state:'Andhra Pradesh',district:'Vizianagaram',city:'Rajam',kind:'Autonomous engineering college',url:'https://gmrit.edu.in/'},
  {name:'Vignan’s Foundation for Science, Technology and Research',state:'Andhra Pradesh',district:'Guntur',city:'Vadlamudi, Guntur',kind:'Deemed university',url:'https://vignan.ac.in/'},
  {name:'R.V.R. & J.C. College of Engineering',state:'Andhra Pradesh',district:'Guntur',city:'Guntur',kind:'Autonomous engineering college',url:'https://www.rvrjc.ac.in/'},
  {name:'Vasireddy Venkatadri Institute of Technology',state:'Andhra Pradesh',district:'Guntur',city:'Nambur, Guntur',kind:'Autonomous engineering college',url:'https://www.vvitguntur.com/'},
  {name:'N.B.K.R. Institute of Science and Technology',state:'Andhra Pradesh',district:'Sri Potti Sriramulu Nellore',city:'Vidyanagar',kind:'Autonomous engineering college',url:'https://www.nbkrist.org/'},
  {name:'Sree Vidyanikethan Engineering College',state:'Andhra Pradesh',district:'Tirupati',city:'Tirupati district',kind:'Engineering college',url:'https://www.svec.education/'},
  {name:'Sri Venkateswara University College of Engineering',state:'Andhra Pradesh',district:'Tirupati',city:'Tirupati',kind:'University engineering college',url:'https://svuniversity.edu.in/'},
  {name:'GITAM (Deemed to be University)',state:'Andhra Pradesh',district:'Visakhapatnam',city:'Visakhapatnam',kind:'Deemed university',url:'https://www.gitam.edu/'},
  {name:'Visvesvaraya National Institute of Technology',state:'Maharashtra',district:'Nagpur',city:'Nagpur',kind:'NIT · Public institute',url:'https://vnit.ac.in/'},
  {name:'Indian Institute of Information Technology Hyderabad',state:'Telangana',district:'Hyderabad',city:'Hyderabad',kind:'IIIT · Public-private partnership',url:'https://www.iiit.ac.in/'},
  {name:'International Institute of Information Technology Bangalore',state:'Karnataka',district:'Bengaluru Urban',city:'Bengaluru',kind:'IIIT · Institute of higher education',url:'https://www.iiitb.ac.in/'},
  {name:'Birla Institute of Technology and Science, Pilani',state:'Rajasthan',district:'Jhunjhunu',city:'Pilani',kind:'Deemed university',url:'https://www.bits-pilani.ac.in/'},
  {name:'Vellore Institute of Technology',state:'Tamil Nadu',district:'Vellore',city:'Vellore',kind:'Private university',url:'https://vit.ac.in/'},
  {name:'Amrita Vishwa Vidyapeetham',state:'Tamil Nadu',district:'Coimbatore',city:'Coimbatore',kind:'Deemed university',url:'https://www.amrita.edu/'},
  {name:'SRM Institute of Science and Technology',state:'Tamil Nadu',district:'Chengalpattu',city:'Kattankulathur',kind:'Deemed university',url:'https://www.srmist.edu.in/'},
  {name:'Anna University',state:'Tamil Nadu',district:'Chennai',city:'Chennai',kind:'State university',url:'https://www.annauniv.edu/'},
  {name:'Jadavpur University',state:'West Bengal',district:'Kolkata',city:'Kolkata',kind:'State university',url:'https://jadavpuruniversity.in/'},
  {name:'Delhi Technological University',state:'Delhi',district:'New Delhi',city:'Delhi',kind:'State university',url:'https://dtu.ac.in/'},
  {name:'Netaji Subhas University of Technology',state:'Delhi',district:'New Delhi',city:'New Delhi',kind:'State university',url:'https://nsut.ac.in/'},
  {name:'College of Engineering Pune Technological University',state:'Maharashtra',district:'Pune',city:'Pune',kind:'State public university',url:'https://www.coeptech.ac.in/'},
  {name:'Punjab Engineering College',state:'Chandigarh',district:'Chandigarh',city:'Chandigarh',kind:'Deemed-to-be university',url:'https://pec.ac.in/'},
  {name:'Dayananda Sagar University',state:'Karnataka',district:'Bengaluru Urban',city:'Bengaluru',kind:'Private university',url:'https://www.dsu.edu.in/'},
  {name:'VNR Vignana Jyothi Institute of Engineering and Technology',state:'Telangana',district:'Hyderabad',city:'Hyderabad',kind:'Autonomous engineering college',url:'https://www.vnrvjiet.ac.in/'},
  {name:'Bharat Institute of Engineering and Technology',state:'Telangana',district:'District not verified',city:'Ibrahimpatnam',kind:'Engineering college',url:'https://biet.ac.in/'},
  {name:'National Institute of Technology Durgapur',state:'West Bengal',district:'Paschim Bardhaman',city:'Durgapur',kind:'NIT · Public institute',url:'https://nitdgp.ac.in/'},
  {name:'Indian Institute of Technology Gandhinagar',state:'Gujarat',district:'Gandhinagar',city:'Gandhinagar',kind:'IIT · Public institute',url:'https://iitgn.ac.in/'},
  {name:'Indian Institute of Technology Indore',state:'Madhya Pradesh',district:'Indore',city:'Indore',kind:'IIT · Public institute',url:'https://www.iiti.ac.in/'},
  {name:'Indian Institute of Technology Guwahati',state:'Assam',district:'Kamrup Metropolitan',city:'Guwahati',kind:'IIT · Public institute',url:'https://www.iitg.ac.in/'},
  {name:'Indian Institute of Technology Bhubaneswar',state:'Odisha',district:'Khordha',city:'Bhubaneswar',kind:'IIT · Public institute',url:'https://www.iitbbs.ac.in/'},
  {name:'JNTU College of Engineering, Hyderabad',state:'Telangana',district:'Medchal–Malkajgiri',city:'Kukatpally, Hyderabad',kind:'University engineering college',url:'https://jntuh.ac.in/'},
  {name:'Osmania University College of Engineering',state:'Telangana',district:'Hyderabad',city:'Hyderabad',kind:'University engineering college',url:'https://www.osmania.ac.in/'},
  {name:'Chaitanya Bharathi Institute of Technology',state:'Telangana',district:'Rangareddy',city:'Gandipet, Hyderabad',kind:'Autonomous engineering college',url:'https://www.cbit.ac.in/'},
  {name:'Vasavi College of Engineering',state:'Telangana',district:'Hyderabad',city:'Ibrahim Bagh, Hyderabad',kind:'Autonomous engineering college',url:'https://www.vce.ac.in/'},
  {name:'CVR College of Engineering',state:'Telangana',district:'Rangareddy',city:'Mangalpalli, Ibrahimpatnam',kind:'Autonomous engineering college',url:'https://www.cvr.ac.in/'},
  {name:'Kakatiya Institute of Technology and Science',state:'Telangana',district:'Warangal',city:'Warangal',kind:'Engineering college',url:'https://www.kitsw.ac.in/'},
  {name:'Muffakham Jah College of Engineering and Technology',state:'Telangana',district:'Hyderabad',city:'Banjara Hills, Hyderabad',kind:'Engineering college',url:'https://mjcollege.ac.in/'},
  {name:'Sreenidhi Institute of Science and Technology',state:'Telangana',district:'Medchal–Malkajgiri',city:'Ghatkesar',kind:'Autonomous engineering college',url:'https://www.sreenidhi.edu.in/'},
  {name:'Malla Reddy Engineering College',state:'Telangana',district:'Medchal–Malkajgiri',city:'Maisammaguda, Hyderabad',kind:'Engineering college',url:'https://www.mrec.ac.in/'},
  {name:'Institute of Aeronautical Engineering',state:'Telangana',district:'Medchal–Malkajgiri',city:'Dundigal, Hyderabad',kind:'Engineering college',url:'https://www.iare.ac.in/'},
  {name:'JNTU College of Engineering, Anantapur',state:'Andhra Pradesh',district:'Anantapuramu',city:'Anantapuramu',kind:'University engineering college',url:'https://jntua.ac.in/'},
  {name:'Sri Venkateswara College of Engineering, Tirupati',state:'Andhra Pradesh',district:'Tirupati',city:'Tirupati',kind:'Engineering college',url:'https://svce.edu.in/'},
  {name:'Prasad V. Potluri Siddhartha Institute of Technology',state:'Andhra Pradesh',district:'NTR',city:'Vijayawada',kind:'Autonomous engineering college',url:'https://www.pvpsiddhartha.ac.in/'},
  {name:'Gudlavalleru Engineering College',state:'Andhra Pradesh',district:'Krishna',city:'Gudlavalleru',kind:'Autonomous engineering college',url:'https://www.gecgudlavalleru.ac.in/'},
  {name:'Aditya Engineering College',state:'Andhra Pradesh',district:'Kakinada',city:'Surampalem',kind:'Engineering college',url:'https://aec.edu.in/'},
  {name:'Geethanjali Institute of Science and Technology',state:'Andhra Pradesh',district:'Sri Potti Sriramulu Nellore',city:'Gangavaram, Kovur',kind:'Autonomous · affiliated to JNTUA',url:'https://gist.edu.in/gist/programmes-offered/'},
  {name:'Sree Venkateswara College of Engineering',state:'Andhra Pradesh',district:'Sri Potti Sriramulu Nellore',city:'North Rajupalem',kind:'Engineering college',url:'https://svcn.ac.in/'},
  {name:'Bapatla Engineering College',state:'Andhra Pradesh',district:'Bapatla',city:'Bapatla',kind:'Autonomous engineering college',url:'https://www.becbapatla.ac.in/'},
  {name:'QIS College of Engineering and Technology',state:'Andhra Pradesh',district:'Prakasam',city:'Ongole',kind:'Engineering college',url:'https://www.qiscet.edu.in/'},
  {name:'Siddharth Institute of Engineering and Technology',state:'Andhra Pradesh',district:'Tirupati',city:'Puttur',kind:'Autonomous engineering college',url:'https://www.sietk.org/'},
  {name:'Sri Sai Institute of Technology and Science',state:'Andhra Pradesh',district:'Annamayya',city:'Rayachoty',kind:'Engineering college',url:'https://www.sists.org/'},
  {name:'SVR Engineering College',state:'Andhra Pradesh',district:'Nandyal',city:'Nandyal',kind:'Engineering college',url:'https://www.svrec.ac.in/'},
  {name:'Eswar College of Engineering',state:'Andhra Pradesh',district:'Palnadu',city:'Narasaraopet',kind:'Engineering college',url:'https://www.eswarcollegeofengg.org/'},
  {name:'Sir C R Reddy College of Engineering',state:'Andhra Pradesh',district:'Eluru',city:'Eluru',kind:'Autonomous engineering college',url:'https://www.sircrrengg.ac.in/'},
  {name:'Vishnu Institute of Technology',state:'Andhra Pradesh',district:'West Godavari',city:'Bhimavaram',kind:'Autonomous engineering college',url:'https://www.vishnu.edu.in/'},
  {name:'Bonam Venkata Chalamayya Engineering College',state:'Andhra Pradesh',district:'Dr. B. R. Ambedkar Konaseema',city:'Odalarevu',kind:'Engineering college',url:'https://www.bvcec.org/'},
  {name:'KSRM College of Engineering',state:'Andhra Pradesh',district:'YSR Kadapa',city:'Kadapa',kind:'Autonomous engineering college',url:'https://www.ksrmce.ac.in/'},
  {name:'Lendi Institute of Engineering and Technology',state:'Andhra Pradesh',district:'Vizianagaram',city:'Jonnada',kind:'Autonomous engineering college',url:'https://www.lendi.org/'},
  {name:'G. Pulla Reddy Engineering College',state:'Andhra Pradesh',district:'Kurnool',city:'Kurnool',kind:'Autonomous engineering college',url:'https://www.gprec.ac.in/'}
];
const collegeSearch = document.getElementById('collegeSearch');
const collegeState = document.getElementById('collegeState');
const collegeDistrict = document.getElementById('collegeDistrict');
const collegePriority = document.getElementById('collegePriority');
const collegeResults = document.getElementById('collegeResults');
const states = [...new Set(colleges.map(c => c.state))].sort((a,b)=>a.localeCompare(b));
states.forEach(state => { const option = document.createElement('option'); option.value = state; option.textContent = state; collegeState.appendChild(option); });
// Andhra Pradesh's current district list is included so visitors can browse
// every district. A district with no directory entry will correctly show no matches.
const stateDistrictDirectory = {
  'Andhra Pradesh': [
    'Alluri Sitharama Raju','Anakapalli','Ananthapuramu','Annamayya','Bapatla',
    'Chittoor','Dr. B. R. Ambedkar Konaseema','East Godavari','Eluru','Guntur',
    'Kakinada','Krishna','Kurnool','Nandyal','NTR','Palnadu','Parvathipuram Manyam',
    'Prakasam','Sri Potti Sriramulu Nellore','Sri Sathya Sai','Srikakulam',
    'Tirupati','Visakhapatnam','Vizianagaram','West Godavari','YSR Kadapa'
  ]
};
function updateDistrictOptions(){
  const state = collegeState.value;
  const previous = collegeDistrict.value;
  const listedDistricts = colleges
    .filter(c => state === 'all' || c.state === state)
    .map(c => c.district)
    .filter(d => d && d !== 'District not verified');
  const allStateDistricts = stateDistrictDirectory[state] || [];
  const districts = [...new Set([...allStateDistricts, ...listedDistricts])].sort((a,b)=>a.localeCompare(b));
  collegeDistrict.innerHTML = '<option value="all">All districts</option>';
  districts.forEach(district => { const option = document.createElement('option'); option.value = district; option.textContent = district; collegeDistrict.appendChild(option); });
  collegeDistrict.disabled = districts.length === 0;
  collegeDistrict.value = districts.includes(previous) ? previous : 'all';
}
function renderColleges(){
  const query = collegeSearch.value.trim().toLowerCase();
  const state = collegeState.value;
  const district = collegeDistrict.value;
  const sort = collegePriority.value;
  let list = colleges.filter(c => (state === 'all' || c.state === state) && (district === 'all' || c.district === district) && `${c.name} ${c.state} ${c.district} ${c.city} ${c.kind}`.toLowerCase().includes(query));
  list.sort((a,b) => sort === 'region' ? a.state.localeCompare(b.state) || a.district.localeCompare(b.district) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name));
  document.getElementById('collegeCount').textContent = `${list.length} of ${colleges.length} institutions shown · filter by state and district · official links included`;
  if(!list.length){collegeResults.innerHTML='<div class="panel"><h2>No matching colleges</h2><p class="muted">Try a different search, state, or district.</p></div>';return;}
  collegeResults.innerHTML = list.map(c => `<article class="college-card"><div class="college-symbol">⌂</div><h3>${c.name}</h3><div class="college-type">${c.kind}</div><div class="college-details"><div><span>State</span><b>${c.state}</b></div><div><span>District</span><b>${c.district}</b></div><div><span>City / area</span><b>${c.city}</b></div></div><span class="college-tag">Official website linked</span><p class="small-note">Fees, course availability, hostel costs, admissions, and placement outcomes are not assumed here. Confirm the exact program and academic year with the institution.</p><a class="btn secondary full college-website" href="${c.url}" target="_blank" rel="noopener noreferrer">Visit official website ↗</a></article>`).join('');
}
collegeState.addEventListener('change',()=>{updateDistrictOptions();renderColleges();});
collegeDistrict.addEventListener('change',renderColleges);collegeSearch.addEventListener('input',renderColleges);collegePriority.addEventListener('change',renderColleges);updateDistrictOptions();renderColleges();

const budgetForm = document.getElementById('budgetForm');
const budgetFields = ['tuition','stay','living','other','years','support'];
function getBudget(){const vals={};budgetFields.forEach(id=>vals[id]=Math.max(0,Number(document.getElementById(id).value)||0));const gross=vals.tuition+vals.stay+vals.living+vals.other;const net=Math.max(0,gross-vals.support);return {...vals,gross,net,total:net*vals.years};}
function renderBudget(){const b=getBudget();document.getElementById('annualCost').textContent=rupees(b.net);document.getElementById('totalCost').textContent=rupees(b.total);document.getElementById('costBreakdown').innerHTML=[['Tuition fees',b.tuition],['Accommodation',b.stay],['Food and travel',b.living],['Other expenses',b.other],['Estimated gross annual cost',b.gross],['Annual support deducted',-Math.min(b.support,b.gross)]].map(([label,value])=>`<div class="breakdown-row"><span>${label}</span><b>${value<0?'− ':''}${rupees(Math.abs(value))}</b></div>`).join('');document.getElementById('copyStatus').textContent='';}
budgetForm.addEventListener('submit',e=>{e.preventDefault();renderBudget()});budgetFields.forEach(id=>document.getElementById(id).addEventListener('input',renderBudget));renderBudget();
document.getElementById('copySummary').addEventListener('click',async()=>{const b=getBudget();const summary=`EduFamily AI — Family budget discussion\nEstimated gross annual cost: ${rupees(b.gross)}\nAnnual support/scholarship: ${rupees(Math.min(b.support,b.gross))}\nEstimated net annual cost: ${rupees(b.net)}\nCourse duration: ${b.years} years\nEstimated full-course net cost: ${rupees(b.total)}\nNote: These are estimates, not an official fee quote.`;const status=document.getElementById('copyStatus');try{await navigator.clipboard.writeText(summary);status.textContent='Summary copied. You can paste it into your family discussion.';}catch{status.textContent=summary;}});
