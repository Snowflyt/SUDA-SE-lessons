import { Button, HStack, Text, Switch, Avatar } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useReactiveValue } from 'react-reactive-hooks';

import { Reactive } from '@/components';
import Whiteboard from '@/components/Whiteboard';
import { api } from '@/utils/api';
import { RTCEvents, createRTCPlayer } from '@/utils/rtc';

import type { RTCPlayer } from '@/utils/rtc';
import type { Lesson, User } from '@prisma/client';
import type { NextPage } from 'next';

interface Message {
  datetime: string;
  username: string;
  text: string;
}

let cameraPusher: RTCPlayer | null = null;
let screenPusher: RTCPlayer | null = null;

const LivePage: NextPage = () => {
  const router = useRouter();
  const {
    query: { roomId },
  } = router as unknown as { query: { roomId: string | undefined } };
  const utils = api.useContext();

  const cameraVideoRef = useRef<HTMLVideoElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);

  const isScreenSharing = useReactiveValue(false);
  const isCameraOpen = useReactiveValue(false);
  const lesson = useReactiveValue<Lesson | null>(null);

  const isChatroomEnabled = useReactiveValue(true);
  const messageToSend = useReactiveValue('');
  const messages = useReactiveValue<Message[]>([]);
  const students = useReactiveValue<User[]>([]);

  const isVideoVisible = useReactiveValue(true);
  const isWhiteboardVisible = useReactiveValue(false);

  const { mutateAsync: sendMessage } = api.chatroom.sendMessage.useMutation();
  const { mutateAsync: setChatroomEnabled } =
    api.chatroom.setEnabled.useMutation();
  const { mutate: endLesson } = api.lesson.endLesson.useMutation();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const shareScreen = () => {
    if (!roomId) throw new Error('roomId is not defined');
    if (!screenVideoRef.current)
      throw new Error('video element is not defined');

    if (screenPusher) screenPusher.stop();

    const screenVideoElement = screenVideoRef.current;
    screenPusher = createRTCPlayer({
      resolution: { width: 1280, height: 720 },
      method: 'push',
      roomId: `${roomId}-screen`,
      useCamera: false,
    }).on(screenVideoElement);

    screenPusher.on(RTCEvents.WEBRTC_ON_LOCAL_STREAM, (stream) => {
      screenVideoElement.srcObject = stream;
      screenVideoElement.muted = true;
    });

    screenPusher.start();

    isScreenSharing.value = true;

    isVideoVisible.value = true;
    isWhiteboardVisible.value = false;
  };
  const stopScreenSharing = () => {
    if (screenPusher) screenPusher.stop();
    screenPusher = null;
    isScreenSharing.value = false;
  };

  const openCamera = () => {
    if (!roomId) throw new Error('roomId is not defined');
    if (!cameraVideoRef.current || !screenVideoRef.current)
      throw new Error('video element is not defined');

    if (cameraPusher) cameraPusher.stop();

    const cameraVideoElement = cameraVideoRef.current;
    cameraPusher = createRTCPlayer({
      resolution: { width: 640, height: 360 },
      method: 'push',
      roomId: `${roomId}-camera`,
    }).on(cameraVideoElement);

    cameraPusher.on(RTCEvents.WEBRTC_ON_LOCAL_STREAM, (stream) => {
      cameraVideoElement.srcObject = stream;
      cameraVideoElement.muted = true;
    });

    cameraPusher.start();

    isCameraOpen.value = true;
  };
  const closeCamera = () => {
    if (cameraPusher) cameraPusher.stop();
    cameraPusher = null;
    isCameraOpen.value = false;
  };

  const openWhiteboard = () => {
    isVideoVisible.value = false;
    isWhiteboardVisible.value = true;
  };
  const closeWhiteboard = () => {
    isVideoVisible.value = true;
    isWhiteboardVisible.value = false;
  };

  const handleSendMessage = (message: string) => {
    void sendMessage({ roomId: roomId!, text: message });
  };

  return (
    <div className="flex h-full w-full flex-row items-center justify-center">
      <div className="container relative flex h-full w-full flex-col items-center justify-center gap-12 bg-gray-800 px-4 py-16">
        <div className="absolute top-0 flex h-12 flex-row space-x-2 rounded-b bg-white p-2">
          <Button
            rounded="md"
            size="sm"
            colorScheme={isScreenSharing.value ? 'red' : 'orange'}
            onClick={isScreenSharing.value ? stopScreenSharing : shareScreen}>
            {isScreenSharing.value ? '停止共享' : '共享屏幕'}
          </Button>
          <Button
            rounded="md"
            size="sm"
            colorScheme={isCameraOpen.value ? 'red' : 'teal'}
            onClick={isCameraOpen.value ? closeCamera : openCamera}>
            {isCameraOpen.value ? '关闭摄像头' : '打开摄像头'}
          </Button>
          <Button
            rounded="md"
            size="sm"
            colorScheme="green"
            onClick={
              isWhiteboardVisible.value ? closeWhiteboard : openWhiteboard
            }>
            {isWhiteboardVisible.value ? '关闭白板' : '白板演示'}
          </Button>
          {/* <Button rounded="md" size="sm" colorScheme="blue">
            推送题目
          </Button> */}
          {/* <Button rounded="md" size="sm" colorScheme="purple">
            开始签到
          </Button> */}
        </div>

        <HStack className="flex w-full flex-row justify-start text-xl font-bold text-gray-400">
          <Text>{lesson.value?.name}</Text>
          <Button
            rounded="md"
            size="sm"
            colorScheme="red"
            onClick={() => {
              if (!lesson.value) return;
              endLesson(lesson.value.id, {
                onSuccess() {
                  void router.push('/');
                },
              });
            }}>
            结束直播
          </Button>
        </HStack>
        <div className="relative h-full w-full">
          <Whiteboard
            className={`h-full w-full ${
              isWhiteboardVisible.value ? '' : 'hidden'
            }`}
          />
          <video
            ref={cameraVideoRef}
            className={`absolute right-0 top-0 z-10 ${
              isScreenSharing.value ? 'h-1/4 w-1/4' : 'h-full w-full'
            } ${isCameraOpen.value ? '' : 'hidden'}`}
            autoPlay
            controls={
              !isScreenSharing.value && isCameraOpen.value ? true : false
            }
          />
          <video
            ref={screenVideoRef}
            className={`h-full ${isVideoVisible.value ? '' : 'hidden'}`}
            autoPlay
            controls={
              !isScreenSharing.value && isCameraOpen.value ? false : true
            }
          />
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
            <div className="flex h-8 w-full flex-row items-center justify-start space-x-1 p-2">
              <Switch
                isChecked={isChatroomEnabled.value}
                onChange={(e) => {
                  isChatroomEnabled.value = e.target.checked;
                  void setChatroomEnabled({
                    roomId: roomId!,
                    enabled: e.target.checked,
                  });
                }}
                size="sm"
                colorScheme="green"
              />
              <Text size="sm">允许聊天</Text>
            </div>
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
