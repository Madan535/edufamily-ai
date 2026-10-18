
// App-style navigation: Home, Career Guide, College Compare, and Budget Planner act as separate screens.
(function setupPageNavigation() {
  const allowedViews = ["home", "guidance", "colleges", "budget"];
  function showView(view, updateHash = true) {
    if (!allowedViews.includes(view)) view = "home";
    document.body.dataset.activeView = view;
    document.querySelectorAll("[data-view-link]").forEach(link => {
      const target = link.dataset.viewLink;
      if (link.classList.contains("nav-link")) {
        link.classList.toggle("active", target === view);
        if (target === view) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      }
    });
    if (updateHash && location.hash !== "#" + view) history.replaceState(null, "", "#" + view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  document.addEventListener("click", event => {
    const link = event.target.closest("[data-view-link]");
    if (!link) return;
    event.preventDefault();
    showView(link.dataset.viewLink);
  });
  window.addEventListener("hashchange", () => {
    const requested = location.hash.slice(1);
    showView(requested === "how" ? "home" : requested, false);
  });
  const initial = location.hash.slice(1);
  showView(allowedViews.includes(initial) ? initial : "home", false);
})();

const money = value => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const branchDetails = {
  "CSE": "Explore programming, software development, algorithms, and computer systems.",
  "AI & Data Science": "Explore mathematics, data analysis, machine learning concepts, and intelligent applications.",
  "ECE": "Explore electronic circuits, communication systems, embedded devices, and hardware-software connections.",
  "Mechanical Engineering": "Explore machine design, manufacturing, mechanics, and physical systems.",
  "Civil Engineering": "Explore structures, construction, transportation, and infrastructure design."
};

document.getElementById("careerForm").addEventListener("submit", event => {
  event.preventDefault();
  const interest = document.getElementById("interest").value;
  const subject = document.getElementById("subject").value;
  const goal = document.getElementById("goal").value;
  const scores = { "CSE": 0, "AI & Data Science": 0, "ECE": 0, "Mechanical Engineering": 0, "Civil Engineering": 0 };
  const add = (branches, points) => branches.forEach(branch => scores[branch] += points);
  if (interest === "coding") add(["CSE", "AI & Data Science"], 3);
  if (interest === "data") add(["AI & Data Science", "CSE"], 3);
  if (interest === "circuits") add(["ECE"], 3);
  if (interest === "machines") add(["Mechanical Engineering", "ECE"], 3);
  if (interest === "buildings") add(["Civil Engineering"], 3);
  if (subject === "maths") add(["AI & Data Science", "Mechanical Engineering"], 1);
  if (subject === "computers") add(["CSE", "AI & Data Science"], 2);
  if (subject === "physics") add(["ECE", "Mechanical Engineering"], 1);
  if (subject === "drawing") add(["Civil Engineering", "Mechanical Engineering"], 2);
  if (goal === "software") add(["CSE", "AI & Data Science"], 2);
  if (goal === "research") add(["AI & Data Science", "ECE"], 1);
  if (goal === "hardware") add(["ECE", "Mechanical Engineering"], 2);
  if (goal === "infrastructure") add(["Civil Engineering"], 3);
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const result = document.getElementById("careerResult");
  result.innerHTML = `<div class="recommendation"><span class="match-label">YOUR STARTING POINT</span><h3>Branches to explore</h3><p>Based on the interests you selected, these options may be worth researching. Talk with family, teachers, and current students before deciding.</p>${sorted.map(([branch, score], index) => `<div class="suggestion"><strong>${index + 1}. ${branch}</strong><p>${branchDetails[branch]}</p></div>`).join("")}<p class="fine-print">This is a simple rule-based demo, not a validated AI assessment or a guarantee of career success.</p></div>`;
});

const chosenColleges = new Set();
document.querySelectorAll(".compare-btn").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.college;
    if (chosenColleges.has(name)) chosenColleges.delete(name);
    else chosenColleges.add(name);
    button.textContent = chosenColleges.has(name) ? "Added ✓ (click to remove)" : "Add to comparison ↗";
    const output = document.getElementById("compareOutput");
    output.innerHTML = `<b>Your comparison list (${chosenColleges.size})</b>` + (chosenColleges.size ? `<div class="compare-chips">${[...chosenColleges].map(item => `<span>${item}</span>`).join("")}</div><p>Compare official fees, accreditation, branch availability, travel, scholarships, and verified placement reports before choosing.</p>` : `<p>Select a sample college above to add it here.</p>`);
  });
});

function calculateBudget() {
  const tuition = Math.max(0, Number(document.getElementById("tuition").value) || 0);
  const hostel = Math.max(0, Number(document.getElementById("hostel").value) || 0);
  const travel = Math.max(0, Number(document.getElementById("travel").value) || 0);
  const other = Math.max(0, Number(document.getElementById("other").value) || 0);
  const years = Number(document.getElementById("years").value) || 4;
  const yearly = tuition + hostel + travel + other;
  document.getElementById("yearlyTotal").textContent = money(yearly);
  document.getElementById("courseTotal").textContent = money(yearly * years);
  const total = yearly || 1;
  document.getElementById("tuitionBar").style.width = `${tuition / total * 100}%`;
  document.getElementById("livingBar").style.width = `${(hostel + travel) / total * 100}%`;
  document.getElementById("otherBar").style.width = `${other / total * 100}%`;
}
document.getElementById("budgetForm").addEventListener("submit", event => { event.preventDefault(); calculateBudget(); });
calculateBudget();
