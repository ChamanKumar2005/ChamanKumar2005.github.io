/* === CUSTOM CURSOR === */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top  = my + 'px';
});

(function animateCursor() {
  cx += (mx - cx) * 0.11;
  cy += (my - cy) * 0.11;
  cursor.style.left = cx + 'px';
  cursor.style.top  = cy + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a,button,.proj-card,.cert-card,.edu-card,.contact-card,.btn,.skill-group').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1.7)';
    cursor.style.background = 'rgba(139,92,246,0.12)';
    cursor.style.borderColor = 'var(--purple-l)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'transparent';
    cursor.style.borderColor = 'var(--purple)';
  });
});

/* === SCROLL REVEAL === */
const selectors = [
  '.hero-text','.hero-photo-col',
  '.about-left','.about-right',
  '.skill-group','.proj-card','.cert-card','.contact-card',
  '.achievement','.edu-card',
];
selectors.forEach(s => document.querySelectorAll(s).forEach(el => el.classList.add('reveal')));

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), 60);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 6) * 80 + 'ms';
  obs.observe(el);
});

/* === TYPEWRITER === */
const roles = [
  'DSA Enthusiast · Competitive Programmer',
  '500+ Problems Solved · Strong in Optimization',
  'Open to Internships 🚀',
];
const target = document.getElementById('typeTarget');
let rIdx = 0, cIdx = 0, deleting = false;

function type() {
  const cur = roles[rIdx];
  target.textContent = cur.slice(0, cIdx + (deleting ? 0 : 1));
  if (!deleting) {
    cIdx++;
    if (cIdx === cur.length) { deleting = true; setTimeout(type, 2200); return; }
    setTimeout(type, 40);
  } else {
    cIdx--;
    target.textContent = cur.slice(0, cIdx);
    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
    setTimeout(type, 20);
  }
}
setTimeout(type, 900);

/* === ACTIVE NAV === */
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navAs.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + id ? 'var(--purple-l)' : '';
      });
    }
  });
}, { threshold: 0.45 }).observe && sections.forEach(s =>
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--purple-l)' : '';
        });
      }
    });
  }, { threshold: 0.45 }).observe(s)
);

/* === SMOOTH NAV === */
navAs.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* === PHOTO TILT === */
const pw = document.querySelector('.photo-frame');
if (pw) {
  pw.addEventListener('mousemove', e => {
    const r = pw.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) / (r.width/2);
    const y = (e.clientY - r.top - r.height/2) / (r.height/2);
    pw.style.transform = `perspective(600px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`;
  });
  pw.addEventListener('mouseleave', () => {
    pw.style.transform = 'perspective(600px) rotateY(0) rotateX(0)';
  });
}

/* === CONSOLE EASTER EGG === */
console.log(
  '%c Chaman Kumar | Portfolio \n%c B.Tech CSE (AI & ML)\n%c kchaman441@gmail.com | +91 6201608694',
  'color:#a78bfa;font-size:16px;font-weight:bold;',
  'color:#8b88b0;font-size:12px;',
  'color:#22d3ee;font-size:12px;'
);

const input = document.getElementById("photoInput");
const preview = document.getElementById("profilePreview");
const text = document.getElementById("uploadText");

input.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
      text.style.display = "none";
    };

    reader.readAsDataURL(file);
  }
});

document.addEventListener("DOMContentLoaded", function () {

  const input = document.getElementById("photoInput");
  const preview = document.getElementById("profilePreview");
  const text = document.getElementById("uploadText");

  // 🔥 Load saved image
  const savedImage = localStorage.getItem("profileImage");
  if (savedImage) {
  preview.src = savedImage;
  preview.style.display = "block";
  text.style.display = "none";
} else {
  // 👇 fallback to default image
  preview.src = "Spideyy.jpg";
  preview.style.display = "block";
}

  // 🔥 Handle upload
  input.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageData = e.target.result;

        preview.src = imageData;
        preview.style.display = "block";
        text.style.display = "none";

        // ✅ Save permanently
        localStorage.setItem("profileImage", imageData);
      };

      reader.readAsDataURL(file);
    }
  });

});
