import math,sys
sys.argv=["x"]
_g=open("gallery.py").read()
exec(_g.split("b1=sect(")[0])   # helpers, board(), CSS, page(), sect()
import re
def oklab_L(h):
    c=[int(h[i:i+2],16)/255 for i in (1,3,5)]
    c=[v/12.92 if v<=0.04045 else ((v+0.055)/1.055)**2.4 for v in c]
    l=math.cbrt(.4122214708*c[0]+.5363325363*c[1]+.0514459929*c[2]);m=math.cbrt(.2119034982*c[0]+.6806995451*c[1]+.1073969566*c[2]);s=math.cbrt(.0883024619*c[0]+.2817188376*c[1]+.6299787005*c[2])
    return 100*(.2104542553*l+.793617785*m-.0040720468*s)
ROLES=["blue","green","red","purple","teal","orange"]
def info(kind):
    fills={r:hexof(kind,r,600) for r in ROLES}
    r={k:ratio(v,"#ffffff") for k,v in fills.items()}
    L={k:oklab_L(hexof(kind,k,500)) for k in ROLES}
    return fills,r,L
def col(kind,label,tag):
    nm=lambda k:'cyan' if (kind=='tailwind' and k=='teal') else k
    fills,r,L=info(kind)
    fails=sum(1 for v in r.values() if v<4.5)
    gap=max(L.values())-min(L.values())
    btns="".join(f'<div class="cb"><span class="btn solid" style="background:var(--{k}-600);color:#fff">{nm(k)}</span><span class="pill {"ok" if r[k]>=4.5 else "bad"}">{"✓" if r[k]>=4.5 else "✕"} {r[k]:.1f}:1</span></div>' for k in ROLES)
    seg="".join(f'<span style="background:var(--{k}-500)"></span>' for k in ROLES)
    lab="".join(f'<span>L {L[k]:.0f}</span>' for k in ROLES)
    bars=[("blue",86),("green",72),("red",60),("purple",48),("teal",36),("orange",24)]
    bar_html="".join(f'<div class="br"><span>{n}</span><div class="track"><div class="fill" style="width:{w}%;background:var(--{n}-500)"></div></div></div>' for n,w in bars)
    badges="".join(f'<span class="badge" style="background:var(--{k}-100);color:var(--{k}-800)">{nm(k)}</span>' for k in ROLES)
    bc=[ratio(hexof(kind,k,800),hexof(kind,k,100)) for k in ROLES]
    return f'''<div class="side {tag}"><div class="tag">{label}</div>
<div class="card"><h2>White text on a 600 button</h2><div class="cbs">{btns}</div>
 <div class="sum"><b class="{"bad" if fails else "ok"}">{6-fails} / 6</b> reach 4.5:1</div></div>
<div class="card"><h2>The same 500, in color and in grayscale</h2>
 <div class="seg">{seg}</div><div class="seg gs">{seg}</div><div class="labs">{lab}</div>
 <div class="sum">Lightness gap <b class="{"bad" if gap>6 else "ok"}">{gap:.1f} L</b></div></div>
<div class="card"><h2>Badges: 800 text on 100</h2><div class="row wrap">{badges}</div><div class="sum">Contrast {min(bc):.1f}–{max(bc):.1f}:1</div></div>
</div>'''
CSS2=CSS+'''
body{gap:0}
.wrapb{width:1232px}
.board2{display:grid;grid-template-columns:1fr 1fr;gap:56px}
.side{padding:12px;background:#fff;display:flex;flex-direction:column;gap:34px;--card:var(--gray-50);--line:var(--gray-200);--title:var(--gray-900);--body:var(--gray-700);--muted:var(--gray-600)}
.tag{font-size:20px;font-weight:800;color:var(--title);margin-bottom:2px}
.side.before .tag::before{content:"Before";font-size:12px;letter-spacing:.06em;text-transform:uppercase;background:var(--gray-200);color:var(--gray-800);border-radius:999px;padding:4px 10px;margin-right:10px;vertical-align:3px}
.side.after .tag::before{content:"After";font-size:12px;letter-spacing:.06em;text-transform:uppercase;background:var(--blue-100);color:var(--blue-800);border-radius:999px;padding:4px 10px;margin-right:10px;vertical-align:3px}
.cbs{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.cb .btn{height:40px;font-size:14px}
.pill{font-size:13px;font-weight:700;border-radius:999px;padding:3px 0;text-align:center;font-variant-numeric:tabular-nums}
.pill.ok{background:var(--green-100);color:var(--green-800)} .pill.bad{background:var(--red-100);color:var(--red-800)}
.sum{margin-top:12px;font-size:14px;color:var(--body)} .sum b{font-size:18px} .sum b.ok{color:var(--green-700)} .sum b.bad{color:var(--red-700)}
.seg{display:grid;grid-template-columns:repeat(6,1fr);height:46px;border-radius:10px;overflow:hidden}
.seg.gs{filter:grayscale(1);margin-top:8px}
.labs{display:grid;grid-template-columns:repeat(6,1fr);font-size:12px;color:var(--muted);margin-top:6px;text-align:center;font-variant-numeric:tabular-nums}
.br{display:grid;grid-template-columns:60px 1fr;gap:10px;align-items:center;font-size:13px;margin-top:8px;color:var(--body)}
.grays{filter:grayscale(1);margin-top:10px;opacity:1}.grays .br span{visibility:hidden}
.grays::before{content:"Grayscale";display:block;font-size:12px;color:var(--muted);filter:none}
.grays .br{margin-top:6px}
'''
v=f".side.before{{ {vars_for('tailwind')} }}\n.side.after{{ {vars_for('ordinary')} }}"
body=f'<div class="board2">{col("tailwind","Tailwind CSS v4","before")}{col("ordinary","Ordinary Palette","after")}</div>'
open("compare2.html","w").write(f'<!doctype html><html><head><meta charset="utf-8"><style>\n{palette}\n{CSS2}\n{v}</style></head><body>{body}</body></html>')
# full light gallery (ordinary only) and dark
open("light.html","w").write(page(sect("ordinary","light","Ordinary Palette","Buttons, badges, alerts, a form, tabs, and charts built from the palette"),[("ordinary","light")]))
open("dark.html","w").write(page(sect("dark","dark","Ordinary Palette · dark","Same steps, dark scale: 500 fills with dark text, 700 badge text"),[("dark","dark")]))
