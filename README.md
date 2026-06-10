# Team Quiz App — AI Builder Workshop 4

This is the **team's shared quiz app** for Workshop 4: Team Up. Everyone in the
class contributes features to this one app using branches and pull requests —
just like professional teams do.

**Live site:** [https://lansingtechstudio.org/team-quiz-app/](https://lansingtechstudio.org/team-quiz-app/)

## How this repo is different from your quiz-game fork

In Workshops 1–3 you worked on your own copy and pushed straight to it. This
repo belongs to the whole team, so **you can't push to it directly** — and
that's on purpose! Nobody's half-finished change should land in the shared app
without a review. Instead, your work arrives here through a **pull request**.

## The team workflow

1. **Fork this repo** — click **Fork** at the top right, just like Workshop 1.
   You now have your own copy at `https://github.com/<your-username>/team-quiz-app`.
2. **Open a Codespace on your fork** — **Code** → **Codespaces** → **Create
   codespace on main**.
3. **Create a feature branch** — in the Codespace terminal:

   ```bash
   git checkout -b my-feature-name
   ```

4. **Build your feature** — stay inside your assigned files:
   - New questions → `questions.js`
   - Visual redesign → `style.css`, `index.html`
   - New behavior (timer, scoring, animations) → `app.js`
5. **Commit and push your branch** to your fork:

   ```bash
   git add -A
   git commit -m "Describe your change"
   git push -u origin my-feature-name
   ```

6. **Open a pull request** — GitHub will show a "Compare & pull request"
   banner on your fork. Make sure the base is
   `Lansing-Tech-Studio/team-quiz-app` `main` and the head is your branch.
7. **Review a teammate's PR** — read their changes and leave at least one
   constructive comment.
8. **The instructor merges** approved PRs one at a time. After each merge,
   update your fork with the **Sync fork** button so you're building on the
   latest team code.

## If your PR has a merge conflict

That just means a teammate's merged change touched the same lines you did.
Click **Resolve conflicts** on your PR, pick what to keep, and commit. Ask the
instructor if you get stuck — conflicts are normal, not a mistake.

## What's in this repo

- `index.html` — page structure
- `style.css` — styling
- `questions.js` — quiz question data
- `app.js` — game logic
- `.devcontainer/devcontainer.json` — Codespace setup (Copilot, Live Preview,
  Playwright MCP)
- `.vscode/mcp.json` — Playwright MCP config so AI can "see" the app

Have fun, and remember: **say what you mean, check what you get.**
