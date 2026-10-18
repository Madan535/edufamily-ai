# EduFamily AI

**AI-Enabled Family Decision-Support Platform for Engineering Education**

EduFamily AI is a responsive hackathon prototype to help students and families explore engineering branches, compare example college options, and estimate education costs.

## Features
- Separate Home, Career Guide, College Compare, and Budget Planner screens
- Interest- and subject-based branch suggestions with transparent rule-based scoring and explanations
- Searchable India-wide college directory with state and district filters, search, and official website links (75+ institutions, including 30+ in Andhra Pradesh and 15 in Telangana); Andhra Pradesh district filter includes all 26 districts
- Annual and full-course education cost estimates, including annual support/scholarships
- Copyable family budget discussion summary
- Responsive layout for desktop and mobile
- Accessible form labels, keyboard-friendly controls, and reduced-motion support

## Technology
- HTML5
- CSS3
- Vanilla JavaScript

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. No package installation or build step is required.

## Important demo limitations
- Branch suggestions use transparent rule-based matching. This is not a trained AI model and does not call an external AI service.
- College names and listed city/state labels are intended as a directory of real institutions; official websites are linked for checking current information. The directory includes 75+ institutions across multiple state/region labels. District labels are supplied where available; entries marked “District not verified” remain searchable but are not included as a district filter option. The Andhra Pradesh filter includes all 26 districts; districts without a directory entry return no matches. Other state filters currently show districts represented by listed institutions, not a complete list of every district in each state. The directory does not claim to verify every course, campus-specific detail, fee, hostel cost, admission route, or placement outcome. Confirm these on the linked institution website and relevant official counselling portals. No fee or placement figures are invented or displayed.
- Budget figures are estimates and may not include every fee, scholarship condition, or inflation change.
- Recommendations are informational and should not replace official college information or advice from qualified counsellors.

## Future improvements
- Integrate an AI API securely through a backend (never expose API keys in frontend code)
- Continue checking each institution’s official website and add dated, sourced course/fee details only after verification
- Add scholarship discovery, multilingual guidance, and family-shared notes
- Perform accessibility and user testing

## Team
Team name MJ Tech and members 2.


## College directory data policy
The College Compare directory is a discovery aid, not a ranking or admissions database. It lists institution names, location labels, institution type, and official website links. Course availability, campus-specific details, tuition, hostel costs, admissions routes, and placements can change by program, category, campus, and academic year; these are therefore not represented as verified figures in this prototype. Always confirm them on the official institution website and relevant official admission/counselling portal.

## Official-source examples consulted
- Ministry of Education, National Institutes of Technology institutional directory: https://www.education.gov.in/en/node/2545
- Ministry of Education / NIRF, Engineering participating institutions list: https://www.nirfindia.org/Rankings/2025/EngineeringRankingALL.html
- AICTE autonomous institution listing: https://facilities.india-aicte.org/dashboard/pages/aicte_autonomus.php
- VNR Vignana Jyothi Institute of Engineering and Technology, B.Tech admissions and fee information: https://www.vnrvjiet.ac.in/admissions/btech?tab=fees
- Amrita Vishwa Vidyapeetham, engineering admissions and fee information: https://www.amrita.edu/admissions/engineering/
- Dayananda Sagar University, program eligibility and fee information: https://in.dsu.edu.in/eligibility
- JoSAA, institute profile and 2026–27 undergraduate fee information: https://josaa.admissions.nic.in/

These sources illustrate why fees and program details should be checked for the current academic year; this project does not copy fee figures into the college directory.


## State and district coverage note

The directory is an India-wide discovery list, not a complete census of every engineering college in India. Andhra Pradesh has all 26 districts included in the district selector. More than 25 Andhra Pradesh institutions are listed, including autonomous and affiliated colleges; some districts still have no listed institution. Where no college is listed for a selected district, the app reports no matches rather than inventing an institution. For other states, district options currently reflect districts represented by directory entries.

## College directory verification note

The directory includes 75+ institutions across multiple Indian states and union territories, with more than 25 entries from Andhra Pradesh, including autonomous and affiliated institutions such as Geethanjali Institute of Science and Technology. Names and broad locations are cross-checkable against the Ministry of Education's NIRF Engineering participating-institutions list; official institution websites are provided as the primary place to verify current courses, admissions, fees, accommodation, and placements. A directory listing is not an endorsement, ranking, or confirmation that a particular branch is offered in every admission cycle.

Reference directory: https://www.nirfindia.org/Rankings/2025/EngineeringRankingALL.html

Official examples checked for Andhra Pradesh entries include Andhra University (https://www.andhrauniversity.edu.in/), ANITS (https://www.anits.edu.in/), GVP College of Engineering (https://gvpce.ac.in/), GMR Institute of Technology (https://gmrit.edu.in/), Vignan's Foundation for Science, Technology and Research (https://vignan.ac.in/), R.V.R. & J.C. College of Engineering (https://www.rvrjc.ac.in/), Vasireddy Venkatadri Institute of Technology (https://www.vvitguntur.com/), NBKR Institute of Science and Technology (https://www.nbkrist.org/), and NIT Andhra Pradesh (https://www.nitandhra.ac.in/).


## Geethanjali Institute of Science and Technology
The official GIST programmes page identifies the institution as autonomous, AICTE-approved, and affiliated to JNTUA, and lists its B.Tech programmes for 2025–26: https://gist.edu.in/gist/programmes-offered/. Its official fee page provides year-specific fee information: https://gist.edu.in/gist/fee-structure/. This prototype links to the official pages instead of copying fee values into the comparison cards, because fees and admission conditions can change.


## Home page and visual update
- The home page now uses a cleaner, soft gradient background and a focused hero layout.
- Career Guide, College Compare, and Budget Planner navigation appears once in the main navigation instead of repeating as multiple home-page option cards and hero buttons.
- The home page highlights the student-and-family decision process without duplicating navigation controls.


## Home page and navigation refresh
- Refreshed the homepage with a calm, professional lavender/mint visual theme and a clearer hero section.
- Main navigation appears only once, in a persistent bottom navigation bar; it is removed from the top header.
- The bottom navigation works on desktop and mobile and keeps the separate-screen flow for Home, Career Guide, College Compare, and Budget Planner.


## College directory update

The College Compare section contains a curated directory of engineering and technical institutions across India, with state and district filters and links intended to point to official institution websites. It is not a complete or live national database. Verify campus address, active programmes, approvals, fees, admissions, and other details through official institution/admission sources before making decisions. Directory entries are provided for discovery; no fee or placement data is asserted.
