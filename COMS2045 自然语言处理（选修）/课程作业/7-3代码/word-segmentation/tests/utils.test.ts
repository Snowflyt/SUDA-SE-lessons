import fs from 'node:fs/promises';

import {
  backwardMaximumMatching,
  evaluate,
  logged,
  readCorpusDict,
  readCorpusProcessed,
  readCorpusSource,
  saveCorpusOutput,
} from '../src/utils';

const POSSIBLE_WORDS = [
  '一',
  '一下',
  '下',
  '人',
  '人生',
  '人生大事',
  '和',
  '和尚',
  '大',
  '大事',
  '好',
  '好好',
  '好好考虑',
  '尚',
  '尚未',
  '应',
  '应该',
  '未',
  '未结婚',
  '的',
  '结婚',
  '考',
  '考虑',
  '该',
  '都',
];
const MAX_WORD_LENGTH = 4;

describe('logged', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should log the execution time of a function', () => {
    const fn = jest.fn();
    logged('test', fn)();
    expect(console.log).toBeCalledWith(expect.stringMatching(/test in \d+ms./));
  });

  it('should not modify the return value of a normal function', () => {
    const fn = jest.fn().mockReturnValue(42);
    const result = logged('test', fn)();
    expect(result).toBe(42);
  });

  it('should not modify the return value of an async function', async () => {
    const fn = jest.fn().mockResolvedValue(42);
    const result = await logged('test', fn)();
    expect(result).toBe(42);
  });

  it('should throw the error of an async function', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('test'));
    await expect(logged('test', fn)()).rejects.toThrow('test');
  });
});

describe('readCorpusDict', () => {
  beforeAll(() => {
    jest.spyOn(fs, 'readFile').mockImplementation(async () => {
      return '3\t10\nfoo\nbar\nbaz';
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should read corpus dict', async () => {
    const { possibleWords, maxWordLength } = await readCorpusDict('');

    expect(possibleWords).toEqual(['foo', 'bar', 'baz']);
    expect(maxWordLength).toBe(10);
  });
});

describe('readCorpusSource', () => {
  beforeAll(() => {
    jest.spyOn(fs, 'readFile').mockResolvedValue('我 是\n中国  人');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should read corpus source', async () => {
    const content = await readCorpusSource('');

    expect(content).toBe('我是中国人');
  });
});

describe('readCorpusProcessed', () => {
  beforeAll(() => {
    jest.spyOn(fs, 'readFile').mockResolvedValue('我 是\n中国  人');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should read processed corpus', async () => {
    const content = await readCorpusProcessed('');

    expect(content).toEqual(['我', '是', '中国', '人']);
  });
});

describe('saveCorpusOutput', () => {
  beforeAll(() => {
    jest.spyOn(fs, 'readFile').mockResolvedValue('我是\n中国人');
    jest.spyOn(fs, 'writeFile').mockImplementation(async () => {});
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should save processed output', async () => {
    await saveCorpusOutput('', '', ['我是', '中', '国人']);

    expect(fs.writeFile).toBeCalledWith(
      '',
      expect.stringMatching(/\s*我是\n中 国人\s*/),
    );
  });
});

describe('backwardMaximumMatching', () => {
  it('should segment words', async () => {
    const words = backwardMaximumMatching(
      '结婚的和尚未结婚的都应该好好考虑一下人生大事',
      POSSIBLE_WORDS,
      MAX_WORD_LENGTH,
    );

    expect(words).toEqual([
      '结婚',
      '的',
      '和尚',
      '未结婚',
      '的',
      '都',
      '应该',
      '好好考虑',
      '一下',
      '人生大事',
    ]);
  });
});

describe('evaluate', () => {
  it('should evaluate segmentation', () => {
    const answer = [
      '结婚',
      '的',
      '和',
      '尚未',
      '结婚',
      '的',
      '都',
      '应该',
      '好好',
      '考虑',
      '一下',
      '人生',
      '大事',
    ];
    const result = [
      '结婚',
      '的',
      '和尚',
      '未结婚',
      '的',
      '都',
      '应该',
      '好好考虑',
      '一下',
      '人生大事',
    ];
    const { precision, recall, f1 } = evaluate(result, answer);

    expect(Math.fround(precision).toFixed(4)).toBe('0.6000');
    expect(Math.fround(recall).toFixed(4)).toBe('0.4615');
    expect(Math.fround(f1).toFixed(4)).toBe('0.5217');
  });
});
