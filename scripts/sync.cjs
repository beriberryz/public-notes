const fs = require("fs-extra")
const path = require("path")
const fg = require("fast-glob")

// ======================
// YOUR VAULT PATH
// ======================
const VAULT_PATH = "/Users/kirstencarpio/second brain"

// ======================
// QUARTZ CONTENT FOLDER
// ======================
const OUTPUT_PATH = path.join(__dirname, "../content")

async function main() {
  console.log("\nSync started...")

  // DO NOT wipe entire content folder
  // Only manage our two folders safely
  const notesDir = path.join(OUTPUT_PATH, "notes")
  const attachmentsDir = path.join(OUTPUT_PATH, "attachments")

  await fs.ensureDir(notesDir)
  await fs.ensureDir(attachmentsDir)

  const markdownFiles = await fg("**/*.md", {
    cwd: VAULT_PATH,
    absolute: true,
  })

  console.log("Markdown files found:", markdownFiles.length)

  for (const file of markdownFiles) {
    const content = await fs.readFile(file, "utf8")

    // publish filter
    if (!content.includes("#publish")) continue

    const fileName = path.basename(file)

    // ======================
    // COPY NOTE → /notes
    // ======================
    const noteDest = path.join(notesDir, fileName)

    await fs.copy(file, noteDest)

    console.log("Copied note:", fileName)

    // ======================
    // COPY ATTACHMENTS
    // ======================
    const embedRegex = /!\[\[(.*?)\]\]/g
    const matches = [...content.matchAll(embedRegex)]

    for (const match of matches) {
      const embedName = match[1].split("|")[0].trim()

      const attachmentMatches = await fg(`**/${embedName}`, {
        cwd: VAULT_PATH,
        absolute: true,
      })

      for (const attachment of attachmentMatches) {
        const attachmentName = path.basename(attachment)

        const attachmentDest = path.join(
          attachmentsDir,
          attachmentName
        )

        await fs.copy(attachment, attachmentDest)

        console.log("  Copied attachment:", attachmentName)
      }
    }
  }

  console.log("\nSync complete.\n")
}

main()