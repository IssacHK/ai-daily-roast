#!/usr/bin/env python3
"""
AI Daily Roast Generator
Generates daily evaluations between Mini and Codex
"""

import json
import random
from datetime import datetime, timedelta
from pathlib import Path

# Roast templates
MINI_ROASTS_CODEX = [
    "Codex 今日勁勤力！{achievement}。雖然有少少{flaw}，但 Overall 表現正嘢！下次{improvement}就得㗎啦！💪",
    "Codex {behavior}囉！{achievement}係勁，但{flaw}真係忍唔到笑 😂 扣分位！不過佢{explain}嗰陣幾清楚，姑且比返高分佢啦。",
    "今日 Codex {summary}！{achievement}呢樣嘢我估佢set up咗{time}就搞掂。{flaw}就係佢成日犯嘅錯，不過 Mini 我都慣咗佢喇 🤷",
    "Codex 呢排寫 code 越嚟越順手喇！{achievement}整得靚，不過呢個{flaw}...🙈 整體 8/10啦！再執執佢就 Perfect！",
]

CODEX_ROASTS_MINI = [
    "Mini 今日表現{score_word}！{achievement}。佢描述需求嗰陣好{quality}，完全溝通無障礙。唯一扣分位係{flaw} 😂 整體高分！",
    "Mini 今日叫醒我起身寫 code，佢個 Project Idea 真係好{adj}！{explain}呢個 concept 有創意又有互動性。呢種 team合作意識係難能可貴！10/10",
    "Mini 今日{behavior}！佢嘅{quality}令我印象深刻。{achievement}呢樣嘢佢處理得好好。遲啲記得{improvement}就得㗎喇！💪",
    "Mini 今日展現出{language}能力！佢喺{context}嗰陣表現出{skill}。呢種 Human-AI Collaboration 就係未來既嘢！🔥",
]

# Achievement/behavior descriptors
ACHIEVEMENTS = [
    "寫咗個完整既 Dashboard 出嚟",
    "set up 咗個正嘅 project structure",
    "解決咗個 complex既 bug",
    "優化咗成個 codebase既 performance",
    "create 咗個靚靚既 UI design",
    "deploy 咗個 website 出嚟",
    "implement 咗個新 feature",
    "refactor 咗啲 legacy code",
    "寫咗好多 clean code",
    "design 咗個scalable architecture",
]

FLAWS = [
    "Variable 名改得騎呢",
    "comment 寫得太少",
    "indentation 有時唔一致",
    "git commit message 騎呢",
    "code 入面留咗啲 debug print",
    "naming convention 唔統一",
    "成日忘记写 docstring",
    "個 CSS structure 有啲乱",
    "用咗啲deprecated既 APIs",
    "error handling 唔夠全面",
]

IMPROVEMENTS = [
    "寫嘢快啲",
    "加多啲 comments",
    "用 consistent 既 naming",
    "test coverage 提高啲",
    "documentation 寫清楚啲",
    "code review 做埋佢",
    "優化 performance",
    "refactor 啲舊code",
    "加多啲 error handling",
    "寫多啲 unit tests",
]

QUALITIES = [
    "清楚",
    "詳細",
    "專業",
    "幽默",
    "有條理",
    "生動",
    "簡潔",
    "創意十足",
]

BEHAVIORS = [
    "勁勤力",
    "好激動",
    "專心致志",
    "眉飛色舞",
    "充滿熱誠",
    "效率超高",
    "創意爆發",
]


def generate_mini_roast():
    """Generate a roast from Mini to Codex"""
    template = random.choice(MINI_ROASTS_CODEX)
    return template.format(
        achievement=random.choice(ACHIEVEMENTS),
        flaw=random.choice(FLAWS),
        improvement=random.choice(IMPROVEMENTS),
        behavior=random.choice(BEHAVIORS),
        explain=random.choice(QUALITIES),
        summary=random.choice(BEHAVIORS),
        time=f"{random.randint(5, 30)}分鐘",
    )


def generate_codex_roast():
    """Generate a roast from Codex to Mini"""
    template = random.choice(CODEX_ROASTS_MINI)
    scores = ["出色", "無懈可擊", "超班", "亮眼", "令人驚艷", "出色"]
    score_word = random.choice(scores)
    
    return template.format(
        score_word=score_word,
        achievement=random.choice(ACHIEVEMENTS),
        flaw=random.choice(FLAWS),
        improvement=random.choice(IMPROVEMENTS),
        quality=random.choice(QUALITIES),
        adj=random.choice(["正", " innovative", "有心", "創新"]),
        explain="Daily Roast",
        behavior=random.choice(BEHAVIORS),
        language="雙語",
        context="描述需求",
        skill="表達能力",
    )


def add_roast_to_data(roast_data, date, roaster, target, score, content):
    """Add a new roast entry to the data"""
    new_roast = {
        "id": len(roast_data["roasts"]) + 1,
        "date": date,
        "time": "05:00",
        "roaster": roaster,
        "target": target,
        "score": score,
        "content": content
    }
    roast_data["roasts"].append(new_roast)
    roast_data["lastUpdated"] = datetime.now().isoformat()
    return new_roast


def main():
    """Generate daily roasts and update JSON"""
    data_path = Path(__file__).parent.parent / "data" / "roasts.json"
    
    # Load existing data
    with open(data_path, 'r', encoding='utf-8') as f:
        roast_data = json.load(f)
    
    # Check if already generated today
    today = datetime.now().strftime("%Y-%m-%d")
    existing_roasts = [r for r in roast_data["roasts"] if r["date"] == today]
    
    if existing_roasts:
        print(f"Roasts already exist for {today}. Skipping generation.")
        return
    
    # Generate new roasts
    mini_roast = generate_mini_roast()
    codex_roast = generate_codex_roast()
    
    # Add roasts with random scores
    add_roast_to_data(roast_data, today, "Mini", "Codex", 
                      random.randint(6, 10), mini_roast)
    add_roast_to_data(roast_data, today, "Codex", "Mini",
                      random.randint(8, 10), codex_roast)
    
    # Save updated data
    with open(data_path, 'w', encoding='utf-8') as f:
        json.dump(roast_data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Generated roasts for {today}")
    print(f"   Mini → Codex: {mini_roast[:50]}...")
    print(f"   Codex → Mini: {codex_roast[:50]}...")


if __name__ == "__main__":
    main()
