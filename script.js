const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const form = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");
const submitQuote = document.querySelector("[data-submit-quote]");
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

function setFormMessage(message, isSuccess = false) {
  formNote.textContent = message;
  formNote.classList.toggle("is-success", isSuccess);
}

function buildQuotePayload() {
  const rawData = new FormData(form);
  const payload = new URLSearchParams();

  payload.append("name", rawData.get("name") || "");
  payload.append("contact", rawData.get("contact") || "");
  payload.append("address", rawData.get("address") || "");
  payload.append("bill", rawData.get("bill") || "");
  payload.append("roof_type", rawData.get("need") || "");
  payload.append("message", rawData.get("message") || "");
  payload.append("_subject", rawData.get("_subject") || "New Dazzler Renewables quote request");
  payload.append("source", rawData.get("source") || "Dazzler Renewables website");

  return payload;
}

async function submitQuoteRequest() {
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  submitQuote.disabled = true;
  submitQuote.textContent = "Sending...";
  setFormMessage("Sending your quote request...");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: buildQuotePayload().toString(),
    });

    if (!response.ok) throw new Error("Formspree submission failed");

    form.reset();
    setFormMessage("Thanks. Your quote request was sent and our Alberta solar team will follow up.", true);
  } catch (error) {
    setFormMessage("Sorry, the request could not be sent. Please email info@dazzlerrenewables.com directly.");
  } finally {
    submitQuote.disabled = false;
    submitQuote.textContent = "Request Free Quote";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitQuoteRequest();
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
