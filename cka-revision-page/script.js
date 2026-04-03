function scrollToSection(id) {
  var section = document.getElementById(id);
  if (!section) return;

  var main = document.getElementById('main');
  var rect = section.getBoundingClientRect();
  var mainRect = main.getBoundingClientRect();

  main.scrollTo({
    top: main.scrollTop + rect.top - mainRect.top - 20,
    behavior: 'smooth'
  });

  document.querySelectorAll('.nav-item').forEach(function (el) {
    el.classList.remove('active');
  });
  var clicked = document.querySelector('.nav-item[data-section="' + id + '"]');
  if (clicked) clicked.classList.add('active');
}

function isMobile() {
  return window.matchMedia('(max-width: 768px)').matches;
}

function openSidebar() {
  var hamburger = document.getElementById('hamburger');
  hamburger.classList.add('active');

  if (isMobile()) {
    document.body.classList.add('sidebar-open');
    document.body.classList.remove('sidebar-closed');
  } else {
    document.body.classList.remove('sidebar-closed');
  }
}

function closeSidebar() {
  var hamburger = document.getElementById('hamburger');
  hamburger.classList.remove('active');

  if (isMobile()) {
    document.body.classList.remove('sidebar-open');
  } else {
    document.body.classList.add('sidebar-closed');
  }
}

function toggleSidebar() {
  var hamburger = document.getElementById('hamburger');
  if (hamburger.classList.contains('active')) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var main = document.getElementById('main');
  var hamburger = document.getElementById('hamburger');
  var overlay = document.getElementById('sidebar-overlay');

  if (!isMobile()) {
    hamburger.classList.add('active');
  }

  hamburger.addEventListener('click', toggleSidebar);

  overlay.addEventListener('click', closeSidebar);

  document.querySelectorAll('.nav-item[data-section]').forEach(function (item) {
    item.addEventListener('click', function () {
      scrollToSection(this.getAttribute('data-section'));

      if (isMobile()) {
        closeSidebar();
      }
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var id = e.target.id;
        document.querySelectorAll('.nav-item').forEach(function (el) {
          el.classList.remove('active');
        });
        var active = document.querySelector('.nav-item[data-section="' + id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }, { root: main, threshold: 0.2 });

  document.querySelectorAll('.section').forEach(function (s) {
    observer.observe(s);
  });

  window.addEventListener('resize', function () {
    if (!isMobile()) {
      document.body.classList.remove('sidebar-open');
      if (!document.body.classList.contains('sidebar-closed')) {
        hamburger.classList.add('active');
      }
    } else {
      if (!document.body.classList.contains('sidebar-open')) {
        hamburger.classList.remove('active');
      }
    }
  });
});
