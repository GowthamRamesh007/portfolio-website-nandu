/**
 * app.js — Dynamic Renderer + Interaction Engine
 * Nandhu's Portfolio Website
 *
 * Responsibilities:
 *  - Loading screen
 *  - Dynamic rendering from data.js
 *  - Intersection Observer (reveal + video autoplay)
 *  - Custom cursor
 *  - Scroll progress
 *  - Navigation (desktop + mobile + active state)
 *  - Skill bar animations
 *  - Project filter
 *  - Lightbox (image gallery + tabs for mixed projects)
 *  - Video modal
 *  - Counter animation
 *  - Tilt effect on cards
 *  - Magnetic buttons
 *  - Back-to-top
 */

'use strict';

// ─── HELPERS ────────────────────────────────────────────────────────────────

/** Create an element with optional classes and attributes */
function el(tag, classes = [], attrs = {}) {
  const e = document.createElement(tag);
  if (classes.length) e.classList.add(...classes);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'html') e.innerHTML = v;
    else e.setAttribute(k, v);
  }
  return e;
}

/** Lazy load an image — sets src only when visible */
function lazyImg(src, alt = '', classes = []) {
  const img = el('img', ['lazy', ...classes], { alt });
  img.dataset.src = src;
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
  return img;
}

/** Select single element */
const $ = (selector, parent = document) => parent.querySelector(selector);

/** Select all elements */
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

// ─── LOADING SCREEN ─────────────────────────────────────────────────────────

(function initLoader() {
  const screen = $('#loading-screen');
  const bar = $('#loader-bar');
  const pct = $('#loader-pct');

  let progress = 0;
  const target = 100;

  function tick() {
    const step = Math.random() * 12 + 4;
    progress = Math.min(progress + step, target);
    const v = Math.round(progress);
    bar.style.width = v + '%';
    pct.textContent = v + '%';

    if (progress < target) {
      setTimeout(tick, 80 + Math.random() * 120);
    } else {
      setTimeout(() => {
        screen.classList.add('hidden');
        document.body.classList.remove('loading');
        initReveal();
        initSkillBars();
        initCounters();
        initVideoAutoplay();
      }, 400);
    }
  }

  // Start on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tick);
  } else {
    tick();
  }
})();

// ─── MAIN INIT (called from DOMContentLoaded after data.js is available) ────

document.addEventListener('DOMContentLoaded', function () {
  renderNav();
  renderMobileNav();
  renderHero();
  renderAbout();
  renderTimeline();
  renderSoftwareSkills();
  renderCreativeSkills();
  renderProjects();
  renderVideoPortfolio();
  renderPosterGrid();
  renderTshirtGrid();
  renderPersonalWorks();
  renderGallery();
  renderStats();
  renderInstagram();
  renderContactMethods();
  renderFooter();

  initCursor();
  initScrollProgress();
  initNavScroll();
  initMobileNav();
  initBackToTop();
  initProjectFilter();
  initLightbox();
  initVideoModal();
  initTilt();
});

// ─── NAVIGATION ─────────────────────────────────────────────────────────────

function renderNav() {
  const container = $('#nav-links');
  if (!container) return;
  DATA.navLinks.forEach(link => {
    const a = el('a', [], { href: link.href, role: 'listitem' });
    a.textContent = link.label;
    container.appendChild(a);
  });
}

function renderMobileNav() {
  const container = $('#nav-mobile-links');
  if (!container) return;
  DATA.navLinks.forEach(link => {
    const a = el('a', [], { href: link.href });
    a.textContent = link.label;
    a.addEventListener('click', closeMobileNav);
    container.appendChild(a);
  });
}

function initNavScroll() {
  const navbar = $('#navbar');
  const links = $$('#nav-links a');
  const sections = $$('section[id]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Active link highlight
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}

function initMobileNav() {
  const hamburger = $('#nav-hamburger');
  const mobileNav = $('#nav-mobile');
  const closeBtn = $('#nav-mobile-close');

  hamburger?.addEventListener('click', () => {
    mobileNav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  });

  closeBtn?.addEventListener('click', closeMobileNav);

  mobileNav?.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeMobileNav();
  });
}

function closeMobileNav() {
  $('#nav-mobile')?.classList.remove('open');
  $('#nav-hamburger')?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// ─── HERO ───────────────────────────────────────────────────────────────────

function renderHero() {
  const profile = DATA.profile;

  // Background
  const heroBg = $('#hero-bg-image');
  if (heroBg) heroBg.style.backgroundImage = `url('${profile.backgroundImage}')`;

  // Rotating role (typewriter)
  const rolesEl = $('#hero-roles-rotating');
  if (rolesEl) {
    let idx = 0;
    let charIdx = 0;
    let deleting = false;

    function typeWriter() {
      const role = profile.roles[idx];
      if (!deleting) {
        rolesEl.textContent = role.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === role.length) {
          deleting = true;
          setTimeout(typeWriter, 1800);
          return;
        }
      } else {
        rolesEl.textContent = role.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          idx = (idx + 1) % profile.roles.length;
        }
      }
      setTimeout(typeWriter, deleting ? 60 : 100);
    }
    setTimeout(typeWriter, 1000);
  }

  // Role badges
  const badges = $('#hero-role-badges');
  if (badges) {
    profile.roles.forEach(role => {
      const span = el('span', ['hero-role-badge']);
      span.textContent = role;
      badges.appendChild(span);
    });
  }

  // Bio
  const bioEl = $('#hero-bio');
  if (bioEl) bioEl.textContent = profile.bio;

  // Actions
  const actions = $('#hero-actions');
  if (actions) {
    const primary = el('a', ['btn-primary'], { href: '#projects' });
    primary.innerHTML = 'View My Work <span>→</span>';
    const outline = el('a', ['btn-outline'], { href: '#contact' });
    outline.innerHTML = 'Let\'s Talk';
    actions.appendChild(primary);
    actions.appendChild(outline);
  }
}

// ─── ABOUT ──────────────────────────────────────────────────────────────────

function renderAbout() {
  const profile = DATA.profile;

  // Image frame
  const frame = $('#about-image-frame');
  if (frame) {
    const img = lazyImg(profile.backgroundImage, 'Nandhu — Editor and Designer');
    frame.appendChild(img);
  }

  // Stats chips
  const statsFloat = $('#about-stats-float');
  if (statsFloat) {
    const chips = [
      { val: '3+', label: 'Years Exp.' },
      { val: '10+', label: 'Projects' }
    ];
    chips.forEach(chip => {
      const div = el('div', ['stat-chip']);
      div.innerHTML = `<div class="stat-val">${chip.val}</div><div class="stat-label">${chip.label}</div>`;
      statsFloat.appendChild(div);
    });
  }

  // Bio text
  const intro = $('#about-intro');
  if (intro) {
    intro.innerHTML = `<strong>${profile.fullName}</strong> — ${profile.bio}`;
  }

  // Instagram badge
  const badge = $('#about-instagram-badge');
  if (badge) {
    badge.href = profile.instagramUrl;
    badge.innerHTML = `
      <img src="${DATA.mediaRegistry.icons.instagram}" alt="Instagram icon" width="28" height="28" />
      <span>${profile.instagramHandle}</span>
      <span style="color: var(--clr-text-muted); font-size: var(--fs-xs);">  — ${profile.instagramPage}</span>
    `;
  }
}

// ─── TIMELINE ───────────────────────────────────────────────────────────────

function renderTimeline() {
  const container = $('#journey-timeline');
  if (!container) return;

  // Remove the line before re-inserting it
  const line = container.querySelector('.journey-line');

  DATA.timeline.forEach((item, i) => {
    const isEven = i % 2 !== 0;

    const itemDiv = el('div', ['timeline-item', 'reveal'], { style: `transition-delay: ${i * 0.1}s` });

    const yearCol = el('div', ['timeline-year-col']);
    yearCol.innerHTML = `<div class="timeline-year">${item.year}</div>`;

    const dotCol = el('div', ['timeline-dot-col']);
    dotCol.innerHTML = `<div class="timeline-dot" aria-hidden="true"></div>`;

    const content = el('div', ['timeline-content']);
    content.innerHTML = `
      <div class="timeline-milestone">${item.icon} ${item.milestone}</div>
      <div class="timeline-title">${item.title}</div>
      <p class="timeline-desc">${item.description}</p>
    `;

    if (isEven) {
      itemDiv.appendChild(content);
      itemDiv.appendChild(dotCol);
      itemDiv.appendChild(yearCol);
    } else {
      itemDiv.appendChild(yearCol);
      itemDiv.appendChild(dotCol);
      itemDiv.appendChild(content);
    }

    container.appendChild(itemDiv);
  });

  // Re-append the line at the end so it stays behind items
  if (line) container.prepend(line);
}

// ─── SOFTWARE SKILLS ─────────────────────────────────────────────────────────

function renderSoftwareSkills() {
  const grid = $('#skills-grid');
  if (!grid) return;

  DATA.softwareSkills.forEach((skill, i) => {
    const card = el('div', ['skill-card', 'reveal'], { style: `transition-delay: ${i * 0.1}s` });
    card.innerHTML = `
      <div class="skill-header">
        <img class="skill-logo lazy" data-src="${skill.logo}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" alt="${skill.name} logo" width="52" height="52" />
        <div class="skill-info">
          <div class="skill-name">${skill.name}</div>
          <div class="skill-category">${skill.category}</div>
        </div>
      </div>
      <p class="skill-description">${skill.description}</p>
      <div class="skill-bar-wrap">
        <div class="skill-bar" data-pct="${skill.proficiency}"></div>
      </div>
      <div class="skill-pct">${skill.proficiency}%</div>
    `;
    grid.appendChild(card);
  });
}

// ─── CREATIVE SKILLS ─────────────────────────────────────────────────────────

function renderCreativeSkills() {
  const grid = $('#creative-skills-grid');
  if (!grid) return;

  DATA.creativeSkills.forEach((skill, i) => {
    const pill = el('div', ['creative-skill-pill', 'reveal'], { style: `transition-delay: ${i * 0.08}s` });
    pill.innerHTML = `
      <span>${skill.icon}</span>
      <span>${skill.name}</span>
      <span class="creative-skill-level">· ${skill.level}</span>
    `;
    grid.appendChild(pill);
  });
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function renderProjects() {
  renderFilterButtons();
  renderProjectCards(DATA.projects);
}

function renderFilterButtons() {
  const filterContainer = $('#projects-filter');
  if (!filterContainer) return;

  const categories = ['all', ...new Set(DATA.projects.map(p => p.category))];
  const labels = {
    'all': 'All Work',
    'video-editing': 'Video Editing',
    'poster-design': 'Poster Design',
    'tshirt-design': 'T-Shirt Design',
    'personal': 'Personal'
  };

  categories.forEach((cat, i) => {
    const btn = el('button', ['filter-btn', ...(i === 0 ? ['active'] : [])], {
      'data-filter': cat,
      'id': `filter-${cat}`,
      'aria-pressed': i === 0 ? 'true' : 'false'
    });
    btn.textContent = labels[cat] || cat;
    filterContainer.appendChild(btn);
  });
}

function renderProjectCards(projects) {
  const grid = $('#projects-grid');
  if (!grid) return;
  grid.innerHTML = '';

  projects.forEach((project, i) => {
    const card = createProjectCard(project, i);
    grid.appendChild(card);
  });

  // Re-init tilt on new cards
  initTilt();
}

function createProjectCard(project, i = 0) {
  const isFeatured = project.featured;
  const card = el('div', ['project-card', ...(isFeatured ? ['project-card-featured'] : []), 'reveal'], {
    style: `transition-delay: ${(i % 3) * 0.15}s`,
    'data-category': project.category,
    id: `project-${project.id}`
  });

  // Determine thumbnail
  const thumb = project.thumbnail || (project.images && project.images[0]) || '';
  const hasVideo = project.video || (project.videos && project.videos.length > 0);
  const isImageOnly = project.type === 'image';

  const media = el('div', ['project-media']);

  if (thumb) {
    const img = lazyImg(thumb, project.title);
    media.appendChild(img);
  }

  const overlay = el('div', ['project-media-overlay']);
  if (hasVideo) {
    overlay.innerHTML = `<div class="project-play-btn" aria-hidden="true">▶</div>`;
  } else {
    overlay.innerHTML = `<div class="project-play-btn" aria-hidden="true" style="font-size:1.1rem;">🔍</div>`;
  }
  media.appendChild(overlay);

  const catBadge = el('div', ['project-cat-badge'], { 'aria-hidden': 'true' });
  catBadge.textContent = project.categoryLabel;
  media.appendChild(catBadge);

  // Info
  const info = el('div', ['project-info']);

  const title = el('h3', ['project-title']);
  title.textContent = project.title;

  const desc = el('p', ['project-description']);
  desc.textContent = project.description;

  const meta = el('div', ['project-meta']);

  const swList = el('div', ['project-software-list']);
  project.softwareUsed.forEach(sw => {
    const tag = el('span', ['project-sw-tag']);
    tag.textContent = sw;
    swList.appendChild(tag);
  });

  const date = el('span', ['project-date']);
  date.textContent = project.date;

  meta.appendChild(swList);
  meta.appendChild(date);

  const expandBtn = el('button', ['project-expand-btn']);
  expandBtn.innerHTML = hasVideo ? 'Watch Video →' : 'View Gallery →';

  // Click handler
  card.addEventListener('click', () => openProject(project));
  expandBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openProject(project);
  });

  info.appendChild(title);
  info.appendChild(desc);
  info.appendChild(meta);
  info.appendChild(expandBtn);

  card.appendChild(media);
  card.appendChild(info);

  return card;
}

function openProject(project) {
  if (project.type === 'video') {
    openVideoModal(project.video, project.title);
  } else if (project.type === 'mixed') {
    // First video
    if (project.videos && project.videos.length > 0) {
      openVideoModal(project.videos[0].src, project.title);
    }
  } else {
    openLightbox(project.images, project.title);
  }
}

function initProjectFilter() {
  const filterContainer = $('#projects-filter');
  if (!filterContainer) return;

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    $$('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    const filter = btn.dataset.filter;
    const filtered = filter === 'all'
      ? DATA.projects
      : DATA.projects.filter(p => p.category === filter);

    renderProjectCards(filtered);
    initReveal();
    initLazyImages();
  });
}

// ─── VIDEO PORTFOLIO ─────────────────────────────────────────────────────────

function renderVideoPortfolio() {
  const grid = $('#video-grid');
  if (!grid) return;

  const videoProjects = DATA.projects.filter(p => p.type === 'video' || p.type === 'mixed');

  videoProjects.forEach((project, i) => {
    const videos = project.video
      ? [{ src: project.video, thumbnail: project.thumbnail }]
      : (project.videos || []);

    videos.slice(0, 4).forEach((vid, j) => {
      const card = el('div', ['video-card', 'reveal'], { style: `transition-delay: ${(i + j) * 0.1}s` });

      const video = el('video', [], {
        poster: vid.thumbnail || '',
        preload: 'none',
        loop: '',
        muted: '',
        playsinline: '',
        'data-src': vid.src
      });

      const overlay = el('div', ['video-card-overlay']);
      overlay.innerHTML = `
        <div class="video-play-icon" aria-hidden="true">▶</div>
        <div class="video-card-title">${project.title}</div>
        <p class="video-card-desc">${project.description}</p>
      `;

      card.appendChild(video);
      card.appendChild(overlay);

      // Click — open video modal
      card.addEventListener('click', () => openVideoModal(vid.src, project.title));

      grid.appendChild(card);
    });
  });
}

// ─── POSTER GRID ─────────────────────────────────────────────────────────────

function renderPosterGrid() {
  const grid = $('#poster-grid');
  if (!grid) return;

  const posterProject = DATA.projects.find(p => p.category === 'poster-design');
  if (!posterProject) return;

  posterProject.images.forEach((imgSrc, i) => {
    const card = el('div', ['poster-card', 'reveal-scale'], { style: `transition-delay: ${i * 0.1}s` });

    const img = lazyImg(imgSrc, `Symposium Poster ${i + 1}`);
    const overlay = el('div', ['poster-card-overlay']);
    overlay.innerHTML = `<div class="poster-expand-icon" aria-hidden="true">🔍</div>`;

    card.appendChild(img);
    card.appendChild(overlay);

    card.addEventListener('click', () => openLightbox(posterProject.images, posterProject.title, i));
    grid.appendChild(card);
  });
}

// ─── T-SHIRT GRID ────────────────────────────────────────────────────────────

function renderTshirtGrid() {
  const grid = $('#tshirt-grid');
  if (!grid) return;

  const tshirtProject = DATA.projects.find(p => p.category === 'tshirt-design');
  if (!tshirtProject) return;

  tshirtProject.images.forEach((imgSrc, i) => {
    const card = el('div', ['tshirt-card', 'reveal-scale'], { style: `transition-delay: ${i * 0.1}s` });

    const imgWrap = el('div', ['tshirt-card-image']);
    const img = lazyImg(imgSrc, `T-Shirt Design ${i + 1}`);
    imgWrap.appendChild(img);

    const meta = el('div', ['tshirt-card-meta']);
    meta.innerHTML = `
      <div class="tshirt-card-label">Design</div>
      <div class="tshirt-card-num">#${String(i + 1).padStart(2, '0')}</div>
    `;

    card.appendChild(imgWrap);
    card.appendChild(meta);

    card.addEventListener('click', () => openLightbox(tshirtProject.images, tshirtProject.title, i));
    grid.appendChild(card);
  });
}

// ─── PERSONAL WORKS ──────────────────────────────────────────────────────────

function renderPersonalWorks() {
  const grid = $('#personal-grid');
  if (!grid) return;

  const personalProjects = DATA.projects.filter(p => p.category === 'personal');

  personalProjects.forEach((project, pi) => {
    const card = createProjectCard(project, pi);
    card.classList.add('reveal');
    grid.appendChild(card);
  });
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────

function renderGallery() {
  const masonry = $('#gallery-masonry');
  if (!masonry) return;

  // Collect all images from all projects
  const allImages = [];
  DATA.projects.forEach(project => {
    if (project.images) {
      project.images.forEach(img => {
        allImages.push({ src: img, projectTitle: project.title });
      });
    }
  });

  allImages.forEach((item, i) => {
    const galleryItem = el('div', ['gallery-item', 'reveal-scale'], { style: `transition-delay: ${(i % 6) * 0.08}s` });
    const img = lazyImg(item.src, item.projectTitle);
    galleryItem.appendChild(img);

    galleryItem.addEventListener('click', () => {
      const allSrcs = allImages.map(x => x.src);
      openLightbox(allSrcs, 'Gallery', i);
    });

    masonry.appendChild(galleryItem);
  });
}

// ─── STATISTICS ──────────────────────────────────────────────────────────────

function renderStats() {
  const grid = $('#stats-grid');
  if (!grid) return;

  DATA.statistics.forEach((stat, i) => {
    const card = el('div', ['stats-card', 'reveal'], { style: `transition-delay: ${i * 0.15}s` });
    card.innerHTML = `
      <div class="stats-value" data-target="${stat.value}" data-suffix="${stat.suffix}">0</div>
      <div class="stats-label">${stat.label}</div>
    `;
    grid.appendChild(card);
  });
}

function initCounters() {
  const counters = $$('.stats-value[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    let start = 0;
    const duration = 1800;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        counter.textContent = target + suffix;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(start) + suffix;
      }
    }, stepDuration);
  });
}

// ─── INSTAGRAM ───────────────────────────────────────────────────────────────

function renderInstagram() {
  const wrap = $('#instagram-card-wrap');
  if (!wrap) return;

  const profile = DATA.profile;

  const card = el('div', ['instagram-card']);
  card.innerHTML = `
    <img class="instagram-icon lazy" data-src="${DATA.mediaRegistry.icons.instagram}"
         src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
         alt="Instagram" width="72" height="72" />
    <div class="instagram-handle">${profile.instagramHandle}</div>
    <p class="instagram-desc">
      Follow my creative journey on Instagram — where every edit, every design, and every visual story comes to life. Started as a passion page, now a growing creative outlet.
    </p>
    <a href="${profile.instagramUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">
      Follow on Instagram ↗
    </a>
  `;

  wrap.appendChild(card);
}

// ─── CONTACT METHODS ─────────────────────────────────────────────────────────

function renderContactMethods() {
  const container = $('#contact-methods');
  if (!container) return;

  DATA.profile.socialLinks.forEach(link => {
    const method = el('a', ['contact-method'], {
      href: link.url,
      ...(link.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})
    });
    method.innerHTML = `
      <img class="contact-method-icon lazy" data-src="${link.icon}"
           src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
           alt="${link.name}" width="40" height="40" />
      <div class="contact-method-details">
        <div class="contact-method-type">${link.name}</div>
        <div class="contact-method-value">${link.handle}</div>
      </div>
    `;
    container.appendChild(method);
  });
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function renderFooter() {
  const links = $('#footer-links');
  if (links) {
    DATA.navLinks.forEach(link => {
      const a = el('a', [], { href: link.href });
      a.textContent = link.label;
      links.appendChild(a);
    });
  }

  const yearEl = $('#footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────

function initCursor() {
  const dot = $('#cursor-dot');
  const ring = $('#cursor-ring');
  if (!dot || !ring) return;

  // Hide on touch devices
  if ('ontouchstart' in window) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  }, { passive: true });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverTargets = 'a, button, .project-card, .video-card, .poster-card, .tshirt-card, .gallery-item, .filter-btn, .skill-card, .timeline-content, .contact-method';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.add('hovering');
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.remove('hovering');
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────

function initScrollProgress() {
  const bar = $('#scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ─── INTERSECTION OBSERVER — REVEAL ──────────────────────────────────────────

function initReveal() {
  const targets = $$('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(t => observer.observe(t));
}

// ─── SKILL BAR ANIMATION ─────────────────────────────────────────────────────

function initSkillBars() {
  const bars = $$('.skill-bar[data-pct]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const pct = bar.dataset.pct;
        bar.style.width = pct + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}

// ─── VIDEO AUTOPLAY ON VISIBLE ────────────────────────────────────────────────

function initVideoAutoplay() {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (!video.dataset.src) return;

      if (entry.isIntersecting) {
        // Load the video source if not loaded
        if (!video.src || video.src === window.location.href) {
          const source = video.querySelector('source') || video;
          if (video.dataset.src) {
            video.src = video.dataset.src;
            video.load();
          }
        }
        video.muted = true;
        video.loop = true;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.3 });

  $$('.video-card video[data-src]').forEach(v => videoObserver.observe(v));
}

// ─── LAZY IMAGES ─────────────────────────────────────────────────────────────

function initLazyImages() {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
          imgObserver.unobserve(img);
        }
      }
    });
  }, { rootMargin: '200px' });

  $$('img.lazy').forEach(img => imgObserver.observe(img));
}

// Kick off lazy loading initially (also called after filter re-render)
document.addEventListener('DOMContentLoaded', () => {
  // Slight delay to ensure all render functions have run
  setTimeout(initLazyImages, 100);
});

// ─── COUNTERS (triggered by scroll) ──────────────────────────────────────────
// Note: initCounters is already called after loading screen; this re-hooks
// for any dynamically rendered stats
function initCountersOnScroll() {
  const statsSection = $('#statistics');
  if (!statsSection) return;

  let fired = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !fired) {
        fired = true;
        initCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(statsSection);
}

document.addEventListener('DOMContentLoaded', initCountersOnScroll);

// ─── BACK TO TOP ─────────────────────────────────────────────────────────────

function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────

let lightboxImages = [];
let lightboxIndex = 0;
let lightboxMode = 'images'; // 'images' | 'videos'
let lightboxProjectData = null;

function openLightbox(images, title = '', startIdx = 0) {
  lightboxImages = images;
  lightboxIndex = startIdx;
  lightboxProjectData = null;
  lightboxMode = 'images';

  const modal = $('#lightbox-modal');
  const titleEl = $('#lightbox-title');
  const tabsEl = $('#lightbox-tabs');

  if (titleEl) titleEl.textContent = title;
  if (tabsEl) tabsEl.innerHTML = '';
  if (modal) modal.classList.add('open');

  document.body.style.overflow = 'hidden';
  renderLightboxMedia();
}

function openLightboxMixed(project, startTab = 'images') {
  lightboxProjectData = project;
  lightboxMode = startTab;
  lightboxImages = startTab === 'images' ? project.images : project.videos.map(v => v.src);
  lightboxIndex = 0;

  const modal = $('#lightbox-modal');
  const titleEl = $('#lightbox-title');
  const tabsEl = $('#lightbox-tabs');

  if (titleEl) titleEl.textContent = project.title;
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Render tabs
  if (tabsEl && project.type === 'mixed') {
    tabsEl.innerHTML = '';
    ['images', 'videos'].forEach(tab => {
      const btn = el('button', ['lightbox-tab', ...(tab === startTab ? ['active'] : [])]);
      btn.textContent = tab.charAt(0).toUpperCase() + tab.slice(1);
      btn.addEventListener('click', () => {
        lightboxMode = tab;
        lightboxImages = tab === 'images' ? project.images : project.videos.map(v => v.src);
        lightboxIndex = 0;
        $$('.lightbox-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderLightboxMedia();
      });
      tabsEl.appendChild(btn);
    });
  }

  renderLightboxMedia();
}

function renderLightboxMedia() {
  const content = $('#lightbox-media-content');
  const counter = $('#lightbox-counter');
  if (!content) return;

  content.innerHTML = '';
  const src = lightboxImages[lightboxIndex];

  if (lightboxMode === 'videos') {
    const video = el('video', [], {
      src, controls: '', playsinline: '', controlslist: 'nodownload'
    });
    video.style.maxHeight = '75vh';
    video.style.maxWidth = '100%';
    video.style.borderRadius = '16px';
    content.appendChild(video);
    video.play().catch(() => {});
  } else {
    const img = el('img', [], { src, alt: 'Portfolio image' });
    img.style.maxHeight = '75vh';
    img.style.maxWidth = '100%';
    img.style.objectFit = 'contain';
    img.style.borderRadius = '16px';
    content.appendChild(img);
  }

  if (counter) counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
}

function closeLightbox() {
  const modal = $('#lightbox-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';

  // Pause any playing video
  $$('#lightbox-media-content video').forEach(v => v.pause());
}

function initLightbox() {
  const modal = $('#lightbox-modal');
  const closeBtn = $('#lightbox-close');
  const prevBtn = $('#lightbox-prev');
  const nextBtn = $('#lightbox-next');

  closeBtn?.addEventListener('click', closeLightbox);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  prevBtn?.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    renderLightboxMedia();
  });

  nextBtn?.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    renderLightboxMedia();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!$('#lightbox-modal')?.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') {
      lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
      renderLightboxMedia();
    } else if (e.key === 'ArrowRight') {
      lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
      renderLightboxMedia();
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // Touch swipe support
  let touchStartX = 0;
  modal?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal?.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
      } else {
        lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
      }
      renderLightboxMedia();
    }
  }, { passive: true });
}

// ─── VIDEO MODAL ─────────────────────────────────────────────────────────────

function openVideoModal(src, title = '') {
  const modal = $('#video-modal');
  const videoEl = $('#video-modal-player');
  const srcEl = $('#video-modal-src');

  if (!modal || !videoEl || !srcEl) return;

  srcEl.src = src;
  videoEl.load();
  videoEl.play().catch(() => {});

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = $('#video-modal');
  const videoEl = $('#video-modal-player');

  videoEl?.pause();
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

function initVideoModal() {
  const modal = $('#video-modal');
  const closeBtn = $('#video-modal-close');

  closeBtn?.addEventListener('click', closeVideoModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeVideoModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $('#video-modal')?.classList.contains('open')) {
      closeVideoModal();
    }
  });
}

// ─── CARD TILT EFFECT ────────────────────────────────────────────────────────

function initTilt() {
  const tiltTargets = $$('.project-card, .skill-card, .stats-card');

  tiltTargets.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ─── PAGE TRANSITION INIT ────────────────────────────────────────────────────

window.addEventListener('load', () => {
  // Final lazy image sweep after all resources
  initLazyImages();
  initReveal();
  initSkillBars();
});
