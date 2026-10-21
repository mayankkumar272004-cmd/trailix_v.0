/**
 * Trailix Landing Page — Interactive Scripts
 * Enhanced with Meetra Features (Outings Feed, Partner Passes, Squad Lounge Chat, GPS & Transit Pooling)
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- Utility: Toast Notification ---
  const toastNotice = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.getElementById('toastIcon');
  let toastTimer = null;

  function showToast(message, icon = '✨') {
    if (!toastNotice) return;
    if (toastTimer) clearTimeout(toastTimer);
    toastMsg.textContent = message;
    toastIcon.textContent = icon;
    toastNotice.classList.add('show');
    toastTimer = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

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

  // --- 4. Hero Preference Chips Simulation (Solo vs 1-on-1 vs Squad) ---
  const heroToggleChips = document.querySelectorAll('.hero-planner-preview .chip');
  const overlapPercentage = document.getElementById('overlapPercentage');
  const appScreenHeadline = document.querySelector('.app-screen-headline');
  const appScreenSubtext = document.querySelector('.app-screen-subtext');
  const plannerSummary = document.getElementById('plannerSummary');
  const vennCircleRiya = document.querySelector('.circle-riya');
  const overlapBadge = document.getElementById('overlapBadge');

  if (heroToggleChips.length > 0) {
    heroToggleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        heroToggleChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const mode = chip.getAttribute('data-mode');
        if (mode === 'squad') {
          if (overlapPercentage) overlapPercentage.textContent = '100%';
          if (appScreenHeadline) appScreenHeadline.textContent = 'Squad of 4 Mode';
          if (appScreenSubtext) appScreenSubtext.textContent = 'Pool a shared cab, split homestays 4 ways, and log group expenses effortlessly.';
          if (plannerSummary) plannerSummary.innerHTML = '<span>📍 Goa Road Trip • 4 Members</span><strong>₹2,800 / head (÷4 Split)</strong>';
          if (vennCircleRiya) {
            vennCircleRiya.querySelector('.venn-avatar').textContent = 'S';
            vennCircleRiya.querySelector('.venn-label').textContent = 'Squad';
          }
        } else if (mode === 'solo') {
          if (overlapPercentage) overlapPercentage.textContent = 'Solo';
          if (appScreenHeadline) appScreenHeadline.textContent = 'Solo Explorer Mode';
          if (appScreenSubtext) appScreenSubtext.textContent = 'Plan custom routes with automated emergency contact check-ins and verified meeting points.';
          if (plannerSummary) plannerSummary.innerHTML = '<span>📍 Rishikesh River Trek • Solo Route</span><strong>GPS Safety Linked</strong>';
          if (vennCircleRiya) {
            vennCircleRiya.querySelector('.venn-avatar').textContent = '🛡️';
            vennCircleRiya.querySelector('.venn-label').textContent = 'Safe';
          }
        } else {
          // 1-on-1 match
          if (overlapPercentage) overlapPercentage.textContent = '72%';
          if (appScreenHeadline) appScreenHeadline.textContent = 'We match the overlap';
          if (appScreenSubtext) appScreenSubtext.textContent = 'When your itineraries match 60% or more, you both get matched to split transit & explore.';
          if (plannerSummary) plannerSummary.innerHTML = '<span>📍 Manali, Himalayas • Oct 24-28</span><strong>₹3,000 / head (÷4 Split)</strong>';
          if (vennCircleRiya) {
            vennCircleRiya.querySelector('.venn-avatar').textContent = 'R';
            vennCircleRiya.querySelector('.venn-label').textContent = 'Riya';
          }
        }
      });
    });
  }

  // Bonus: Click overlap badge to cycle matches
  const sampleMatches = [
    { pct: '72%', name: 'Riya', initial: 'R', dest: 'Manali, Himalayas', budget: '₹3,000' },
    { pct: '86%', name: 'Aarav', initial: 'A', dest: 'Spiti Valley Expedition', budget: '₹4,200' },
    { pct: '94%', name: 'Tanvi', initial: 'T', dest: 'Goa Sunset Coliving', budget: '₹3,500' },
    { pct: '91%', name: 'Sneha', initial: 'S', dest: 'Campus Chai & Street Food', budget: '₹180' }
  ];
  let matchIndex = 0;

  if (overlapBadge) {
    overlapBadge.style.cursor = 'pointer';
    overlapBadge.addEventListener('click', () => {
      matchIndex = (matchIndex + 1) % sampleMatches.length;
      const m = sampleMatches[matchIndex];
      if (overlapPercentage) overlapPercentage.textContent = m.pct;
      if (vennCircleRiya) {
        vennCircleRiya.querySelector('.venn-avatar').textContent = m.initial;
        vennCircleRiya.querySelector('.venn-label').textContent = m.name;
      }
      if (plannerSummary) {
        plannerSummary.innerHTML = `<span>📍 ${m.dest}</span><strong>${m.budget} / head (Split)</strong>`;
      }
      showToast(`Matched with ${m.name} (${m.pct} overlap)!`, '🤝');
    });
  }

  // --- 5. Community Outings & Collab Feed (Meetra Feature) ---
  const feedCatChips = document.querySelectorAll('#feedCategoryFilters .filter-chip');
  const feedTimeChips = document.querySelectorAll('#feedTimeFilters .filter-time-chip');
  const outingCards = document.querySelectorAll('.outings-grid .outing-card');

  let activeCat = 'all';
  let activeTime = 'all';

  function filterOutings() {
    outingCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      const cardTime = card.getAttribute('data-time');

      const matchesCat = (activeCat === 'all' || cardCat === activeCat);
      const matchesTime = (activeTime === 'all' || cardTime === activeTime);

      if (matchesCat && matchesTime) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (feedCatChips.length > 0) {
    feedCatChips.forEach(chip => {
      chip.addEventListener('click', () => {
        feedCatChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeCat = chip.getAttribute('data-cat');
        filterOutings();
      });
    });
  }

  if (feedTimeChips.length > 0) {
    feedTimeChips.forEach(chip => {
      chip.addEventListener('click', () => {
        feedTimeChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeTime = chip.getAttribute('data-time');
        filterOutings();
      });
    });
  }

  // Bookmark toggles on cards
  const bookmarkBtns = document.querySelectorAll('.btn-bookmark');
  let savedCount = 0;

  bookmarkBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isBookmarked = btn.classList.toggle('bookmarked');
      if (isBookmarked) {
        savedCount++;
        showToast('Outing saved to your bookmarks!', '📌');
      } else {
        savedCount = Math.max(0, savedCount - 1);
        showToast('Removed from bookmarks.', '🗑️');
      }
    });
  });

  // Collab Request Modal Trigger
  const collabModal = document.getElementById('collabModal');
  const closeCollabModal = document.getElementById('closeCollabModal');
  const closeCollabModalBtn = document.getElementById('closeCollabModalBtn');
  const btnCollabs = document.querySelectorAll('.btn-collab');

  const collabModalTitle = document.getElementById('collabModalTitle');
  const collabModalMatchScore = document.getElementById('collabModalMatchScore');
  const collabModalDetails = document.getElementById('collabModalDetails');
  const collabModalHost = document.getElementById('collabModalHost');

  btnCollabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const host = btn.getAttribute('data-host') || 'Verified Host';
      const title = btn.getAttribute('data-title') || 'Squad Outing';
      const match = btn.getAttribute('data-match') || '92%';
      const cost = btn.getAttribute('data-cost') || '₹450';
      const hub = btn.getAttribute('data-hub') || 'Departure Hub';

      if (collabModalTitle) collabModalTitle.textContent = `Join ${host}'s Squad`;
      if (collabModalMatchScore) collabModalMatchScore.textContent = `${match} Itinerary Overlap`;
      if (collabModalDetails) collabModalDetails.textContent = `Trip: ${title} • Pick-up: ${hub} • Split Share: ${cost}`;
      if (collabModalHost) collabModalHost.textContent = host;

      if (collabModal) collabModal.classList.add('active');
    });
  });

  function hideCollabModal() {
    if (collabModal) collabModal.classList.remove('active');
  }

  if (closeCollabModal) closeCollabModal.addEventListener('click', hideCollabModal);
  if (closeCollabModalBtn) closeCollabModalBtn.addEventListener('click', hideCollabModal);

  const btnGoToLounge = document.getElementById('btnGoToLounge');
  if (btnGoToLounge) {
    btnGoToLounge.addEventListener('click', () => {
      hideCollabModal();
    });
  }

  // --- 6. Enhanced Smart Outing & Economics Planner ---
  const startLocationSelect = document.getElementById('startLocationSelect');
  const btnGps = document.getElementById('btnGps');
  const gpsStatus = document.getElementById('gpsStatus');

  const destChips = document.querySelectorAll('#destChips .plan-chip');
  const timeChips = document.querySelectorAll('#timeChips .plan-chip');
  const companionBtns = document.querySelectorAll('#companionSelector .companion-btn');
  const transitChips = document.querySelectorAll('#transitChips .transit-chip');
  const travelersRange = document.getElementById('travelersRange');
  const travelersCount = document.getElementById('travelersCount');

  const itineraryModeBadge = document.getElementById('itineraryModeBadge');
  const itineraryTitle = document.getElementById('itineraryTitle');
  const itineraryDesc = document.getElementById('itineraryDesc');
  const itineraryTimeline = document.getElementById('itineraryTimeline');
  const soloCostDisplay = document.getElementById('soloCostDisplay');
  const sharedCostDisplay = document.getElementById('sharedCostDisplay');
  const savingsTag = document.getElementById('savingsTag');

  const routeStartDestText = document.getElementById('routeStartDestText');
  const routeDistanceText = document.getElementById('routeDistanceText');
  const routeModeTag = document.getElementById('routeModeTag');
  const btnWhatsappShare = document.getElementById('btnWhatsappShare');
  const btnLockPlan = document.getElementById('btnLockPlan');

  // Planner State
  let currentStart = 'MITS Main Gate';
  let currentDest = 'manali';
  let currentDays = 3;
  let currentCompanion = 'unknown'; // 'solo', 'unknown', 'squad'
  let currentTransit = 'rapido'; // 'rapido', 'auto', 'cab'

  // Trip Database with realistic costs & timelines
  const tripDatabase = {
    manali: {
      name: 'Manali Snow Hike & Solang Valley',
      destLabel: 'Solang Valley & Old Manali',
      distance: '14.5 km from ISBT / Hub • 35 mins',
      costs: { 1: 1500, 3: 12000, 5: 22000, 7: 36000 },
      itineraries: {
        1: [
          { day: 'Morning', text: 'Rendezvous at departure hub, scenic valley drive & Solang Valley snow walk.' },
          { day: 'Afternoon', text: 'Cafe hopping in Old Manali, river dip & final expense settlement.' }
        ],
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
      name: 'Goa Sunset Coliving & Scooter Pool',
      destLabel: 'Anjuna & Vagator Coast',
      distance: '18.2 km from Airport / Station • 40 mins',
      costs: { 1: 1800, 3: 14000, 5: 26000, 7: 42000 },
      itineraries: {
        1: [
          { day: 'Afternoon', text: 'Meet at beach road, split rental scooters to Chapora Fort for sunset.' },
          { day: 'Evening', text: 'Beachside seafood cafe dinner, live music & instant UPI split.' }
        ],
        3: [
          { day: 'Day 1', text: 'Meet at Goa transit hub, split rental cabs & check-in to beachside coliving stay.' },
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
      name: 'Rishikesh River Camp & Rafting',
      destLabel: 'Shivpuri & Beatles Ashram',
      distance: '21.0 km from Haridwar Hub • 45 mins',
      costs: { 1: 1200, 3: 9000, 5: 17000, 7: 30000 },
      itineraries: {
        1: [
          { day: 'Morning', text: 'Meet at transit point, 16km white water rafting & cliff jumping.' },
          { day: 'Evening', text: 'Beatles Ashram sunset stroll, cafe dinner & bill split.' }
        ],
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
      name: 'Spiti Valley 4x4 High-Pass Circuit',
      destLabel: 'Kaza & Chandra Taal Lake',
      distance: 'Scenic Mountain Circuit • 4x4 Pool',
      costs: { 1: 2500, 3: 16000, 5: 28000, 7: 48000 },
      itineraries: {
        1: [
          { day: 'Day Trip', text: 'High altitude mountain drive, pass view point & group fuel division.' }
        ],
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
    },
    foodtrail: {
      name: 'Campus Chai & Street Food Trail',
      destLabel: 'Famous Food Stalls & Night Cafes',
      distance: '6.4 km circuit • ~20 mins transit',
      costs: { 1: 600, 3: 1800, 5: 3200, 7: 4500 },
      itineraries: {
        1: [
          { day: 'Stop 1 (5:30 PM)', text: 'Rendezvous at Campus Gate Tapri, hot ginger chai & bun maska.' },
          { day: 'Stop 2 (6:30 PM)', text: 'Head to street food square: momos, kathi rolls & cold coffee.' },
          { day: 'Stop 3 (7:30 PM)', text: 'Partner cafe check-in with 20% discount pass & instant auto-split.' }
        ],
        3: [
          { day: 'Day 1', text: 'Chai tapri meetup & old city evening snack crawl with Rapido pool.' },
          { day: 'Day 2', text: 'Heritage bakery breakfast, mid-day cafe workation, sunset food street.' },
          { day: 'Day 3', text: 'Dessert & lassi crawl, automated cost splitting on Trailix.' }
        ],
        5: [
          { day: 'Series', text: 'Complete 5-day culinary exploration across verified local food gems.' }
        ],
        7: [
          { day: 'Series', text: 'Week-long budget food trail with student discount passes.' }
        ]
      }
    },
    heritage: {
      name: 'Sunset Fort Heritage & Photo Walk',
      destLabel: 'Ancient Fort & Sunset Panorama',
      distance: '8.8 km from Gate • 25 mins transit',
      costs: { 1: 500, 3: 1500, 5: 2800, 7: 4000 },
      itineraries: {
        1: [
          { day: 'Stop 1 (4:30 PM)', text: 'Meet at MITS Main Gate, share E-Rickshaw to Fort eastern gate.' },
          { day: 'Stop 2 (5:30 PM)', text: 'Explore palace courtyards, historical architecture & photography.' },
          { day: 'Stop 3 (6:45 PM)', text: 'Panoramic sunset view from cliff point, tea & return rickshaw split.' }
        ],
        3: [
          { day: 'Day 1', text: 'Fort palace courtyards & evening light-and-sound show.' },
          { day: 'Day 2', text: 'Museums, ancient stepwells & local handicraft market.' },
          { day: 'Day 3', text: 'Sunrise tomb walk, breakfast cafe & seamless expense split.' }
        ],
        5: [
          { day: 'Series', text: 'Comprehensive 5-day regional heritage circuit.' }
        ],
        7: [
          { day: 'Series', text: 'Week-long architectural documentation and culture expedition.' }
        ]
      }
    }
  };

  function updatePlannerUI() {
    const trip = tripDatabase[currentDest] || tripDatabase.manali;
    const baseCost = (trip.costs && trip.costs[currentDays]) || 12000;
    const travelers = parseInt(travelersRange ? travelersRange.value : '4', 10);
    
    if (travelersCount) {
      travelersCount.textContent = `${travelers} Traveler${travelers > 1 ? 's' : ''}`;
    }

    // Cost calculations
    const solo = baseCost;
    const shared = Math.round(baseCost / Math.max(1, travelers));
    const savings = solo - shared;
    const savingsPercent = solo > 0 ? Math.round((savings / solo) * 100) : 0;

    if (soloCostDisplay) soloCostDisplay.textContent = `₹${solo.toLocaleString('en-IN')}`;
    if (sharedCostDisplay) sharedCostDisplay.textContent = `₹${shared.toLocaleString('en-IN')}`;
    if (savingsTag) {
      if (travelers <= 1) {
        savingsTag.textContent = 'Solo Explorer Base Cost';
        savingsTag.style.background = '#EEF3FC';
        savingsTag.style.color = '#243B6B';
      } else {
        savingsTag.textContent = `You Save ₹${savings.toLocaleString('en-IN')} (${savingsPercent}%)`;
        savingsTag.style.background = '#E8F8F0';
        savingsTag.style.color = '#10B981';
      }
    }

    // Title & Description
    if (itineraryTitle) {
      const daysText = currentDays === 1 ? 'Quick Outing' : `${currentDays} Days`;
      itineraryTitle.textContent = `${trip.name} (${daysText})`;
    }

    // Companion Mode badge & copy
    if (currentCompanion === 'solo') {
      if (itineraryModeBadge) {
        itineraryModeBadge.textContent = '🚶‍♂️ Solo Explorer Route & GPS Safe';
        itineraryModeBadge.style.color = '#1E40AF';
      }
      if (itineraryDesc) {
        itineraryDesc.textContent = `Custom solo itinerary with automatic emergency contact check-ins, optimized stops, and verified meeting hubs.`;
      }
    } else if (currentCompanion === 'squad') {
      if (itineraryModeBadge) {
        itineraryModeBadge.textContent = '👥 Squad Outing (÷4 Group Auto-Split)';
        itineraryModeBadge.style.color = '#0284C7';
      }
      if (itineraryDesc) {
        itineraryDesc.textContent = `Squad command plan for ${trip.name}. Split cabs, homestays, and meals 4 ways with live UPI settlement.`;
      }
    } else {
      // 1-on-1 match
      if (itineraryModeBadge) {
        itineraryModeBadge.textContent = '🤝 Matching Verified Explorers (60%+ Overlap)';
        itineraryModeBadge.style.color = '#243B6B';
      }
      if (itineraryDesc) {
        itineraryDesc.textContent = `Trailix matches you with a verified co-traveler heading to ${trip.name} during your exact window. Split transit & make lifelong friends.`;
      }
    }

    // Transit Pill on Route Map
    const transitNames = {
      rapido: '🛵 Rapido / Bike Pool',
      auto: '🛺 E-Rickshaw Share',
      cab: '🚙 Shared Cab Pool'
    };
    if (routeModeTag) routeModeTag.textContent = transitNames[currentTransit] || '🛵 Rapido Pool';

    if (routeStartDestText) {
      routeStartDestText.textContent = `${currentStart} ➔ ${trip.destLabel}`;
    }
    if (routeDistanceText) {
      routeDistanceText.textContent = `Route: ${trip.distance}`;
    }

    // Render Timeline stops
    const daysData = (trip.itineraries && (trip.itineraries[currentDays] || trip.itineraries[3])) || [
      { day: 'Day 1', text: 'Meet at departure hub, split cabs & check into stay.' },
      { day: 'Day 2', text: 'Main sightseeing & shared group activities.' },
      { day: 'Day 3', text: 'Local markets, automated expense split & journey home.' }
    ];

    if (itineraryTimeline) {
      itineraryTimeline.innerHTML = daysData.map(item => `
        <div class="timeline-item">
          <span class="day-badge">${item.day}</span>
          <p>${item.text}</p>
        </div>
      `).join('');
    }
  }

  // Location Selector
  if (startLocationSelect) {
    startLocationSelect.addEventListener('change', () => {
      currentStart = startLocationSelect.value;
      updatePlannerUI();
    });
  }

  // GPS Button (Meetra feature)
  if (btnGps) {
    btnGps.addEventListener('click', () => {
      btnGps.classList.toggle('active');
      const isActive = btnGps.classList.contains('active');
      if (isActive) {
        currentStart = '📍 Current GPS Location';
        if (gpsStatus) gpsStatus.classList.add('visible');
        showToast('GPS linked! Using your current coordinates.', '📍');
      } else {
        currentStart = startLocationSelect ? startLocationSelect.value : 'MITS Main Gate';
        if (gpsStatus) gpsStatus.classList.remove('visible');
        showToast('Reverted to selected campus hub.', '🏫');
      }
      updatePlannerUI();
    });
  }

  // Destination Chips
  if (destChips.length > 0) {
    destChips.forEach(chip => {
      chip.addEventListener('click', () => {
        destChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentDest = chip.getAttribute('data-dest');
        updatePlannerUI();
      });
    });
  }

  // Time Chips
  if (timeChips.length > 0) {
    timeChips.forEach(chip => {
      chip.addEventListener('click', () => {
        timeChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentDays = parseInt(chip.getAttribute('data-days'), 10);
        updatePlannerUI();
      });
    });
  }

  // Companion Mode Buttons
  if (companionBtns.length > 0) {
    companionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        companionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCompanion = btn.getAttribute('data-companion');

        // Adjust travelers count default
        if (currentCompanion === 'solo' && travelersRange) {
          travelersRange.value = 1;
        } else if (currentCompanion === 'unknown' && travelersRange) {
          travelersRange.value = 2;
        } else if (currentCompanion === 'squad' && travelersRange) {
          travelersRange.value = 4;
        }

        updatePlannerUI();
      });
    });
  }

  // Transit Pool Chips
  if (transitChips.length > 0) {
    transitChips.forEach(chip => {
      chip.addEventListener('click', () => {
        transitChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentTransit = chip.getAttribute('data-transit');
        updatePlannerUI();
      });
    });
  }

  // Travelers Slider
  if (travelersRange) {
    travelersRange.addEventListener('input', updatePlannerUI);
  }

  // Initial planner update
  updatePlannerUI();

  // WhatsApp Share Button
  if (btnWhatsappShare) {
    btnWhatsappShare.addEventListener('click', () => {
      const trip = tripDatabase[currentDest] || tripDatabase.manali;
      const sharePrice = sharedCostDisplay ? sharedCostDisplay.textContent : '₹3,000';
      const text = encodeURIComponent(`Hey! I just planned an outing to ${trip.name} on Trailix! We can pool transit via ${currentTransit === 'rapido' ? 'Rapido' : 'Shared Cab'} and our share is just ${sharePrice}/head. Join the squad: https://mayankkumar272004-cmd.github.io/trailix_v.0/`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
      showToast('Opening WhatsApp to share with your squad!', '💬');
    });
  }

  // Lock Plan Modal Trigger
  const lockModal = document.getElementById('lockModal');
  const closeLockModal = document.getElementById('closeLockModal');
  const btnLockDone = document.getElementById('btnLockDone');
  const lockModalHub = document.getElementById('lockModalHub');
  const lockModalDetails = document.getElementById('lockModalDetails');
  const lockModalTransit = document.getElementById('lockModalTransit');

  if (btnLockPlan) {
    btnLockPlan.addEventListener('click', () => {
      const trip = tripDatabase[currentDest] || tripDatabase.manali;
      const sharePrice = sharedCostDisplay ? sharedCostDisplay.textContent : '₹3,000';
      const travelers = travelersRange ? travelersRange.value : 4;

      if (lockModalHub) lockModalHub.textContent = currentStart;
      if (lockModalDetails) lockModalDetails.textContent = `${trip.name} • ${travelers} Travelers • ${sharePrice} / head`;
      if (lockModalTransit) lockModalTransit.textContent = currentTransit === 'rapido' ? '🛵 Rapido Pool' : (currentTransit === 'auto' ? '🛺 E-Rickshaw' : '🚙 Shared Cab');

      if (lockModal) lockModal.classList.add('active');
      showToast('Plan locked & squad room ready!', '🔒');
    });
  }

  function hideLockModal() {
    if (lockModal) lockModal.classList.remove('active');
  }

  if (closeLockModal) closeLockModal.addEventListener('click', hideLockModal);
  if (btnLockDone) {
    btnLockDone.addEventListener('click', () => {
      hideLockModal();
      const squadChatSec = document.getElementById('squad-chat');
      if (squadChatSec) squadChatSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --- 7. Partner Spots & Digital Pass Modal (Meetra Feature) ---
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModal = document.getElementById('closeBookingModal');
  const btnConfirmPass = document.getElementById('btnConfirmPass');
  const reserveSlotBtns = document.querySelectorAll('.btn-reserve-slot');

  const passVenueName = document.getElementById('passVenueName');
  const passPinDisplay = document.getElementById('passPinDisplay');
  const passPartyDisplay = document.getElementById('passPartyDisplay');
  const passTimeDisplay = document.getElementById('passTimeDisplay');
  const passPerkDisplay = document.getElementById('passPerkDisplay');

  const partySizeChips = document.querySelectorAll('#partySizeChips .plan-chip');
  const timeSlotChips = document.querySelectorAll('#timeSlotChips .plan-chip');

  let currentPartySize = '2 Guests';
  let currentTimeSlot = '6:00 PM';
  let currentVenueDiscount = '15% Off';

  reserveSlotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const venue = btn.getAttribute('data-venue') || 'Partner Cafe';
      currentVenueDiscount = btn.getAttribute('data-discount') || '15% Off';

      if (passVenueName) passVenueName.textContent = venue;
      if (passPerkDisplay) passPerkDisplay.textContent = currentVenueDiscount;

      // Generate random 4-digit PIN
      const randomPin = Math.floor(1000 + Math.random() * 9000);
      if (passPinDisplay) passPinDisplay.textContent = `PIN: ${randomPin}`;

      updatePassPreview();

      if (bookingModal) bookingModal.classList.add('active');
    });
  });

  function updatePassPreview() {
    if (passPartyDisplay) passPartyDisplay.textContent = `Squad: ${currentPartySize}`;
    if (passTimeDisplay) passTimeDisplay.textContent = `Slot: ${currentTimeSlot} Today`;
  }

  partySizeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      partySizeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentPartySize = `${chip.getAttribute('data-size')} Guest${chip.getAttribute('data-size') > 1 ? 's' : ''}`;
      updatePassPreview();
    });
  });

  timeSlotChips.forEach(chip => {
    chip.addEventListener('click', () => {
      timeSlotChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentTimeSlot = chip.getAttribute('data-slot');
      updatePassPreview();
    });
  });

  function hideBookingModal() {
    if (bookingModal) bookingModal.classList.remove('active');
  }

  if (closeBookingModal) closeBookingModal.addEventListener('click', hideBookingModal);
  if (btnConfirmPass) {
    btnConfirmPass.addEventListener('click', () => {
      hideBookingModal();
      showToast('Digital pass saved! Show PIN on arrival.', '🎟️');
    });
  }

  // --- 8. Pre-Trip Squad Lounge Interactive Chat (Meetra Feature) ---
  const chatMessagesBody = document.getElementById('chatMessagesBody');
  const chatInputForm = document.getElementById('chatInputForm');
  const chatTextInput = document.getElementById('chatTextInput');
  const quickReplyBtns = document.querySelectorAll('.quick-reply-btn');

  function appendChatMessage(text, sender = 'me') {
    if (!chatMessagesBody || !text.trim()) return;

    const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerHTML = `${text}<span class="chat-msg-time">${timeStr}</span>`;
    chatMessagesBody.appendChild(msgDiv);
    chatMessagesBody.scrollTop = chatMessagesBody.scrollHeight;
  }

  if (chatInputForm) {
    chatInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatTextInput.value.trim();
      if (!text) return;

      appendChatMessage(text, 'me');
      chatTextInput.value = '';

      // Simulated smart peer response
      setTimeout(() => {
        const responses = [
          "Perfect! Checked the route, I'll meet you right on time.",
          "Awesome, let's auto-split fuel on Trailix after we reach!",
          "Got it! I've packed light. See you at the departure gate! 🚀"
        ];
        const randomResp = responses[Math.floor(Math.random() * responses.length)];
        appendChatMessage(randomResp, 'peer');
      }, 1100);
    });
  }

  quickReplyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.getAttribute('data-msg');
      if (msg) {
        appendChatMessage(msg, 'me');
        showToast('Message sent to squad!', '💬');
      }
    });
  });

  // --- 9. Two-Way Peer Rating & Endorsements Modal (Meetra Feature) ---
  const ratingModal = document.getElementById('ratingModal');
  const closeRatingModal = document.getElementById('closeRatingModal');
  const btnOpenRateModal = document.getElementById('btnOpenRateModal');
  const btnSubmitRating = document.getElementById('btnSubmitRating');
  const ratingStars = document.querySelectorAll('#ratingStarsRow .star-icon');
  const endorseChips = document.querySelectorAll('#endorseChipsRow .endorse-chip');
  let selectedRating = 5;

  if (btnOpenRateModal) {
    btnOpenRateModal.addEventListener('click', () => {
      if (ratingModal) ratingModal.classList.add('active');
    });
  }

  function hideRatingModal() {
    if (ratingModal) ratingModal.classList.remove('active');
  }

  if (closeRatingModal) closeRatingModal.addEventListener('click', hideRatingModal);

  ratingStars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-rating'), 10);
      ratingStars.forEach(s => {
        const r = parseInt(s.getAttribute('data-rating'), 10);
        if (r <= selectedRating) {
          s.classList.add('filled');
        } else {
          s.classList.remove('filled');
        }
      });
    });
  });

  endorseChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
    });
  });

  if (btnSubmitRating) {
    btnSubmitRating.addEventListener('click', () => {
      hideRatingModal();
      showToast('⭐ Peer endorsement submitted! Trust score updated.', '🎉');
    });
  }

  // Close modals when clicking backdrop
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
    }
  });

  // --- 10. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const qBtn = otherItem.querySelector('.faq-question');
        if (qBtn) qBtn.setAttribute('aria-expanded', 'false');
      });

      // If clicked item wasn't active, activate it
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- 11. Waitlist Form Submission (Google Sheets API Integration) ---
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

      // 1. Always save a local copy
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

      if (successMessage) {
        successMessage.textContent = `Thank you, ${name}! We've reserved your priority early access badge for ${email}. You will receive your personal onboarding invite soon.`;
      }
      waitlistForm.style.display = 'none';
      if (waitlistSuccess) waitlistSuccess.style.display = 'block';
      showToast('Early access spot reserved!', '🎉');
    });

    if (resetWaitlistBtn) {
      resetWaitlistBtn.addEventListener('click', () => {
        waitlistForm.reset();
        waitlistForm.style.display = 'flex';
        if (waitlistSuccess) waitlistSuccess.style.display = 'none';
      });
    }
  }

  // --- 12. Dynamic Footer Year ---
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
