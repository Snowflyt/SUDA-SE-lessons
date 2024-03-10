import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';

import type { CreateChatroomInput } from '@/types/graphql';

export interface CreateChatroomDialogProps {
  open: boolean;
  onClose?: () => void;
  onCreateChatroom?: (input: CreateChatroomInput) => void;
}

const CreateChatroomDialog: React.FC<CreateChatroomDialogProps> = ({
  onClose,
  onCreateChatroom,
  open,
}) => {
  const [input, setInput] = useState<CreateChatroomInput>({ name: '' });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>创建聊天室</DialogTitle>
      <DialogContent>
        <TextField
          label="聊天室名称"
          size="small"
          value={input.name}
          onChange={(e) => {
            setInput({ ...input, name: e.target.value });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button
          onClick={() => {
            onCreateChatroom?.(input);
            onClose?.();
          }}>
          创建
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateChatroomDialog;
