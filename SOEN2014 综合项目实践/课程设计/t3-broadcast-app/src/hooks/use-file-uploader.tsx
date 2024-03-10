import { useRef } from 'react';

export interface UseFileUploaderProps {
  onUpload: (file: File, dataURL: string) => void;
}

const useFileUploader = ({ onUpload }: UseFileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileInput = (
    <input
      ref={fileInputRef}
      type="file"
      hidden
      onChange={() => {
        if (
          fileInputRef.current &&
          fileInputRef.current.files &&
          fileInputRef.current.files.length > 0
        ) {
          const file = fileInputRef.current.files[0]!;

          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result && typeof reader.result === 'string') {
              const dataURL = reader.result;
              onUpload(file, dataURL);
            }
          };
          reader.readAsDataURL(file);
        }
      }}
    />
  );

  return {
    fileInput,
    openDialog,
  };
};

export { useFileUploader };
export default useFileUploader;
