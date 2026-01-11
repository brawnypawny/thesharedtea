//import { initFilters } from './filters.js'

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.sidebar-tab');
  const sections = document.querySelectorAll('.menu-section');

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

});

