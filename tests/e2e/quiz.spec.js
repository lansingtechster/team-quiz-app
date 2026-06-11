// End-to-end tests for the Animal Adventure Quiz.
//
// These tests open the quiz in a real browser and click through it just
// like a player would. They read the question data from the page itself
// (window.quizConfig), so they keep working when the team adds new
// questions or changes the styling — they only fail if the quiz itself
// stops working.

const { test, expect } = require("@playwright/test");

// Ask the page which option is the right answer for the question
// currently on screen.
async function correctAnswerFor(page) {
  const questionText = await page.locator("#question-text").textContent();
  return page.evaluate((text) => {
    const match = window.quizConfig.animalQuestions.find(
      (item) => item.question === text
    );
    return match ? match.answer : null;
  }, questionText);
}

async function questionsPerRun(page) {
  return page.evaluate(() => window.quizConfig.QUESTIONS_PER_RUN);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("start screen shows first, quiz and results stay hidden", async ({
  page,
}) => {
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("#start-btn")).toBeVisible();
  await expect(page.locator("#quiz-screen")).toBeHidden();
  await expect(page.locator("#result-screen")).toBeHidden();
});

test("starting the quiz shows question 1 with four answers", async ({
  page,
}) => {
  await page.locator("#start-btn").click();

  const perRun = await questionsPerRun(page);
  await expect(page.locator("#start-screen")).toBeHidden();
  await expect(page.locator("#quiz-screen")).toBeVisible();
  await expect(page.locator("#progress")).toHaveText(
    `Question 1 of ${perRun}`
  );
  await expect(page.locator("#score")).toHaveText("Score: 0");
  await expect(page.locator("#question-text")).not.toBeEmpty();
  await expect(page.locator("#answers button")).toHaveCount(4);
});

test("a correct answer earns a point and friendly feedback", async ({
  page,
}) => {
  await page.locator("#start-btn").click();

  const answer = await correctAnswerFor(page);
  expect(answer, "question on screen should exist in quizConfig").not.toBeNull();

  await page.locator("#answers button", { hasText: answer }).first().click();

  await expect(page.locator("#feedback")).toHaveText("Correct! Great job!");
  await expect(page.locator("#score")).toHaveText("Score: 1");
  await expect(page.locator("#next-btn")).toBeVisible();
});

test("a wrong answer reveals the correct one and locks the buttons", async ({
  page,
}) => {
  await page.locator("#start-btn").click();

  const answer = await correctAnswerFor(page);
  const wrongButton = page
    .locator("#answers button")
    .filter({ hasNotText: answer })
    .first();
  await wrongButton.click();

  await expect(page.locator("#feedback")).toContainText(
    `The correct answer is ${answer}`
  );
  await expect(page.locator("#score")).toHaveText("Score: 0");

  const buttons = page.locator("#answers button");
  for (const button of await buttons.all()) {
    await expect(button).toBeDisabled();
  }
});

test("playing every question shows the final score", async ({ page }) => {
  await page.locator("#start-btn").click();
  const perRun = await questionsPerRun(page);

  for (let i = 0; i < perRun; i += 1) {
    const answer = await correctAnswerFor(page);
    await page.locator("#answers button", { hasText: answer }).first().click();
    await page.locator("#next-btn").click();
  }

  await expect(page.locator("#quiz-screen")).toBeHidden();
  await expect(page.locator("#result-screen")).toBeVisible();
  await expect(page.locator("#result-score")).toHaveText(
    `${perRun} / ${perRun}`
  );
  await expect(page.locator("#result-text")).toContainText("100%");
});

test("Play Again restarts at question 1 with a fresh score", async ({
  page,
}) => {
  await page.locator("#start-btn").click();
  const perRun = await questionsPerRun(page);

  for (let i = 0; i < perRun; i += 1) {
    const answer = await correctAnswerFor(page);
    await page.locator("#answers button", { hasText: answer }).first().click();
    await page.locator("#next-btn").click();
  }

  await page.locator("#restart-btn").click();

  await expect(page.locator("#result-screen")).toBeHidden();
  await expect(page.locator("#quiz-screen")).toBeVisible();
  await expect(page.locator("#progress")).toHaveText(
    `Question 1 of ${perRun}`
  );
  await expect(page.locator("#score")).toHaveText("Score: 0");
});
