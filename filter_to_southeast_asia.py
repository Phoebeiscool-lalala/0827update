#!/usr/bin/env python3
"""Filter laws.json to keep only SG/MY/TH, clean metadata, add trilingual fields."""
import json, copy

with open('data/laws.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

KEEP_CODES = {'SG', 'MY', 'TH'}
KEEP_COUNTRIES = {'Singapore', 'Malaysia', 'Thailand'}

# Filter laborLawData
original_count = len(data['laborLawData'])
data['laborLawData'] = [law for law in data['laborLawData'] if law['countryCode'] in KEEP_CODES]
filtered_count = len(data['laborLawData'])

# Update region for all kept laws
for law in data['laborLawData']:
    law['region'] = 'southeast-asia'

# Filter aiMonitorData
data['aiMonitorData'] = [
    item for item in data.get('aiMonitorData', [])
    if item.get('country') in KEEP_COUNTRIES
]

# Rebuild countryNameMap (only SG/MY/TH)
new_cn = {}
for orig, zh in data.get('countryNameMap', {}).items():
    if orig in KEEP_COUNTRIES:
        new_cn[orig] = zh
data['countryNameMap'] = new_cn

# Rebuild countryDetailPages (only SG/MY/TH)
new_dp = {}
for orig, url in data.get('countryDetailPages', {}).items():
    if orig in KEEP_COUNTRIES:
        new_dp[orig] = url
data['countryDetailPages'] = new_dp

# Add summaryEs fields for trilingual support
ES_SUMMARIES = {
    "my01": "El Fondo de Provident de Empleados de Malasia (EPF/KWSP) requiere contribuciones obligatorias de empleadores y empleados para el ahorro de jubilación.",
    "my02": "SOCSO proporciona protección de seguridad social a los empleados contra accidentes laborales y enfermedades ocupacionales.",
    "my03": "El EIS proporciona beneficios de desempleo y asistencia de reempleo a ciudadanos y residentes permanentes malayos.",
    "my4": "HRDF (ahora HRD Corp) requiere que los empleadores con 10+ empleados locales contribuyan con 1% de los salarios para el desarrollo de habilidades.",
    "my05": "La ley de Malasia obliga las vacaciones anuales según los años de servicio: 8 días para <2 años, 12 días para 2-5 años, y 16 días para 5+ años.",
    "my06": "La ley de Malasia obliga las licencias por enfermedad según los años de servicio: 14 días para 1-2 años, 18 días para 2-5 años, y 22 días para 5+ años.",
    "my07": "La enmienda de 2022 aumentó la licencia de maternidad a 98 días (desde 60 días).",
    "my08": "La enmienda de 2022 introdujo 7 días de licencia de paternidad pagada para empleados masculinos casados.",
    "my09": "Las horas extra en días laborables se calculan a 1.5x la tarifa por hora (salario mensual / 208 horas).",
    "my10": "Las horas extra en días de descanso se calculan sobre la tarifa normal: 0.5x la tarifa diaria para las primeras 4 horas.",
    "my11": "Las horas extra en días festivos públicos se calculan a 2x la tarifa diaria para las primeras 8 horas.",
    "my12": "Los empleados con salario ≤RM4,000/mes tienen derecho a indemnización estatutaria según años de servicio.",
    "my13": "Cuando empleador y empleado acuerdan mutuamente terminar el empleo, el empleado tiene derecho al salario del último mes y vacaciones acumuladas.",
    "my14": "Cuando un empleado renuncia voluntariamente, tiene derecho al salario del último mes y vacaciones anuales acumuladas.",
    "my15": "Malasia utiliza tasas impositivas progresivas para residentes fiscales (182+ días en el año calendario).",
    "my16": "Los no residentes (menos de 182 días en Malasia) están sujetos a una tasa fiscal fija del 30%.",
    "sg01": "The Employment Act governs employment relationships in Singapore, covering salary, working hours, leave, and termination provisions.",
    "sg02": "The Central Provident Fund (CPF) requires mandatory contributions from both employers and employees for retirement, housing, and healthcare.",
    "th01": "Thailand's Labour Protection Act provides comprehensive employment protections including working hours, overtime, leave, and termination benefits."
}

for law in data['laborLawData']:
    lid = law['id']
    if lid in ES_SUMMARIES:
        law['summaryEs'] = ES_SUMMARIES[lid]

print(f"Original laws: {original_count}")
print(f"Filtered laws: {filtered_count}")
print(f"Countries kept: {sorted(KEEP_COUNTRIES)}")
print(f"AI Monitor entries: {len(data['aiMonitorData'])}")
print(f"Country names: {list(data['countryNameMap'].keys())}")

with open('data/laws.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("✅ data/laws.json updated")
