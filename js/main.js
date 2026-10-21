/**
 * Trailix Gwalior — Interactive Scripts
 * Hyper-Localized for Gwalior (MITS, ITM, Amity, IIITM, Jiwaji, City Center)
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

  // --- 3. Audience Tab Switcher (Gwalior Students vs Techies) ---
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
          if (appScreenHeadline) appScreenHeadline.textContent = 'Gwalior Squad Mode';
          if (appScreenSubtext) appScreenSubtext.textContent = 'Pool an E-rickshaw or cab, split food bills 4 ways at Maharaj Bada, and explore Gwalior together.';
          if (plannerSummary) plannerSummary.innerHTML = '<span>📍 City Center & Bada Food Walk • 4 Members</span><strong>₹120 / head (÷4 Split)</strong>';
          if (vennCircleRiya) {
            vennCircleRiya.querySelector('.venn-avatar').textContent = 'S';
            vennCircleRiya.querySelector('.venn-label').textContent = 'Squad';
          }
        } else if (mode === 'solo') {
          if (overlapPercentage) overlapPercentage.textContent = 'Solo';
          if (appScreenHeadline) appScreenHeadline.textContent = 'Solo Explorer Route';
          if (appScreenSubtext) appScreenSubtext.textContent = 'Plan custom routes to Gwalior Fort or Tigra Dam with automated emergency GPS check-ins.';
          if (plannerSummary) plannerSummary.innerHTML = '<span>📍 Gwalior Fort Sunset Trek • Solo Route</span><strong>GPS Safety Linked</strong>';
          if (vennCircleRiya) {
            vennCircleRiya.querySelector('.venn-avatar').textContent = '🛡️';
            vennCircleRiya.querySelector('.venn-label').textContent = 'Safe';
          }
        } else {
          // 1-on-1 match
          if (overlapPercentage) overlapPercentage.textContent = '72%';
          if (appScreenHeadline) appScreenHeadline.textContent = 'We match the overlap';
          if (appScreenSubtext) appScreenSubtext.textContent = 'When your Gwalior outing plans match 60% or more, you both get matched to pool Rapidos & split expenses.';
          if (plannerSummary) plannerSummary.innerHTML = '<span>📍 Tigra Dam Sunset & Boating • Oct 24</span><strong>₹180 / head (÷2 Split)</strong>';
          if (vennCircleRiya) {
            vennCircleRiya.querySelector('.venn-avatar').textContent = 'R';
            vennCircleRiya.querySelector('.venn-label').textContent = 'Riya';
          }
        }
      });
    });
  }

  // Bonus: Click overlap badge to cycle matches in Gwalior
  const sampleMatches = [
    { pct: '72%', name: 'Riya (MITS)', initial: 'R', dest: 'Tigra Dam Sunset Boating', budget: '₹180' },
    { pct: '86%', name: 'Aarav (ITM)', initial: 'A', dest: 'Gwalior Fort Urvai Gate Trek', budget: '₹80' },
    { pct: '94%', name: 'Tanvi (IIITM)', initial: 'T', dest: 'City Center Workation Cafe', budget: '₹150' },
    { pct: '91%', name: 'Sneha (Jiwaji)', initial: 'S', dest: 'Maharaj Bada & Sarafa Food Walk', budget: '₹120' }
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
        vennCircleRiya.querySelector('.venn-label').textContent = m.name.split(' ')[0];
      }
      if (plannerSummary) {
        plannerSummary.innerHTML = `<span>📍 ${m.dest}</span><strong>${m.budget} / head (Split)</strong>`;
      }
      showToast(`Matched with ${m.name} (${m.pct} overlap in Gwalior)!`, '🤝');
    });
  }

  // --- 5. Community Outings & Collab Feed (Gwalior Localized) ---
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
        showToast('Gwalior outing saved to your bookmarks!', '📌');
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
      const title = btn.getAttribute('data-title') || 'Gwalior Squad Outing';
      const match = btn.getAttribute('data-match') || '92%';
      const cost = btn.getAttribute('data-cost') || '₹120';
      const hub = btn.getAttribute('data-hub') || 'MITS Main Gate';

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

  // --- 6. Gwalior Smart Outing & Economics Planner ---
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

  // Gwalior Planner State
  let currentStart = 'MITS Main Gate';
  let currentDest = 'fort';
  let currentDays = 1; // 1 = 2-3 hours, 2 = 5 hours, 3 = full day, 4 = 2 days
  let currentCompanion = 'unknown'; // 'solo', 'unknown', 'squad'
  let currentTransit = 'rapido'; // 'rapido', 'auto', 'cab'

  // Gwalior Database with authentic spots, costs & itineraries
  const tripDatabase = {
    fort: {
      name: 'Gwalior Fort & Man Mandir Palace',
      destLabel: 'Urvai Gate & Man Mandir Palace',
      distance: '4.8 km from Campus • ~15 mins transit',
      costs: { 1: 320, 2: 480, 3: 800, 4: 1200 },
      itineraries: {
        1: [
          { day: 'Stop 1 (4:30 PM)', text: 'Meet at MITS Main Gate, share E-Rickshaw / Rapido to Urvai Gate.' },
          { day: 'Stop 2 (5:15 PM)', text: 'Explore Man Mandir Palace courtyards, ancient rock-cut Jain sculptures.' },
          { day: 'Stop 3 (6:30 PM)', text: 'Panoramic sunset view over Gwalior city from cliff ramparts & tea check-in.' }
        ],
        2: [
          { day: 'Stop 1 (2:00 PM)', text: 'Rendezvous at pickup hub, head to Gujari Mahal Archaeological Museum.' },
          { day: 'Stop 2 (4:00 PM)', text: 'Climb through Hathi Pol to Saas Bahu Temple & Teli Ka Mandir.' },
          { day: 'Stop 3 (6:00 PM)', text: 'Sunset point photography & evening light-and-sound show on the ramparts.' }
        ],
        3: [
          { day: 'Morning', text: 'Full historical fort circuit: Urvai Gate, Gwalior Fort Museum, and palaces.' },
          { day: 'Afternoon', text: 'Traditional Gwalior thali lunch at local partner cafe near fort road.' },
          { day: 'Evening', text: 'Tomb of Tansen & Mohammad Ghaus, classical music discussion & bill split.' }
        ],
        4: [
          { day: 'Day 1', text: 'Complete Gwalior Fort palace exploration, photography, and evening bazaar walk.' },
          { day: 'Day 2', text: 'Sunrise at Gopachal Parvat, morning breakfast crawl, and heritage craft market.' }
        ]
      }
    },
    tigra: {
      name: 'Tigra Dam Lake & Boating',
      destLabel: 'Tigra Dam Reservoir & Water Sports',
      distance: '18.5 km from City Center • ~35 mins via Bike / Cab',
      costs: { 1: 720, 2: 960, 3: 1400, 4: 2000 },
      itineraries: {
        1: [
          { day: 'Stop 1 (3:00 PM)', text: 'Meet at City Center / MITS Gate, pool Rapidos or shared cab to Tigra Dam.' },
          { day: 'Stop 2 (4:00 PM)', text: 'Enjoy speedboat or paddle boating on the reservoir with 10% student pass.' },
          { day: 'Stop 3 (5:45 PM)', text: 'Sunset lakeside view, pakoras & tea at Tigra Breeze Cafe, auto-split ride back.' }
        ],
        2: [
          { day: 'Afternoon', text: 'Scenic ride through Tigra rocky terrain, speed boating & lake nature photography.' },
          { day: 'Evening', text: 'Lakeside picnic, acoustic guitar jam by the reservoir water & sunset view.' }
        ],
        3: [
          { day: 'Full Day', text: 'Morning bird watching around reservoir outskirts, boat cruise & afternoon camping.' }
        ],
        4: [
          { day: 'Weekend', text: '2-Day Tigra & Sank River adventure with starlit night camp and bonfire.' }
        ]
      }
    },
    foodtrail: {
      name: 'Maharaj Bada & Sarafa Food Trail',
      destLabel: 'Bada, Naya Bazar & Sarafa Stalls',
      distance: '5.2 km from Padav • ~18 mins via E-Rickshaw',
      costs: { 1: 480, 2: 600, 3: 900, 4: 1200 },
      itineraries: {
        1: [
          { day: 'Stop 1 (6:00 PM)', text: 'Meet at Padav / Station Hub, share E-Rickshaw to historical Maharaj Bada.' },
          { day: 'Stop 2 (7:00 PM)', text: 'Famous Gwalior bedai, samosas & kachori tasting in Sarafa Bazar.' },
          { day: 'Stop 3 (8:30 PM)', text: 'Traditional Morena gajak, rabdi jalebi & instant UPI bill split.' }
        ],
        2: [
          { day: 'Evening', text: 'Victoria Market architecture walk, evening snack crawl across 4 iconic heritage stalls.' }
        ],
        3: [
          { day: 'Full Day', text: 'Morning SS Kachori breakfast, mid-day Lassi crawl, and evening street food square.' }
        ],
        4: [
          { day: 'Weekend', text: 'Deep dive into Gwalior culinary history: Chaat, Bedai, Poha, Sweets, and street cafes.' }
        ]
      }
    },
    cafes: {
      name: 'University Rd & City Center Cafes',
      destLabel: 'University Rd & Kailash Vihar Hub',
      distance: '3.6 km circuit • ~12 mins transit',
      costs: { 1: 400, 2: 560, 3: 800, 4: 1100 },
      itineraries: {
        1: [
          { day: 'Stop 1 (5:30 PM)', text: 'Rendezvous at University Rd Tapri, hot ginger chai & signature bun maska.' },
          { day: 'Stop 2 (6:45 PM)', text: 'Head to City Center partner cafe for cold coffees & shakes with 20% pass.' },
          { day: 'Stop 3 (8:00 PM)', text: 'Casual squad chit-chat, exam prep / project brainstorm & bill split.' }
        ],
        2: [
          { day: 'Afternoon', text: 'Remote workation session with high-speed WiFi at Kailash Vihar cafe, evening shake trail.' }
        ],
        3: [
          { day: 'Full Day', text: 'Student cafe hopping across Gwalior university corridor with partner discounts.' }
        ],
        4: [
          { day: 'Weekend', text: 'Weekend cafe networking for student developers, creators, and freelancers.' }
        ]
      }
    },
    mitawali: {
      name: 'Mitawali & Padavali Ancient Temples',
      destLabel: 'Chausath Yogini Temple & Bateshwar',
      distance: '38.0 km from Gwalior • ~50 mins via Cab Pool',
      costs: { 1: 1400, 2: 1800, 3: 2400, 4: 3200 },
      itineraries: {
        1: [
          { day: 'Morning (8:00 AM)', text: 'Meet at Gwalior Station Hub, board pooled cab to Mitawali circular temple.' },
          { day: 'Mid-Day (11:00 AM)', text: 'Explore Bateshwar temple complex: 200 ancient sandstone shrines.' },
          { day: 'Afternoon (2:00 PM)', text: 'Padavali fortress carving study, dhaba lunch & shared fuel split.' }
        ],
        2: [
          { day: 'Half Day', text: 'Detailed architectural photography expedition to Indian Parliament design inspiration.' }
        ],
        3: [
          { day: 'Full Day', text: 'Complete Chambal heritage circuit: Mitawali, Padavali, Bateshwar & Kakanmath.' }
        ],
        4: [
          { day: 'Weekend', text: '2-Day historical documentation and archaeological tour from Gwalior.' }
        ]
      }
    },
    orchha: {
      name: 'Orchha Palace Weekend Getaway',
      destLabel: 'Orchha Fort & Betwa River Sanctuary',
      distance: '115 km from Gwalior • 2 hrs 30 mins Carpool',
      costs: { 1: 2200, 2: 3000, 3: 3800, 4: 4800 },
      itineraries: {
        1: [
          { day: 'Day Trip (7:00 AM)', text: 'Depart Gwalior DB Mall hub, highway carpool to Orchha Fort complex.' },
          { day: 'Afternoon (1:00 PM)', text: 'Raja Mahal fresco tour, Betwa river rafting & local Bundeli lunch.' },
          { day: 'Evening (6:00 PM)', text: 'Sunset chhatris reflection view, automated fuel & cab split, return drive.' }
        ],
        2: [
          { day: 'Day 1', text: 'Scenic road trip from Gwalior, check into heritage homestay, evening Betwa Aarti.' },
          { day: 'Day 2', text: 'Jahangir Mahal sunrise, river kayak session, final bill clear & return to Gwalior.' }
        ],
        3: [
          { day: 'Long Trip', text: 'Extended 3-day exploration covering Orchha palaces and Jhansi Fort history.' }
        ],
        4: [
          { day: 'Weekend Stay', text: 'Complete workation retreat with high-speed WiFi stay overlooking Betwa river.' }
        ]
      }
    }
  };

  function updatePlannerUI() {
    const trip = tripDatabase[currentDest] || tripDatabase.fort;
    const baseCost = (trip.costs && trip.costs[currentDays]) || 320;
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
      const timeNames = {
        1: '2-3 Hours',
        2: '5 Hours',
        3: 'Full Day',
        4: '2 Days'
      };
      const daysText = timeNames[currentDays] || 'Outing';
      itineraryTitle.textContent = `${trip.name} (${daysText})`;
    }

    // Companion Mode badge & copy
    if (currentCompanion === 'solo') {
      if (itineraryModeBadge) {
        itineraryModeBadge.textContent = '🚶‍♂️ Solo Explorer Route & GPS Safe';
        itineraryModeBadge.style.color = '#1E40AF';
      }
      if (itineraryDesc) {
        itineraryDesc.textContent = `Custom solo Gwalior itinerary with automatic emergency contact check-ins, optimized stops, and verified meeting hubs.`;
      }
    } else if (currentCompanion === 'squad') {
      if (itineraryModeBadge) {
        itineraryModeBadge.textContent = '👥 Gwalior Squad (÷4 Group Auto-Split)';
        itineraryModeBadge.style.color = '#0284C7';
      }
      if (itineraryDesc) {
        itineraryDesc.textContent = `Squad plan for ${trip.name}. Split Gwalior autos/cabs and food bills 4 ways with live UPI settlement.`;
      }
    } else {
      // 1-on-1 match
      if (itineraryModeBadge) {
        itineraryModeBadge.textContent = '🤝 Matching Verified Gwalior Explorers (60%+ Overlap)';
        itineraryModeBadge.style.color = '#243B6B';
      }
      if (itineraryDesc) {
        itineraryDesc.textContent = `Trailix matches you with a verified Gwalior student heading to ${trip.name} during your exact window. Split transit & make campus friends.`;
      }
    }

    // Transit Pill on Route Map
    const transitNames = {
      rapido: '🛵 Rapido / Bike Pool',
      auto: '🛺 Gwalior E-Rickshaw',
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
    const daysData = (trip.itineraries && (trip.itineraries[currentDays] || trip.itineraries[1])) || [
      { day: 'Stop 1', text: 'Meet at Gwalior departure hub, pool E-Rickshaw / Rapido.' },
      { day: 'Stop 2', text: 'Main sightseeing & shared activities.' },
      { day: 'Stop 3', text: 'Cafe check-in, automated expense split & journey home.' }
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

  // GPS Button (Gwalior Coordinates)
  if (btnGps) {
    btnGps.addEventListener('click', () => {
      btnGps.classList.toggle('active');
      const isActive = btnGps.classList.contains('active');
      if (isActive) {
        currentStart = '📍 Current Gwalior GPS Location';
        if (gpsStatus) gpsStatus.classList.add('visible');
        showToast('GPS linked in Gwalior (26.2183° N, 78.1828° E)!', '📍');
      } else {
        currentStart = startLocationSelect ? startLocationSelect.value : 'MITS Main Gate';
        if (gpsStatus) gpsStatus.classList.remove('visible');
        showToast('Reverted to selected Gwalior hub.', '🏫');
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

  // WhatsApp Share Button (Gwalior formatted)
  if (btnWhatsappShare) {
    btnWhatsappShare.addEventListener('click', () => {
      const trip = tripDatabase[currentDest] || tripDatabase.fort;
      const sharePrice = sharedCostDisplay ? sharedCostDisplay.textContent : '₹80';
      const transitText = currentTransit === 'rapido' ? 'Rapido Bike Pool' : (currentTransit === 'auto' ? 'E-Rickshaw Share' : 'Shared Cab');
      const text = encodeURIComponent(`Hey! I just planned a Gwalior outing to ${trip.name} on Trailix! We can pool transit via ${transitText} from ${currentStart} and our share is just ${sharePrice}/head. Let's squad up: https://mayankkumar272004-cmd.github.io/trailix_v.0/`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
      showToast('Opening WhatsApp to share with your Gwalior squad!', '💬');
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
      const trip = tripDatabase[currentDest] || tripDatabase.fort;
      const sharePrice = sharedCostDisplay ? sharedCostDisplay.textContent : '₹80';
      const travelers = travelersRange ? travelersRange.value : 4;

      if (lockModalHub) lockModalHub.textContent = currentStart;
      if (lockModalDetails) lockModalDetails.textContent = `${trip.name} • ${travelers} Travelers • ${sharePrice} / head`;
      if (lockModalTransit) lockModalTransit.textContent = currentTransit === 'rapido' ? '🛵 Rapido Pool' : (currentTransit === 'auto' ? '🛺 Gwalior E-Rickshaw' : '🚙 Shared Cab');

      if (lockModal) lockModal.classList.add('active');
      showToast('Plan locked & Gwalior squad room ready!', '🔒');
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

  // --- 7. Gwalior Partner Spots & Digital Pass Modal ---
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
  let currentVenueDiscount = '15% Off Total Bill';

  reserveSlotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const venue = btn.getAttribute('data-venue') || 'Gwalior Partner Cafe';
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
      showToast('Gwalior digital pass saved! Show PIN on arrival.', '🎟️');
    });
  }

  // --- 8. Pre-Trip Squad Lounge Interactive Chat (Gwalior Localized) ---
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

      // Simulated smart peer response from Riya Sharma (MITS)
      setTimeout(() => {
        const responses = [
          "Perfect! I'll be at MITS Main Gate at 3:30 PM sharp. Rapido confirmed!",
          "Sounds great! After Tigra Dam sunset, let's grab coffee on University Rd with our pass.",
          "Awesome! Packed my camera for the fort sunset. See you at the gate! 🚀"
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
        showToast('Message sent to Gwalior squad!', '💬');
      }
    });
  });

  // --- 9. Two-Way Peer Rating & Endorsements Modal ---
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
      showToast("⭐ Peer endorsement submitted! Riya's Gwalior trust score updated to 4.9/5.0.", '🎉');
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
      const role = roleElem ? roleElem.value : 'gwalior_student';
      const timestamp = new Date().toLocaleString('en-IN');

      const subscriberData = { name, email, role, city: 'Gwalior', date: timestamp };

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
      submitBtn.innerHTML = `<span>Saving your Gwalior spot...</span>`;

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
        successMessage.textContent = `Thank you, ${name}! We've reserved your priority Gwalior early access badge for ${email}. You will receive your onboarding invite soon.`;
      }
      waitlistForm.style.display = 'none';
      if (waitlistSuccess) waitlistSuccess.style.display = 'block';
      showToast('Gwalior early access spot reserved!', '🎉');
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
