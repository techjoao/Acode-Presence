export function buildActivity(settings = {}) {
  return {
    details: String(settings.details || "Editing a project").trim(),
    state: String(settings.state || "In Acode").trim(),
    project: String(settings.project || "").trim(),
    language: String(settings.language || "").trim(),
  };
}
