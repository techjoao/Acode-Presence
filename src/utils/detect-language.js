const LANGUAGE_BY_EXTENSION = {
  js: "JavaScript",
  mjs: "JavaScript",
  cjs: "JavaScript",
  ts: "TypeScript",
  tsx: "TypeScript React",
  jsx: "JavaScript React",
  py: "Python",
  cpp: "C++",
  cc: "C++",
  cxx: "C++",
  c: "C",
  h: "C/C++",
  hpp: "C++",
  java: "Java",
  kt: "Kotlin",
  kts: "Kotlin Script",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  json: "JSON",
  md: "Markdown",
  php: "PHP",
  rs: "Rust",
  go: "Go",
  sh: "Shell",
  xml: "XML",
  yaml: "YAML",
  yml: "YAML",
};

export function detectLanguage(filename = "") {
  const extension = String(filename).split(".").pop()?.toLowerCase();
  return LANGUAGE_BY_EXTENSION[extension] || "Plain text";
}
