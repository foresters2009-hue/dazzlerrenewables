const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const form = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");
const videoLightbox = document.querySelector("[data-video-lightbox]");
const videoPlayer = document.querySelector("[data-video-player]");
const videoHeading = document.querySelector("[data-video-heading]");
const videoClose = document.querySelector("[data-video-close]");

function syncHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  header.classList.toggle("is-open", isOpen);
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName !== "A") return;
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.textContent = "Thanks. Our technical solar team will review the details and follow up with your estimate.";
  formNote.classList.add("is-success");
});

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-video-src]");
  if (!trigger) return;

  videoHeading.textContent = trigger.dataset.videoTitle || "Project video";
  videoPlayer.src = trigger.dataset.videoSrc;
  videoLightbox.hidden = false;
  videoPlayer.play().catch(() => {});
});

function closeVideo() {
  videoPlayer.pause();
  videoPlayer.removeAttribute("src");
  videoPlayer.load();
  videoLightbox.hidden = true;
}

videoClose.addEventListener("click", closeVideo);
videoLightbox.addEventListener("click", (event) => {
  if (event.target === videoLightbox) closeVideo();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !videoLightbox.hidden) closeVideo();
});
