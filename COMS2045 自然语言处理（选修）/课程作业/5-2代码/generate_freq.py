import json
from pathlib import Path


def extract_bigrams_from_txt(file_path: str):
    bigrams = {}
    with Path(file_path).open("r", encoding="utf-8") as f:
        for line in f:
            word, _, freq = line.strip().split()
            if len(word) == 2:
                bigrams[word] = int(freq)
    return bigrams


def save_bigrams_to_json(bigrams: dict[str, int], output_file: str):
    with Path(output_file).open("w", encoding="utf-8") as f:
        json.dump(bigrams, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    file_path = "./corpus.txt"  # 词频库的文件夹路径
    bigrams = extract_bigrams_from_txt(file_path)

    output_file = "./bigrams_freq.json"  # 输出的JSON文件名
    save_bigrams_to_json(bigrams, output_file)

    print(f"已将所有二字词汇及其词频保存到 {output_file} 文件中")
