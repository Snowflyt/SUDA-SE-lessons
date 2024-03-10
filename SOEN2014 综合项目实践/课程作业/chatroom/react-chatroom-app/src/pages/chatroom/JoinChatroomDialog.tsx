import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import { useState } from 'react';

export interface JoinChatroomDialogProps {
  open: boolean;
  chatrooms?: Array<{
    id: number;
    name: string;
  }>;
  onClose?: () => void;
  onJoinChatroom?: (chatroomId: number) => void;
}

const JoinChatroomDialog: React.FC<JoinChatroomDialogProps> = ({
  chatrooms,
  onClose,
  onJoinChatroom,
  open,
}) => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>加入聊天室</DialogTitle>
      <DialogContent>
        <TextField
          label="搜索"
          size="small"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <List>
          {chatrooms
            ?.filter((chatroom) => chatroom.name.includes(searchInput))
            .map((chatroom) => (
              <ListItem key={chatroom.id}>
                <ListItemText primary={chatroom.name} />
                <Button
                  onClick={() => {
                    onJoinChatroom?.(chatroom.id);
                    onClose?.();
                  }}>
                  加入
                </Button>
              </ListItem>
            ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default JoinChatroomDialog;
