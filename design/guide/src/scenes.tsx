import * as React from "react"
import { createRoot } from "react-dom/client"
import { AlertTriangle, Bell, Check, Heart, Search, Star, X } from "lucide-react"
import { colors, darkColors } from "palette"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { cn } from "./cn"

type Fam = keyof typeof colors
const hex = (f: Fam, s: number) => (colors[f] as Record<number, string>)[s]
const dhex = (f: Fam, s: number) => (darkColors[f] as Record<number, string>)[s]

function lum(h: string) {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}
const INK = colors["cool-gray"][900]
const WHITE = "#ffffff"

/** ✓ / ✕ / ⚠ result chip built from shadcn's Badge. */
function Result({ value, need, warn }: { value: number; need: number; warn?: boolean }) {
  const ok = value >= need
  const tone = ok ? ["green", "✓"] : warn ? ["yellow", "!"] : ["red", "✕"]
  const [bg, fg] = ok ? [hex("green", 100), hex("green", 800)] : warn ? [hex("yellow", 100), hex("yellow", 900)] : [hex("red", 100), hex("red", 800)]
  const Icon = ok ? Check : warn ? AlertTriangle : X
  return (
    <Badge className="h-6 px-2.5 text-[13px] font-semibold tabular-nums" style={{ background: bg, color: fg }}>
      <Icon className="!size-3.5" strokeWidth={3} />
      {value.toFixed(1)}:1
      <span className="sr-only">{tone[0]}</span>
    </Badge>
  )
}

const Cap = ({ children }: { children: React.ReactNode }) => <div className="text-[13px] font-medium text-muted-foreground">{children}</div>
const Name = ({ children }: { children: React.ReactNode }) => <div className="text-sm font-semibold text-foreground">{children}</div>

/** Rows × columns grid with a label column. */
function Grid({ cols, rows }: { cols: { name: string; cells: React.ReactNode[] }[]; rows: string[] }) {
  return (
    <div className="grid items-center gap-x-5 gap-y-4" style={{ gridTemplateColumns: `200px repeat(${cols.length}, 1fr)` }}>
      <div />
      {cols.map((c) => <Name key={c.name}>{c.name}</Name>)}
      {rows.map((r, i) => (
        <React.Fragment key={r}>
          <Cap>{r}</Cap>
          {cols.map((c) => <div key={c.name} className="flex flex-col items-start gap-2">{c.cells[i]}</div>)}
        </React.Fragment>
      ))}
    </div>
  )
}

const fill = (f: Fam, step: number, ink: string, label = "Save") => (
  <Button className="h-10 w-full justify-center border-0 font-semibold hover:opacity-100" style={{ background: hex(f, step), color: ink }}>{label}</Button>
)
const fillCell = (f: Fam, step: number, ink: string, need = 4.5, warn = false) => (
  <>
    {fill(f, step, ink)}
    <Result value={ratio(hex(f, step), ink)} need={need} warn={warn} />
  </>
)

function Scene1() {
  const fams: Fam[] = ["orange", "yellow", "light-green", "teal", "light-blue"]
  return <Grid rows={["Dark text", "White text"]} cols={fams.map((f) => ({ name: f + " 500", cells: [fillCell(f, 500, INK), fillCell(f, 500, WHITE)] }))} />
}
function Scene2() {
  const fams: Fam[] = ["pink", "red", "purple"]
  return <Grid rows={["500 + white text", "600 + white text"]} cols={fams.map((f) => ({ name: f, cells: [fillCell(f, 500, WHITE, 4.5, true), fillCell(f, 600, WHITE)] }))} />
}
const icons = [Bell, Star, Heart, Search]
function Scene3() {
  const fams: Fam[] = ["orange", "light-green", "teal", "light-blue"]
  const cell = (f: Fam, step: number, i: number) => {
    const Icon = icons[i]
    return (
      <>
        <Button variant="outline" size="icon" className="size-11 rounded-lg"><Icon className="!size-6" strokeWidth={2.2} style={{ color: hex(f, step) }} /></Button>
        <Result value={ratio(hex(f, step), WHITE)} need={4.5} warn />
      </>
    )
  }
  return <Grid rows={["500 icon", "600 icon"]} cols={fams.map((f, i) => ({ name: f, cells: [cell(f, 500, i), cell(f, 600, i)] }))} />
}
function Scene4() {
  const steps = [500, 700, 800, 900]
  const line = (s: number, bg: string) => (
    <div className="flex items-center gap-4">
      <Alert className="w-[270px] border-0 px-4 py-3" style={{ background: bg, color: hex("yellow", s) }}>
        <AlertTriangle />
        <AlertTitle className="font-semibold" style={{ color: hex("yellow", s) }}>Trial ends in 3 days</AlertTitle>
      </Alert>
      <Result value={ratio(hex("yellow", s), bg)} need={4.5} />
    </div>
  )
  return (
    <div className="grid grid-cols-[90px_1fr_1fr] items-center gap-x-4 gap-y-4">
      <div /><Name>On white</Name><Name>On yellow 100</Name>
      {steps.map((s) => (
        <React.Fragment key={s}>
          <Cap>yellow {s}</Cap>
          {line(s, WHITE)}
          {line(s, hex("yellow", 100))}
        </React.Fragment>
      ))}
    </div>
  )
}
function de(a: string, b: string) {
  const lin = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  const ok = ([r, g, b]: number[]) => {
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
    return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]
  }
  const [x, y] = [ok(lin(a)), ok(lin(b))]
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2])
}
function Scene5() {
  const pairs: [Fam, Fam][] = [["pink", "red"], ["light-blue", "blue"], ["teal", "light-blue"]]
  const chip = (f: Fam) => <Badge className="size-7 rounded-full p-0" style={{ background: hex(f, 100) }} />
  const dot = (f: Fam) => <Badge className="size-7 rounded-full p-0" style={{ background: hex(f, 500) }} />
  const full = (f: Fam, Icon: typeof Bell) => (
    <Badge className="h-7 gap-1.5 px-3 text-[13px] font-semibold" style={{ background: hex(f, 100), color: hex(f, 700) }}><Icon strokeWidth={2.6} />{f}</Badge>
  )
  const cols = pairs.map(([a, b], i) => {
    const Ia = [Bell, Star, Heart][i]
    const Ib = [Check, Search, X][i]
    return {
      name: `${a} / ${b}`,
      cells: [
        <div className="flex items-center gap-3">{chip(a)}{chip(b)}<span className="text-[13px] font-semibold tabular-nums text-muted-foreground">ΔE {de(hex(a, 100), hex(b, 100)).toFixed(3)}</span></div>,
        <div className="flex items-center gap-3">{dot(a)}{dot(b)}<span className="text-[13px] font-semibold tabular-nums text-muted-foreground">ΔE {de(hex(a, 500), hex(b, 500)).toFixed(3)}</span></div>,
        <div className="flex items-center gap-2">{full(a, Ia)}{full(b, Ib)}</div>,
      ],
    }
  })
  return <Grid rows={["100 tint only", "500 fill", "100 tint + 700 text and icon"]} cols={cols} />
}
function Scene6() {
  const panel = (dark: boolean) => {
    const fam: Fam = "blue"
    const [d, h] = dark ? [dhex(fam, 500), dhex(fam, 600)] : [hex(fam, 600), hex(fam, 700)]
    const ink = dark ? darkColors["cool-gray"][50] : WHITE
    const step = dark ? ["dark blue 500", "dark blue 600"] : ["blue 600", "blue 700"]
    const muted = dark ? "text-[var(--color-dark-cool-gray-700)]" : "text-muted-foreground"
    const btn = (label: string, bg: string, name: string) => (
      <div className="flex flex-col items-start gap-2">
        <Button className="h-10 border-0 px-5 font-semibold hover:opacity-100" style={{ background: bg, color: ink }}>{label}</Button>
        <div className={cn("text-[13px] font-medium", muted)}>{name}</div>
        <Result value={ratio(bg, ink)} need={4.5} />
      </div>
    )
    return (
      <div className={cn("flex flex-1 flex-col gap-5 rounded-2xl p-7", dark ? "bg-[var(--color-dark-cool-gray-50)]" : "")}>
        <div className={cn("text-sm font-semibold", dark ? "text-[var(--color-dark-cool-gray-900)]" : "text-foreground")}>{dark ? "Dark: one step lighter" : "Light: one step darker"}</div>
        <div className="flex gap-7">
          {btn("Default", d, step[0])}
          {btn("Hover", h, step[1])}
          {btn("Pressed", h, step[1])}
        </div>
      </div>
    )
  }
  return <div className="flex gap-6">{panel(false)}{panel(true)}</div>
}

const scenes: Record<string, () => React.JSX.Element> = { "1": Scene1, "2": Scene2, "3": Scene3, "4": Scene4, "5": Scene5, "6": Scene6 }
const id = new URLSearchParams(location.search).get("scene") ?? "1"
const S = scenes[id]
createRoot(document.getElementById("root")!).render(<div className="w-[960px] p-8"><S /></div>)
