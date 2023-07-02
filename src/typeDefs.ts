export interface AuthResult {
  access_token: string;
  authuser: string;
  expires_in: number;
  prompt: string;
  scope: string;
  token_type: string;
}

export interface DocCallback {
  description: string;
  downloadUrl?: string;
  driveSuccess: boolean;
  embedUrl: string;
  iconUrl: string;
  id: string;
  isShared: boolean;
  lastEditedUtc: number;
  mimeType: string;
  name: string;
  rotation: number;
  rotationDegree: number;
  serviceId: string;
  sizeBytes: number;
  type: string;
  uploadState?: string;
  url: string;
}

export interface PickerCallback {
  action: string;
  docs: DocCallback[];
}

export interface PickerConfiguration {
  appId?: string;
  callbackFunction: (data: PickerCallback) => any;
  clientId: string;
  customScopes?: string[];
  customViews?: any[];
  developerKey: string;
  disableDefaultView?: boolean;
  disabled?: boolean;
  locale?: string;
  multiselect?: boolean;
  setIncludeFolders?: boolean;
  setOrigin?: string;
  setParentFolder?: string;
  setSelectFolderEnabled?: boolean;
  showUploadFolders?: boolean;
  showUploadView?: boolean;
  supportDrives?: boolean;
  token?: string;
  viewId?: ViewIdOptions;
  viewMimeTypes?: string;
}

export type ViewIdOptions =
  | 'DOCUMENTS'
  | 'DOCS'
  | 'DOCS_IMAGES'
  | 'DOCS_IMAGES_AND_VIDEOS'
  | 'DOCS_VIDEOS'
  | 'DRAWINGS'
  | 'FOLDERS'
  | 'FORMS'
  | 'PDFS'
  | 'PRESENTATIONS'
  | 'SPREADSHEETS';

export const defaultConfiguration: PickerConfiguration = {
  clientId: '',
  developerKey: '',
  viewId: 'DOCS',
  callbackFunction: () => null,
};
