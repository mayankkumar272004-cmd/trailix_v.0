/**
 * Trailix Landing Page — Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Sticky Navigation on Scroll ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- 2. Mobile Hamburger Menu ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-cta');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('open');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        hamburgerBtn.classList.remove('open');
        navMenu.classList.remove('active');
      }
    });
  }

  // --- 3. Audience Tab Switcher (Students vs Techies) ---
  const tabStudents = document.getElementById('tabStudents');
  const tabTechies = document.getElementById('tabTechies');
  const contentStudents = document.getElementById('content-students');
  const contentTechies = document.getElementById('content-techies');

  if (tabStudents && tabTechies) {
    tabStudents.addEventListener('click', () => {
      tabStudents.classList.add('active');
      tabStudents.setAttribute('aria-selected', 'true');
      tabTechies.classList.remove('active');
      tabTechies.setAttribute('aria-selected', 'false');

      contentStudents.classList.add('active');
      contentTechies.classList.remove('active');
    });

    tabTechies.addEventListener('click', () => {
      tabTechies.classList.add('active');
      tabTechies.setAttribute('aria-selected', 'true');
      tabStudents.classList.remove('active');
      tabStudents.setAttribute('aria-selected', 'false');

      contentTechies.classList.add('active');
      contentStudents.classList.remove('active');
    });
  }

  // --- 4. Hero Preference Chips Simulation ---
  const toggleChips = document.querySelectorAll('.planner-toggle-row .chip');
  const overlapPercentage = document.getElementById('overlapPercentage');
  const appScreenHeadline = document.querySelector('.app-screen-headline');
  const appScreenSubtext = document.querySelector('.app-screen-subtext');
  const plannerSummary = document.getElementById('plannerSummary');
  const vennCircleRiya = document.querySelector('.circle-riya');

  if (toggleChips.length > 0) {
    toggleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        toggleChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const mode = chip.getAttribute('data-mode');
        if (mode === 'friends') {
          if (overlapPercentage) overlapPercentage.textContent = '100%';
          if (appScreenHeadline) appScreenHeadline.textContent = 'Private Squad Mode';
          if (appScreenSubtext) appScreenSubtext.textContent = 'Invite friends & family. Build shared schedules and split all expenses together.';
          if (plannerSummary) plannerSummary.innerHTML = '<span>📍 Goa Road Trip • 4 Members</span><strong>Private Squad</strong>';
          if (vennCircleRiya) {
            vennCircleRiya.querySelector('.venn-avatar').textContent = 'F';
            vennCircleRiya.querySelector('.venn-label').textContent = 'Squad';
          }
        } else {
          if (overlapPercentage) overlapPercentage.textContent = '72%';
          if (appScreenHeadline) appScreenHeadline.textContent = 'We match the overlap';
          if (appScreenSubtext) appScreenSubtext.textContent = 'When your itineraries match 60% or more, you both get the match.';
          if (plannerSummary) plannerSummary.innerHTML = '<span>📍 Manali, Himalayas • Oct 24-28</span><strong>₹4,500 budget</strong>';
          if (vennCircleRiya) {
            vennCircleRiya.querySelector('.venn-avatar').textContent = 'R';
            vennCircleRiya.querySelector('.venn-label').textContent = 'Riya';
          }
        }
      });
    });
  }

  // Bonus: Click overlap badge to cycle matches
  const overlapBadge = document.getElementById('overlapBadge');
  const sampleMatches = [
    { pct: '72%', name: 'Riya', initial: 'R', dest: 'Manali, Himalayas', budget: '₹4,500' },
    { pct: '86%', name: 'Aarav', initial: 'A', dest: 'Spiti Valley Expedition', budget: '₹7,200' },
    { pct: '94%', name: 'Tanvi', initial: 'T', dest: 'Goa Tech Workation', budget: '₹11,000' }
  ];
  let matchIndex = 0;

  if (overlapBadge) {
    overlapBadge.style.cursor = 'pointer';
    overlapBadge.title = 'Click to preview another itinerary match!';
    overlapBadge.addEventListener('click', () => {
      matchIndex = (matchIndex + 1) % sampleMatches.length;
      const m = sampleMatches[matchIndex];
      overlapPercentage.textContent = m.pct;
      if (vennCircleRiya) {
        vennCircleRiya.querySelector('.venn-avatar').textContent = m.initial;
        vennCircleRiya.querySelector('.venn-label').textContent = m.name;
      }
      if (plannerSummary) {
        plannerSummary.innerHTML = `<span>📍 ${m.dest}</span><strong>${m.budget} budget</strong>`;
      }
    });
  }

  // --- 5. Interactive Smart Itinerary & Economics Planner ---
  const destChips = document.querySelectorAll('#destChips .plan-chip');
  const timeChips = document.querySelectorAll('#timeChips .plan-chip');
  const companionBtns = document.querySelectorAll('#companionSelector .companion-btn');
  const travelersRange = document.getElementById('travelersRange');
  const travelersCount = document.getElementById('travelersCount');

  const itineraryModeBadge = document.getElementById('itineraryModeBadge');
  const itineraryTitle = document.getElementById('itineraryTitle');
  const itineraryDesc = document.getElementById('itineraryDesc');
  const itineraryTimeline = document.getElementById('itineraryTimeline');
  const soloCostDisplay = document.getElementById('soloCostDisplay');
  const sharedCostDisplay = document.getElementById('sharedCostDisplay');
  const savingsTag = document.getElementById('savingsTag');
  const planCtaBtn = document.getElementById('planCtaBtn');

  // State
  let selectedDest = 'manali';
  let selectedDays = 3;
  let selectedCompanion = 'unknown'; // 'unknown' or 'known'

  // Dynamic trip configurations & daily itineraries
  const tripDatabase = {
    manali: {
      name: 'Manali, Himalayas',
      costs: { 3: 12000, 5: 22000, 7: 36000 },
      itineraries: {
        3: [
          { day: 'Day 1', text: 'Meet at verified departure hub, scenic mountain drive & check-in to shared mountain stay.' },
          { day: 'Day 2', text: 'Solang Valley snow trek, local cafe hopping & evening group bonfire unwinding.' },
          { day: 'Day 3', text: 'Old Manali market exploration, automated expense settlement & journey back.' }
        ],
        5: [
          { day: 'Day 1-2', text: 'Rendezvous, cross Atal Tunnel into Lahaul valley, explore Sissu waterfalls.' },
          { day: 'Day 3-4', text: 'Jogini waterfall pine trek, riverside camping & starlit acoustic evening.' },
          { day: 'Day 5', text: 'Cafe hopping in Vashisht, final group bill split & return journey.' }
        ],
        7: [
          { day: 'Day 1-2', text: 'Arrival & ergonomic workstation check-in with high-speed WiFi setup.' },
          { day: 'Day 3-5', text: 'Morning productive remote work sprints, afternoon hikes, and local craft visits.' },
          { day: 'Day 6-7', text: 'Day trek to Hampta Pass base, celebratory group dinner & smooth checkout.' }
        ]
      }
    },
    goa: {
      name: 'Goa Coastal Retreat',
      costs: { 3: 14000, 5: 26000, 7: 42000 },
      itineraries: {
        3: [
          { day: 'Day 1', text: 'Meet at Goa airport/station hub, split rental cabs & check-in to beachside stay.' },
          { day: 'Day 2', text: 'Shared scooter rentals to Chapora Fort, beach cafe networking & sunset bonfire.' },
          { day: 'Day 3', text: 'Morning watersports, group brunch bill settlement & airport departure.' }
        ],
        5: [
          { day: 'Day 1-2', text: 'Check-in to coliving villa with high-speed WiFi, beach road sunset cruise.' },
          { day: 'Day 3-4', text: 'Water sports, secret cove exploration & evening coastal seafood dinners.' },
          { day: 'Day 5', text: 'Flea market visits, automated split calculation on Trailix & departure.' }
        ],
        7: [
          { day: 'Day 1-3', text: 'Workation kickoff: quiet mornings, high-speed WiFi work, sunset dip in the sea.' },
          { day: 'Day 4-5', text: 'South Goa heritage trail, spice farm visit & paddleboarding.' },
          { day: 'Day 6-7', text: 'Beach club networking night, final expense clearing & farewells.' }
        ]
      }
    },
    rishikesh: {
      name: 'Rishikesh Adventure & River',
      costs: { 3: 9000, 5: 17000, 7: 30000 },
      itineraries: {
        3: [
          { day: 'Day 1', text: 'Meet at Haridwar transit hub, transfer to riverside campsite & evening aarti.' },
          { day: 'Day 2', text: '16km White Water River Rafting expedition & cliff jumping adventure.' },
          { day: 'Day 3', text: 'Beatles Ashram visit, cafe breakfast, seamless bill split & departure.' }
        ],
        5: [
          { day: 'Day 1-2', text: 'Arrival, riverside camping, Ganga Aarti & group rafting coordination.' },
          { day: 'Day 3-4', text: 'Neer Garh waterfall trek, sunset point hike & live music cafe evening.' },
          { day: 'Day 5', text: 'Souvenir shopping, expense settlement on Trailix & return trip.' }
        ],
        7: [
          { day: 'Day 1-3', text: 'Peaceful riverside stay, morning yoga/work sessions with valley views.' },
          { day: 'Day 4-5', text: 'Adrenaline day: Bungee jumping, canyon swings & campfire stories.' },
          { day: 'Day 6-7', text: 'Trek to Kunjapuri sunrise peak, group photo session & farewell.' }
        ]
      }
    },
    spiti: {
      name: 'Spiti Valley 4x4 Expedition',
      costs: { 3: 16000, 5: 28000, 7: 48000 },
      itineraries: {
        3: [
          { day: 'Day 1', text: 'Meet in Shimla hub, board split 4x4 vehicle & drive to Kinnaur valley.' },
          { day: 'Day 2', text: 'Scenic high-altitude pass drive, monastery visit & local homestay dinner.' },
          { day: 'Day 3', text: 'Sunrise valley view, automated fuel & cab split, return journey.' }
        ],
        5: [
          { day: 'Day 1-2', text: 'Scenic mountain climb, Nako lake, Gue mummy monastery & Kaza check-in.' },
          { day: 'Day 3-4', text: 'Key Monastery, send postcards from Hikkim, Langza fossil hunt.' },
          { day: 'Day 5', text: 'Chandra Taal lake camping, starry night sky & return drive.' }
        ],
        7: [
          { day: 'Day 1-3', text: 'Full circuit expedition via Kalpa & Tabo, staying at heritage homestays.' },
          { day: 'Day 4-5', text: 'Kaza exploration, Kibber wildlife sanctuary & high mountain passes.' },
          { day: 'Day 6-7', text: 'Stargazing at Chandra Taal, 4x4 fuel & expense settlement, back to Manali.' }
        ]
      }
    }
  };

  function updatePlanner() {
    const trip = tripDatabase[selectedDest] || tripDatabase.manali;
    const baseCost = trip.costs[selectedDays] || 12000;
    const travelers = parseInt(travelersRange.value, 10);
    travelersCount.textContent = `${travelers} Travelers`;

    // Calculate economics
    const solo = baseCost;
    const shared = Math.round(baseCost / travelers);
    const savings = solo - shared;
    const savingsPercent = Math.round((savings / solo) * 100);

    soloCostDisplay.textContent = `₹${solo.toLocaleString('en-IN')}`;
    sharedCostDisplay.textContent = `₹${shared.toLocaleString('en-IN')}`;
    savingsTag.textContent = `You Save ₹${savings.toLocaleString('en-IN')} (${savingsPercent}%)`;

    // Title & Timeline
    itineraryTitle.textContent = `${trip.name} (${selectedDays} Days)`;

    if (selectedCompanion === 'unknown') {
      itineraryModeBadge.textContent = '🧭 Matching Verified Explorers (60%+ Overlap)';
      itineraryModeBadge.style.color = '#243B6B';
      itineraryDesc.textContent = `Trailix matches you with verified travelers heading to ${trip.name} during your exact window. Split stays & cabs while making new lifelong travel buddies.`;
      if (planCtaBtn) {
        planCtaBtn.innerHTML = `<span>Find Co-Travelers for This Trip</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      }
    } else {
      itineraryModeBadge.textContent = '👥 Friends & Family Squad Plan';
      itineraryModeBadge.style.color = '#0284C7';
      itineraryDesc.textContent = `Private squad itinerary for your group in ${trip.name}. Vote on activities, share live location, and let Trailix auto-split fuel, tickets, and food with zero math.`;
      if (planCtaBtn) {
        planCtaBtn.innerHTML = `<span>Plan With Your Squad on Trailix</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      }
    }

    // Render timeline days
    const daysData = (trip.itineraries && trip.itineraries[selectedDays]) || [
      { day: 'Day 1', text: 'Rendezvous at departure hub, split cabs & check into stay.' },
      { day: 'Day 2', text: 'Main sightseeing & shared group activities.' },
      { day: 'Day 3', text: 'Local markets, automated expense split & journey home.' }
    ];

    itineraryTimeline.innerHTML = daysData.map(item => `
      <div class="timeline-item">
        <span class="day-badge">${item.day}</span>
        <p>${item.text}</p>
      </div>
    `).join('');
  }

  // Event Listeners for Planner
  if (destChips.length > 0) {
    destChips.forEach(chip => {
      chip.addEventListener('click', () => {
        destChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedDest = chip.getAttribute('data-dest');
        updatePlanner();
      });
    });
  }

  if (timeChips.length > 0) {
    timeChips.forEach(chip => {
      chip.addEventListener('click', () => {
        timeChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedDays = parseInt(chip.getAttribute('data-days'), 10);
        updatePlanner();
      });
    });
  }

  if (companionBtns.length > 0) {
    companionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        companionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedCompanion = btn.getAttribute('data-companion');
        updatePlanner();
      });
    });
  }

  if (travelersRange) {
    travelersRange.addEventListener('input', updatePlanner);
    updatePlanner();
  }

  // --- 6. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // If clicked item wasn't active, activate it
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- 7. Waitlist Form Submission (Google Sheets API Integration) ---
  // Paste your Google Web App / SheetDB endpoint URL below:
  const GOOGLE_SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbw0cBm5oFqODiHIwMfwN6_IV_Sa-4rj5AH1OqXNGq5m2ujtRYpeIfqHypS-2j6MUpUi/exec';

  const waitlistForm = document.getElementById('waitlistForm');
  const waitlistSuccess = document.getElementById('waitlistSuccess');
  const resetWaitlistBtn = document.getElementById('resetWaitlistBtn');
  const successMessage = document.getElementById('successMessage');
  const submitBtn = document.getElementById('submitBtn');

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('userName').value.trim();
      const email = document.getElementById('userEmail').value.trim();
      const roleElem = document.querySelector('input[name="userRole"]:checked');
      const role = roleElem ? roleElem.value : 'explorer';
      const timestamp = new Date().toLocaleString('en-IN');

      const subscriberData = { name, email, role, date: timestamp };

      // 1. Always save a local copy so you never lose leads
      try {
        let list = JSON.parse(localStorage.getItem('trailix_waitlist') || '[]');
        list.push(subscriberData);
        localStorage.setItem('trailix_waitlist', JSON.stringify(list));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      // UI: Loading state
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Saving your spot...</span>`;

      // 2. Send to Google Sheets if API URL is configured
      if (GOOGLE_SHEET_API_URL && GOOGLE_SHEET_API_URL.trim() !== '') {
        try {
          await fetch(GOOGLE_SHEET_API_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(subscriberData)
          });
        } catch (apiError) {
          console.warn('Google Sheet submission warning:', apiError);
        }
      }

      // Reset button state and display success view
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;

      successMessage.textContent = `Thank you, ${name}! We've reserved your priority early access badge for ${email}. You will receive your personal onboarding invite soon.`;
      waitlistForm.style.display = 'none';
      waitlistSuccess.style.display = 'block';
    });

    if (resetWaitlistBtn) {
      resetWaitlistBtn.addEventListener('click', () => {
        waitlistForm.reset();
        waitlistForm.style.display = 'flex';
        waitlistSuccess.style.display = 'none';
      });
    }
  }

  // --- 8. Dynamic Footer Year ---
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
