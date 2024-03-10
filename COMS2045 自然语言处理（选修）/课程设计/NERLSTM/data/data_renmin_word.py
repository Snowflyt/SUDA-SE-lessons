# -*- coding: UTF-8 -*-
import codecs
import pickle
import re
from typing import Iterable, Iterator, List, Set, Union, cast

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split  # type: ignore


def origin_handler() -> None:
    with open('./renmin.txt', 'r') as inp, open('./renmin2.txt', 'w') as outp:
        for line in inp.readlines():
            words = line.split('  ')
            i = 1
            while i < len(words) - 1:
                if words[i][0] == '[':
                    outp.write(words[i].split('/')[0][1:])
                    i += 1
                    while i < len(words) - 1 and words[i].find(']') == -1:
                        if words[i] != '':
                            outp.write(words[i].split('/')[0])
                        i += 1
                    outp.write(words[i].split('/')[0].strip() + '/'
                               + words[i].split('/')[1][-2:] + ' ')
                elif words[i].split('/')[1] == 'nr':
                    word = words[i].split('/')[0]
                    i += 1
                    if i < len(words) - 1 and words[i].split('/')[1] == 'nr':
                        outp.write(word + words[i].split('/')[0] + '/nr ')
                    else:
                        outp.write(word + '/nr ')
                        continue
                else:
                    outp.write(words[i] + ' ')
                i += 1
            outp.write('\n')


def origin_handler2() -> None:
    with codecs.open('./renmin2.txt', 'r', 'utf-8') as inp, \
            codecs.open('./renmin3.txt', 'w', 'utf-8') as outp:
        for line in inp.readlines():
            words = line.split(' ')
            i = 0
            while i < len(words) - 1:
                if words[i] == '':
                    i += 1
                    continue
                word, tag = words[i].split('/')
                if tag == 'nr' or tag == 'ns' or tag == 'nt':
                    outp.write(word[0] + '/B_' + tag + ' ')
                    for j in word[1:len(word)-1]:
                        if j != ' ':
                            outp.write(j + '/M_' + tag + ' ')
                    outp.write(word[-1] + '/E_' + tag + ' ')
                else:
                    for char in word:
                        outp.write(char + '/O ')
                i += 1
            outp.write('\n')


def sentence2split() -> None:
    with open('./renmin3.txt', 'r') as inp, \
            codecs.open('./renmin4.txt', 'w', 'utf-8') as outp:
        texts = inp.read()  # .decode('utf-8')
        sentences = re.split('[，。！？、‘’“”:]/[O]', texts)
        for sentence in sentences:
            if sentence != " ":
                outp.write(sentence.strip()+'\n')


def data2pkl() -> None:
    data: List[List[str]] = []
    labels: List[List[str]] = []
    line_data: List[str] = []
    line_labels: List[str] = []
    tag_set: Set[str] = set()
    tag_set.add('')
    input_data = codecs.open('renmin4.txt', 'r', 'utf-8')
    for line in input_data.readlines():
        words = line.split()
        line_data = []
        line_labels = []
        num_not_0 = 0
        for word in words:
            word, tag = word.split('/')
            line_data.append(word)
            line_labels.append(tag)
            tag_set.add(tag)
            if tag != 'O':
                num_not_0 += 1
        if num_not_0 != 0:
            data.append(line_data)
            labels.append(line_labels)

    input_data.close()
    print(len(data))
    print(len(labels))

    def flat_gen(data: Union[Iterable[Iterable[str]], Iterable[str]]) -> Iterator[str]:
        def iselement(e: Union[Iterable[str], str]) -> bool:
            return isinstance(e, str)
        for el in data:
            if iselement(el):
                yield cast(str, el)
            else:
                yield from flat_gen(cast(Iterable[str], el))

    all_words = [i for i in flat_gen(data)]
    set_words = pd.Series(all_words).value_counts().index
    set_ids = range(1, len(set_words) + 1)

    tags = [i for i in tag_set]
    tag_ids = range(len(tags))
    word2id: pd.Series[int] = pd.Series(set_ids, index=set_words)
    id2word: pd.Series[str] = pd.Series(set_words, index=set_ids)
    tag2id: pd.Series[int] = pd.Series(tag_ids, index=tags)
    id2tag: pd.Series[str] = pd.Series(tags, index=tag_ids)
    word2id['unknown'] = len(word2id) + 1
    id2word[len(word2id)] = 'unknown'
    print(tag2id)
    max_len = 60

    def X_padding(words: List[str]) -> List[int]:
        ids = list(cast(pd.Series[int], word2id[words]))
        if len(ids) >= max_len:
            return ids[:max_len]
        ids.extend([0] * (max_len - len(ids)))
        return ids

    def y_padding(tags: List[str]) -> List[int]:
        ids = list(cast(pd.Series[int], tag2id[tags]))
        if len(ids) >= max_len:
            return ids[:max_len]
        ids.extend([0] * (max_len - len(ids)))
        return ids

    df_data = pd.DataFrame({'words': data, 'tags': labels},
                           index=range(len(data)))
    df_data['x'] = df_data['words'].apply(X_padding)
    df_data['y'] = df_data['tags'].apply(y_padding)
    x = np.asarray(list(df_data['x'].values))
    y = np.asarray(list(df_data['y'].values))

    x_train, x_test, y_train, y_test = \
        train_test_split(x, y, test_size=0.2, random_state=43)
    x_train, x_valid, y_train, y_valid = \
        train_test_split(x_train, y_train,  test_size=0.2, random_state=43)

    with open('../renmin_data.pkl', 'wb') as outp:
        pickle.dump(word2id, outp)
        pickle.dump(id2word, outp)
        pickle.dump(tag2id, outp)
        pickle.dump(id2tag, outp)
        pickle.dump(x_train, outp)
        pickle.dump(y_train, outp)
        pickle.dump(x_test, outp)
        pickle.dump(y_test, outp)
        pickle.dump(x_valid, outp)
        pickle.dump(y_valid, outp)

    print('** Finished saving the data.')


if __name__ == '__main__':
    origin_handler()
    origin_handler2()
    sentence2split()
    data2pkl()
