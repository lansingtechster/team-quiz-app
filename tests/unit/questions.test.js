// Unit tests for questions.js — the quiz question data.
//
// These tests make sure every question is set up correctly, so a typo
// in the data can't break the quiz for the whole team. If your pull
// request fails here, read the message — it tells you exactly which
// question needs fixing.

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

// questions.js is written for the browser: it puts the data on
// `window.quizConfig`. There is no browser here, so we give it a fake
// `window` object and run the file inside it.
function loadQuizConfig() {
  const code = fs.readFileSync(
    path.join(__dirname, "..", "..", "questions.js"),
    "utf8"
  );
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox, { filename: "questions.js" });
  return sandbox.window.quizConfig;
}

const quizConfig = loadQuizConfig();

test("questions.js publishes quizConfig on window", () => {
  assert.ok(quizConfig, "window.quizConfig was not set — did the file change?");
  assert.ok(
    Array.isArray(quizConfig.animalQuestions),
    "quizConfig.animalQuestions should be an array"
  );
});

test("QUESTIONS_PER_RUN is a positive number", () => {
  assert.equal(typeof quizConfig.QUESTIONS_PER_RUN, "number");
  assert.ok(quizConfig.QUESTIONS_PER_RUN > 0);
});

test("there are enough questions for one full quiz run", () => {
  assert.ok(
    quizConfig.animalQuestions.length >= quizConfig.QUESTIONS_PER_RUN,
    `Need at least ${quizConfig.QUESTIONS_PER_RUN} questions, ` +
      `found ${quizConfig.animalQuestions.length}`
  );
});

test("every question is complete and well-formed", () => {
  quizConfig.animalQuestions.forEach((item, index) => {
    const label = `Question ${index + 1} ("${item.question}")`;

    assert.equal(
      typeof item.question,
      "string",
      `${label}: "question" should be text`
    );
    assert.ok(
      item.question.trim().length > 0,
      `${label}: "question" should not be empty`
    );

    assert.ok(
      Array.isArray(item.options),
      `${label}: "options" should be a list`
    );
    assert.equal(
      item.options.length,
      4,
      `${label}: should have exactly 4 options, found ${item.options.length}`
    );

    const uniqueOptions = new Set(item.options);
    assert.equal(
      uniqueOptions.size,
      4,
      `${label}: options should all be different`
    );

    assert.ok(
      item.options.includes(item.answer),
      `${label}: the answer "${item.answer}" must be one of the options`
    );
  });
});

test("no two questions have the same text", () => {
  const seen = new Set();
  quizConfig.animalQuestions.forEach((item) => {
    assert.ok(
      !seen.has(item.question),
      `Duplicate question found: "${item.question}"`
    );
    seen.add(item.question);
  });
});
