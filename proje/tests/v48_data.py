# v48 data fixes (idempotent): D5 reprice by formula, D6 groups, D10 'Herhangi çakmak', D11 clean names.
# usage: python3 v48_data.py recipes3.json Hammadde_prototip.html
import json, re, sys, functools
SRC, HTML = sys.argv[1], sys.argv[2]
d = json.load(open(SRC, encoding='utf-8'))
R, C, P = d['R'], d['c'], d['p']

# ---- D11: names without English or brackets; the night flower is no longer confused with the sunflower crop ----
REN = {'Ay çiçeği': 'Gece sefası', 'Kürek (sandal)': 'Sandal küreği', 'Bal likörü (mead)': 'Bal şarabı',
       'Bira mayası (yabani)': 'Yabani bira mayası', 'İnci (tatlısu)': 'Tatlısu incisi'}
def rn(n): return REN.get(n, n)
for x in R:
    x['r'] = rn(x['r']); x['i'] = [[rn(i), q] for i, q in x['i']]; x['t'] = [rn(t) for t in x['t']]
for k in list(P):
    if k in REN: P[REN[k]] = P.pop(k)
for g in C: C[g] = [rn(m) for m in C[g]]
for k in ('t', 'f'):
    if k in d: d[k] = [rn(n) for n in d[k]]

# ---- D6: a clay whistle is not cooked fish ----
C['Herhangi pişmiş balık'] = [m for m in C['Herhangi pişmiş balık'] if m != 'Pişmiş kil düdük']

# ---- D10: every fire starter lights a fire ----
C['Herhangi çakmak'] = ['Kıvılcım', 'Pirit çakmağı', 'Kükürt çakmağı']
for x in R:
    if x['r'] in ('Ateş', 'Kozalak ateşi', 'Turba ateşinde tütsü'):
        x['i'] = [['Herhangi çakmak' if i == 'Kıvılcım' else i, q] for i, q in x['i']]

# ---- D12: farming should pay for the wait (a field round ~ 3× the seed money); dishes follow by the formula below ----
CROPP = {'Buğday': 8, 'Havuç': 10, 'Patates': 12, 'Soğan': 10, 'Kabak': 24, 'Ayçiçeği': 16}
for k, v in CROPP.items():
    P[k] = v
    if 'crops' in d: d['crops'][k] = v

# ---- D5: every recipe price follows the formula (dependency order, so fixes cascade) ----
REC = {x['r']: x for x in R}
@functools.lru_cache(None)
def depth(n):
    if n in C: return max(depth(m) for m in C[n])
    if n not in REC: return 0
    return 1 + max([depth(i) for i, q in REC[n]['i']] + [0])
done = set()
def gp(n):
    if n in C: return min(gp(m) for m in C[n] if m in P or m in REC)
    if n in REC and n not in done: price(n)
    return P[n]
changed = []
def price(n):
    done.add(n)
    x = REC[n]
    s = sum(gp(i) * q for i, q in x['i'])
    m = 1.15 + .05 * min(depth(n), 6)
    f = round(s * m + sum(gp(t) for t in x['t']) * .1)
    p = P.get(n)
    if p is None or abs(p - f) > max(1, .02 * f):
        changed.append((n, p, f)); P[n] = f
for x in R: gp(x['r'])

# hard mode: every recipe keeps a unique set of ingredient kinds
sets = {}
for x in R:
    k = frozenset(i for i, q in x['i'])
    assert k not in sets, ('duplicate ingredient set', x['r'], sets[k])
    sets[k] = x['r']

json.dump(d, open(SRC, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
s = open(HTML, encoding='utf-8').read()
s2 = re.sub(r'(<script type="application/json" id="db">)(.*?)(</script>)', lambda m: m.group(1) + json.dumps(d, ensure_ascii=False, separators=(',', ':')) + m.group(3), s, count=1, flags=re.S)
open(HTML, 'w', encoding='utf-8').write(s2)
print(len(R), 'tarif;', len(changed), 'fiyat düzeldi')
for c in changed: print(' ', c)
