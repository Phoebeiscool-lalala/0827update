#!/usr/bin/env python3
"""Check which laws should be reclassified as Minimum Wages."""
import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open(r'C:\Users\Phoebe\Desktop\OPENCODE\0826update\data\laws.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

laws = data['laborLawData']
print('Laws that might be Minimum Wages related:')
print()

keywords = ['minimum wage', '最低工资', 'wage floor', 'minimum hourly', 'minimum daily', 'minimum monthly', 'living wage']

for law in laws:
    title = law.get('law', '').lower()
    summary = law.get('summary', '').lower()
    summaryzh = law.get('summaryZh', '').lower()
    
    if any(k in title or k in summary or k in summaryzh for k in keywords):
        lid = law['id']
        country = law['country']
        name = law['law'][:60]
        pc = law.get('primaryCategory', 'N/A')
        sc = law.get('secondaryCategory', 'N/A')
        print(f'[{lid}] {country} - {name}')
        print(f'  Current: {pc} -> {sc}')
        print()
