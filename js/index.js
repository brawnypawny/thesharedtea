//import { initFilters } from './filters.js'

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.sidebar-tab');
  const sections = document.querySelectorAll('.menu-section');
  const menuContent = document.getElementById("menu-content");

  function showSection(sectionId){
    sections.forEach(section => {
      section.classList.add('hidden');
    });

    tabs.forEach(tab => {
      tab.classList.remove('is-active');
    });

    const activeSection = document.getElementById(sectionId);
    const activeTab = document.querySelector(`[data-section="${sectionId}"]`);

    if (activeSection) 
        activeSection.classList.remove('hidden');
    if (activeTab)
        activeTab.classList.add('is-active');


    // reset menu scroll position
    setTimeout(() => {
      menuContent.scrollTo({ top: 0, behavior: "smooth" });
    });
  }


  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const sectionId = tab.dataset.section;
      showSection(sectionId);
    });
  });

  // show default section
  if (tabs.length > 0) {
    showSection(tabs[2].dataset.section);
  }



// handler for leave a message form
  const form = document.getElementById('message-form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const button = form.querySelector("button");
    const msg = document.getElementById("form-message");

    button.disabled = true;
    button.textContent = "Sending…";

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
        msg.className = "mt-4 font-bold text-peach";
      } else {
        msg.textContent = "Something went wrong...";
        msg.className = "mt-4 font-bold text-red-700";
      }
    } catch {
      msg.textContent = "Network error.";
      msg.className = "mt-4 font-bold text-red-700";
    } finally {
      button.disabled = false;
      button.textContent = "Send";
      msg.classList.remove("hidden");
    }
  });

  // Typewriter effect for about cards
  function typewriterEffect(element, text, speed = 10) {
    let i = 0;
    element.textContent = '';
    element.classList.add('typewriter-text');

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        // Let cursor blink twice before hiding
        setTimeout(() => element.classList.add('done'), 2000);
      }
    }
    type();
  }

  const sectionsA = [
    document.getElementById('home'),
    document.getElementById('about'),
    document.getElementById('menu'),
    document.getElementById('contact'),
  ].filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find typewriter elements within this section that haven't animated yet
        const typewriterElements = entry.target.querySelectorAll('[data-typewriter]:not(.typewriter-done)');
        typewriterElements.forEach(el => {
          el.classList.add('typewriter-done'); // Mark as animated
          const text = el.dataset.typewriter;
          typewriterEffect(el, text);
        });

        // Trigger CSS animations for title-typewriter and decorative-line
        const animatedElements = entry.target.querySelectorAll('.title-typewriter:not(.animate), .decorative-line:not(.animate)');
        animatedElements.forEach(el => {
          el.classList.add('animate');
        });
      }
    });
  }, { threshold: 0.3 });

  sectionsA.forEach(section => observer.observe(section));


});



