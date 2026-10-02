const { chromium } = require(process.env.PW);
const smooth = require("fs").readFileSync(__dirname + "/smooth.js", "utf8");
(async () => {
  const dir = process.argv[2];
  const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
  const p = await b.newPage({ viewport: { width: 1100, height: 100 }, deviceScaleFactor: 2 });
  const css = ["Regular","Medium","SemiBold","Bold"].map((w,i)=>`@font-face{font-family:Pretendard;font-weight:${[400,500,600,700][i]};src:url(file://${dir}/Pretendard-${w}.woff2)}`).join("");
  for (const n of process.argv.slice(3)) {
    await p.goto(`file://${process.cwd()}/out/index.html?scene=${n}`);
    await p.addStyleTag({ content: css });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.evaluate(smooth);
    await (await p.$("#root > div")).screenshot({ path: `out/scene${n}.png` });
  }
  await b.close();
})();
