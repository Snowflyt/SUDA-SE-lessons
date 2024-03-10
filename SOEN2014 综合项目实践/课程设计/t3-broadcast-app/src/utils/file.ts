import { type File as FileModel } from '@prisma/client';

export const dataURLToFile = async ({
  dataURL,
  filename,
}: {
  dataURL: string;
  filename: string;
}): Promise<File> => {
  const res = await fetch(dataURL);
  const blob = await res.blob();
  return new File([blob], filename);
};

export const downloadFile = (file: File) => {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  a.click();
  URL.revokeObjectURL(url);
};

export const downloadFileModel = async (fileModel: FileModel) => {
  const file = await dataURLToFile({
    dataURL: fileModel.dataURL,
    filename: fileModel.filename,
  });
  downloadFile(file);
};
