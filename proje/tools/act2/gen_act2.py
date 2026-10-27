import json,sys,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from content import *
P=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..','Hammadde_prototip.html')
s=open(P,encoding='utf8').read()
TAG='<script type="application/json" id="db">';a=s.index(TAG)+len(TAG);b=s.index('</script>',a);d=json.loads(s[a:b])
p=d['p'];R=d['R'];C=d['c'];have={r['r'] for r in R}
def price(n):
  if n in p:return p[n]
  if n in C:return min(price(m) for m in C[n])
  raise KeyError(n)
def rec(r,ing,cat,tools=(),pr=None):
  if r in have:return
  for n,q in ing:
    if n not in p and n not in C:raise KeyError((r,n))
  have.add(r);R.append({'r':r,'i':[list(x) for x in ing],'t':list(tools),'c':cat})
  p[r]=pr if pr is not None else round(sum(price(n)*q for n,q in ing)*1.3+5)
def raw(n,pr):
  if n not in p:p[n]=pr
def grp(g,n):
  if n not in C[g]:C[g].append(n)
low=lambda n:n[0].lower()+n[1:]
for bi,L in TREES.items():
  for (n,c,tr,r,ex) in L:
    o=n+' odunu';raw(o,WOODP[n]);grp('Herhangi odun',o)
    rec(n+' kalası',[[o,2],['Dal',2],['Lif',2]],'Ağaç',['Taş balta']);grp('Herhangi kalas',n+' kalası')
for bi,L in PLANTS.items():
  for t in L:raw(t[0],t[5])
for bi,L in ORES.items():
  for t in L:raw(t[0],t[5])
for n,v in DROPP.items():raw(n,v)
for m in ['Bulut koyunu eti','Rüzgâr kuşu eti','Kertenkele eti','Buz tavşanı eti','Kor kertenkelesi eti','Yıldız tilkisi eti']:
  base=low(m);rec('Pişmiş '+base,[[m,1],['Ateş',1],['Su',3],['Yaprak',3]],'Yiyecek');grp('Herhangi çiğ et',m);grp('Herhangi pişmiş et','Pişmiş '+base)
REC_EXTRA=True
rec('Mana iksiri',[['Büyü otu',2],['Su',2],['Herhangi çömlek',1]],'Şifa')
rec('Ateş asası',[['Mavi mantar kalası',1],['Spor kristali',2],['Büyü otu',3],['Yüzer taş',1]],'Büyü',pr=900)
rec('Bulut yünü ip',[['Bulut yünü',3]],'Zanaat')
rec('Gök demiri külçesi',[['Gök demiri',3],['Herhangi kömür',2],['Taş',1]],'Maden')
rec('Pirinç külçesi',[['Pirinç cevheri',3],['Herhangi kömür',1]],'Maden')
rec('Barut',[['Barut kayası',2],['Herhangi kömür',1]],'Zanaat')
rec('Tabanca mermisi',[['Pirinç külçesi',1],['Barut',1]],'Silah',pr=60)
rec('Pompalı fişeği',[['Pirinç külçesi',1],['Barut',2]],'Silah',pr=90)
rec('Tabanca',[['Gök demiri külçesi',2],['Dişli',3],['Herhangi sap',1],['Vida',4]],'Silah',pr=1400)
rec('Pompalı',[['Ağır plaka',1],['Dişli',4],['Herhangi kalas',2],['Vida',6],['Motor',1]],'Silah',pr=2600)
rec('Kobalt külçesi',[['Kobalt cevheri',3],['Herhangi kömür',2]],'Maden')
rec('Titanyum külçesi',[['Titanyum cevheri',3],['Herhangi kömür',2],['Enerji taşı',1]],'Maden')
rec('Enerji hücresi',[['Enerji taşı',2],['Bakır tel',2],['Pil',1]],'Zanaat')
rec('Meka zırh',[['Titanyum külçesi',4],['Kobalt külçesi',3],['Enerji hücresi',2],['Motor',1],['Golem çekirdeği',1]],'Zırh',pr=5200)
rec('Buz asası',[['Kristal çam kalası',1],['Buz kristali',3],['Enerji taşı',1],['Büyü otu',2]],'Büyü',pr=1600)
rec('Kristal armut kompostosu',[['Kristal armut',3],['Su',2],['Ateş',1]],'Yiyecek')
rec('Plazma hücresi',[['Plazma taşı',2],['Enerji hücresi',1],['Ejder kristali',1]],'Zanaat')
rec('Işın kılıcı',[['Titanyum külçesi',2],['Plazma hücresi',2],['Ejder dişi',2],['Kristal lifi',3]],'Silah',pr=6400)
rec('Yıldırım asası',[['Kömür ağacı kalası',1],['Plazma taşı',3],['Ejder kristali',2],['Büyü otu',3]],'Büyü',pr=3200)
rec('Ejder meyvesi şerbeti',[['Ejder meyvesi',3],['Su',2],['Herhangi çömlek',1]],'Yiyecek')
rec('Meteor demiri külçesi',[['Meteor demiri',3],['Herhangi kömür',2],['Füzyon taşı',1]],'Maden')
rec('Yıldız külçesi',[['Yıldız cevheri',3],['Plazma hücresi',1]],'Maden')
rec('Roket gövdesi',[['Meteor demiri külçesi',4],['Titanyum külçesi',4],['Gök camı',3]],'Taşıtlar',pr=9000)
rec('Roket motoru',[['Yıldız külçesi',2],['Plazma hücresi',3],['Ejder kalbi',1],['Yakıt hücresi',1]],'Taşıtlar',pr=14000)
rec('Roket',[['Roket gövdesi',1],['Roket motoru',1],['Uzaylı devresi',4],['Gök ipeği',6]],'Taşıtlar',pr=30000)
rec('Gök üzümü suyu',[['Gök üzümü',3],['Su',2]],'Yiyecek')
rec('Hurma ezmesi',[['Hurma',3],['Herhangi çömlek',1]],'Yiyecek')
rec('Spor ekmeği',[['Spor tozu',3],['Su',2],['Ateş',1]],'Yiyecek')
rec('Goblin eriği reçeli',[['Goblin eriği',3],['Herhangi çömlek',1]],'Yiyecek')
out=json.dumps(d,ensure_ascii=False,separators=(',',':'));assert '</' not in out
s=s[:a]+out+s[b:]
# ---- JS data
def js(o):return json.dumps(o,ensure_ascii=False)
T={str(k):[dict(n=n,c=c,trunk=tr,r=r,**ex) for (n,c,tr,r,ex) in L] for k,L in TREES.items()}
PL={str(k):[dict(n=t[0],look=t[1],col=t[2],rule=t[3],re=t[4],ic=t[6]) for t in L] for k,L in PLANTS.items()}
OR={str(k):[dict(n=t[0],l=t[1],c=t[2],cnt=t[3],tier=t[4]) for t in L] for k,L in ORES.items()}
AN={}
for k,L in ANIMALS.items():
  AN[str(k)]=[dict(n=n,d=dd,want=w,cond=cnd,pack=pk) for (n,dd,w,cnd,pk) in L]
from icons import TPL
data='window.__I2TPL='+js(TPL)+';\nwindow.__I2C='+js(dict(trees=T,plants=PL,ores=OR,anim=AN,woodc=WOODC,iconk=ICONK,iconc=ICONC))+';'
start='<script id="v77-data">';
if start in s:
  i=s.index(start);j=s.index('</script>',i)+9;s=s[:i]+s[j:]
blk=start+'\n// ACT 2 island content (generated by gen77.py from content.py): trees, plants, ores, creatures per land\n'+data+'\n</script>\n'
k=s.index('<script id="v65">');s=s[:k]+blk+s[k:]
open(P,'w',encoding='utf8').write(s)
print('ok',len(R))
