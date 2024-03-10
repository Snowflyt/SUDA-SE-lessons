import json
import math
from pathlib import Path


def load_word_freq_from_json(json_file: str) -> dict[str, float]:
    with Path(json_file).open("r", encoding="utf-8") as f:
        return json.load(f)


def bigram_word_segmentation(text: str, word_freq: dict[str, float]) -> list[str]:
    n = len(text)
    dp: list[float] = [0] * (n + 1)
    seg_point = [0] * n
    dp[-1] = 0

    for i in range(n - 1, -1, -1):
        max_prob = -1e10
        max_index = i
        for j in range(i + 1, n + 1):
            word = text[i:j]
            prob = math.log(word_freq.get(word, 1e-3)) + dp[j]
            if prob > max_prob:
                max_prob = prob
                
                max_index = j
        dp[i] = max_prob
        seg_point[i] = max_index

    seg_result = []
    index = 0
    while index < n:
        seg_result.append(text[index : seg_point[index]])
        index = seg_point[index]

    return seg_result


if __name__ == "__main__":
    text = "中国人民从此站起来了"
    word_freq = load_word_freq_from_json("./bigrams_freq.json")

    segmented_text = bigram_word_segmentation(text, word_freq)
    print(segmented_text)
