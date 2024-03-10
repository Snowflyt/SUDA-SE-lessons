import {
  Alert,
  Button,
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Popper,
  TextField,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import ChatroomsBar from './ChatroomsBar';

import type { SelectedChatroom } from './ChatroomsBar';

import { mutation, query, subscription } from '@/utils/client';

let unsubscribe: () => void;

const ChatroomPage: React.FC = () => {
  const queryClient = useQueryClient();

  // Current user
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => await query('me').select((user) => [user.id, user.username]),
  });

  // Selected chatroom
  const [selectedChatroom, setSelectedChatroom] = useState<SelectedChatroom | null>(null);

  // Add a message to the selected chatroom.
  const [message, setMessage] = useState('');
  const [mentionedUserId, setMentionedUserId] = useState<number | null>(null);
  const { mutate: addMessage } = useMutation({
    mutationFn: async () => {
      const promise = selectedChatroom
        ? await mutation('addMessage')
            .select((message) => [message.timestamp])
            .by({
              chatroomId: selectedChatroom.id,
              input: { text: message, mentionedId: mentionedUserId },
            })
        : undefined;

      setMessage('');
      setMentionedUserId(null);

      return promise;
    },
  });

  const [mentionedPopperAnchorEl, setMentionedPopperAnchorEl] = useState<HTMLElement | null>(null);
  const [mentionedPopperOptions, setMentionedPopperOptions] = useState<
    Array<{ id: number; username: string }>
  >([]);
  const [mentionedAlertOpen, setMentionedAlertOpen] = useState(false);

  // Subscribe to new messages.
  useEffect(() => {
    if (!selectedChatroom) return;

    if (unsubscribe) unsubscribe();

    unsubscribe = subscription('messageAdded')
      .select((message) => [
        message.timestamp,
        message.sender((user) => [user.id, user.username]),
        message.mentioned((user) => [user.id, user.username]),
        message.text,
      ])
      .byChatroomId(selectedChatroom.id)
      .subscribe((message) => {
        if (message.mentioned?.id === currentUser?.id) setMentionedAlertOpen(true);
        queryClient.setQueryData(['selectedChatroom', selectedChatroom.id], {
          ...selectedChatroom,
          messages: [...selectedChatroom.messages, message],
        });
        void queryClient.invalidateQueries({
          queryKey: ['selectedChatroom', selectedChatroom.id],
          refetchType: 'none',
        });
      });
  }, [selectedChatroom, currentUser, queryClient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    setMessage(inputText);
    const atPosition = inputText.lastIndexOf('@');
    if (atPosition !== -1) {
      const suffix = inputText.substring(atPosition + 1);
      setMentionedPopperAnchorEl(e.target);
      setMentionedPopperOptions(
        selectedChatroom?.users
          .filter((user) => user.id !== currentUser?.id)
          .filter((user) => user.username.toLowerCase().startsWith(suffix.toLowerCase())) ?? [],
      );
    } else {
      setMentionedPopperAnchorEl(null);
    }
  };

  return (
    <div className="flex size-full flex-row justify-center">
      {/* Mentioned Alert */}
      <Collapse in={mentionedAlertOpen}>
        <Alert
          className="absolute right-16 top-10"
          severity="info"
          onClose={() => {
            setMentionedAlertOpen(false);
          }}>
          有人@你
        </Alert>
      </Collapse>

      {/* Mentioned Popper */}
      <Popper
        open={Boolean(mentionedPopperAnchorEl)}
        anchorEl={mentionedPopperAnchorEl}
        className="z-10 mt-1 max-w-xs bg-gray-100">
        <List>
          {mentionedPopperOptions.map((option, index) => (
            <ListItemButton
              key={index}
              onClick={() => {
                const atPosition = message.lastIndexOf('@');
                setMessage(`${message.substring(0, atPosition)}@${option.username} `);
                setMentionedPopperAnchorEl(null);
                setMentionedUserId(option.id);
              }}>
              <ListItemText primary={`@${option.username}`} />
            </ListItemButton>
          ))}
        </List>
      </Popper>

      <div className="flex h-screen w-full flex-row">
        <ChatroomsBar onSelectedChatroomChange={setSelectedChatroom} />

        <main className="mx-12 flex size-full grow flex-col">
          {selectedChatroom ? (
            <>
              <h1 className="ml-2 mt-8">{selectedChatroom.name}</h1>

              <Grid container className="grow overflow-auto p-2">
                {/* 聊天室主体内容 */}
                <Grid item xs={12}>
                  {/* 聊天信息列表 */}
                  {selectedChatroom?.messages.map((message) => (
                    <div key={message.timestamp} className="mb-4 flex">
                      {/* 头像，这里就用一个圆形占位就行 */}
                      <div
                        className={`mr-4 size-8 rounded-full ${
                          message.sender.id === currentUser?.id ? 'bg-blue-400' : 'bg-gray-400'
                        }`}
                      />
                      {/* 气泡 */}
                      <div className="flex flex-col">
                        {/* 气泡上面的 username 和时间 */}
                        <div className="flex">
                          <div className="text-gray-800">{message.sender.username}</div>
                          <div className="ml-2 text-gray-400">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        {/* 气泡里面的消息 */}
                        <div>{message.text}</div>
                      </div>
                    </div>
                  ))}
                </Grid>
              </Grid>

              <form
                className="mb-6 flex w-full flex-row space-x-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  addMessage();
                }}>
                <TextField fullWidth size="small" value={message} onChange={handleInputChange} />
                <Button variant="contained" color="primary" type="submit">
                  发送
                </Button>
              </form>
            </>
          ) : (
            <h1>请选择聊天室</h1>
          )}
        </main>
      </div>
    </div>
  );
};

export default ChatroomPage;
