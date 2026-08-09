from PIL import Image
from collections import Counter
import colorsys, sys, os

FILES = [
 ("/home/user/dariva-co/1. Dariva.co Logo.png", "1. Dariva.co Logo"),
 ("/home/user/dariva-co/2. Dariva.co Slogan.png", "2. Dariva.co Slogan (Purpose People Planet)"),
 ("/home/user/dariva-co/Logo Dariva.co #1.png", "Logo Dariva.co #1"),
 ("/home/user/dariva-co/public/logo-script.png", "public/logo-script"),
 ("/home/user/dariva-co/public/logo-wordmark.png", "public/logo-wordmark"),
 ("/home/user/dariva-co/public/logo.png", "public/logo"),
]

def hexs(c): return "#%02X%02X%02X" % c

for path, label in FILES:
    if not os.path.exists(path):
        print("MISSING", path); continue
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    px = list(im.getdata())
    opaque = [p for p in px if p[3] > 200]
    total = len(opaque)
    print("="*74)
    print(f"{label}   {w}x{h}  {os.path.getsize(path)/1024:.1f} KB   opaque px: {total}")
    print("="*74)
    if not total: continue
    # quantise to 5-bit per channel buckets, then report
    buckets = Counter()
    for r,g,b,a in opaque:
        buckets[(r>>3<<3, g>>3<<3, b>>3<<3)] += 1
    # Report top buckets overall
    print("  -- top colour buckets (all, incl. near-white/near-black) --")
    for c, n in buckets.most_common(8):
        r,g,b = c
        hh,ss,vv = colorsys.rgb_to_hsv(r/255,g/255,b/255)
        print(f"   {hexs(c)}  {100*n/total:6.2f}%   H{hh*360:5.1f} S{ss*100:5.1f} V{vv*100:5.1f}")
    # Report top CHROMATIC buckets (the brand colours: exclude greys)
    chroma = Counter()
    for c, n in buckets.items():
        r,g,b = c
        hh,ss,vv = colorsys.rgb_to_hsv(r/255,g/255,b/255)
        if ss > 0.25 and 0.10 < vv < 0.99:
            chroma[c] += n
    ctot = sum(chroma.values())
    print(f"  -- top CHROMATIC buckets (S>25%) -- {100*ctot/total:.2f}% of opaque px")
    for c, n in chroma.most_common(10):
        r,g,b = c
        hh,ss,vv = colorsys.rgb_to_hsv(r/255,g/255,b/255)
        print(f"   {hexs(c)}  {100*n/total:6.2f}%   H{hh*360:5.1f} S{ss*100:5.1f} V{vv*100:5.1f}")
