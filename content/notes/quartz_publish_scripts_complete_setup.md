# Quartz Selective Publishing — FINAL Working Setup

This setup will:

- Keep ONE Obsidian vault
- Publish ONLY notes tagged `#publish`
- Automatically copy embedded attachments/images
- Keep private notes private
- Push automatically to GitHub
- Work with Quartz v4

---

# IMPORTANT

Your setup should look like this:

```text
Documents/
├── second-brain/          ← YOUR ACTUAL OBSIDIAN VAULT
│   ├── School/
│   ├── Personal/
│   ├── Attachments/
│   └── ...
│
└── public-notes/          ← QUARTZ
    ├── content/
    ├── scripts/
    └── ...
```

Your Quartz folder is:

```text
public-notes
```

Your actual notes/vault should NOT be inside Quartz.

---

# STEP 1 — Install packages

Open terminal INSIDE your Quartz folder:

```bash
cd ~/Documents/public-notes
```

Install dependencies:

```bash
npm install fast-glob fs-extra simple-git gray-matter
```

---

# STEP 2 — Create scripts folder

Inside `public-notes` create:

```text
scripts/
```

Inside that folder create:

```text
sync.cjs
publish.cjs
```

IMPORTANT:

Use `.cjs`
NOT `.js`

---

# STEP 3 — Paste this EXACT sync.cjs

Inside:

```text
scripts/sync.cjs
```

Paste this ENTIRE code:

```js
const fs = require("fs-extra")
const path = require("path")
const fg = require("fast-glob")
const matter = require("gray-matter")

// =====================================
// CHANGE THIS TO YOUR ACTUAL VAULT PATH
// =====================================

const VAULT_PATH = "/Users/kirstencarpio/second-brain"

// =====================================

const OUTPUT_PATH = path.join(__dirname, "../content")

async function main() {
  console.log("\nStarting sync...")
  console.log("Vault:", VAULT_PATH)
  console.log("Output:", OUTPUT_PATH)

  // clear old exported content
  await fs.emptyDir(OUTPUT_PATH)

  // find markdown files
  const markdownFiles = await fg("**/*.md", {
    cwd: VAULT_PATH,
    absolute: true,
  })

  console.log("Markdown files found:", markdownFiles.length)

  for (const file of markdownFiles) {
    const content = await fs.readFile(file, "utf8")

    // parse frontmatter
    const parsed = matter(content)

    // support BOTH inline #publish and properties tags
    const frontmatterTags = parsed.data.tags || []

    const hasPublishTag =
      content.includes("#publish") ||
      frontmatterTags.includes("publish")

    if (!hasPublishTag) continue

    const relativePath = path.relative(VAULT_PATH, file)

    const destination = path.join(
      OUTPUT_PATH,
      relativePath
    )

    await fs.ensureDir(path.dirname(destination))

    await fs.copy(file, destination)

    console.log("\nCopied note:", relativePath)

    // ==========================
    // COPY EMBEDDED ATTACHMENTS
    // ==========================

    const embedRegex = /!\[\[(.*?)\]\]/g

    const matches = [...content.matchAll(embedRegex)]

    for (const match of matches) {
      const embedName = match[1]
        .split("|")[0]
        .trim()

      const attachmentMatches = await fg(
        `**/${embedName}`,
        {
          cwd: VAULT_PATH,
          absolute: true,
        }
      )

      for (const attachment of attachmentMatches) {
        const relativeAttachment = path.relative(
          VAULT_PATH,
          attachment
        )

        const attachmentDestination = path.join(
          OUTPUT_PATH,
          relativeAttachment
        )

        await fs.ensureDir(
          path.dirname(attachmentDestination)
        )

        await fs.copy(
          attachment,
          attachmentDestination
        )

        console.log(
          "  Copied attachment:",
          relativeAttachment
        )
      }
    }
  }

  console.log("\nSync complete.\n")
}

main()
```

---

# STEP 4 — IMPORTANT: Change vault path

THIS LINE:

```js
const VAULT_PATH = "/Users/kirstencarpio/second-brain"
```

MUST point to your ACTUAL Obsidian vault.

NOT:

```text
public-notes
```

You can verify your vault path by:

1. Right click vault folder
2. Get Info
3. Copy path

OR in terminal:

```bash
pwd
```

inside your vault folder.

---

# STEP 5 — Create publish.cjs

Inside:

```text
scripts/publish.cjs
```

Paste this:

```js
const { execSync } = require("child_process")
const simpleGit = require("simple-git")

const git = simpleGit()

async function main() {
  console.log("\nRunning sync...")

  execSync("node scripts/sync.cjs", {
    stdio: "inherit",
  })

  console.log("\nBuilding Quartz...")

  execSync("npx quartz build", {
    stdio: "inherit",
  })

  console.log("\nGit add...")
  await git.add(".")

  console.log("Git commit...")

  try {
    await git.commit("Published notes update")
  } catch {
    console.log("Nothing new to commit")
  }

  console.log("Git push...")
  await git.push()

  console.log("\nPublish complete.\n")
}

main()
```

---

# STEP 6 — Update package.json

Open:

```text
package.json
```

Find:

```json
"scripts": {
```

Replace ONLY the scripts section with:

```json
"scripts": {
  "sync": "node scripts/sync.cjs",
  "publish": "node scripts/publish.cjs",
  "dev": "npx quartz serve"
},
```

---

# STEP 7 — Test the setup

Inside your Obsidian vault create a test note:

```md
#publish

Hello world

![[Pasted image 20260523.png]]
```

---

# STEP 8 — Run sync

Inside terminal INSIDE Quartz:

```bash
npm run sync
```

You should see something like:

```text
Starting sync...

Markdown files found: 120

Copied note: School/Test.md
Copied attachment: Attachments/Pasted image.png

Sync complete.
```

---

# STEP 9 — Check Quartz content folder

Inside:

```text
public-notes/content
```

You should now see:

- copied note
- copied attachments

---

# STEP 10 — Test Quartz locally

Run:

```bash
npm run dev
```

Open:

```text
http://localhost:8080
```

You should see your published note.

---

# STEP 11 — Connect GitHub

Inside Quartz folder:

```bash
git init
```

Create GitHub repo.

Then connect:

```bash
git remote add origin YOUR_REPO_URL
```

Then:

```bash
git add .
git commit -m "initial"
git push -u origin v4
```

---

# YOUR FINAL WORKFLOW

This is ALL you do now.

---

# HOW TO PUBLISH NOTES

## 1 — Write note normally

Anywhere in your vault.

Example:

```text
School/Biology/Week 3.md
```

---

## 2 — Add publish tag

Either:

```md
#publish
```

OR properties:

```yaml
---
tags:
  - publish
---
```

Both work.

---

## 3 — Use attachments normally

Example:

```md
![[Pasted image 20260523.png]]
```

No manual copying needed.

---

## 4 — Publish site

Inside Quartz terminal:

```bash
npm run publish
```

THAT'S IT.

---

# WHAT HAPPENS AUTOMATICALLY

`npm run publish` automatically:

1. Finds notes tagged `#publish`
2. Copies notes into Quartz/content
3. Copies embedded attachments
4. Builds Quartz website
5. Git commits changes
6. Pushes to GitHub
7. GitHub Pages updates website

---

# IMPORTANT SAFETY RULE

ONLY notes tagged:

```md
#publish
```

become public.

Everything else stays private automatically.

---

# IMPORTANT RECOMMENDATION

I strongly recommend:

- manually running `npm run publish`
- NOT auto-syncing on every save

Reason:

- safer
- fewer bugs
- better performance
- avoids Git spam
- avoids accidental publishing

This workflow is already extremely efficient.

