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

### Routing (`vercel.json`)

- `/` **redirects** (temporary/307) to `/eastereggs` — since there's only one tool,
  the root opens it directly instead of the home page.
- `/eastereggs` **rewrites** to `/BE-Allocation/allocateBE.html` — clean URL, the file
  path stays hidden. Because of this rewrite, `allocateBE.html` links its CSS/JS with
  **absolute** paths (`/BE-Allocation/...`), not relative — keep them absolute or they
  404 under `/eastereggs`.
- The home page still exists and is reachable at `/index.html`. The `/` → `/eastereggs`
  redirect exists only because there's currently one tool.

> **⚠️ When adding a new tool to this site: STOP and ask the user whether to remove the
> `/` → `/eastereggs` redirect in `vercel.json`, so the root (`efstools.vercel.app`)
> goes back to showing the home hub instead of jumping straight into the egg tool. Do
> not change or keep the redirect silently — confirm with the user first.**

## Git / remote

- Remote `origin` = `https://github.com/goel7/efs-optimizer.git` (repo was renamed
  from `efs`; old URLs redirect).
- Default branch: `main`. Conventional commits (`feat:`, `fix:`, `chore:`,
  `refactor:`).
- `.env.local` (Vercel OIDC token) is git-ignored — never commit it.

## Structure

Each page has its **own** stylesheet (no shared stylesheet — a `redesign/site-ui` PR
that introduced one was rejected and discarded).

- `index.html` — home page. Currently a simple heading + link list. Styled by
  `indexStyles.css`.
- `BE-Allocation/` — Black Egg Allocation calculator (`allocateBE.html` + `.js` +
  `allocateBE.css`). Computes optimal Easter Egg setup from a Black Egg total.
- `MaxLevel/` — an in-progress Max Level calc (`maxLevel.html` + `.js` + `.css`). Not
  linked from home yet; the JS bottom section is scratch/experimental.

## Calculator constraints (BE-Allocation)

- **Do not change the calculation logic** in `allocateBE.js` — outputs must stay
  identical. If restructuring markup, preserve every element ID, input, event binding,
  and the `#miscEggsHelp` / `#mainEggsHelp` help anchors.
- IDs the JS depends on: `totalBE`, `optMisc`, `waterLvl`, `EnterBtn`, `results`,
  `miscLevel`, `mainLevel`, `turtleLevel`, `GKLevel`, `miscEggsHelp`, `mainEggsHelp`.
- Inputs are `type="text"` on purpose — the parser accepts suffixed/scientific values
  like `5k`, `5B`, `5s`, `45e87`. Plain integers like `5000` (no suffix, no `e`) are
  **not** supported by design — leave this as-is.
