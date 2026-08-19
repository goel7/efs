# EFS Tools — project context

Static site of tools & calculators for **Egg Farm Simulator (EFS)**. Vanilla
HTML/CSS/JS — **no framework, no bundler, no npm build step**. Just files served
as-is.

## Deployment topology (important)

Two hosts serve this repo, from **different branches** on purpose:

| Host | URL | Branch | Behavior |
| --- | --- | --- | --- |
| **Vercel** (primary) | `efstools.vercel.app` (alias `efs-optimizer.vercel.app`) | `main` | Auto-deploys on every push to `main`. This is the live site. |
| **GitHub Pages** (legacy) | `goel7.github.io/efs-optimizer/` | `github-pages` | **Frozen.** Only changes if you explicitly push to the `github-pages` branch. |

- **Do all normal work on `main`.** Pushing to `main` updates Vercel only; GitHub
  Pages stays frozen.
- The `github-pages` branch is a deliberate snapshot kept behind. Eventually it will
  get a "site has moved → efstools.vercel.app" redirect. Don't touch it unless that's
  the intent.
- Vercel PRs get an auto preview deploy (`efstools-git-<branch>-...vercel.app`). Its
  URL is posted as a bot comment on the PR.

## Git / remote

- Remote `origin` = `https://github.com/goel7/efs-optimizer.git` (repo was renamed
  from `efs`; old URLs redirect).
- Default branch: `main`. Conventional commits (`feat:`, `fix:`, `chore:`,
  `refactor:`).
- `.env.local` (Vercel OIDC token) is git-ignored — never commit it.

## Structure

- `index.html` — home page / **tool hub**. A responsive card grid; designed to grow
  to many tools. Add a tool by copy-pasting one `.tool-card` block (see the comment
  marker in the grid).
- `styles.css` — **single shared stylesheet** for the whole site. All design tokens
  are CSS variables (colors, ~8px spacing scale, radius, max-width). Any new tool page
  just links this file (`../styles.css` from a subfolder) and inherits the look.
- `BE-Allocation/` — Black Egg Allocation calculator (`allocateBE.html` + `.js`).
  Computes optimal Easter Egg setup from a Black Egg total.
- `MaxLevel/` — an in-progress Max Level calc. Not linked from home yet; the JS
  bottom section is scratch/experimental.

## Design system

Flat and simple — **no gradients, no heavy shadows, no decorative animations.** Warm
off-white background, white cards with 1px soft borders, near-black + muted text, a
single muted-gold accent (darkened where needed for WCAG AA), system font stack.
Responsive (mobile-first), real `<label>`s tied to inputs, visible focus states.

## Calculator constraints (BE-Allocation)

- **Do not change the calculation logic** in `allocateBE.js` — outputs must stay
  identical. If restructuring markup, preserve every element ID, input, event binding,
  and the `#miscEggsHelp` / `#mainEggsHelp` help anchors.
- IDs the JS depends on: `totalBE`, `optMisc`, `waterLvl`, `EnterBtn`, `results`,
  `miscLevel`, `mainLevel`, `turtleLevel`, `GKLevel`, `miscEggsHelp`, `mainEggsHelp`.
- Inputs are `type="text"` on purpose — the parser accepts suffixed/scientific values
  like `5k`, `5B`, `5s`, `45e87`. Plain integers like `5000` (no suffix, no `e`) are
  **not** supported by design — leave this as-is.
