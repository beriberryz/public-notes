const { execSync } = require("child_process")

function run(cmd) {
  console.log("\n>", cmd)
  execSync(cmd, { stdio: "inherit" })
}

async function main() {
  console.log("Running sync...")
  run("node scripts/sync.cjs")

  console.log("Adding files...")
  run("git add -A")

  console.log("Committing...")
  run('git commit -m "update notes" || echo "nothing to commit"')

  console.log("Pushing...")
  run("git push origin v4")

  console.log("Done.")
}

main()