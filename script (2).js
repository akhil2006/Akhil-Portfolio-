/* =====================================================
   EDIT THESE: your real contact details
   ===================================================== */
const CONFIG = {
  email: "your.email@example.com",          // <- your email
  whatsapp: "919999999999",                 // <- country code + number, no + or spaces (91 = India)
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-profile"
};

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Social links ---------- */
document.getElementById("link-email").href = "mailto:" + CONFIG.email;
document.getElementById("link-github").href = CONFIG.github;
document.getElementById("link-linkedin").href = CONFIG.linkedin;

/* ---------- Typing effect ---------- */
const roles = [
  "Computer Science Engineering Student",
  "Blockchain Developer",
  "Python & Java Programmer"
];
const typed = document.getElementById("typed");
let r = 0, c = 0, deleting = false;
(function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) c++;
  else if (!deleting) { deleting = true; return setTimeout(type, 1400); }
  else if (c > 0) c--;
  else { deleting = false; r = (r + 1) % roles.length; }
  setTimeout(type, deleting ? 35 : 70);
})();

/* ---------- Skill bars animate on scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("go"); });
}, { threshold: 0.4 });
document.querySelectorAll(".bar").forEach(b => io.observe(b));

/* ---------- Contact modal ---------- */
const modal = document.getElementById("contactModal");
const openModal = () => { modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); };
const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); };

document.querySelectorAll("[data-open-contact]").forEach(b => b.addEventListener("click", openModal));
document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* Send via visitor's email app */
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("cName").value.trim();
  const email = document.getElementById("cEmail").value.trim();
  const msg = document.getElementById("cMsg").value.trim();
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(msg + "\n\n— " + name + " (" + email + ")");
  window.location.href = "mailto:" + CONFIG.email + "?subject=" + subject + "&body=" + body;
  closeModal();
});

/* Chat on WhatsApp */
document.getElementById("waBtn").addEventListener("click", () => {
  const name = document.getElementById("cName").value.trim() || "a visitor";
  const msg = document.getElementById("cMsg").value.trim() || "Hi Akhil, I saw your portfolio!";
  const text = encodeURIComponent("Hi Akhil, this is " + name + ". " + msg);
  window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + text, "_blank", "noopener");
});
