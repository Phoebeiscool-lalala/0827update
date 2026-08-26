#!/usr/bin/env python3
"""Add hrActionRequired and hrActionSummary fields to laws.json."""
import json, sys, io
from datetime import datetime, timedelta
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# HR Action Required rules based on regulation type
HR_ACTION_RULES = {
    # Minimum Wage - always requires HR action
    '最低工资Minimum Wages': {
        'hrActionRequired': True,
        'hrActionSummary': {
            'zh': '调整员工最低工资标准；检查受影响员工范围；更新Payroll参数',
            'en': 'Adjust employee minimum wage settings; Check affected employee scope; Update Payroll parameters'
        }
    },
    # Social Security - always requires HR action
    '法定缴费类Social Security / Statutory Funds': {
        'hrActionRequired': True,
        'hrActionSummary': {
            'zh': '调整社保缴费参数；更新Payroll系统；通知员工变更',
            'en': 'Adjust social security contribution parameters; Update Payroll system; Notify employees of changes'
        }
    },
    # Leave - requires HR action if status is upcoming
    '休假类Leave': {
        'hrActionRequired': True,
        'hrActionSummary': {
            'zh': '更新休假政策；调整HR系统配置；通知员工新休假权益',
            'en': 'Update leave policies; Adjust HR system configuration; Notify employees of new leave entitlements'
        }
    },
    # Termination - requires HR action
    '离职与遣散Termination & Severance': {
        'hrActionRequired': True,
        'hrActionSummary': {
            'zh': '更新离职补偿计算规则；调整HR系统；培训HR团队',
            'en': 'Update severance calculation rules; Adjust HR systems; Train HR team'
        }
    },
    # Working Time - may require HR action
    '工时与加班Working Time & Overtime': {
        'hrActionRequired': True,
        'hrActionSummary': {
            'zh': '更新工时和加班政策；调整考勤系统；通知员工',
            'en': 'Update working time and overtime policies; Adjust attendance systems; Notify employees'
        }
    },
    # Income Tax - requires HR action
    '个税Income Tax': {
        'hrActionRequired': True,
        'hrActionSummary': {
            'zh': '更新个税计算参数；调整Payroll系统；通知员工',
            'en': 'Update income tax calculation parameters; Adjust Payroll system; Notify employees'
        }
    }
}

with open(r'C:\Users\Phoebe\Desktop\OPENCODE\0826update\data\laws.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

laws = data['laborLawData']
updated = 0

for law in laws:
    pc = law.get('primaryCategory', '')
    status = law.get('status', '')
    effective_date = law.get('effectiveDate', '')
    
    # Only mark as HR action required if status is upcoming or action-required
    if status in ['upcoming', 'action-required'] and pc in HR_ACTION_RULES:
        rule = HR_ACTION_RULES[pc]
        law['hrActionRequired'] = True
        law['hrActionSummary'] = rule['hrActionSummary']
        updated += 1
    else:
        law['hrActionRequired'] = False
        law['hrActionSummary'] = {'zh': '', 'en': ''}

with open(r'C:\Users\Phoebe\Desktop\OPENCODE\0826update\data\laws.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Updated {updated} laws with hrActionRequired=true')
print(f'Total laws: {len(laws)}')
