/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 14 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    const projects = {
      'loan-system': {
        category: 'Financial Services / FinTech',
        date: 'Present',
        url: 'https://github.com/evelinkolev/loansystem',
        title: 'Loan debt card repayment system',
        description: `
          This project utilises several key technologies and patterns to build a robust loan debt card repayment system in ASP.NET Core Web API. The Repository pattern abstracts data access logic for cleaner code maintenance. CQRS (Command Query Responsibility Segregation) with the Mediator pattern is implemented using MediatR to handle commands and queries, ensuring a clear separation between read and write operations. JWT (JSON Web Tokens) are used for securing API endpoints, while HMAC (Hash-based Message Authentication Code) ensures secure password hashing and data integrity. Entity Framework Core with code-first migrations manages the database schema, and Dependency Injection (DI) facilitates the management of service lifetimes and dependencies. Additionally, a custom StringGenerator class provides functionalities for generating and validating card numbers and security codes, demonstrating secure and random data generation practices.
        `,
        images: [
          'assets/img/portfolio/accd027f-a93b-42c2-a0c5-804b0874c6e8-loan-system-project-back-end.png',
          'assets/img/portfolio/accd027f-a93b-42c2-a0c5-804b0874c6e8-loan-system-project-sql.png'
        ]
      },
      'steam-games': {
        category: 'Web Scraping and Data Extraction',
        date: 'Present',
        url: 'https://github.com/evelinkolev/steam_web_scraper',
        title: 'Steam store\'s most played games chart',
        description: `
          This project involves a web scraping and data extraction script using Selenium in Python. The script automates the process of extracting data from the Steam store's most played games chart. It retrieves information such as game names, prices, current players, and peak players today. The extracted data is processed and structured into a pandas DataFrame and then saved to a CSV file for further analysis. This automation leverages headless Chrome browser capabilities for efficient and non-intrusive data scraping.
        `,
        images: [
          'assets/img/portfolio/98a62882-a316-4daf-8677-8c2134cd5d9c-steam_most_played_games.png',
          'assets/img/portfolio/98a62882-a316-4daf-8677-8c2134cd5d9c-steam_most_played_games_web_scraper.png'
        ]
      },
      'cybersecurity-attacks': {
        category: 'Data Science',
        date: 'Present',
        url: 'https://www.kaggle.com/code/archwaq/cyber-security-attacks-eda',
        title: 'Cyber Security Attacks EDA',
        description: `
          I developed a Cyber Attack Analysis project focused on identifying vulnerable traffic types and devices/OS based on sample data. Using Python with Pandas and Seaborn, I analysed 'Anomaly Scores' and 'Action Taken' to pinpoint infiltrated traffic and cyber attacks. This project taught me data filtering, aggregation, and visualisation techniques essential for cybersecurity analytics.
        `,
        images: [
          'assets/img/portfolio/547db4b7-56bd-4d0a-9b84-075e4acabda8-cybersecurity-attacks-eda.png'
        ]
      }
      // Add more projects as needed
    };

    const project = projects[projectId];
    if (project) {
      document.querySelector('.portfolio-info ul').innerHTML = `
        <li><strong>Category</strong>: ${project.category}</li>
        <li><strong>Project date</strong>: ${project.date}</li>
        <li><strong>Project URL</strong>: <a href="${project.url}">${project.url}</a></li>
      `;
      document.querySelector('.portfolio-description').innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
      `;
      document.querySelector('.swiper-wrapper').innerHTML = project.images.map(img => `
        <div class="swiper-slide">
          <img src="${img}" alt="">
        </div>
      `).join('');
    }
  });

})();