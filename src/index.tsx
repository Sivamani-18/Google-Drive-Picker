import { useEffect, useState } from 'react';
import {
  AuthResult,
  defaultConfiguration,
  PickerConfiguration,
} from './typeDefs';
import useInjectScript from './useInjectScript';

declare let google: any;
declare let window: any;

export default function GoogleDrivePicker(): [
  (config: PickerConfiguration) => boolean | undefined,
  AuthResult | undefined
] {
  const [authRes, setAuthRes] = useState<AuthResult>();
  const [config, setConfig] =
    useState<PickerConfiguration>(defaultConfiguration);
  const [loaded, error] = useInjectScript('https://apis.google.com/js/api.js');
  const [loadedGsi, errorGsi] = useInjectScript(
    'https://accounts.google.com/gsi/client'
  );
  const [openAfterAuth, setOpenAfterAuth] = useState(false);
  const [pickerApiLoaded, setPickerApiLoaded] = useState(false);
  const defaultScopes = ['https://www.googleapis.com/auth/drive.readonly'];

  useEffect(() => {
    if (loaded && !error && loadedGsi && !errorGsi && !pickerApiLoaded) {
      loadApis();
    }
  }, [loaded, error, loadedGsi, errorGsi, pickerApiLoaded]);

  useEffect(() => {
    if (
      openAfterAuth &&
      config.token &&
      loaded &&
      !error &&
      loadedGsi &&
      !errorGsi &&
      pickerApiLoaded
    ) {
      createPicker(config);
      setOpenAfterAuth(false);
    }
  }, [
    config.token,
    error,
    errorGsi,
    loaded,
    loadedGsi,
    openAfterAuth,
    pickerApiLoaded,
    config,
  ]);

  const createPicker = ({
    token,
    appId = '',
    callbackFunction,
    customViews,
    developerKey,
    disableDefaultView = false,
    disabled,
    locale = 'en',
    multiselect,
    setIncludeFolders,
    setOrigin,
    setParentFolder = '',
    setSelectFolderEnabled,
    showUploadFolders,
    showUploadView = false,
    supportDrives = false,
    viewId = 'DOCS',
    viewMimeTypes,
  }: PickerConfiguration) => {
    if (disabled) return false;

    const view = new google.picker.DocsView(google.picker.ViewId[viewId]);
    if (viewMimeTypes) view.setMimeTypes(viewMimeTypes);
    if (setIncludeFolders) view.setIncludeFolders(true);
    if (setSelectFolderEnabled) view.setSelectFolderEnabled(true);

    const uploadView = new google.picker.DocsUploadView();
    if (viewMimeTypes) uploadView.setMimeTypes(viewMimeTypes);
    if (showUploadFolders) uploadView.setIncludeFolders(true);
    if (setParentFolder) uploadView.setParent(setParentFolder);
    if (setParentFolder) view.setParent(setParentFolder);

    const pickerBuilder = new google.picker.PickerBuilder()
      .setAppId(appId)
      .setOAuthToken(token)
      .setDeveloperKey(developerKey)
      .setLocale(locale)
      .setCallback(callbackFunction);

    if (setOrigin) {
      pickerBuilder.setOrigin(setOrigin);
    }

    if (!disableDefaultView) {
      pickerBuilder.addView(view);
    }

    if (customViews) {
      Object.entries(customViews).forEach(([key, value]) =>
        pickerBuilder.addView(value)
      );
    }

    if (multiselect) {
      pickerBuilder.enableFeature(google.picker.Feature.MULTISELECT_ENABLED);
    }

    if (showUploadView) pickerBuilder.addView(uploadView);

    if (supportDrives) {
      pickerBuilder.enableFeature(google.picker.Feature.SUPPORT_DRIVES);
    }

    const picker = pickerBuilder.build();
    picker.setVisible(true);
    return true;
  };

  const loadApis = () => {
    window.gapi.load('auth', () => {
      window.gapi.load('picker', { callback: onPickerApiLoad });
    });
  };

  const onPickerApiLoad = () => {
    setPickerApiLoaded(true);
  };

  const openPicker = (config: PickerConfiguration) => {
    setConfig(config);

    if (!config.token) {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: config.clientId,
        scope: (config.customScopes
          ? [...defaultScopes, ...config.customScopes]
          : defaultScopes
        ).join(' '),
        callback: (tokenResponse: AuthResult) => {
          setAuthRes(tokenResponse);
          createPicker({ ...config, token: tokenResponse.access_token });
        },
      });

      client.requestAccessToken();
    }

    if (config.token && loaded && !error && pickerApiLoaded) {
      return createPicker(config);
    }
  };

  return [openPicker, authRes];
}
