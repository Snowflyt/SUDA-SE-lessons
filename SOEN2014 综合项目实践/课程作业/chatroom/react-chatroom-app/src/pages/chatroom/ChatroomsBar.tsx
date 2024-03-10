import {
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { selectorBuilder } from 'graphql-intuitive-request';
import { useEffect, useState } from 'react';

import CreateChatroomDialog from './CreateChatroomDialog';
import JoinChatroomDialog from './JoinChatroomDialog';

import type { Chatroom, CreateChatroomInput } from '@/types/graphql';

import { removeToken } from '@/utils/auth';
import { mutation, query, subscription } from '@/utils/client';

export type SelectedChatroom = typeof coreChatroomFields.infer;

const coreChatroomFields = selectorBuilder<Chatroom>().select((chatroom) => [
  chatroom.id,
  chatroom.name,
  chatroom.users((user) => [user.id, user.username]),
  chatroom.messages((message) => [
    message.timestamp,
    message.sender((user) => [user.id, user.username]),
    message.mentioned((user) => [user.id, user.username]),
    message.text,
  ]),
]);

export interface ChatroomsBarProps {
  onSelectedChatroomChange?: (chatroom: SelectedChatroom | null) => void;
  onCreateChatroom?: (input: CreateChatroomInput) => void;
  onJoinChatroom?: (chatroomId: number) => void;
  onQuitChatroom?: (chatroomId: number) => void;
}

let unsubscribeFns: Array<() => void> = [];

const ChatroomsBar: React.FC<ChatroomsBarProps> = ({
  onCreateChatroom,
  onJoinChatroom,
  onQuitChatroom,
  onSelectedChatroomChange,
}) => {
  const queryClient = useQueryClient();

  // Current user
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => await query('me').select((user) => [user.id, user.username]),
  });

  // Chatrooms
  const { data: chatrooms } = useQuery({
    queryKey: ['chatrooms'],
    queryFn: async () =>
      await query('chatrooms').select((chatroom) => [
        chatroom.id,
        chatroom.name,
        chatroom.users((user) => [user.id, user.username]),
      ]),
  });

  // Selected chatroom
  const [selectedChatroomId, setSelectedChatroomId] = useState<number | null>(null);
  const { data: selectedChatroom } = useQuery({
    queryKey: ['selectedChatroom', selectedChatroomId],
    queryFn: async () =>
      selectedChatroomId
        ? await query('chatroom').select(coreChatroomFields).byId(selectedChatroomId)
        : null,
  });

  const [searchInput, setSearchInput] = useState('');
  const [moreButtonAnchorEl, setMoreButtonAnchorEl] = useState<null | HTMLElement>(null);
  const [joinChatroomDialogOpen, setJoinChatroomDialogOpen] = useState(false);
  const [createChatroomDialogOpen, setCreateChatroomDialogOpen] = useState(false);

  const [mentionedChatroomIds, setMentionedChatroomIds] = useState<number[]>([]);

  // Select the first chatroom by default.
  useEffect(() => {
    const visibleChatrooms = chatrooms?.filter((chatroom) =>
      chatroom.users.some((user) => user.id === currentUser?.id),
    );
    if (visibleChatrooms && visibleChatrooms.length > 0)
      setSelectedChatroomId((prev) => prev ?? visibleChatrooms[0].id);
  }, [chatrooms, currentUser]);

  // Notify parent component when selected chatroom changes.
  useEffect(() => {
    const visibleChatrooms = chatrooms?.filter((chatroom) =>
      chatroom.users.some((user) => user.id === currentUser?.id),
    );

    unsubscribeFns.forEach((unsubscribeFn) => unsubscribeFn());
    unsubscribeFns =
      visibleChatrooms?.map((chatroom) =>
        subscription('messageAdded')
          .select((message) => [message.mentioned((user) => [user.id])])
          .byChatroomId(chatroom.id)
          .subscribe((message) => {
            if (message.mentioned?.id === currentUser?.id && selectedChatroom?.id !== chatroom.id)
              setMentionedChatroomIds((prev) => [...prev, chatroom.id]);
          }),
      ) ?? [];

    if (selectedChatroom)
      setMentionedChatroomIds((prev) => prev.filter((id) => id !== selectedChatroom.id));

    onSelectedChatroomChange?.(selectedChatroom ?? null);
  }, [selectedChatroom, currentUser, onSelectedChatroomChange, chatrooms]);

  return (
    <>
      {/* Join chatroom dialog */}
      <JoinChatroomDialog
        open={joinChatroomDialogOpen}
        chatrooms={chatrooms?.filter((chatroom) =>
          chatroom.users.every((user) => user.id !== currentUser?.id),
        )}
        onClose={() => {
          setJoinChatroomDialogOpen(false);
        }}
        onJoinChatroom={(chatroomId) => {
          void (async () => {
            await mutation('joinChatroom').byId(chatroomId);
            onJoinChatroom?.(chatroomId);
            setSelectedChatroomId(chatroomId);
            await queryClient.invalidateQueries({ queryKey: ['chatrooms'] });
          })();
        }}
      />

      {/* Create chatroom dialog */}
      <CreateChatroomDialog
        open={createChatroomDialogOpen}
        onClose={() => {
          setCreateChatroomDialogOpen(false);
        }}
        onCreateChatroom={(input) => {
          void (async () => {
            await mutation('createChatroom').byInput(input);
            onCreateChatroom?.(input);
            await queryClient.invalidateQueries({ queryKey: ['chatrooms'] });
          })();
        }}
      />

      {/* Chatrooms bar */}
      <div className="flex flex-col border-0 border-r border-solid border-gray-300">
        <div className="flex items-center justify-between p-4">
          <div className="mr-2 flex items-center">
            <SearchIcon className="mr-2" />
            <TextField
              className="min-w-48"
              label="搜索"
              size="small"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              setMoreButtonAnchorEl(e.currentTarget);
            }}>
            +
          </Button>
          <Menu
            anchorEl={moreButtonAnchorEl}
            open={Boolean(moreButtonAnchorEl)}
            onClose={() => {
              setMoreButtonAnchorEl(null);
            }}
            onClick={() => {
              setMoreButtonAnchorEl(null);
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            <MenuItem
              onClick={() => {
                setJoinChatroomDialogOpen(true);
              }}>
              <ListItemIcon>
                <PersonAddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="加入聊天室" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                setCreateChatroomDialogOpen(true);
              }}>
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="创建聊天室" />
            </MenuItem>
          </Menu>
        </div>

        {/* Chatroom list */}
        <List>
          {chatrooms
            ?.filter((chatroom) => chatroom.users.some((user) => user.id === currentUser?.id))
            .filter((chatroom) => chatroom.name.includes(searchInput))
            .map((chatroom) => (
              <ListItem key={chatroom.id}>
                <ListItemButton
                  onClick={() => {
                    setSelectedChatroomId(chatroom.id);
                  }}>
                  <ListItemText
                    primary={`${chatroom.name}${
                      mentionedChatroomIds.includes(chatroom.id) ? ' (有人@你)' : ''
                    }`}
                  />
                </ListItemButton>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={() => {
                    void (async () => {
                      await mutation('quitChatroom').byId(chatroom.id);
                      onQuitChatroom?.(chatroom.id);
                      setSelectedChatroomId(null);
                      await queryClient.invalidateQueries({ queryKey: ['chatrooms'] });
                    })();
                  }}>
                  退出
                </Button>
              </ListItem>
            ))}
        </List>

        <div className="grow" aria-label="spacer" />

        {/* User info */}
        <Box className="m-2 flex flex-row items-center space-x-3 p-4">
          <Avatar className="bg-orange-400 text-xl">{currentUser?.username[0]}</Avatar>
          <span className="text-base">{currentUser?.username}</span>
          <div className="grow" aria-label="spacer" />
          <Button
            variant="outlined"
            onClick={() => {
              removeToken();
              location.reload();
            }}>
            登出
          </Button>
        </Box>
      </div>
    </>
  );
};

export default ChatroomsBar;
