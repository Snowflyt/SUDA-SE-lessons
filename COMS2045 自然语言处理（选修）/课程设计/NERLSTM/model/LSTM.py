import torch.nn as nn


class NERLSTM(nn.Module):
    def __init__(self, embedding_dim: int, hidden_dim: int, dropout: float, word2id, tag2id):
        super().__init__()

        self.embedding_dim = embedding_dim
        self.hidden_dim = hidden_dim
        self.vocab_size = len(word2id) + 1
        self.tag_to_ix = tag2id
        self.tagset_size = len(tag2id)

        self.word_embeds = nn.Embedding(self.vocab_size, self.embedding_dim)
        self.dropout = nn.Dropout(dropout)
        self.lstm = nn.LSTM(self.embedding_dim,
                            self.hidden_dim // 2,
                            num_layers=1,
                            bidirectional=True,
                            batch_first=True)
        self.hidden2tag = nn.Linear(self.hidden_dim, self.tagset_size)

    def forward(self, x):
        x.size(0)
        x.size(1)
        embedding = self.word_embeds(x)
        outputs, _ = self.lstm(embedding)
        outputs = self.dropout(outputs)
        outputs = self.hidden2tag(outputs)
        return outputs
