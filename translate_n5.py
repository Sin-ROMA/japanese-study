import json
import subprocess

# N5 원본 데이터 읽기
with open("src/data/jlpt/n5.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# 앞에서부터 10개만 테스트
test_words = data["words"][:10]

results = []

for item in test_words:
    japanese = item["word"]

    prompt = f"""
일본어 단어 "{japanese}"의 한국어 뜻을 알려줘.

규칙:
- 한국어로만 답해줘.
- 가장 일반적인 한국어 뜻을 사용해줘.
- 한 단어 또는 짧은 표현으로 답해줘.
- 설명하지 마.
"""

    result = subprocess.run(
        ["ollama", "run", "qwen3:8b", prompt],
        capture_output=True,
        text=True,
        encoding="utf-8"
    )

    korean = result.stdout.strip()

    results.append({
        "word": japanese,
        "kana": item["kana"],
        "romaji": item["romaji"],
        "meaning": korean,
        "jlptLevel": item["jlptLevel"]
    })

# 테스트 결과 저장
with open("src/data/korean/n5_test.json", "w", encoding="utf-8") as f:
    json.dump(
        {"words": results},
        f,
        ensure_ascii=False,
        indent=2
    )

print("N5 테스트 번역 완료!")
print("10개 단어가 src/data/korean/n5_test.json에 저장되었습니다.")