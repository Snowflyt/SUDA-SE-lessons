# 汉语逆向最大分词

## 介绍

平时的另一个小作业，需要做逆向最大分词。代码是用 Node.js 写的，没有用 Python，主要是因为这代码之前在信息检索综合实践课上写过一模一样的，当时用的 TS 写的，所以就复制过来了。

代码全写在 `./src/main.ts` 和 `./src/utils.ts` 里了。里面有一些地方用了 JS 比较 fancy 的一些特性，可以不用理它们。并且有一些函数就是负责琐碎的文件读取和保存的，不是特别重要，也可以不用关心。

### 逆向最大分词算法

实际上逆向最大分词的算法就是下面这段代码：

```typescript
/**
 * Use the backward maximum matching algorithm to segment.
 * @param text The text to be segmented.
 * @param possibleWords All words in the dictionary.
 * @param maxWordLength The length of the longest word in the dictionary.
 */
export const backwardMaximumMatching = (
  text: string,
  possibleWords: string[],
  maxWordLength: number,
): string[] => {
  const result: string[] = [];
  const possibleWordsSet = new Set(possibleWords);

  let index = text.length; // The index of the current character
  while (index > 0) {
    let length = Math.min(index, maxWordLength); // The length of the current word
    let word = text.slice(index - length, index); // the current word

    // If the current word is not in the dictionary.
    while (length > 1 && !possibleWordsSet.has(word)) {
      length--;
      word = text.slice(index - length, index);
    }

    result.unshift(word);
    index -= word.length;
  }

  return result;
};
```

这段代码应该挺好看懂的，就算没有任何 JS 经验也可以当伪代码看。这里的 `String#slice` 方法就类似 Python 中的数组切片，也是支持负数下标的。而这里的 `Array#unshift` 方法在数组头部插入元素，类似 Python 中的 `list.insert(0, element)`. 顺便一提，JS 中的这个数组（Array）与 C、Java 等里面的那个数组不同，它实际上是可变的，反而和 Python 中的 list 更像。然后，这里的 Set 也和 Python 中的那个 set 是一个意思。

这段代码实现基本上完全按照逆向最大分词的定义来写的，就是从最后一个字开始向前，每次取最长的词，如果这个词不在词典里，就把它切掉一点，直到它在词典里为止。这里的 `possibleWords` 就是词典里的所有词， `maxWordLength` 就是词典里最长的词的长度。这里的 `result` 就是分词的结果，是一个字符串数组，每个元素就是一个词。

另外可以注意到，这里一开始使用了 `let length = Math.min(index, maxWordLength);`，这是考虑到分词到最开头几个字的情况，这个时候如果直接取最长的词，就会超出字符串的下标，到时候 `text.slice(index - length, index)` 中的这个 `index - length` 就变成负数了，就会从字符串的最末端取几个字补进来，这就不对了，因此需要取 `index` 和 `maxWordLength` 中较小的那个数。

### 评价分词结果

上面的逆向最大匹配还是挺简单的，复杂的反而是计算分词正确率、召回率及 F-测度的代码：

```typescript
/**
 * Evaluate the segmentation result (P / R / F1).
 * @param result Segmentation result array.
 * @param answer Manual segmentation result array.
 */
export const evaluate = (
  result: string[],
  answer: string[],
): {
  precisionFraction: [number, number];
  precision: number;
  recallFraction: [number, number];
  recall: number;
  f1: number;
} => {
  const forwardIdx = (words: string[], wordIdx: number, charIdx: number) => {
    if (charIdx < words[wordIdx].length - 1) {
      return [wordIdx, charIdx + 1];
    } else {
      return [wordIdx + 1, 0];
    }
  };

  const isCharAligned = (
    resultWords: string[],
    answerWords: string[],
    resultWordIdx: number,
    answerWordIdx: number,
    resultCharIdx: number,
    answerCharIdx: number,
  ) => {
    return (
      resultCharIdx === 0 &&
      answerCharIdx === 0 &&
      resultWords[resultWordIdx][0] === answerWords[answerWordIdx][0]
    );
  };

  return (() => {
    let resultWordIdx = 0;
    let answerWordIdx = 0;
    let resultCharIdx = 0;
    let answerCharIdx = 0;

    let correct = 0;

    while (resultWordIdx < result.length && answerWordIdx < answer.length) {
      if (result[resultWordIdx] === answer[answerWordIdx]) {
        // If the current word is correct, forward word index, and reset char index.
        correct++;
        resultWordIdx++;
        answerWordIdx++;
        resultCharIdx = 0;
        answerCharIdx = 0;
      } else {
        // Forward the index until the first character of the word is aligned.
        do {
          [resultWordIdx, resultCharIdx] = forwardIdx(
            result,
            resultWordIdx,
            resultCharIdx,
          );
          [answerWordIdx, answerCharIdx] = forwardIdx(
            answer,
            answerWordIdx,
            answerCharIdx,
          );
        } while (
          resultWordIdx < result.length &&
          answerWordIdx < answer.length &&
          !isCharAligned(
            result,
            answer,
            resultWordIdx,
            answerWordIdx,
            resultCharIdx,
            answerCharIdx,
          )
        );
      }
    }

    const precisionFraction: [number, number] = [correct, result.length];
    const precision = correct / result.length;
    const recallFraction: [number, number] = [correct, answer.length];
    const recall = correct / answer.length;
    const f1 = (2 * precision * recall) / (precision + recall);

    return { precisionFraction, precision, recallFraction, recall, f1 };
  })();
};
```

该函数接受分词结果`result`和人工分词结果`answer`，并输出对应的 P/R/F 值。另外，为了表示得更精确，这里还会输出一个分数形式的正确率和召回率，就是这里的`precisionFraction`和`recallFraction`，它们是一个分数的数组，第一个元素是分子，第二个元素是分母。

下面详细解释一下这个函数的工作原理：

首先解释这段代码的大致逻辑。我们定义四个变量 resultWordIdx、answerWordIdx、resultCharIdx 和 answerCharIdx，分别表示当前 result 数组中所选择字符串的下标，当前 answer 数组中所选择字符串的下标，当前 result 数组中所选择字符串的当前所选字符的下标，当前 answer 数组中所选择字符串的当前所选字符的下标。同时，还定义一个变量 correct，用来表示当前判断为匹配的词的数量。

一开始的时候，分别读取两个数组的第一个字符串，假设现在这两个字符串相同，这里的 correct++，表示相等词数量加 1，然后两个 wordIdx 加 1，进入下面的两个字符串判断。

假设这个时候，两个字符串不相等了，那么进入 else 分支，让字符（注意不是字符串）不断加 1（即两个 charIdx 同时加 1，如果某个 charIdx 加 1 时大于了当前字符串的长度，则 wordIdx 加 1 并且 charIdx 归零），直到两个字符对齐。

这里这么定义对齐：对齐指两个字符的 charIdx 都是 0（换言之，都在一个词组的开头），并且这两个字符相等。因为显而易见，只有当两个词组的第一个字符相等时，才有可能这两个词组相等（注意，这里必须要判断这两个 charIdx 是否为 0，否则有可能出现虽然两个字符相等，但两个 charIdx 不同，显然这两个词组不同）。

这里使用了 `do { … } while { … }` 循环的目的是让这个 charIdx 加 1 的行为至少执行一次。因为在上面的例子中，最开始进入 else 分支时，两个词组的第一个字符显然是相等的，这时若使用 `while { … }`，就会发现 charIdx 没有加 1，会陷入死循环。这里不想用定义一个 flag 等不太优雅的方式解决问题，所以使用了一个 `do { … } while { … }` 循环。

为什么要这么复杂？因为我们要通过字符每次都前进 1 来严格保证字符的对齐。否则，如果出现类似于“中国人民”和“中国”“人民”这样的情况，就可能导致中间出现意外的、字符未对齐的情况，那么后面很多本应该正确匹配的词都会因为字符没对齐而被判断为不匹配。

考虑下面这种情况：“中国人民”“解放”“军”“万岁”和“中国”“人民”“解放军”“万岁”。首先我们判断“中国人民”和“中国”不匹配，然后程序不断 charIdx 直到对齐的字符“解”，因为在这里第一个字符相等，然后 charIdx 也都是 0。但是，在下一轮循环中，发现“解放”不等于“解放军”，因此继续到下一个对齐的字符“万”，此时发现两个词都是“万岁”，因此判断相等。

现在，就很容易解释代码的实现了。首先在函数中通过闭包定义了两个辅助函数 `forwardIdx()` 和 `isCharAligned()`，分别负责上面所说的“字符加 1”和“判断字符是否对齐”。然后在主要部分中通过循环统计正确词的数量。最后返回准确率的分子分母、准确率、召回率的分子分母、召回率以及 F.

这里的实现可能有不少冗余的地方，但通过每次只令字符增 1 严格保证了不会出现意外情况，因此该实现应当是准确的。

这样就实现了分词算法与评价算法。

### 数据从哪儿来？

数据实际上是从大一那门“信息检索”课里抠出来的。数据有三份，都包含在这里的 `./data/` 文件夹里了。 `corpus.dict.txt` 就是词典文件，里面是所有可能的词；`corpus.sentence.txt` 是要处理的文本，然后 `corpus.answer.txt` 是人工分词后的这段文本。

这个程序的目的就是输入 `corpus.dict.txt` 中的词典和 `corpus.sentence.txt` 中未分词的文本，然后输出一个分词后的文本，并且与 `corpus.answer.txt` 中人工分好词的文本相比对，得到其 P/R/F 值。

程序运行的时候会从 `./data/` 文件夹中读取这三个文件，分词后的文本会输出到 `./data/corpus.out.txt` 中。然后会在终端打印计算出的 P/R/F 值。

我运行的时候，终端打印的内容是这样的：

```
Dictionary loaded in 4ms.
Source loaded in 4ms.
Processed loaded in 4ms.

Backward maximum matching finished in 85ms.
Precision = 20273 / 20404 = 99.3580%
Recall = 20273 / 20454 = 99.1151%
F1 = 99.2364%
Result saved in 19ms.
```

可以看到准确率是 99.3580%，召回率是 99.1151%，F 值是 99.2364%。至于为什么这么高，我也不知道，可能是因为当时信息检索课上给的这个词典针对性太强了。代码实现应该没问题。

### 测试

顺便我还在 `./tests/utils.test.ts` 中编写了相关测试，可以通过 `npm run test` 来运行测试。这也是为什么我敢肯定我写的逆向最大匹配算法应该是没有问题的。

## 软件架构

- 语言: TypeScript
- 运行时: Node.js (ts-node)
- 包管理: npm
- 代码风格: TypeScript ESLint Recommended
- 测试: Jest
- 其他: Prettier + ESLint

## 安装教程

1. 确保电脑上已经安装 Node.js 运行时环境，如未安装，前往[官网](https://nodejs.org/en/download/)或以其他方式下载安装对应操作系统的版本。请确保 Node.js 版本不低于 18，否则可能由于代码中引用了一些较新的标准库而无法运行。
2. 在目录下启动命令行执行 `npm install --registry https://registry.npm.taobao.org`，安装依赖。
3. 执行 `npm run dev`，启动应用，如应用正常打印提示信息，说明运行成功。

## 使用说明

1. 应用默认读取 `data/corpus.dict.txt` 作为词典文件，读取 `data/corpus.sentence.txt` 作为未分词的本文文件，读取 `data/corpus.answer.txt` 作为人工分词的文件路径。应用默认输出反向最大匹配的结果到 `data/corpus.out.txt` 中。

   这几个常量都定义在 `./src/main.ts` 的文件头，如需更改，直接更改这几个常量即可。

2. 同时，应用也安装了 Jest，并编写了相应的测试用例，且达到了 100% 的测试覆盖率。执行 `npm run test` 以运行这些测试用例。
