// Unit tests for index.html — the page structure.
//
// app.js finds elements on the page by their id (like "start-btn").
// If a redesign removes or renames one of those ids, the quiz breaks
// even though the new page might look great. These tests catch that
// before the change reaches the team.

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(
  path.join(__dirname, "..", "..", "index.html"),
  "utf8"
);

// Every id that app.js looks up with document.getElementById()
const REQUIRED_IDS = [
  "start-screen",
  "quiz-screen",
  "result-screen",
  "start-btn",
  "next-btn",
  "restart-btn",
  "progress",
  "score",
  "question-text",
  "answers",
  "feedback",
  "result-score",
  "result-text",
];

test("index.html keeps every element id that app.js needs", () => {
  REQUIRED_IDS.forEach((id) => {
    assert.ok(
      html.includes(`id="${id}"`),
      `index.html is missing id="${id}" — app.js needs it to run`
    );
  });
});

test("questions.js loads before app.js", () => {
  const questionsAt = html.indexOf('src="questions.js"');
  const appAt = html.indexOf('src="app.js"');

  assert.ok(questionsAt !== -1, "index.html should load questions.js");
  assert.ok(appAt !== -1, "index.html should load app.js");
  assert.ok(
    questionsAt < appAt,
    "questions.js must load before app.js, " +
      "because app.js reads window.quizConfig as soon as it starts"
  );
});
