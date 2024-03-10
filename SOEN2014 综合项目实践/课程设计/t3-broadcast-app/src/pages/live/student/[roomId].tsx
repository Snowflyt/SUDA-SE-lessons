import { Button, HStack, Text, Avatar } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useReactiveValue } from 'react-reactive-hooks';

import { Reactive } from '@/components';
import { api } from '@/utils/api';
import { createRTCPlayer } from '@/utils/rtc';

import type { RTCPlayer } from '@/utils/rtc';
import type { Lesson, User } from '@prisma/client';
import type { NextPage } from 'next';

interface Message {
  datetime: string;
  username: string;
  text: string;
}

let player: RTCPlayer | null = null;

const LivePage: NextPage = () => {
  const {
    query: { roomId },
  } = useRouter() as unknown as { query: { roomId: string | undefined } };
  const utils = api.useContext();

  const videoRef = useRef<HTMLVideoElement>(null);

  const lesson = useReactiveValue<Lesson | null>(null);

  const isChatroomEnabled = useReactiveValue(true);
  const messageToSend = useReactiveValue('');
  const messages = useReactiveValue<Message[]>([]);
  const students = useReactiveValue<User[]>([]);

  const { mutateAsync: sendMessage } = api.chatroom.sendMessage.useMutation();

  api.chatroom.onMessageAdded.useSubscription(roomId, {
    onData: (data) => {
      messages.value.push(data);
    },
    onError(err) {
      console.log('[messageAdd] error');
      console.log(err);
    },
  });

  useEffect(() => {
    if (!roomId) return;

    const rId = roomId;
    void utils.lesson.getAll.fetch().then((lessons) => {
      lesson.value = lessons.find((lesson) => lesson.roomId === rId) ?? null;
      const les = lesson.value;
      if (lesson.value) {
        void utils.course.getAll.fetch().then((courses) => {
          const course = courses.find((course) => les!.courseId === course.id)!;
          void utils.course.getStudents.fetch(course.id).then((data) => {
            students.value = data;
          });
        });
      }
    });

    void utils.chatroom.isEnabled.fetch(roomId).then((isEnabled) => {
      isChatroomEnabled.value = isEnabled;
    });

    play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const play = () => {
    if (!roomId) throw new Error('roomId is not defined');
    if (!videoRef.current) throw new Error('video element is not defined');

    if (player) player.stop();

    const screenVideoElement = videoRef.current;
    player = createRTCPlayer({
      resolution: { width: 1280, height: 720 },
      method: 'play',
      roomId: `${roomId}-screen`,
      useCamera: false,
    }).on(screenVideoElement);

    player.start();
  };

  const handleSendMessage = (message: string) => {
    void sendMessage({ roomId: roomId!, text: message });
  };

  return (
    <div className="flex h-full w-full flex-row items-center justify-center">
      <div className="container relative flex h-full w-full flex-col items-center justify-center gap-12 bg-gray-800 px-4 py-16">
        {/* <div className="absolute top-0 flex h-12 flex-row space-x-2 rounded-b bg-white p-2">
          <Button
            rounded="md"
            size="sm"
            colorScheme={isScreenSharing.value ? 'red' : 'orange'}
            onClick={isScreenSharing.value ? stopScreenSharing : play}>
            {isScreenSharing.value ? '停止开麦' : '申请开麦'}
          </Button>
        </div> */}

        <HStack className="w-full justify-start text-xl font-bold text-gray-400">
          <Text>{lesson.value?.name}</Text>
        </HStack>
        <div className="relative h-full w-full">
          <video ref={videoRef} className="h-full" autoPlay controls={true} />
        </div>
      </div>
      <div className="flex h-full w-1/3 flex-col items-center justify-center bg-white">
        <div className="flex h-full w-full flex-col items-start justify-start p-4">
          <Text size="lg">学生列表</Text>
          {students.value.map((student) => (
            <div
              key={student.id}
              className="flex h-12 w-full flex-row items-center justify-start space-x-2 p-2">
              <Avatar size="sm" />
              <Text size="sm">{student.name ?? student.username}</Text>
              {}
            </div>
          ))}
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="h-full w-full bg-[#f7f9fd]">
            {messages.value.map((message, idx) => (
              <div
                key={idx}
                className="flex h-12 w-full flex-row items-center justify-start space-x-2 p-2">
                <Avatar size="sm" />
                <div className="flex flex-col items-start justify-center">
                  <div className="flex flex-row items-center justify-start">
                    <Text size="sm">{message.username}</Text>
                    <Text size="xs" textColor="gray.500">
                      {message.datetime}
                    </Text>
                  </div>
                  <Text size="sm">{message.text}</Text>
                </div>
              </div>
            ))}
          </div>
          <div className="flex h-1/2 w-full flex-col items-center justify-start">
            <div className="relative h-full w-full">
              <Reactive.Textarea
                isDisabled={!isChatroomEnabled.value}
                variant="unstyled"
                placeholder="输入聊天内容"
                rounded="none"
                fontSize="sm"
                p="2"
                model={messageToSend}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <Button
                colorScheme="green"
                size="sm"
                position="absolute"
                right="2"
                bottom="2"
                onClick={() => {
                  handleSendMessage(messageToSend.value);
                  messageToSend.value = '';
                }}>
                发送
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePage;
