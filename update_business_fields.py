#!/usr/bin/env python3
"""Update Malaysia laws with cloud document structured data."""
import json
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Business fields from cloud document
BUSINESS_FIELDS = {
    "my01": {
        "zh": {
            "覆盖人群": "本国员工、外派员工",
            "责任主体": "双边缴纳（雇主+雇员）",
            "雇主费率": "月薪≤RM5,000：13%；月薪>RM5,000：12%；外派：2%",
            "雇员费率": "本国：11%；外派：2%",
            "缴费基数": "税前合计（Total Gross）",
            "缴费上限": "无上限",
            "申报频次": "每月一次",
            "备注": "外国人：强制（2025年10月起改为2%+2%）"
        },
        "en": {
            "Covered Population": "Local employees, Expatriate employees",
            "Responsible Party": "Bilateral (Employer + Employee)",
            "Employer Rate": "Monthly wage ≤ RM5,000: 13%; Monthly wage > RM5,000: 12%; Expat: 2%",
            "Employee Rate": "Local: 11%; Expat: 2%",
            "Contribution Base": "Total Gross",
            "Contribution Cap": "No cap",
            "Filing Frequency": "Monthly",
            "Remarks": "Foreign workers: Mandatory (from Oct 2025, changed to 2%+2%)"
        }
    },
    "my02": {
        "zh": {
            "覆盖人群": "本国员工、外派员工",
            "责任主体": "双边缴纳（雇主+雇员）",
            "雇主费率": "本国：约1.75%；外派：约1.25%",
            "雇员费率": "本国：约0.5%；外派：0.5%",
            "缴费基数": "税前合计（Total Gross）",
            "缴费上限": "基数上限：RM6,000",
            "申报频次": "每月一次",
            "备注": "本国人/PR：第一类（工伤+残疾）；自2024年7月，绝大部分60岁以下外国雇员也含在第一类中"
        },
        "en": {
            "Covered Population": "Local employees, Expatriate employees",
            "Responsible Party": "Bilateral (Employer + Employee)",
            "Employer Rate": "Local: ~1.75%; Expat: ~1.25%",
            "Employee Rate": "Local: ~0.5%; Expat: 0.5%",
            "Contribution Base": "Total Gross",
            "Contribution Cap": "Base cap: RM6,000",
            "Filing Frequency": "Monthly",
            "Remarks": "Local/PR: Category 1 (Work Injury + Disability); From July 2024, most foreign employees under 60 also included in Category 1"
        }
    },
    "my03": {
        "zh": {
            "覆盖人群": "本国员工（仅限马来西亚公民和永久居民）",
            "责任主体": "双边缴纳（雇主+雇员）",
            "雇主费率": "0.20%",
            "雇员费率": "0.20%",
            "缴费基数": "税前合计（Total Gross）",
            "缴费上限": "基数上限：RM6,000",
            "申报频次": "每月一次",
            "备注": "外籍员工目前不适用此计划"
        },
        "en": {
            "Covered Population": "Local employees (Malaysian citizens and PR only)",
            "Responsible Party": "Bilateral (Employer + Employee)",
            "Employer Rate": "0.20%",
            "Employee Rate": "0.20%",
            "Contribution Base": "Total Gross",
            "Contribution Cap": "Base cap: RM6,000",
            "Filing Frequency": "Monthly",
            "Remarks": "Foreign employees currently not applicable"
        }
    },
    "my04": {
        "zh": {
            "覆盖人群": "本国员工",
            "责任主体": "仅雇主侧",
            "雇主费率": "1%",
            "雇员费率": "0%",
            "缴费基数": "基本工资+固定津贴（不含加班费和奖金）",
            "申报频次": "每月一次",
            "备注": "雇主侧的强制性培训基金，用于员工技能提升；所有行业（雇佣10名及以上本地员工强制），仅针对本地员工计算"
        },
        "en": {
            "Covered Population": "Local employees",
            "Responsible Party": "Employer only",
            "Employer Rate": "1%",
            "Employee Rate": "0%",
            "Contribution Base": "Basic salary + fixed allowance (overtime and bonus excluded)",
            "Filing Frequency": "Monthly",
            "Remarks": "Mandatory training fund for employer side, used for employee skill development; All industries (mandatory for 10+ local employees), calculated for local employees only"
        }
    },
    "my05": {
        "zh": {
            "资格条件": "员工须在每12个月连续服务后获得；如果未满一年离职，应按比例折算",
            "休假天数": "工龄<2年：8天；2年≤工龄<5年：12天；工龄≥5年：16天",
            "薪资支付": "雇主100%支付；基本工资/26天×未休年假天数",
            "备注": "未休年假在次年12个月后自动作废，除非合同另有规定"
        },
        "en": {
            "Eligibility": "Employee must complete 12 months of continuous service; Pro-rated if leaving before 1 year",
            "Entitlement": "Tenure <2 years: 8 days; 2≤Tenure<5 years: 12 days; Tenure ≥5 years: 16 days",
            "Pay Treatment": "Employer pays 100%; Basic salary/26 days × unused leave days",
            "Remarks": "Unused leave expires after 12 months in the following year, unless contract states otherwise"
        }
    },
    "my06": {
        "zh": {
            "资格条件": "依工龄而定；必须由注册医生或牙医开具证明（MC），且必须在48小时内通知雇主",
            "休假天数": "工龄1-2年：14天；工龄2-5年：18天；工龄>5年：22天；长期病假/住院假：最多60天",
            "薪资支付": "雇主100%支付"
        },
        "en": {
            "Eligibility": "Based on tenure; Must be certified by registered doctor/dentist (MC), must notify employer within 48 hours",
            "Entitlement": "Tenure 1-2 years: 14 days; Tenure 2-5 years: 18 days; Tenure >5 years: 22 days; Long-term/hospitalization: up to 60 days",
            "Pay Treatment": "Employer pays 100%"
        }
    },
    "my07": {
        "zh": {
            "资格条件": "分娩前9个月内至少受雇满90天；分娩前4个月内至少受雇满1天；存活子女少于5名",
            "休假天数": "98天连续假期，最早可在预产期前30天开始",
            "薪资支付": "雇主100%支付"
        },
        "en": {
            "Eligibility": "Employed for at least 90 days in the 9 months before delivery; Employed for at least 1 day in the 4 months before delivery; Fewer than 5 surviving children",
            "Entitlement": "98 consecutive days, can start up to 30 days before expected delivery date",
            "Pay Treatment": "Employer pays 100%"
        }
    },
    "my08": {
        "zh": {
            "资格条件": "仅限已婚男性员工，且在同一雇主处服务满12个月；仅限首5次分娩（无论配偶数量）；需在预产期前至少30天通知雇主",
            "休假天数": "7天连续假期（含休息日和公假）",
            "薪资支付": "雇主100%支付"
        },
        "en": {
            "Eligibility": "Married male employees only, served 12+ months with same employer; First 5 deliveries only (regardless of number of spouses); Must notify employer at least 30 days before expected delivery",
            "Entitlement": "7 consecutive days (including rest days and public holidays)",
            "Pay Treatment": "Employer pays 100%"
        }
    },
    "my09": {
        "zh": {
            "计算规则": "小时工资=月薪/208；1.5倍时薪",
            "加班上限": "每日加班不超过4小时（含工时总计不超12小时）；104小时/月",
            "适用范围": "月薪RM4,000及以下的员工强制适用；月薪超过RM4,000除非合同另有规定"
        },
        "en": {
            "Calculation Rules": "Hourly wage = Monthly salary/208; 1.5x hourly rate",
            "Maximum Limits": "Max 4 hours OT per day (total max 12 hours); 104 hours/month",
            "Scope": "Mandatory for employees earning ≤RM4,000/month; For >RM4,000, only if contract specifies"
        }
    },
    "my10": {
        "zh": {
            "计算规则": "4小时内：0.5倍日薪=0.5×月薪/26；4-8小时：1倍日薪；8小时外：2倍时薪=2×月薪/208",
            "备注": "休息日加班费是在月薪基础上额外支付的"
        },
        "en": {
            "Calculation Rules": "Within 4 hours: 0.5x daily wage = 0.5×Monthly/26; 4-8 hours: 1x daily wage; Beyond 8 hours: 2x hourly rate = 2×Monthly/208",
            "Remarks": "Rest day OT pay is additional to monthly salary"
        }
    },
    "my11": {
        "zh": {
            "计算规则": "8小时内：2倍日薪；8小时外：3倍时薪=3×月薪/208"
        },
        "en": {
            "Calculation Rules": "Within 8 hours: 2x daily wage; Beyond 8 hours: 3x hourly rate = 3×Monthly/208"
        }
    },
    "my12": {
        "zh": {
            "通知期": "连续服务年限不满2年：4周（28天）；2年≤工龄<5年：6周（42天）；5年及以上：8周（56天）；违纪解雇：无需通知",
            "离职补偿": "月薪≤RM4,000或特定体力劳动岗位：不满2年：10天工资；2年≤工龄<5年：15天工资；5年及以上：20天工资",
            "结算项目": "离职当月薪资、未休年假折现、未使用通知期补偿、离职补偿金",
            "结算时间": "所有款项必须在合同终止之日起7天内结清"
        },
        "en": {
            "Notice Period": "Tenure <2 years: 4 weeks (28 days); 2≤Tenure<5 years: 6 weeks (42 days); Tenure ≥5 years: 8 weeks (56 days); Misconduct: no notice required",
            "Severance Pay": "Monthly salary ≤RM4,000 or specific manual labor: <2 years: 10 days; 2≤Tenure<5 years: 15 days; ≥5 years: 20 days",
            "Final Pay Components": "Final month salary, unused leave payout, notice period compensation, severance pay",
            "Settlement Timeline": "All payments must be settled within 7 days of contract termination"
        }
    },
    "my13": {
        "zh": {
            "触发条件": "BP与员工协商离职补偿金",
            "结算项目": "离职当月薪资、未休年假折现、协商离职补偿金"
        },
        "en": {
            "Trigger Conditions": "BP negotiates severance with employee",
            "Final Pay Components": "Final month salary, unused leave payout, negotiated severance"
        }
    },
    "my14": {
        "zh": {
            "结算项目": "离职当月薪资、未休年假折现"
        },
        "en": {
            "Final Pay Components": "Final month salary, unused leave payout"
        }
    },
    "my15": {
        "zh": {
            "覆盖人群": "税务居民（在一个日历年内在马来西亚境内累计居住满182天）",
            "税率结构": "0-5,000RM：0%；5,001-20,000RM：1%；20,001-35,000RM：3%；35,001-50,000RM：6%；50,001-100,000RM：11%/19%；100,001-400,000RM：25%；400,001-2,000,000RM：26%/28%；>2,000,000RM：30%",
            "备注": "在马来西亚境内一个日历年超过182天的为税收居民，未超过的为非税收居民"
        },
        "en": {
            "Covered Population": "Tax Residents (residing in Malaysia for 182+ days in a calendar year)",
            "Tax Rate Structure": "0-5,000 MYR: 0%; 5,001-20,000: 1%; 20,001-35,000: 3%; 35,001-50,000: 6%; 50,001-100,000: 11%/19%; 100,001-400,000: 25%; 400,001-2,000,000: 26%/28%; >2,000,000: 30%",
            "Remarks": "Residing in Malaysia for 182+ days in a calendar year = Tax Resident; otherwise Non-Resident"
        }
    },
    "my16": {
        "zh": {
            "覆盖人群": "非税务居民（居住不满182天）",
            "税率": "固定30%"
        },
        "en": {
            "Covered Population": "Non-Residents (residing less than 182 days)",
            "Tax Rate": "Flat 30%"
        }
    }
}

# Load data
with open(r'C:\Users\Phoebe\Desktop\OPENCODE\0826update\data\laws.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

laws = data['laborLawData']

# Update Malaysia laws
updated = 0
for law in laws:
    lid = law['id']
    if lid in BUSINESS_FIELDS:
        law['businessFields'] = BUSINESS_FIELDS[lid]
        updated += 1
        print(f'Updated {lid}: {law["country"]} - {law["law"][:50]}')

# Save
with open(r'C:\Users\Phoebe\Desktop\OPENCODE\0826update\data\laws.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'\nTotal updated: {updated} Malaysia laws')
