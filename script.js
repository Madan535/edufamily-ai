const rupees = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value) || 0);

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
  {name:'G. Pulla Reddy Engineering College',state:'Andhra Pradesh',district:'Kurnool',city:'Kurnool',kind:'Autonomous engineering college',url:'https://www.gprec.ac.in/'},
  {"name": "Indian Institute of Technology Jodhpur", "state": "Rajasthan", "district": "Jodhpur", "city": "Jodhpur", "kind": "IIT · Public institute", "url": "https://iitj.ac.in/"},
  {"name": "Indian Institute of Technology Patna", "state": "Bihar", "district": "Patna", "city": "Patna", "kind": "IIT · Public institute", "url": "https://www.iitp.ac.in/"},
  {"name": "Indian Institute of Technology Mandi", "state": "Himachal Pradesh", "district": "Mandi", "city": "Kamand", "kind": "IIT · Public institute", "url": "https://www.iitmandi.ac.in/"},
  {"name": "Indian Institute of Technology Ropar", "state": "Punjab", "district": "Rupnagar", "city": "Rupnagar", "kind": "IIT · Public institute", "url": "https://www.iitrpr.ac.in/"},
  {"name": "Indian Institute of Technology Bhilai", "state": "Chhattisgarh", "district": "Durg", "city": "Bhilai", "kind": "IIT · Public institute", "url": "https://www.iitbhilai.ac.in/"},
  {"name": "Indian Institute of Technology Jammu", "state": "Jammu and Kashmir", "district": "Jammu", "city": "Jammu", "kind": "IIT · Public institute", "url": "https://www.iitjammu.ac.in/"},
  {"name": "Indian Institute of Technology Dharwad", "state": "Karnataka", "district": "Dharwad", "city": "Dharwad", "kind": "IIT · Public institute", "url": "https://www.iitdh.ac.in/"},
  {"name": "Indian Institute of Technology Palakkad", "state": "Kerala", "district": "Palakkad", "city": "Palakkad", "kind": "IIT · Public institute", "url": "https://iitpkd.ac.in/"},
  {"name": "Indian Institute of Technology Tirupati", "state": "Andhra Pradesh", "district": "Tirupati", "city": "Tirupati", "kind": "IIT · Public institute", "url": "https://www.iittp.ac.in/"},
  {"name": "Indian Institute of Technology Goa", "state": "Goa", "district": "South Goa", "city": "Farmagudi", "kind": "IIT · Public institute", "url": "https://iitgoa.ac.in/"},
  {"name": "National Institute of Technology Silchar", "state": "Assam", "district": "Cachar", "city": "Silchar", "kind": "NIT · Public institute", "url": "https://www.nits.ac.in/"},
  {"name": "National Institute of Technology Agartala", "state": "Tripura", "district": "West Tripura", "city": "Agartala", "kind": "NIT · Public institute", "url": "https://nita.ac.in/"},
  {"name": "National Institute of Technology Meghalaya", "state": "Meghalaya", "district": "East Khasi Hills", "city": "Shillong", "kind": "NIT · Public institute", "url": "https://www.nitm.ac.in/"},
  {"name": "National Institute of Technology Manipur", "state": "Manipur", "district": "Imphal West", "city": "Imphal", "kind": "NIT · Public institute", "url": "https://www.nitmanipur.ac.in/"},
  {"name": "National Institute of Technology Mizoram", "state": "Mizoram", "district": "Aizawl", "city": "Aizawl", "kind": "NIT · Public institute", "url": "https://www.nitmz.ac.in/"},
  {"name": "National Institute of Technology Nagaland", "state": "Nagaland", "district": "Chumoukedima", "city": "Chumoukedima", "kind": "NIT · Public institute", "url": "https://nitnagaland.ac.in/"},
  {"name": "National Institute of Technology Sikkim", "state": "Sikkim", "district": "South Sikkim", "city": "Ravangla", "kind": "NIT · Public institute", "url": "https://nitsikkim.ac.in/"},
  {"name": "National Institute of Technology Uttarakhand", "state": "Uttarakhand", "district": "Srinagar Garhwal", "city": "Srinagar Garhwal", "kind": "NIT · Public institute", "url": "https://nituk.ac.in/"},
  {"name": "National Institute of Technology Delhi", "state": "Delhi", "district": "North West Delhi", "city": "Delhi", "kind": "NIT · Public institute", "url": "https://nitdelhi.ac.in/"},
  {"name": "National Institute of Technology Kurukshetra", "state": "Haryana", "district": "Kurukshetra", "city": "Kurukshetra", "kind": "NIT · Public institute", "url": "https://nitkkr.ac.in/"},
  {"name": "National Institute of Technology Jamshedpur", "state": "Jharkhand", "district": "East Singhbhum", "city": "Jamshedpur", "kind": "NIT · Public institute", "url": "https://www.nitjsr.ac.in/"},
  {"name": "National Institute of Technology Patna", "state": "Bihar", "district": "Patna", "city": "Patna", "kind": "NIT · Public institute", "url": "https://www.nitp.ac.in/"},
  {"name": "National Institute of Technology Raipur", "state": "Chhattisgarh", "district": "Raipur", "city": "Raipur", "kind": "NIT · Public institute", "url": "https://www.nitrr.ac.in/"},
  {"name": "National Institute of Technology Hamirpur", "state": "Himachal Pradesh", "district": "Hamirpur", "city": "Hamirpur", "kind": "NIT · Public institute", "url": "https://nith.ac.in/"},
  {"name": "National Institute of Technology Srinagar", "state": "Jammu and Kashmir", "district": "Srinagar", "city": "Srinagar", "kind": "NIT · Public institute", "url": "https://nitsri.ac.in/"},
  {"name": "National Institute of Technology Goa", "state": "Goa", "district": "South Goa", "city": "Cuncolim", "kind": "NIT · Public institute", "url": "https://www.nitgoa.ac.in/"},
  {"name": "Malaviya National Institute of Technology Jaipur", "state": "Rajasthan", "district": "Jaipur", "city": "Jaipur", "kind": "NIT · Public institute", "url": "https://mnit.ac.in/"},
  {"name": "Maulana Azad National Institute of Technology Bhopal", "state": "Madhya Pradesh", "district": "Bhopal", "city": "Bhopal", "kind": "NIT · Public institute", "url": "https://www.manit.ac.in/"},
  {"name": "Motilal Nehru National Institute of Technology Allahabad", "state": "Uttar Pradesh", "district": "Prayagraj", "city": "Prayagraj", "kind": "NIT · Public institute", "url": "https://www.mnnit.ac.in/"},
  {"name": "Sardar Vallabhbhai National Institute of Technology Surat", "state": "Gujarat", "district": "Surat", "city": "Surat", "kind": "NIT · Public institute", "url": "https://www.svnit.ac.in/"},
  {"name": "National Institute of Technology Karnataka Surathkal", "state": "Karnataka", "district": "Dakshina Kannada", "city": "Surathkal", "kind": "NIT · Public institute", "url": "https://www.nitk.ac.in/"},
  {"name": "Indian Institute of Engineering Science and Technology Shibpur", "state": "West Bengal", "district": "Howrah", "city": "Shibpur", "kind": "Public technical institute", "url": "https://www.iiests.ac.in/"},
  {"name": "Indian Institute of Information Technology Allahabad", "state": "Uttar Pradesh", "district": "Prayagraj", "city": "Prayagraj", "kind": "IIIT · Public institute", "url": "https://www.iiita.ac.in/"},
  {"name": "Indian Institute of Information Technology Bangalore", "state": "Karnataka", "district": "Bengaluru Urban", "city": "Bengaluru", "kind": "IIIT · Institute of higher education", "url": "https://www.iiitb.ac.in/"},
  {"name": "Indian Institute of Information Technology Delhi", "state": "Delhi", "district": "South East Delhi", "city": "New Delhi", "kind": "IIIT · Public institute", "url": "https://iiitd.ac.in/"},
  {"name": "Indian Institute of Information Technology Guwahati", "state": "Assam", "district": "Kamrup Metropolitan", "city": "Guwahati", "kind": "IIIT · Public institute", "url": "https://www.iiitg.ac.in/"},
  {"name": "Indian Institute of Information Technology Kottayam", "state": "Kerala", "district": "Kottayam", "city": "Pala", "kind": "IIIT · Public institute", "url": "https://iiitkottayam.ac.in/"},
  {"name": "Indian Institute of Information Technology Pune", "state": "Maharashtra", "district": "Pune", "city": "Pune", "kind": "IIIT · Public institute", "url": "https://www.iiitp.ac.in/"},
  {"name": "Indian Institute of Information Technology Sri City", "state": "Andhra Pradesh", "district": "Tirupati", "city": "Sri City", "kind": "IIIT · Public institute", "url": "https://www.iiits.ac.in/"},
  {"name": "Indian Institute of Information Technology Vadodara", "state": "Gujarat", "district": "Gandhinagar", "city": "Gandhinagar", "kind": "IIIT · Public institute", "url": "https://iiitvadodara.ac.in/"},
  {"name": "Indian Institute of Information Technology Kancheepuram", "state": "Tamil Nadu", "district": "Chengalpattu", "city": "Chennai region", "kind": "IIIT · Public institute", "url": "https://www.iiitdm.ac.in/"},
  {"name": "University Institute of Engineering and Technology Panjab University", "state": "Chandigarh", "district": "Chandigarh", "city": "Chandigarh", "kind": "University engineering institute", "url": "https://uiet.puchd.ac.in/"},
  {"name": "Thapar Institute of Engineering and Technology", "state": "Punjab", "district": "Patiala", "city": "Patiala", "kind": "Deemed university", "url": "https://www.thapar.edu/"},
  {"name": "Lovely Professional University", "state": "Punjab", "district": "Kapurthala", "city": "Phagwara", "kind": "Private university", "url": "https://www.lpu.in/"},
  {"name": "Chandigarh University", "state": "Punjab", "district": "SAS Nagar", "city": "Gharuan", "kind": "Private university", "url": "https://www.cuchd.in/"},
  {"name": "Chitkara University Punjab", "state": "Punjab", "district": "Patiala", "city": "Rajpura", "kind": "Private university", "url": "https://www.chitkara.edu.in/"},
  {"name": "Bennett University", "state": "Uttar Pradesh", "district": "Gautam Buddha Nagar", "city": "Greater Noida", "kind": "Private university", "url": "https://www.bennett.edu.in/"},
  {"name": "Shiv Nadar University", "state": "Uttar Pradesh", "district": "Gautam Buddha Nagar", "city": "Dadri", "kind": "Private university", "url": "https://www.snu.edu.in/"},
  {"name": "Jaypee Institute of Information Technology", "state": "Uttar Pradesh", "district": "Gautam Buddha Nagar", "city": "Noida", "kind": "Deemed university", "url": "https://www.jiit.ac.in/"},
  {"name": "KIET Group of Institutions", "state": "Uttar Pradesh", "district": "Ghaziabad", "city": "Ghaziabad", "kind": "Engineering college", "url": "https://www.kiet.edu/"},
  {"name": "Ajay Kumar Garg Engineering College", "state": "Uttar Pradesh", "district": "Ghaziabad", "city": "Ghaziabad", "kind": "Engineering college", "url": "https://www.akgec.ac.in/"},
  {"name": "Harcourt Butler Technical University", "state": "Uttar Pradesh", "district": "Kanpur Nagar", "city": "Kanpur", "kind": "State technical university", "url": "https://hbtu.ac.in/"},
  {"name": "Institute of Engineering and Technology Lucknow", "state": "Uttar Pradesh", "district": "Lucknow", "city": "Lucknow", "kind": "State engineering institute", "url": "https://www.ietlucknow.ac.in/"},
  {"name": "Madan Mohan Malaviya University of Technology", "state": "Uttar Pradesh", "district": "Gorakhpur", "city": "Gorakhpur", "kind": "State technical university", "url": "https://www.mmmut.ac.in/"},
  {"name": "College of Engineering Trivandrum", "state": "Kerala", "district": "Thiruvananthapuram", "city": "Thiruvananthapuram", "kind": "Government engineering college", "url": "https://www.cet.ac.in/"},
  {"name": "Government Engineering College Thrissur", "state": "Kerala", "district": "Thrissur", "city": "Thrissur", "kind": "Government engineering college", "url": "https://gectcr.ac.in/"},
  {"name": "Model Engineering College", "state": "Kerala", "district": "Ernakulam", "city": "Kochi", "kind": "Government engineering college", "url": "https://www.mec.ac.in/"},
  {"name": "PSG College of Technology", "state": "Tamil Nadu", "district": "Coimbatore", "city": "Coimbatore", "kind": "Autonomous engineering college", "url": "https://www.psgtech.edu/"},
  {"name": "Coimbatore Institute of Technology", "state": "Tamil Nadu", "district": "Coimbatore", "city": "Coimbatore", "kind": "Government-aided engineering college", "url": "https://www.cit.edu.in/"},
  {"name": "Thiagarajar College of Engineering", "state": "Tamil Nadu", "district": "Madurai", "city": "Madurai", "kind": "Autonomous engineering college", "url": "https://www.tce.edu/"},
  {"name": "Kumaraguru College of Technology", "state": "Tamil Nadu", "district": "Coimbatore", "city": "Coimbatore", "kind": "Autonomous engineering college", "url": "https://www.kct.ac.in/"},
  {"name": "SASTRA Deemed University", "state": "Tamil Nadu", "district": "Thanjavur", "city": "Thanjavur", "kind": "Deemed university", "url": "https://www.sastra.edu/"},
  {"name": "Kalasalingam Academy of Research and Education", "state": "Tamil Nadu", "district": "Virudhunagar", "city": "Krishnankoil", "kind": "Deemed university", "url": "https://kalasalingam.ac.in/"},
  {"name": "Kongu Engineering College", "state": "Tamil Nadu", "district": "Erode", "city": "Perundurai", "kind": "Autonomous engineering college", "url": "https://kongu.ac.in/"},
  {"name": "Sri Sivasubramaniya Nadar College of Engineering", "state": "Tamil Nadu", "district": "Chengalpattu", "city": "Kalavakkam", "kind": "Autonomous engineering college", "url": "https://www.ssn.edu.in/"},
  {"name": "BMS College of Engineering", "state": "Karnataka", "district": "Bengaluru Urban", "city": "Bengaluru", "kind": "Autonomous engineering college", "url": "https://bmsce.ac.in/"},
  {"name": "Ramaiah Institute of Technology", "state": "Karnataka", "district": "Bengaluru Urban", "city": "Bengaluru", "kind": "Autonomous engineering college", "url": "https://www.msrit.edu/"},
  {"name": "RV College of Engineering", "state": "Karnataka", "district": "Bengaluru Urban", "city": "Bengaluru", "kind": "Autonomous engineering college", "url": "https://rvce.edu.in/"},
  {"name": "PES University", "state": "Karnataka", "district": "Bengaluru Urban", "city": "Bengaluru", "kind": "Private university", "url": "https://pes.edu/"},
  {"name": "Manipal Institute of Technology", "state": "Karnataka", "district": "Udupi", "city": "Manipal", "kind": "Private university institute", "url": "https://manipal.edu/mit.html"},
  {"name": "KLE Technological University", "state": "Karnataka", "district": "Dharwad", "city": "Hubballi", "kind": "Private university", "url": "https://www.kletech.ac.in/"},
  {"name": "College of Engineering Guindy", "state": "Tamil Nadu", "district": "Chennai", "city": "Chennai", "kind": "University engineering college", "url": "https://ceg.annauniv.edu/"},
  {"name": "Institute of Chemical Technology Mumbai", "state": "Maharashtra", "district": "Mumbai Suburban", "city": "Mumbai", "kind": "Deemed university", "url": "https://www.ictmumbai.edu.in/"},
  {"name": "Veermata Jijabai Technological Institute", "state": "Maharashtra", "district": "Mumbai City", "city": "Mumbai", "kind": "Autonomous engineering institute", "url": "https://vjti.ac.in/"},
  {"name": "Sardar Patel Institute of Technology", "state": "Maharashtra", "district": "Mumbai Suburban", "city": "Mumbai", "kind": "Autonomous engineering institute", "url": "https://www.spit.ac.in/"},
  {"name": "Pune Institute of Computer Technology", "state": "Maharashtra", "district": "Pune", "city": "Pune", "kind": "Engineering college", "url": "https://pict.edu/"},
  {"name": "Walchand College of Engineering", "state": "Maharashtra", "district": "Sangli", "city": "Sangli", "kind": "Government-aided engineering college", "url": "https://www.walchandsangli.ac.in/"},
  {"name": "College of Engineering Chengannur", "state": "Kerala", "district": "Alappuzha", "city": "Chengannur", "kind": "Government engineering college", "url": "https://ceconline.edu/"},
  {"name": "National Institute of Electronics and Information Technology Aurangabad", "state": "Maharashtra", "district": "Chhatrapati Sambhajinagar", "city": "Chhatrapati Sambhajinagar", "kind": "Government technical institute", "url": "https://nielit.gov.in/aurangabad/"},
  {"name": "International Institute of Information Technology Naya Raipur", "state": "Chhattisgarh", "district": "Raipur", "city": "Naya Raipur", "kind": "State technical institute", "url": "https://www.iiitnr.ac.in/"},
  {"name": "University College of Engineering Osmania University", "state": "Telangana", "district": "Hyderabad", "city": "Hyderabad", "kind": "University engineering college", "url": "https://uceou.edu/"},
  {"name": "JNTU College of Engineering Kakinada", "state": "Andhra Pradesh", "district": "Kakinada", "city": "Kakinada", "kind": "University engineering college", "url": "https://jntuk.edu.in/"},
  {"name": "JNTU College of Engineering Vizianagaram", "state": "Andhra Pradesh", "district": "Vizianagaram", "city": "Vizianagaram", "kind": "University engineering college", "url": "https://jntugv.edu.in/"},
  {"name": "Sri Krishnadevaraya University College of Engineering", "state": "Andhra Pradesh", "district": "Ananthapuramu", "city": "Anantapur", "kind": "University engineering college", "url": "https://skuniversity.ac.in/"},
  {"name": "Rajiv Gandhi University of Knowledge Technologies Nuzvid", "state": "Andhra Pradesh", "district": "Eluru", "city": "Nuzvid", "kind": "Public university institute", "url": "https://www.rgukt.in/"},
  {"name": "Rajiv Gandhi University of Knowledge Technologies RK Valley", "state": "Andhra Pradesh", "district": "YSR Kadapa", "city": "Idupulapaya", "kind": "Public university institute", "url": "https://www.rgukt.in/"},
  {"name": "Koneru Lakshmaiah Education Foundation", "state": "Andhra Pradesh", "district": "Guntur", "city": "Vaddeswaram", "kind": "Deemed university", "url": "https://www.kluniversity.in/"},
  {"name": "SRM University AP", "state": "Andhra Pradesh", "district": "Guntur", "city": "Neerukonda", "kind": "Private university", "url": "https://srmap.edu.in/"}
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
