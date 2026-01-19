document.addEventListener('DOMContentLoaded', () => {

  // ===========================================
  // SCROLL-TRIGGERED ANIMATIONS
  // ===========================================

  // Intersection Observer for scroll reveal animations
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  scrollRevealElements.forEach(el => revealObserver.observe(el));

  // ===========================================
  // POUR SECTION ZOOM ON SCROLL
  // ===========================================

  const pourSection = document.querySelector('.pour-section');

  if (pourSection) {
    const pourObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pourSection.classList.add('is-zoomed');
        } else {
          pourSection.classList.remove('is-zoomed');
        }
      });
    }, {
      threshold: 0.5
    });

    pourObserver.observe(pourSection);
  }

  // ===========================================
  // MENU TAB FUNCTIONALITY
  // ===========================================

  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  function showSection(sectionId) {
    // Hide all panels
    panels.forEach(panel => {
      panel.classList.add('hidden');
    });

    // Remove active state from all tabs
    tabs.forEach(tab => {
      tab.classList.remove('is-active');
    });

    // Show selected panel
    const activePanel = document.getElementById(sectionId);
    const activeTab = document.querySelector(`[data-section="${sectionId}"]`);

    if (activePanel) {
      activePanel.classList.remove('hidden');
    }
    if (activeTab) {
      activeTab.classList.add('is-active');
    }
  }

  // Add click handlers to tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const sectionId = tab.dataset.section;
      showSection(sectionId);
    });
  });

  // Show default section (milk-tea)
  if (tabs.length > 0) {
    showSection('milk-tea');
  }

  // Contact form handler
  const form = document.getElementById('message-form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const button = form.querySelector("button");
    const msg = document.getElementById("form-message");

    button.disabled = true;
    button.textContent = "Sending...";

    msg.classList.add("hidden");
    msg.textContent = "";

    try {
      const response = await fetch("https://formspree.io/f/xbddrnpz", {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        msg.textContent = "Message sent!";
        msg.className = "text-sm font-medium text-green-600";
      } else {
        msg.textContent = "Something went wrong...";
        msg.className = "text-sm font-medium text-red-600";
      }
    } catch {
      msg.textContent = "Network error.";
      msg.className = "text-sm font-medium text-red-600";
    } finally {
      button.disabled = false;
      button.textContent = "Send";
      msg.classList.remove("hidden");
    }
  });
});
