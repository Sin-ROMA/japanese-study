import os
import json
import time
import requests

API_KEY = os.getenv("DEEPL_API_KEY")

if not API_KEY:
    print("❌ DEEPL_API_KEY를 찾을 수 없습니다.")
    exit()

INPUT_FILE = "src/data/jlpt/n1.json"
OUTPUT_FILE = "src/data/jlpt/n1_ko.json"

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]

# 기존 번역 결과가 있으면 이어서 작업
if os.path.exists(OUTPUT_FILE):
    with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
        saved_data = json.load(f)

    translations = saved_data.get("words", [])
else:
    translations = []

start_index = len(translations)

print(f"📚 전체 N5 단어: {len(words)}개")
print(f"🔄 이미 번역된 단어: {start_index}개")
print(f"▶️ {start_index + 1}번째 단어부터 시작합니다.")
print()

url = "https://api-free.deepl.com/v2/translate"

for i in range(start_index, len(words)):
    item = words[i]
    meaning = item["meaning"]

    while True:
        try:
            response = requests.post(
                url,
                headers={
                    "Authorization": f"DeepL-Auth-Key {API_KEY}"
                },
                data={
                    "text": meaning,
                    "source_lang": "EN",
                    "target_lang": "KO"
                },
                timeout=30
            )

            if response.status_code != 200:
                print(f"❌ API 오류: {response.status_code}")
                print(response.text)
                print("10초 후 다시 시도합니다...")
                time.sleep(10)
                continue

            result = response.json()
            korean = result["translations"][0]["text"]

            new_item = item.copy()
            new_item["koreanMeaning"] = korean

            translations.append(new_item)

            # 번역할 때마다 바로 저장
            with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
                json.dump(
                    {"words": translations},
                    f,
                    ensure_ascii=False,
                    indent=2
                )

            print(f"[{i + 1}/{len(words)}] {item['word']} → {korean}")

            break

        except requests.exceptions.RequestException as e:
            print()
            print("⚠️ 인터넷 연결 문제가 발생했습니다.")
            print("10초 후 자동으로 다시 시도합니다...")
            time.sleep(10)

print()
print("================================")
print("✅ 번역 완료!")
print(f"📁 저장 위치: {OUTPUT_FILE}")
print("================================")