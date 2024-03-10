import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Code,
  useClipboard,
} from '@chakra-ui/react';
import { useRef } from 'react';

export interface InvitationCodeAlertDialogProps {
  invitationCode: string;
  isOpen: boolean;
  onClose: () => void;
}

const InvitationCodeAlertDialog: React.FC<InvitationCodeAlertDialogProps> = ({
  invitationCode,
  isOpen,
  onClose,
}) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const { onCopy } = useClipboard(invitationCode);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            课程邀请码
          </AlertDialogHeader>

          <AlertDialogBody>
            课程邀请码为 <Code>{invitationCode}</Code>，请妥善保管。
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => {
                onCopy();
                onClose();
              }}>
              复制到剪贴板
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default InvitationCodeAlertDialog;
