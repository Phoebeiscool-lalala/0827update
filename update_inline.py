#!/usr/bin/env python3
"""Update INLINE_DATA in index.html."""
import json, re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

index_path = r'C:\Users\Phoebe\Desktop\OPENCODE\0826update\index.html'
json_path = r'C:\Users\Phoebe\Desktop\OPENCODE\0826update\data\laws.json'

with open(json_path, 'r', encoding='utf-8') as f:
    laws_data = json.load(f)

with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

match = re.search(r'const INLINE_DATA\s*=\s*\{', html)
start = match.start()

brace_count = 0
in_string = False
escape_next = False
end = None
for i in range(match.end() - 1, len(html)):
    c = html[i]
    if escape_next: escape_next = False; continue
    if c == '\\': escape_next = True; continue
    if c == '"' and not escape_next: in_string = not in_string; continue
    if in_string: continue
    if c == '{': brace_count += 1
    elif c == '}':
        brace_count -= 1
        if brace_count == 0: end = i + 1; break

new_text = "const INLINE_DATA = " + json.dumps(laws_data, ensure_ascii=False, indent=2)
new_html = html[:start] + new_text + html[end:]

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(new_html)

print(f"INLINE_DATA updated: {len(new_text)} chars")
