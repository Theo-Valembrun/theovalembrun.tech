"use strict";

document.addEventListener('DOMContentLoaded', () => {

  // Get references to navigation links and content sections
  const navLinks = document.querySelectorAll('.nav-link');
  const contentSections = document.querySelectorAll('.content-section');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const contactForm = document.getElementById('contact-form');

  /**
   * Shows a specific content section and hides all others.
   * Also updates the active class on the corresponding navigation link.
   * @param {string} targetId - The ID of the section to show (e.g., 'summary', 'services').
   */
  const showSection = (targetId) => {
    // Hide all content sections
    contentSections.forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none'; // Explicitly hide elements
    });

    // Show the target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.style.display = 'block'; // Explicitly show element
      window.scrollTo(0, 0); // Scroll to top of the page when changing sections
    }
  };

  /**
   * Updates the 'active' class on navigation links based on the currently displayed section.
   * @param {string} targetId - The ID of the currently active section.
   */
  const updateActiveNavLink = (targetId) => {
    // Remove 'active' class from all nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add 'active' class to the link corresponding to the targetId
    const activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  };

  // --- Theme Toggle Functionality ---
  // Check for saved theme in localStorage on page load
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    body.classList.add(currentTheme);
    // Update the toggle button's icon and text based on the loaded theme
    if (currentTheme === 'dark-mode') {
      themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
      themeToggle.querySelector('.toggle-text').textContent = 'Light Mode';
    } else {
      themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
      themeToggle.querySelector('.toggle-text').textContent = 'Dark Mode';
    }
  }

  // Add event listener for the theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode'); // Toggle the 'dark-mode' class on the body
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode'); // Save preference
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        themeToggle.querySelector('.toggle-text').textContent = 'Light Mode';
      } else {
        localStorage.setItem('theme', 'light-mode'); // Save preference
        themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        themeToggle.querySelector('.toggle-text').textContent = 'Dark Mode';
      }
    });
  }

  // --- Navigation Functionality ---
  // Add event listeners to all navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default anchor link behavior (jumping to hash)
      const targetId = link.getAttribute('data-target'); // Get the target section ID
      showSection(targetId); // Show the selected section
      updateActiveNavLink(targetId); // Update active class on nav link
      // Update URL hash without causing a page reload, allowing direct linking and history navigation
      history.pushState(null, '', `#${targetId}`);
    });
  });

  // Handle initial page load based on URL hash
  const initialHash = window.location.hash.substring(1); // Get hash without '#'
  if (initialHash && document.getElementById(initialHash)) {
    // If a valid hash exists, show that section
    showSection(initialHash);
    updateActiveNavLink(initialHash);
  } else {
    // Otherwise, default to the 'summary' section
    showSection('summary');
    updateActiveNavLink('summary');
  }

  // Handle browser back/forward button navigation
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
      showSection(hash);
      updateActiveNavLink(hash);
    } else {
      // If hash is empty or invalid after popstate, default to 'summary'
      showSection('summary');
      updateActiveNavLink('summary');
    }
  });

  // --- Contact Form Submission ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent default form submission

      // Get form field values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Construct mailto link with all form data
      const mailtoLink = `mailto:theo.valembrun@ieee.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      // Open the default email client
      window.location.href = mailtoLink;
    });
  }

});