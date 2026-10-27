# v44 data: metal tools & armour, zone materials, new foods. Run once on recipes3.json (idempotent).
import json, functools, sys, re
SRC = sys.argv[1]          # recipes3.json
HTML = sys.argv[2]         # Hammadde_prototip.html
d = json.load(open(SRC))
R, C, P = d['R'], d['c'], d['p']
have = {r['r'] for r in R}

# ---- new raw materials (base prices) ----
RAW = {'Turba': 3, 'Bataklık otu': 4, 'Kükürt': 6, 'Kül': 1, 'Ateş çiçeği': 8}
for k, v in RAW.items():
    P.setdefault(k, v)
if 'Turba' not in C['Herhangi kömür']:
    C['Herhangi kömür'].append('Turba')

# ---- new recipes: (result, [[ing,q]...], [tools], category, forge?) ----
NEW = [
  # metal parts (cauldron melts and hammers flat)
  ('Tunç levha', [['Tunç külçesi', 2], ['Herhangi kömür', 1]], [], 'Metal'),
  ('Demir levha', [['Demir külçesi', 2], ['Herhangi kömür', 1]], [], 'Metal'),
  ('Demir halka', [['Demir külçesi', 1], ['Herhangi kömür', 1], ['Kum', 2]], [], 'Metal'),
  # granite tools: the second step of the tool ladder (granite is dug with a stone pickaxe)
  ('Granit balta', [['Granit', 2], ['Herhangi sap', 1], ['İp', 2], ['Taş', 1]], [], 'Alet kademeleri'),
  ('Granit kazma', [['Granit', 3], ['Herhangi sap', 1], ['İp', 2], ['Dal', 2]], [], 'Alet kademeleri'),
  # bronze tools and weapons (forged at Dursun's anvil)
  ('Tunç balta', [['Tunç külçesi', 2], ['Herhangi sap', 1], ['İp', 2]], [], 'Metal aletler'),
  ('Tunç kazma', [['Tunç külçesi', 3], ['Herhangi sap', 1], ['İp', 2], ['Taş', 2]], [], 'Metal aletler'),
  ('Tunç mızrak', [['Tunç külçesi', 2], ['Uzun sopa', 1], ['İp', 3]], [], 'Metal aletler'),
  ('Tunç kılıç', [['Tunç külçesi', 4], ['Herhangi sap', 1], ['Herhangi tabaklanmış deri', 1]], [], 'Metal aletler'),
  # iron (bog iron from the swamp)
  ('Demir balta', [['Demir külçesi', 3], ['Herhangi sap', 1], ['Sinir kirişi', 1]], [], 'Metal aletler'),
  ('Demir kazma', [['Demir külçesi', 4], ['Herhangi sap', 1], ['Sinir kirişi', 1], ['Taş', 2]], [], 'Metal aletler'),
  ('Demir mızrak', [['Demir külçesi', 3], ['Uzun sopa', 1], ['Sinir kirişi', 1]], [], 'Metal aletler'),
  ('Demir kılıç', [['Demir külçesi', 5], ['Herhangi sap', 1], ['Herhangi tabaklanmış deri', 1], ['Sinir kirişi', 1]], [], 'Metal aletler'),
  ('Ejder kılıcı', [['Ejder kemiği', 2], ['Demir külçesi', 3], ['Altın külçesi', 1], ['Herhangi tabaklanmış deri', 1]], [], 'Metal aletler'),
  # armour (forged)
  ('Tunç miğfer', [['Tunç levha', 1], ['Herhangi tabaklanmış deri', 1], ['Sinir', 2]], [], 'Zırh'),
  ('Tunç zırh', [['Tunç levha', 3], ['Herhangi tabaklanmış deri', 2], ['Sinir kirişi', 1]], [], 'Zırh'),
  ('Tunç eldiven', [['Tunç levha', 1], ['Herhangi tabaklanmış deri', 1], ['İp', 2]], [], 'Zırh'),
  ('Tunç çizme', [['Tunç levha', 1], ['Herhangi tabaklanmış deri', 1], ['Lif', 4]], [], 'Zırh'),
  ('Demir miğfer', [['Demir levha', 1], ['Demir halka', 2], ['Herhangi tabaklanmış deri', 1]], [], 'Zırh'),
  ('Demir zırh', [['Demir levha', 3], ['Demir halka', 4], ['Herhangi tabaklanmış deri', 2], ['Sinir kirişi', 1]], [], 'Zırh'),
  ('Demir eldiven', [['Demir levha', 1], ['Demir halka', 1], ['Herhangi tabaklanmış deri', 1], ['İp', 2]], [], 'Zırh'),
  ('Demir çizme', [['Demir levha', 1], ['Demir halka', 1], ['Herhangi tabaklanmış deri', 1], ['Lif', 4]], [], 'Zırh'),
  ('Ejder pulu zırh', [['Kara pul', 2], ['Demir levha', 2], ['Herhangi tabaklanmış deri', 2]], [], 'Zırh'),
  # zone armour (cauldron, like the other clothes)
  ('Kamış çizme', [['Kamış', 6], ['İp', 3], ['Yosun', 2]], [], 'Giyim'),
  ('Timsah derisi zırh', [['Timsah derisi', 2], ['Sinir kirişi', 1], ['İp', 4]], [], 'Giyim'),
  ('Bataklık postu pelerin', [['Bataklık kurdu postu', 2], ['Sinir kirişi', 1], ['Lif', 4]], [], 'Giyim'),
  ('Kül postu pelerin', [['Kül kurdu postu', 2], ['Sinir kirişi', 1], ['Kül', 4]], [], 'Giyim'),
  ('Lav pulu eldiven', [['Lav pulu', 2], ['Herhangi tabaklanmış deri', 1], ['Sinir kirişi', 1]], [], 'Giyim'),
  # zone food and medicine
  ('Bataklık otu çayı', [['Bataklık otu', 2], ['Sıcak su', 1], ['Su', 1]], [], 'Şifa'),
  ('Panzehir', [['Bataklık otu', 3], ['Zehir bezesi', 1], ['Su', 2]], [], 'Şifa'),
  ('Ateş çiçeği merhemi', [['Ateş çiçeği', 2], ['Hayvan yağı', 1], ['Kül', 2]], [], 'Şifa'),
  ('Kükürtlü merhem', [['Kükürt', 1], ['Hayvan yağı', 2], ['Yosun', 2]], [], 'Şifa'),
  ('Pişmiş timsah eti', [['Timsah eti', 1], ['Ateş', 1], ['Su', 1], ['Yaprak', 1]], [], 'Yiyecek'),
  ('Turba ateşinde tütsü', [['Herhangi çiğ et', 1], ['Turba', 2], ['Kıvılcım', 1]], [], 'Yiyecek'),
  ('Nilüfer çorbası', [['Nilüfer', 2], ['Sıcak su', 1], ['Su teresi', 1]], [], 'Yiyecek'),
  ('Kül ekmeği', [['Herhangi un', 1], ['Kül', 1], ['Su', 1]], [], 'Yiyecek'),
  ('Ateş çiçeği balı', [['Ateş çiçeği', 1], ['Yabani bal', 1], ['Su', 1]], [], 'Yiyecek'),
  # jewellery (sells well) and fire
  ('Gümüş yüzük', [['Gümüş külçesi', 1], ['Kehribar', 1]], [], 'Süs'),
  ('Altın kolye', [['Altın külçesi', 2], ['Kehribar', 1], ['İp', 1]], [], 'Süs'),
  ('Kükürt çakmağı', [['Kükürt', 2], ['Pirit', 1], ['Kuru ot', 2]], [], 'Ateş'),
]
FORGE_T = ['Granit balta', 'Granit kazma', 'Tunç balta', 'Tunç kazma', 'Tunç mızrak', 'Tunç kılıç', 'Demir balta', 'Demir kazma', 'Demir mızrak', 'Demir kılıç', 'Ejder kılıcı']
FORGE_F = ['Tunç miğfer', 'Tunç zırh', 'Tunç eldiven', 'Tunç çizme', 'Demir miğfer', 'Demir zırh', 'Demir eldiven', 'Demir çizme', 'Ejder pulu zırh']

for r, i, t, c in NEW:
    if r in have:
        continue
    R.append({'r': r, 'i': i, 't': t, 'c': c}); have.add(r)
for n in FORGE_T:
    if n not in d['t']:
        d['t'].append(n)
d['t'].sort()
d['f'] = FORGE_F

# ---- prices: material sum x chain multiplier + 10% of tools ----
REC = {x['r']: x for x in R}
@functools.lru_cache(None)
def depth(n):
    if n in C: return max(depth(m) for m in C[n])
    if n not in REC: return 0
    return 1 + max([depth(i) for i, q in REC[n]['i']] + [0])
def gp(n):
    if n in C: return min(P[m] for m in C[n] if m in P)
    if n not in P: price(n)
    return P[n]
def price(n):
    x = REC[n]
    s = sum(gp(i) * q for i, q in x['i'])
    m = 1.15 + .05 * min(depth(n), 6)
    P[n] = round(s * m + sum(gp(t) for t in x['t']) * .1)
    return P[n]
P['Demir cevheri'] = 25
for r in [x[0] for x in NEW] + ['Demir külçesi']:
    P.pop(r, None)
price('Demir külçesi')
for r, *_ in NEW:
    price(r)

json.dump(d, open(SRC, 'w'), ensure_ascii=False, separators=(',', ':'))
s = open(HTML, encoding='utf-8').read()
s2 = re.sub(r'(<script type="application/json" id="db">)(.*?)(</script>)', lambda m: m.group(1) + json.dumps(d, ensure_ascii=False, separators=(',', ':')) + m.group(3), s, count=1, flags=re.S)
open(HTML, 'w', encoding='utf-8').write(s2)
print(len(R), 'tarif')
for r, *_ in NEW:
    print(r, P[r], depth(r))
