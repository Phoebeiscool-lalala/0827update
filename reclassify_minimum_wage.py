#!/usr/bin/env python3
"""Reclassify Minimum Wages laws and add new category."""
import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Laws that should be reclassified as Minimum Wages
MINIMUM_WAGE_LAWS = {
    'fr02': 'Minimum Wage Indexation - automatic SMIC revaluation based on inflation',
    'gb02': 'National Living Wage Increase - statutory minimum wage rates',
    'jp02': 'Minimum Wage Increase - nationwide minimum wage rates',
    'kr02': 'Minimum Wage - national minimum wage rates',
    'in01': 'Code on Wages 2019 - unified wage code with national floor wage',
    'za01': 'National Minimum Wage Act - statutory minimum wage rates',
    'ng01': 'National Minimum Wage Act 2024 - statutory minimum wage rates',
    'tr01': 'Minimum Wage & Social Security - statutory minimum wage',
    'eg01': 'Labour Law - minimum wage and social insurance',
}

# Laws that should NOT be reclassified (they are about working time, not minimum wage)
NOT_MINIMUM_WAGE = {
    'au01': 'Fair Work Act - Modern Awards Update (about working time, not minimum wage)',
    'th01': 'Labour Protection Act - Domestic Workers (about worker protections, not minimum wage)',
}

with open(r'C:\Users\Phoebe\Desktop\OPENCODE\0826update\data\laws.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

laws = data['laborLawData']
updated = 0

for law in laws:
    lid = law['id']
    if lid in MINIMUM_WAGE_LAWS:
        old_pc = law.get('primaryCategory', '')
        old_sc = law.get('secondaryCategory', '')
        law['primaryCategory'] = '最低工资Minimum Wages'
        law['secondaryCategory'] = ''
        law['category'] = '最低工资Minimum Wages'
        law['categorySource'] = 'AI Classification'
        law['categoryStatus'] = 'confirmed'
        law['classificationReason'] = MINIMUM_WAGE_LAWS[lid]
        updated += 1
        print(f'Updated [{lid}] {law["country"]}: {old_pc} -> 最低工资Minimum Wages')

with open(r'C:\Users\Phoebe\Desktop\OPENCODE\0826update\data\laws.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'\nTotal updated: {updated} laws')
