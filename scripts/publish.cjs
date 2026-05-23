const { execSync } = require("child_process")
const simpleGit = require("simple-git")

const git = simpleGit()

async function main() {
  console.log("\nRunning sync...")

  execSync("node scripts/sync.cjs", {
    stdio: "inherit",
  })

  console.log("\nBuilding Quartz...")

  , {
    stdio: "inherit",
  }

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