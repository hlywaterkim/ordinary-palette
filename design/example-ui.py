import json,re
root="/home/user/ordinary-palette"
palette=open(f"{root}/src/colors.css").read().strip()
tw=json.load(open("tw.json"))
own={m[0]:m[1] for m in re.findall(r"--color-([a-z0-9-]+): (#[0-9a-f]{6})",palette)}
def lum(h):
    c=[int(h[i:i+2],16)/255 for i in (1,3,5)]
    c=[v/12.92 if v<=0.04045 else ((v+0.055)/1.055)**2.4 for v in c]
    return .2126*c[0]+.7152*c[1]+.0722*c[2]
def ratio(a,b):
    x,y=sorted([lum(a),lum(b)],reverse=True); return (x+.05)/(y+.05)

FAM=["red","orange","yellow","green","cyan","sky","blue","purple","pink","gray","stone"]  # roles
# role -> (ordinary family, tailwind family)
MAP={"red":("red","red"),"orange":("orange","orange"),"yellow":("yellow","yellow"),"green":("green","green"),"cyan":("cyan","cyan"),
     "sky":("light-blue","sky"),"blue":("blue","blue"),"purple":("purple","purple"),"pink":("pink","pink"),"gray":("cool-gray","slate"),"brown":("brown","stone")}
STEPS=[50,100,200,300,400,500,600,700,800,900]
def vars_for(kind):
    out=[]
    for role,(o,t) in MAP.items():
        for s in STEPS:
            if kind=="ordinary": out.append(f"--{role}-{s}: var(--color-{o}-{s});")
            elif kind=="dark": out.append(f"--{role}-{s}: var(--color-dark-{o}-{s});")
            else: out.append(f"--{role}-{s}: {tw[t][str(s)]};")
    return "\n".join(out)
def hexof(kind,role,s):
    o,t=MAP[role]
    return own[f"color-dark-{o}-{s}".replace("color-","")] if kind=="dark" else (own[f"{o}-{s}"] if kind=="ordinary" else tw[t][str(s)])
def pageonly(kind): return "#ffffff" if kind!="dark" else None

I=lambda d,w=16,sw=2:f'<svg width="{w}" height="{w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">{d}</svg>'
ic_info=I('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.01"/>',18)
ic_warn=I('<path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 10v4.5M12 17.5v.01"/>',18)
ic_err=I('<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',18)
ic_ok=I('<circle cx="12" cy="12" r="9"/><path d="m8 12.5 3 3 5-6"/>',18)
ic_chk=I('<path d="m5 12.5 4.5 4.5L19 7.5"/>',12,3.4)
ic_up=I('<path d="M12 19V5M5.5 11.5 12 5l6.5 6.5"/>',11,3)
ic_dn=I('<path d="M12 5v14M5.5 12.5 12 19l6.5-6.5"/>',11,3)
ic_chev=I('<path d="m6 9 6 6 6-6"/>',14)

def board(kind,title,sub):
    theme='dark' if kind=='dark' else 'light'
    # contrast of white (or dark ink in dark) on the 600 (500 in dark) fill, the "color button" row
    btn_roles=["blue","green","red","purple","cyan","orange"]
    buttons=[]
    for r in btn_roles:
        step=500 if kind=="dark" else 600
        fill=hexof(kind,r,step)
        txt="#161b20" if kind=="dark" else "#ffffff"
        if kind=="dark": txt=own["color-dark-cool-gray-50".replace("color-","")] if False else own["dark-cool-gray-50"]
        rt=ratio(fill,txt)
        ok=rt>=4.5
        buttons.append(f'<div class="cb"><span class="btn solid" style="background:var(--{r}-{step});color:var(--on-fill)">{r}</span><span class="ratio {"ok" if ok else "bad"}">{"✓" if ok else "✕"} {rt:.1f}:1</span></div>')
    buttons="".join(buttons)
    bars=[("blue",86,"2,140"),("orange",64,"1,620"),("yellow",48,"1,180"),("brown",36,"890"),("cyan",27,"670"),("pink",18,"450")]
    bar_html="".join(f'<div class="bar-row"><span>{n}</span><div class="track"><div class="fill" style="width:{w}%;background:var(--{n}-500)"></div></div><b>{v}</b></div>' for n,w,v in bars)
    rows=[("Olivia Martin","OM","purple","Paid","green","$1,999.00"),("Jackson Lee","JL","cyan","Pending","yellow","$39.00"),("Isabella Nguyen","IN","pink","Failed","red","$299.00")]
    row_html="".join(f'<div class="trow"><span class="av" style="background:var(--{c}-100);color:var(--{c}-800)">{i}</span><span class="nm">{n}</span><span class="badge {b}">{s}</span><span class="amt">{a}</span></div>' for n,i,c,s,b,a in rows)
    return f'''<section class="board {theme} {kind}-{theme}">
<div class="bh"><div><h1>{title}</h1><p>{sub}</p></div></div>
<div class="grid">
<div class="col">
 <div class="card"><h2>Buttons</h2>
  <div class="row"><span class="btn solid" style="background:var(--blue-{500 if kind=="dark" else 600});color:var(--on-fill)">Primary</span><span class="btn out">Outline</span><span class="btn ghost">Ghost</span><span class="btn solid" style="background:var(--red-{500 if kind=="dark" else 600});color:var(--on-fill)">Delete</span></div>
  <div class="cap">{"Dark 500" if kind=="dark" else "600"} fill, {"dark" if kind=="dark" else "white"} text, contrast per color</div>
  <div class="cbs">{buttons}</div></div>
 <div class="card"><h2>Badges</h2><div class="row wrap">
  <span class="badge green">{ic_chk}Success</span><span class="badge yellow">Warning</span><span class="badge red">Error</span><span class="badge sky">Info</span><span class="badge purple">Beta</span><span class="badge gray">Archived</span></div></div>
 <div class="card"><h2>Alerts</h2><div class="stack">
  <div class="alert sky">{ic_info}<div><b>Heads up</b><br>A new version is available.</div></div>
  <div class="alert yellow">{ic_warn}<div><b>Warning</b><br>Your trial ends in 3 days.</div></div>
  <div class="alert red">{ic_err}<div><b>Error</b><br>Payment could not be processed.</div></div></div></div>
</div>
<div class="col">
 <div class="card"><h2>Create project</h2><p class="muted">Deploy your new project in one click.</p>
  <label>Name</label><div class="input">ordinary-app</div>
  <label>Framework</label><div class="input sel">Next.js{ic_chev}</div>
  <label>Email</label><div class="input invalid">hello@ordinary</div><div class="error">{ic_err.replace('width="18" height="18"','width="14" height="14"') if False else ""}Enter a valid email address</div>
  <div class="row ctl"><span class="check">{ic_chk}</span><span>Accept terms</span><span class="switch"><i></i></span><span>Notify me</span></div>
  <div class="row end"><span class="btn out">Cancel</span><span class="btn solid" style="background:var(--blue-{500 if kind=="dark" else 600});color:var(--on-fill)">Deploy</span></div></div>
 <div class="card"><h2>Tabs and progress</h2>
  <div class="tabs"><span class="on">Overview</span><span>Analytics</span><span>Reports</span></div>
  <div class="prog"><span>Storage</span><div class="track"><div class="fill" style="width:72%;background:var(--blue-500)"></div></div><b>72%</b></div>
  <div class="prog"><span>Build</span><div class="track"><div class="fill" style="width:100%;background:var(--green-500)"></div></div><b>100%</b></div>
  <div class="prog"><span>Bandwidth</span><div class="track"><div class="fill" style="width:38%;background:var(--orange-500)"></div></div><b>38%</b></div></div>
 <div class="card toast">{ic_ok.replace("<svg","<svg style='color:var(--green-"+("500" if kind=="dark" else "600")+")'")}<div><b>Deployment ready</b><br><span class="muted">ordinary-app is live. <a>View site</a></span></div></div>
</div>
<div class="col">
 <div class="card"><div class="head"><h2>Signups by channel</h2><span class="muted">Last 7 days</span></div><div class="bars">{bar_html}</div></div>
 <div class="two">
  <div class="card stat"><span class="muted">Revenue</span><div class="v">$45,231</div><span class="badge green">{ic_up}20.1%</span></div>
  <div class="card stat"><span class="muted">Churn</span><div class="v">2.4%</div><span class="badge red">{ic_dn}0.6%p</span></div></div>
 <div class="card"><h2>Recent sales</h2><div class="table">{row_html}</div></div>
</div>
</div></section>'''

CSS='''
*{box-sizing:border-box;margin:0}
body{width:1280px;padding:24px;background:#e9ecef;font-family:Pretendard,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;display:flex;flex-direction:column;gap:24px}
.board{border-radius:20px;padding:28px;background:var(--page);color:var(--body);font-size:14px}
.board.light{--page:#fff;--card:var(--gray-50);--line:var(--gray-200);--title:var(--gray-900);--body:var(--gray-700);--muted:var(--gray-600);--field:var(--gray-500);--link:var(--blue-700);--error:var(--red-600);--on-fill:#fff;--out:var(--gray-300);--track:var(--gray-200);--tabbg:var(--gray-100);--tabon:#fff;--sw:var(--green-600);--cb:var(--blue-600)}
.board.dark{--page:var(--gray-50);--card:var(--gray-100);--line:var(--gray-200);--title:var(--gray-900);--body:var(--gray-800);--muted:var(--gray-700);--field:var(--gray-500);--link:var(--blue-700);--error:var(--red-700);--on-fill:var(--gray-50);--out:var(--gray-300);--track:var(--gray-200);--tabbg:var(--gray-200);--tabon:var(--gray-100);--sw:var(--green-500);--cb:var(--blue-500)}
.bh{display:flex;justify-content:space-between;margin-bottom:20px}
.bh h1{font-size:22px;font-weight:700;color:var(--title)} .bh p{font-size:13px;color:var(--muted);margin-top:4px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-items:start}
.col{display:flex;flex-direction:column;gap:16px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px}
.card h2{font-size:14px;font-weight:700;color:var(--title);margin-bottom:12px}
.muted{color:var(--muted);font-size:13px} .cap{font-size:12px;color:var(--muted);margin:10px 0 8px}
.row{display:flex;gap:8px;align-items:center} .wrap{flex-wrap:wrap} .end{justify-content:flex-end;margin-top:14px}
.stack{display:flex;flex-direction:column;gap:8px}
.btn{height:34px;padding:0 13px;border-radius:9px;font-weight:600;font-size:13px;display:inline-flex;align-items:center;border:1px solid transparent}
.btn.out{border-color:var(--out);color:var(--body)} .btn.ghost{color:var(--body)}
.cbs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.cb{display:flex;flex-direction:column;gap:4px;align-items:stretch}
.cb .btn{justify-content:center;height:32px;padding:0}
.ratio{font-size:11px;text-align:center;font-variant-numeric:tabular-nums;font-weight:600}
.ratio.ok{color:var(--green-700)} .ratio.bad{color:var(--red-700)}
.badge{display:inline-flex;align-items:center;gap:4px;height:24px;padding:0 10px;border-radius:999px;font-size:12px;font-weight:600}
.green{background:var(--green-100);color:var(--green-800)} .red{background:var(--red-100);color:var(--red-800)} .yellow{background:var(--yellow-100);color:var(--yellow-900)}
.sky{background:var(--sky-100);color:var(--sky-800)} .purple{background:var(--purple-100);color:var(--purple-800)} .gray{background:var(--gray-200);color:var(--gray-800)}
.board.dark .green,.board.dark .red,.board.dark .yellow,.board.dark .sky,.board.dark .purple{color:var(--c700)}
.board.dark .green{color:var(--green-700)}.board.dark .red{color:var(--red-700)}.board.dark .yellow{color:var(--yellow-700)}.board.dark .sky{color:var(--sky-700)}.board.dark .purple{color:var(--purple-700)}.board.dark .gray{color:var(--gray-800)}
.alert{display:flex;gap:10px;padding:11px 12px;border-radius:11px;font-size:13px;line-height:1.4}
.alert svg{flex:none;margin-top:1px} .alert b{font-weight:700}
.card label{display:block;font-size:13px;font-weight:600;color:var(--body);margin:12px 0 6px}
.input{height:36px;border:1px solid var(--field);border-radius:9px;background:var(--page);padding:0 11px;display:flex;align-items:center;justify-content:space-between;color:var(--title)}
.input.invalid{border-color:var(--error)} .error{font-size:12px;color:var(--error);margin-top:5px;font-weight:500}
.ctl{margin-top:14px;font-size:13px;gap:8px}
.check{width:18px;height:18px;border-radius:5px;background:var(--cb);color:var(--on-fill);display:grid;place-items:center}
.switch{margin-left:12px;width:34px;height:20px;border-radius:10px;background:var(--sw);position:relative}
.switch i{position:absolute;right:2px;top:2px;width:16px;height:16px;border-radius:50%;background:var(--on-fill)}
.tabs{display:flex;background:var(--tabbg);border-radius:10px;padding:3px;margin-bottom:14px}
.tabs span{flex:1;text-align:center;padding:6px 0;font-size:13px;font-weight:600;color:var(--muted);border-radius:8px}
.tabs .on{background:var(--tabon);color:var(--title)}
.prog,.bar-row{display:grid;grid-template-columns:76px 1fr 44px;gap:10px;align-items:center;font-size:13px;margin-top:10px}
.prog b,.bar-row b{text-align:right;color:var(--title);font-variant-numeric:tabular-nums}
.track{height:10px;border-radius:5px;background:var(--track);overflow:hidden} .fill{height:100%;border-radius:5px}
.toast{display:flex;gap:10px;align-items:flex-start;font-size:13px} .toast b{color:var(--title)} .toast a{color:var(--link);font-weight:600;text-decoration:underline}
.head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px} .head h2{margin:0}
.bars .bar-row:first-child{margin-top:4px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.stat .v{font-size:24px;font-weight:700;color:var(--title);margin:4px 0 8px}
.trow{display:grid;grid-template-columns:28px 1fr auto 70px;gap:10px;align-items:center;padding:8px 0;border-top:1px solid var(--line);font-size:13px}
.trow:first-child{border-top:0;padding-top:0}
.av{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700}
.nm{color:var(--title);font-weight:600} .amt{text-align:right;color:var(--title);font-variant-numeric:tabular-nums;font-weight:600}
'''
def page(boards, kinds):
    v="\n".join(f".board.{k}-{n}{{ {vars_for(k)} }}" for k,n in kinds)
    return f'<!doctype html><html><head><meta charset="utf-8"><style>\n{palette}\n{CSS}\n{v}</style></head><body>{boards}</body></html>'
def sect(kind,theme,title,sub):
    return board(kind,title,sub)
# compare page: ordinary light vs tailwind light
b1=sect("ordinary","light","Ordinary Palette","Same components, same steps: 600 fills, 100 / 800 badges, 500 charts")
b2=sect("tailwind","light","Tailwind CSS v4 default colors","The same page with the same step numbers")
open("compare.html","w").write(page(b1+b2,[("ordinary","light"),("tailwind","light")]))
b3=sect("dark","dark","Ordinary Palette · dark","Same steps, dark scale: 500 fills with dark text, 700 badge text")
open("dark.html","w").write(page(b3,[("dark","dark")]))
