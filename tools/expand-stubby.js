const fg = require("fast-glob");
const { exec } = require("child_process");

async function run() {
  try {
    const files = await fg(["mock-server/**/*.yaml"]);

    if (files.length === 0) {
      console.error("❌ No se encontraron archivos .yaml en mock-server/");
      process.exit(1);
    }

    const fileList = files.join(" ");
    const cmd = `stubby -w -d ${fileList}`;
    const child = exec(cmd);

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  } catch (err) {
    console.error("❌ Error ejecutando stubby:", err);
    process.exit(1);
  }
}

run();
