import { Box, Button, Divider, Input, List, ListItem, ListItemText } from '@mui/material';
import * as R from 'ramda';
import { useEffect, useState } from 'react';

import DrawPanel from './DrawPanel';
import WinnerCountInput from './WinnerCountInput';

import type { ClientError } from 'graphql-intuitive-request';

import { mutation, query } from '@/utils/client';

const levels = ['first', 'second', 'third'] as const;
type Level = (typeof levels)[number];

const LotteryPage: React.FC = () => {
  // 奖项名额
  const [winnersCount, setWinnersCount] = useState(R.fromPairs(levels.map((l) => [l, 0])));
  const [winners, setWinners] = useState(R.fromPairs(levels.map((l) => [l, [] as string[]])));
  // 参与人员名单
  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState('');
  // 是否抽奖中
  // NOTE: 这里的“Draw”是开奖的意思，以免有读者英语不好产生误解……
  const [isDrawing, setIsDrawing] = useState(false);

  const draw = (level: Level, count: number) => {
    mutation('draw')
      .by({ level: levels.indexOf(level) + 1, count })
      .then((win) => {
        setWinners({ ...winners, [level]: [...winners[level], ...win.map((w) => w.name)] });
      })
      .catch(({ response }: ClientError) => {
        const message = response.errors?.[0]?.message;
        if (!message) return;

        if (message === 'Invalid count') alert('超出设定抽奖人数');
        else if (message === 'Not enough participants') alert('参与人员不足');
        else alert(message);
      });
  };

  // 初始化数据
  useEffect(() => {
    void query('participants').then((participants) => {
      setParticipants(participants.map((p) => p.name));
    });
    void query('winnersCount').then(setWinnersCount);
  }, [setWinnersCount]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex flex-col">
        <h1>抽奖</h1>

        <Divider />

        <div className="mb-4 flex flex-row">
          <div className="mr-4">
            <h2>奖项名额</h2>

            {['一', '二', '三'].map((n, i, a) => {
              const level = levels[i];
              return (
                <WinnerCountInput
                  key={i}
                  className={i !== a.length - 1 ? 'mb-1' : 'mb-4'}
                  label={`${n}等奖名额`}
                  disabled={isDrawing}
                  value={winnersCount[level]}
                  onChange={(value) => {
                    setWinnersCount({ ...winnersCount, [level]: value });
                    void mutation('setWinnersCount').by({ [level]: value });
                  }}
                />
              );
            })}
          </div>

          <div className="flex flex-col justify-center">
            <h2>参与人员名单</h2>
            <div className="mb-2">
              <Input
                disabled={isDrawing}
                placeholder="请输入参与人员姓名"
                value={newParticipant}
                onChange={(e) => {
                  setNewParticipant(e.target.value);
                }}
              />
              <Button
                disabled={isDrawing}
                onClick={() => {
                  setParticipants((prev) => [...prev, newParticipant]);
                  setNewParticipant('');
                  void mutation('addParticipant').byName(newParticipant);
                }}>
                添加
              </Button>
            </div>
            <Box className="w-full" sx={{ maxWidth: 360, bgcolor: '#f7f7f7' }}>
              <List>
                {participants.map((name) => (
                  <ListItem className="h-10" key={name}>
                    <ListItemText primary={name} />
                    <Button
                      disabled={isDrawing}
                      onClick={() => {
                        setParticipants((prev) => prev.filter((n) => n !== name));
                        void mutation('removeParticipant').byName(name);
                      }}>
                      删除
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
          </div>

          <div className="ml-4 flex flex-col items-center justify-center">
            <Button
              className="text-2xl"
              disabled={isDrawing}
              onClick={() => {
                setIsDrawing(true);
              }}>
              开始抽奖
            </Button>
            <Button
              className="w-full text-xl"
              disabled={!isDrawing}
              onClick={() => {
                setIsDrawing(false);
                void mutation('reset');
                setWinners(R.fromPairs(levels.map((l) => [l, []])));
              }}>
              重新开始
            </Button>
          </div>
        </div>

        <Divider />

        <div className="flex w-full flex-row">
          {['一', '二', '三'].map((n, i, a) => {
            const level = levels[i];
            return (
              <DrawPanel
                key={i}
                className={'w-1/3' + (i !== a.length - 1 ? ' mr-4' : '')}
                disabled={!isDrawing}
                rewardName={`${n}等奖`}
                max={winnersCount[level] - winners[level].length}
                onDraw={(count) => {
                  draw(level, count);
                }}
                winnerNames={winners[level]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LotteryPage;
