const fs = require("fs-extra")
const path = require("path")
const fg = require("fast-glob")

// ======================
// PATHS
// ======================
const VAULT_PATH = "/Users/kirstencarpio/second brain" // <-- your Obsidian vault
const OUTPUT_PATH = path.join(__dirname, "../content")

const NOTES_DIR = path.join(OUTPUT_PATH, "notes")
const ATTACHMENTS_DIR = path.join(OUTPUT_PATH, "attachments")

async function main() {
  console.log("\nSync started...")

  await fs.ensureDir(NOTES_DIR)
  await fs.ensureDir(ATTACHMENTS_DIR)

  const markdownFiles = await fg("**/*.md", {
    cwd: VAULT_PATH,
    absolute: true,
    ignore: [
      "**/node_modules/**",
      "**/content/**", // IMPORTANT: prevents self-copy loop
    ],
  })

  console.log("Markdown files found:", markdownFiles.length)

  for (const file of markdownFiles) {
    const content = await fs.readFile(file, "utf8")

    // ONLY publish tagged notes
    if (!content.includes("#publish")) continue

    const fileName = path.basename(file)
    const noteDest = path.join(NOTES_DIR, fileName)

    // Copy note
    await fs.copy(file, noteDest, {
      overwrite: true,
      errorOnExist: false,
    })

    console.log("Copied note:", fileName)

    // ======================
    // ATTACHMENTS (SAFE MODE)
    // ======================
    const embedRegex = /!\[\[(.*?)\]\]/g
    const matches = [...content.matchAll(embedRegex)]

    for (const match of matches) {
      const embedName = match[1].split("|")[0].trim()

      const attachmentMatches = await fg(`**/${embedName}`, {
        cwd: VAULT_PATH,
        absolute: true,
        ignore: [
          "**/content/**", // CRITICAL SAFETY RULE
        ],
      })

      for (const attachment of attachmentMatches) {
        const attachmentName = path.basename(attachment)
        const attachmentDest = path.join(ATTACHMENTS_DIR, attachmentName)

        // 🔥 HARD SAFETY CHECK (prevents your crash)
        const src = path.resolve(attachment)
        const dest = path.resolve(attachmentDest)

        if (src === dest) {
          console.log("Skipping self-copy:", attachmentName)
          continue
        }

        await fs.copy(attachment, attachmentDest, {
          overwrite: true,
        })

        console.log("  Copied attachment:", attachmentName)
      }
    }
  }

  console.log("\nSync complete.\n")
}

main()