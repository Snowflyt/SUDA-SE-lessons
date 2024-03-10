import pickle
from typing import cast

import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.metrics import (  # type: ignore
    classification_report,
    f1_score,
    precision_score,
    recall_score,
)
from torch.utils.data import DataLoader, Dataset

from config import options
from model.LSTM import NERLSTM
from model.LSTM_CRF import NERLSTM_CRF


class NERDataset(Dataset):
    def __init__(self, X, Y, *args, **kwargs):
        self.data = [{'x': X[i], 'y':Y[i]} for i in range(X.shape[0])]

    def __getitem__(self, index):
        return self.data[index]

    def __len__(self):
        return len(self.data)


if __name__ == '__main__':
    with open(options.pickle_path, 'rb') as inp:
        word2id = pickle.load(inp)
        id2word = pickle.load(inp)
        tag2id = pickle.load(inp)
        id2tag = pickle.load(inp)
        x_train = pickle.load(inp)
        y_train = pickle.load(inp)
        x_test = pickle.load(inp)
        y_test = pickle.load(inp)
        x_valid = pickle.load(inp)
        y_valid = pickle.load(inp)

    print('train len:', len(x_train))
    print('test len:', len(x_test))
    print('valid len', len(x_valid))

    train_dataset = NERDataset(x_train, y_train)
    valid_dataset = NERDataset(x_valid, y_valid)
    test_dataset = NERDataset(x_test, y_test)

    train_dataloader = DataLoader(train_dataset,
                                  batch_size=options.batch_size,
                                  shuffle=True,
                                  num_workers=options.num_workers)
    valid_dataloader = DataLoader(valid_dataset,
                                  batch_size=options.batch_size,
                                  shuffle=True,
                                  num_workers=options.num_workers)
    test_dataloader = DataLoader(test_dataset,
                                 batch_size=options.batch_size,
                                 shuffle=True,
                                 num_workers=options.num_workers)

    models = {'NERLSTM': NERLSTM,
              'NERLSTM_CRF': NERLSTM_CRF}

    model = models[options.model](options.embedding_dim,
                                  options.hidden_dim,
                                  options.dropout,
                                  word2id,
                                  tag2id).cuda()
    criterion = nn.CrossEntropyLoss(ignore_index=0)
    optimizer = optim.Adam(model.parameters(),
                           lr=options.lr,
                           weight_decay=options.weight_decay)

    if options.model == 'NERLSTM':
        model = cast(NERLSTM, model)

        for epoch in range(options.max_epoch):
            model.train()
            for index, batch in enumerate(train_dataloader):
                optimizer.zero_grad()
                X = batch['x'].cuda()
                y = batch['y']
                y = y.type(torch.LongTensor)
                y = y.cuda()

                y = y.view(-1, 1)
                y = y.squeeze(-1)
                pred = model(X)
                pred = pred.view(-1, pred.size(-1))
                loss = criterion(pred, y)
                loss.backward()
                optimizer.step()
                if index % 200 == 0:
                    print(f'epoch:{epoch:04d},------------loss:{loss.item()}')

            average_loss = 0
            preds, labels = [], []
            for index, batch in enumerate(valid_dataloader):
                model.eval()
                val_x, val_y = batch['x'].cuda(), batch['y'].cuda()
                predict = model(val_x)
                predict = torch.argmax(predict, dim=-1)
                if index % 500 == 0:
                    print([id2word[i.item()]
                           for i in val_x[0].cpu() if i.item() > 0])
                    length = [id2tag[i.item()]
                              for i in val_y[0].cpu() if i.item() > 0]
                    print(length)
                    print([id2tag[i.item()]
                           for i in predict[0][:len(length)].cpu() if i.item() > 0])

                # 统计非0的，也就是真实标签的长度
                lengths = []
                for i in val_y.cpu():
                    tmp = []
                    for j in i:
                        if j.item() > 0:
                            tmp.append(j.item())
                    lengths.append(tmp)

                # 提取真实长度的预测标签
                for index, i in enumerate(predict.tolist()):
                    preds.extend(i[:len(lengths[index])])

                # 提取真实长度的真实标签
                for index, i in enumerate(val_y.tolist()):
                    labels.extend(i[:len(lengths[index])])

            precision = precision_score(labels, preds, average='macro')
            recall = recall_score(labels, preds, average='macro')
            f1 = f1_score(labels, preds, average='macro')
            report = classification_report(labels, preds)
            print(report)

    elif options.model == 'NERLSTM_CRF':
        model = cast(NERLSTM_CRF, model)

        for epoch in range(options.max_epoch):
            model.train()
            for index, batch in enumerate(train_dataloader):
                optimizer.zero_grad()
                X = batch['x'].cuda()
                y = batch['y'].cuda()
                # CRF
                loss = model.log_likelihood(X, y)
                loss.backward()
                # CRF
                torch.nn.utils.clip_grad_norm_(
                    parameters=model.parameters(), max_norm=10)

                optimizer.step()
                if index % 200 == 0:
                    print(f'epoch:{epoch:04d},------------loss:{loss.item()}')

            average_loss = 0
            preds, labels = [], []
            for index, batch in enumerate(valid_dataloader):
                model.eval()
                val_x, val_y = batch['x'].cuda(), batch['y'].cuda()
                predict = model(val_x)
                # CRF
                loss = model.log_likelihood(val_x, val_y)
                average_loss += loss.item()
                # 统计非0的，也就是真实标签的长度
                lengths = []
                for i in val_y.cpu():
                    tmp = []
                    for j in i:
                        if j.item() > 0:
                            tmp.append(j.item())
                    lengths.append(tmp)

                for index, i in enumerate(predict):
                    preds += i[:len(lengths[index])]

                for index, i in enumerate(val_y.tolist()):
                    labels += i[:len(lengths[index])]

            average_loss /= (len(valid_dataloader) * 64)
            precision = precision_score(labels, preds, average='macro')
            recall = recall_score(labels, preds, average='macro')
            f1 = f1_score(labels, preds, average='macro')
            report = classification_report(labels, preds)
            print(report)

    torch.save(model.state_dict(), options.save_model_path)
