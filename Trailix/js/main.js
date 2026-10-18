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

  // --- 5. Interactive Savings Calculator ---
  const travelersRange = document.getElementById('travelersRange');
  const travelersCount = document.getElementById('travelersCount');
  const soloCostDisplay = document.getElementById('soloCostDisplay');
  const sharedCostDisplay = document.getElementById('sharedCostDisplay');
  const savingsTag = document.getElementById('savingsTag');
  const calcButtons = document.querySelectorAll('.calc-btn');

  let currentBaseCost = 12000;

  function updateCalculator() {
    const travelers = parseInt(travelersRange.value, 10);
    travelersCount.textContent = `${travelers} Travelers`;

    // Calculation:
    // Solo cost is base cost
    // Shared cost = base cost / travelers
    // Savings = base cost - shared cost
    const solo = currentBaseCost;
    const shared = Math.round(currentBaseCost / travelers);
    const savings = solo - shared;
    const savingsPercent = Math.round((savings / solo) * 100);

    soloCostDisplay.textContent = `₹${solo.toLocaleString('en-IN')}`;
    sharedCostDisplay.textContent = `₹${shared.toLocaleString('en-IN')}`;
    savingsTag.textContent = `You Save ₹${savings.toLocaleString('en-IN')} (${savingsPercent}%)`;
  }

  if (travelersRange) {
    travelersRange.addEventListener('input', updateCalculator);

    calcButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        calcButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentBaseCost = parseInt(btn.getAttribute('data-base'), 10);
        updateCalculator();
      });
    });

    updateCalculator();
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
