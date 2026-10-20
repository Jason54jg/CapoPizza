import re
from pathlib import Path

text = Path(r"e:\CapoPizza\lib\menu.ts").read_text(encoding="utf-8")
# Rough extract of id/name/description blocks
blocks = re.findall(
    r'id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*description:\s*\n?\s*"([^"]*(?:\\.[^"]*)*)"',
    text,
    re.M,
)
# Also single-line descriptions
if not blocks:
    blocks = re.findall(
        r'id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]*)"',
        text,
    )

print(f"found {len(blocks)}")
for i, n, d in blocks:
    print(f"{i}|{n}|{d[:80]}")
