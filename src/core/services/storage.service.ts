type FileInfo = {
  name: string;
  mimetype: string;
  size: number;
};

export interface IStorageService {
  upload(info: FileInfo, data: Buffer): Promise<string>;
  download(fileId: string): Promise<Buffer>;
  delete(fileId: string): Promise<void>;
  get(fileId: string): Promise<FileInfo>;
}
