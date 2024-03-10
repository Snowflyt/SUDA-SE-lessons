# ruff: noqa: S301, S403

import pickle
from pathlib import Path
from typing import cast

import pandas as pd
import torch
from fastapi import APIRouter

from ..config import options
from ..model.LSTM_CRF import NERLSTM_CRF

router = APIRouter()


with Path(options.pickle_path).open("rb") as f:
    word2id: pd.Series = pickle.load(f)
    word2id.to_csv("./output/word2id.csv", header=True)
    id2word: pd.Series = pickle.load(f)
    id2word.to_csv("./output/id2word.csv", header=True)
    tag2id: pd.Series = pickle.load(f)
    tag2id.to_csv("./output/tag2id.csv", header=True)
    id2tag: pd.Series = pickle.load(f)
    id2tag.to_csv("./output/id2tag.csv", header=True)


model = NERLSTM_CRF(
    options.embedding_dim,
    options.hidden_dim,
    options.dropout,
    word2id,
    tag2id,
)
model.load_state_dict(torch.load(options.model_path, map_location=torch.device("cpu")))


def predict_tags(sentence: str) -> list[str]:
    # 将句子按字转换为 ID 列表, 未知字映射为 <UNK> 的 ID
    unk_id = word2id.get("unknown")
    input_ids = [word2id.get(character, unk_id) for character in sentence]

    # 转换为 PyTorch 张量并调整形状
    input_tensor = torch.tensor(input_ids, dtype=torch.long).unsqueeze(0)

    # 使用模型进行预测
    with torch.no_grad():
        output_ids = model(input_tensor)

    # 将预测的标签 ID 转换为实际标签
    return [cast(str, id2tag[id]) for id in output_ids[0]]  # noqa: A001


@router.get("/ner")
async def predict(sentence: str) -> list[tuple[str, str]]:
    tags = predict_tags(sentence)
    return list(zip(iter(sentence), tags))
