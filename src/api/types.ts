export type ApiResponse = {
  code: number;
  data?: any;
  message?: string;
  statusCode: string;
};

export type ImageData = {
  fileContents: string;
  contentType: string;
  fileDownloadName: string;
  lastModified: Date | null;
  entityTag: any;
  enableRangeProcessing: boolean;
};
