# Push this project to dprimenko/goveo-design-system

The empty repo exists at https://github.com/dprimenko/goveo-design-system.git.
These are the one-time commands to populate it from this working copy.

## 1 · Verify the remote

```bash
# inside this project folder
git remote -v
```

If you see no remote, add it:

```bash
git remote add origin https://github.com/dprimenko/goveo-design-system.git
```

If a different remote is already set (e.g. an Omelette upload origin), replace it:

```bash
git remote set-url origin https://github.com/dprimenko/goveo-design-system.git
```

## 2 · Replace the README (optional)

The current `README.md` is the design rationale (kept on purpose). For the
GitHub landing, I recommend swapping the top of the file:

```bash
mv README.md DESIGN_RATIONALE.md
mv REPO_README.md README.md
```

`REPO_README.md` documents the repo structure + how `goveo-expo` should
consume it. `DESIGN_RATIONALE.md` stays as the long-form brand/voice
explanation, linked from the top of the new README.

If you'd rather keep one README, you can manually paste the integration
sections from `REPO_README.md` into the top of `README.md`.

## 3 · First commit + push

```bash
git add -A
git commit -m "feat: initial design system (v1.1.0) — tokens, components, handoff"
git branch -M main
git push -u origin main
```

## 4 · Tag the release

```bash
git tag -a v1.2.0 -m "v1.2.0 — brand theming (Goveo + Ibiza)"
git push origin v1.2.0
```

## 5 · Wire goveo-expo

In a separate terminal, in your goveo-expo working copy:

```bash
cd ~/code/goveo-expo   # (or wherever)
git submodule add https://github.com/dprimenko/goveo-design-system.git design-system
git submodule update --init --recursive
git commit -m "chore: add goveo-design-system as a submodule"
```

Then point npm at the local copy:

```bash
# in goveo-expo/package.json
"dependencies": {
  ...
  "@goveo/design-tokens": "file:./design-system/export"
}
```

```bash
npm install
```

## 6 · Trigger Claude Code

In goveo-expo:

```bash
claude
```

Inside Claude Code:

> Read `design-system/design_handoff/CLAUDE.md` and apply the changes in `design-system/design_handoff/HANDOFF.md`. Show the diff before writing any file.

Claude Code does the rest.

---

## Future syncs (after the first push)

When this repo gets new tokens or components:

```bash
# from this design-system project
git add -A && git commit -m "feat: brand theming — Goveo + Ibiza (v1.2.0)"
git push
git tag v1.2.0 && git push origin v1.2.0

# from goveo-expo
cd design-system && git pull && cd ..
npm install   # in case package.json changed in the submodule
claude        # re-apply HANDOFF.md
```

That's the steady state.
