import { buildActivity } from "../core/activity.js";

const escapeAttribute = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

export function renderPanel(page, currentSettings, onChange = () => {}) {
  const settings = buildActivity(currentSettings);

  page.innerHTML = `
    <style>
      .ap-wrap { padding: 18px; color: var(--primary-text-color, #e8e8e8); font-family: sans-serif; }
      .ap-heading { font-size: 22px; font-weight: 700; margin: 0 0 5px; }
      .ap-subtitle { color: var(--secondary-text-color, #999); font-size: 13px; margin: 0 0 20px; }
      .ap-card { border: 1px solid var(--border-color, #444); border-radius: 14px; padding: 14px; margin-bottom: 16px; }
      .ap-label { display: block; font-size: 12px; color: var(--secondary-text-color, #aaa); margin: 12px 0 6px; }
      .ap-input { box-sizing: border-box; width: 100%; padding: 11px 12px; border: 1px solid var(--border-color, #555); border-radius: 9px; background: var(--secondary-background-color, #202020); color: inherit; font: inherit; }
      .ap-preview-title { font-size: 12px; color: var(--secondary-text-color, #aaa); margin-bottom: 10px; }
      .ap-preview-main { font-weight: 700; margin-bottom: 5px; overflow-wrap: anywhere; }
      .ap-preview-line { color: var(--secondary-text-color, #aaa); font-size: 13px; margin-top: 4px; overflow-wrap: anywhere; }
      .ap-note { font-size: 12px; line-height: 1.5; color: var(--secondary-text-color, #aaa); }
    </style>
    <section class="ap-wrap">
      <h1 class="ap-heading">Acode Presence</h1>
      <p class="ap-subtitle">Customize your activity preview.</p>

      <div class="ap-card">
        <div class="ap-preview-title">LIVE PREVIEW · LOCAL ONLY</div>
        <div class="ap-preview-main" id="ap-preview-details"></div>
        <div class="ap-preview-line" id="ap-preview-state"></div>
        <div class="ap-preview-line" id="ap-preview-project"></div>
        <div class="ap-preview-line" id="ap-preview-language"></div>
      </div>

      <div class="ap-card">
        <label class="ap-label" for="ap-details">Activity details</label>
        <input class="ap-input" id="ap-details" data-setting="details" maxlength="128" value="${escapeAttribute(settings.details)}">

        <label class="ap-label" for="ap-state">Activity state</label>
        <input class="ap-input" id="ap-state" data-setting="state" maxlength="128" value="${escapeAttribute(settings.state)}">

        <label class="ap-label" for="ap-project">Project name</label>
        <input class="ap-input" id="ap-project" data-setting="project" maxlength="64" value="${escapeAttribute(settings.project)}">

        <label class="ap-label" for="ap-language">Language</label>
        <input class="ap-input" id="ap-language" data-setting="language" maxlength="32" value="${escapeAttribute(settings.language)}">
      </div>

      <p class="ap-note">This is a local preview only. Discord connection and publishing will be implemented in a later milestone.</p>
    </section>
  `;

  const readSettings = () => {
    const next = {};
    page.querySelectorAll("[data-setting]").forEach((input) => {
      next[input.dataset.setting] = input.value;
    });
    return buildActivity(next);
  };

  const updatePreview = () => {
    const activity = readSettings();
    page.querySelector("#ap-preview-details").textContent = activity.details || "Activity details";
    page.querySelector("#ap-preview-state").textContent = activity.state || "Activity state";
    page.querySelector("#ap-preview-project").textContent = activity.project ? `Project: ${activity.project}` : "";
    page.querySelector("#ap-preview-language").textContent = activity.language ? `Language: ${activity.language}` : "";
    onChange(activity);
  };

  page.querySelectorAll("[data-setting]").forEach((input) => {
    input.addEventListener("input", updatePreview);
  });

  updatePreview();
}
