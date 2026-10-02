// Replaces plain CSS corner radii with Figma-style corner smoothing (0.6, Apple's squircle) via clip-path.
// Pills and circles (radius >= half the shorter side) are left alone: smoothing has nothing to add there.
(() => {
  const SMOOTHING = 0.6;
  const squircle = (width, height, radius, smoothing = SMOOTHING) => {
    const rad = (deg) => (deg * Math.PI) / 180;
    const budget = Math.min(width, height) / 2;
    const r = Math.min(radius, budget);
    const sm = Math.max(0, Math.min(smoothing, budget / r - 1));
    const p = Math.min((1 + sm) * r, budget);
    const arcMeasure = 90 * (1 - sm);
    const arc = Math.sin(rad(arcMeasure / 2)) * r * Math.SQRT2;
    const alpha = (90 - arcMeasure) / 2;
    const p3ToP4 = r * Math.tan(rad(alpha / 2));
    const beta = 45 * sm;
    const c = p3ToP4 * Math.cos(rad(beta));
    const d = c * Math.tan(rad(beta));
    const b = (p - arc - c - d) / 3;
    const a = 2 * b;
    return [
      `M ${width - p} 0`, `c ${a} 0 ${a + b} 0 ${a + b + c} ${d}`, `a ${r} ${r} 0 0 1 ${arc} ${arc}`, `c ${d} ${c} ${d} ${b + c} ${d} ${a + b + c}`,
      `L ${width} ${height - p}`, `c 0 ${a} 0 ${a + b} ${-d} ${a + b + c}`, `a ${r} ${r} 0 0 1 ${-arc} ${arc}`, `c ${-c} ${d} ${-(b + c)} ${d} ${-(a + b + c)} ${d}`,
      `L ${p} ${height}`, `c ${-a} 0 ${-(a + b)} 0 ${-(a + b + c)} ${-d}`, `a ${r} ${r} 0 0 1 ${-arc} ${-arc}`, `c ${-d} ${-c} ${-d} ${-(b + c)} ${-d} ${-(a + b + c)}`,
      `L 0 ${p}`, `c 0 ${-a} 0 ${-(a + b)} ${d} ${-(a + b + c)}`, `a ${r} ${r} 0 0 1 ${arc} ${-arc}`, `c ${c} ${-d} ${b + c} ${-d} ${a + b + c} ${-d}`, "Z",
    ].join(" ")
  }
  const targets = []
  document.querySelectorAll("#root *").forEach((el) => {
    const cs = getComputedStyle(el)
    const r = parseFloat(cs.borderTopLeftRadius)
    if (!(r > 0)) return
    const box = el.getBoundingClientRect()
    if (r >= Math.min(box.width, box.height) / 2 - 0.5) return
    targets.push([el, r, box.width, box.height, cs])
  })
  for (const [el, r, w, h, cs] of targets) {
    const bw = parseFloat(cs.borderTopWidth)
    el.style.borderRadius = "0"
    el.style.clipPath = `path('${squircle(w, h, r)}')`
    if (bw > 0) {
      // Draw the border as a ring: the border color fills the shape and an inset copy of the background covers its middle.
      const borderColor = cs.borderTopColor
      const fill = cs.backgroundColor === "rgba(0, 0, 0, 0)" ? "#ffffff" : cs.backgroundColor
      el.style.position = "relative"
      el.style.background = borderColor
      el.style.borderColor = "transparent"; el.style.boxShadow = "none"
      const inner = document.createElement("span")
      inner.style.cssText = `position:absolute;left:0;top:0;width:${w - 2 * bw}px;height:${h - 2 * bw}px;background:${fill};clip-path:path('${squircle(w - 2 * bw, h - 2 * bw, Math.max(r - bw, 0.5))}');pointer-events:none`
      el.insertBefore(inner, el.firstChild)
      for (const child of Array.from(el.children)) if (child !== inner) child.style.position = "relative"
    }
  }
})()
