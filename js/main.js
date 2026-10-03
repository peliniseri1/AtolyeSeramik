/* Studio Atölye Seramik */

// ---- Contact settings: replace before launch ----
const CONFIG = {
  whatsapp: "905000000000",            // international format, digits only
  email: "atelier@example.com",
  n8nWebhook: ""                       // later: your n8n webhook URL; when set, commissions POST here
};

const root = document.documentElement;
root.classList.add("js");

/* ---------- language ---------- */
const LANG_KEY = "atolye-lang";
function readLang() {
  try { const v = localStorage.getItem(LANG_KEY); if (v === "tr" || v === "en") return v; } catch (e) {}
  return (navigator.language || "tr").toLowerCase().startsWith("tr") ? "tr" : "en";
}
function setLang(lang) {
  root.dataset.lang = lang;
  root.lang = lang;
  document.querySelectorAll("[data-set-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.setLang === lang)));
  document.querySelectorAll("[data-alt-" + lang + "]").forEach(img => { img.alt = img.dataset["alt" + cap(lang)]; });
  document.querySelectorAll("[data-ph-" + lang + "]").forEach(el => { el.placeholder = el.dataset["ph" + cap(lang)]; });
  document.title = lang === "tr"
    ? "Studio Atölye Seramik · El yapımı seramik, İstanbul"
    : "Studio Atölye Seramik · Handmade ceramics, Istanbul";
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  renderTile();
}
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
document.querySelectorAll("[data-set-lang]").forEach(b => b.addEventListener("click", () => setLang(b.dataset.setLang)));

/* ---------- photo plates: show pencilled placeholder until the photo exists ---------- */
document.querySelectorAll("[data-plate]").forEach(plate => {
  const imgs = [...plate.querySelectorAll("img")];
  const first = imgs[0];
  const markEmpty = () => plate.classList.add("is-empty");
  if (first.complete && first.naturalWidth === 0) markEmpty();
  first.addEventListener("error", markEmpty);
  first.addEventListener("load", () => plate.classList.remove("is-empty"));
  // a lazy image may never load before it scrolls in; check eagerly for the placeholder state
  if (first.loading === "lazy") {
    const probe = new Image();
    probe.onerror = markEmpty;
    probe.src = first.currentSrc || first.src;
  }
});

/* ---------- glaze dip on entry ---------- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion && "IntersectionObserver" in window) {
  const tiles = [...document.querySelectorAll(".tile:not(.tile--hero)")];
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.remove("is-waiting"); io.unobserve(e.target); }
    });
  }, { threshold: 0.18 });
  tiles.forEach(t => {
    const r = t.getBoundingClientRect();
    if (r.top > window.innerHeight) { t.classList.add("is-waiting"); io.observe(t); }
  });
}

/* ---------- lamp ---------- */
document.querySelectorAll("[data-lamp]").forEach(btn => {
  btn.addEventListener("click", () => {
    const tile = btn.closest("[data-lit]");
    const on = tile.dataset.lit !== "true";
    tile.dataset.lit = String(on);
    btn.setAttribute("aria-pressed", String(on));
  });
});

/* ---------- enquiries ---------- */
function waLink(text) { return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(text); }
function mailLink(subject, body) {
  return "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}
function lang() { return root.dataset.lang; }

document.querySelectorAll("[data-enquire]").forEach(a => {
  a.addEventListener("click", ev => {
    ev.preventDefault();
    const code = a.dataset.enquire;
    const piece = a.dataset["piece" + cap(lang())];
    const msg = lang() === "tr"
      ? (code === "visit" ? "Merhaba, atölyenizi ziyaret etmek için randevu almak istiyorum." : "Merhaba, " + piece + " (" + code + ") hakkında bilgi almak istiyorum.")
      : (code === "visit" ? "Hello, I would like to book a visit to your atelier." : "Hello, I would like to know more about " + piece + " (" + code + ").");
    window.open(waLink(msg), "_blank", "noopener");
  });
});
document.querySelectorAll("[data-contact]").forEach(a => {
  a.href = a.dataset.contact === "whatsapp" ? "https://wa.me/" + CONFIG.whatsapp : "mailto:" + CONFIG.email;
  if (a.dataset.contact === "whatsapp") { a.target = "_blank"; a.rel = "noopener"; }
});

/* ---------- commission questionnaire ---------- */
const form = document.getElementById("quiz");
const steps = [...form.querySelectorAll(".step[data-step]")].filter(s => s.dataset.step !== "done");
const doneStep = form.querySelector('[data-step="done"]');
const nextBtn = form.querySelector("[data-next]");
const backBtn = form.querySelector("[data-back]");
const stepNow = form.querySelector("[data-step-now]");
const errorBox = form.querySelector(".quiz__error");
const ctile = document.querySelector(".ctile");
let current = 0;
let code = null;

function chosen(name) { return form.querySelector('input[name="' + name + '"]:checked'); }
function label(input) { return input ? input.dataset[lang()] : ""; }

function renderTile() {
  if (!ctile) return;
  const set = (key, val) => { const el = ctile.querySelector('[data-ctile="' + key + '"]'); if (el.textContent !== val) el.textContent = val; };
  set("code", "K-" + (code || "??"));
  set("piece", label(chosen("piece")));
  set("motif", label(chosen("motif")));
  set("mood", label(chosen("mood")));
  set("occasion", label(chosen("occasion")));
  set("when", label(chosen("when")));
  const mood = chosen("mood");
  ctile.dataset.glaze = mood ? mood.dataset.glaze : "unglazed";
}

function stepValid(i) {
  const radios = steps[i].querySelector('input[type="radio"]');
  if (radios && !chosen(radios.name)) return false;
  return true;
}

function show(i) {
  current = i;
  steps.forEach((s, n) => { s.hidden = n !== i; });
  stepNow.textContent = String(i + 1);
  backBtn.hidden = i === 0;
  form.dataset.last = String(i === steps.length - 1);
  nextBtn.disabled = !stepValid(i);
  errorBox.hidden = true;
}

form.addEventListener("change", e => {
  if (e.target.name === "piece" && !code) code = String(Math.floor(10 + Math.random() * 89));
  renderTile();
  nextBtn.disabled = !stepValid(current);
});

nextBtn.addEventListener("click", () => {
  if (!stepValid(current)) return;
  if (current < steps.length - 1) {
    show(current + 1);
    steps[current].querySelector("legend").scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
    return;
  }
  const name = form.elements.name, contact = form.elements.contact;
  const missing = [name, contact].filter(f => !f.value.trim());
  [name, contact].forEach(f => f.setAttribute("aria-invalid", String(missing.includes(f))));
  if (missing.length) { errorBox.hidden = false; missing[0].focus(); return; }
  finish();
});
backBtn.addEventListener("click", () => show(Math.max(0, current - 1)));

function summary() {
  const tr = lang() === "tr";
  const note = form.elements.motifNote.value.trim();
  const lines = [
    (tr ? "Siparişe özel eser talebi" : "Commission request") + " · K-" + code,
    (tr ? "Eser: " : "Piece: ") + label(chosen("piece")),
    (tr ? "Hikâye: " : "Story: ") + label(chosen("motif")) + (note ? " · " + note : ""),
    (tr ? "Renk: " : "Colour: ") + label(chosen("mood")),
    (tr ? "Amaç: " : "Occasion: ") + label(chosen("occasion")),
    (tr ? "Zaman: " : "Timing: ") + label(chosen("when")),
    (tr ? "Ad: " : "Name: ") + form.elements.name.value.trim(),
    (tr ? "İletişim: " : "Contact: ") + form.elements.contact.value.trim()
  ];
  return lines.join("\n");
}

function payload() {
  return {
    code: "K-" + code, lang: lang(),
    piece: chosen("piece").value, motif: chosen("motif").value, motifNote: form.elements.motifNote.value.trim(),
    mood: chosen("mood").value, occasion: chosen("occasion").value, when: chosen("when").value,
    name: form.elements.name.value.trim(), contact: form.elements.contact.value.trim(),
    submittedAt: new Date().toISOString()
  };
}

function finish() {
  form.classList.add("is-done");
  steps.forEach(s => { s.hidden = true; });
  doneStep.hidden = false;
  doneStep.focus();
}

doneStep.addEventListener("click", async e => {
  const btn = e.target.closest("[data-send]");
  if (!btn) return;
  e.preventDefault();
  const text = summary();
  if (CONFIG.n8nWebhook) {
    try {
      await fetch(CONFIG.n8nWebhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ channel: btn.dataset.send, ...payload() }) });
    } catch (err) { /* the WhatsApp / email hand-off below still delivers the request */ }
  }
  if (btn.dataset.send === "whatsapp") window.open(waLink(text), "_blank", "noopener");
  else window.location.href = mailLink((lang() === "tr" ? "Siparişe özel eser · K-" : "Commission · K-") + code, text);
  doneStep.querySelector(".done__sent").hidden = false;
});

setLang(readLang());
show(0);
