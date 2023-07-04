# Google Drive Picker

 The Google Drive Picker allows you to integrate Google Drive file selection into your web application. With the picker, users can browse their Google Drive files and select one or more files to be used by your application.

To get started with the Google Drive Picker API, you'll need to perform the following steps:

Enable the Google Drive API: Visit the Google API Console (https://console.developers.google.com/), create a new project, and enable the Google Drive API.



## [Demo Link](https://codesandbox.io/s/google-drive-picker-drfv2t?file=/src/App.tsx)

## Installation

You can install the `google-drive-picker` package using npm or Yarn:

```shell
npm install google-drive-picker
```
or

```shell
yarn add google-drive-picker
```

## Usage

### Import the necessary dependencies and the **__GoogleDrivePicker__** hook:

```shell
import React, { useState, useEffect } from "react";
import GoogleDrivePicker from "google-drive-picker";
```

### Create a function component and use the **__GoogleDrivePicker__** hook:

Initialize the picker: Initialize the GooglePicker object with your OAuth 2.0 client ID and developer key:

```shell
export default function App() {
  const [authTocken, setauthTocken] = useState("");
  const [openPicker, authRes] = GoogleDrivePicker();

  const handlePickerOpen = () => {
    openPicker({
      clientId: "Your-clientId-key",
      developerKey: "Your-developerKey",
      viewId: "DOCS",
      token: authTocken,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
      // customScopes:['https://www.googleapis.com/auth/drive.readonly'],
      // setParentFolder:"Your-Folder-ID",
      // Other configuration options...
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        } else if (data.docs && data.docs.length > 0) {
          console.log(data);
        }
      }
    });
  };

  useEffect(() => {
    if (authRes) {
      setauthTocken(authRes.access_token);
    }
  }, [authRes]);

  return (
    <div className="App">
      <h1>Google Drive Picker</h1>
      <div>
        <button onClick={handlePickerOpen}>Open Google Drive Picker</button>
        {authRes && <div>Authenticated: {authRes.access_token}</div>}
      </div>
    </div>
  );
}

```

Customize the **__handleOpenPicker__** function and the configuration options according to your needs. You will need to provide the **__clientId__** and **__developerKey__** values, which you can obtain from the Google API Console.

Run your application and click the "Open Picker" button to open the Google Drive Picker dialog. Once the user selects files or performs an action in the picker, the **__callbackFunction__** will be called with the selected data.

## Configuration Options

The `openPicker` function accepts a configuration object with the following options:

| Option              | Description                                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `clientId`          | The Google client ID for your application (required).                                                             |
| `developerKey`      | The Google developer key for your application (required).                                                         |
| `callbackFunction`  | The callback function that will be called when the user performs an action in the picker (required).             |
| `viewId`            | The default view of the picker.                                                                                  |
| `token`             | An access token to skip the authentication process if you already have one.                                      |
| `multiselect`       | Enable/disable the ability to select multiple files in the picker.                                                |
| `supportDrives`     | Enable/disable support for shared drives.                                                                        |
| `showUploadView`    | Enable/disable the upload view in the picker.                                                                    |
| `showUploadFolders` | Enable/disable the ability to select folders for uploading files.                                                |
| `customViews`       | An array of custom views you want to add to the picker. Each view should be an instance of `google.picker.View`. |
| `customScopes`       | String[] ['https://www.googleapis.com/auth/drive.readonly']. |



## PickerConfiguration Props
For a complete list of configuration options and their descriptions, please refer to the following table:

The `PickerConfiguration` props are used to configure the Google Drive Picker component.

| Prop                      | Type       | Description                                                                                                                        |
| ------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `token`                   | `string`   | Access token for authentication.                                                                                                   |
| `appId`                   | `string`   | ID of the Google Drive app.                                                                                                        |
| `supportDrives`           | `boolean`  | Determines whether the picker should support selecting files from different Google Drive accounts.                                |
| `developerKey`            | `string`   | Developer key for API access.                                                                                                      |
| `viewId`                  | `string`   | ID of the default view to display in the picker.                                                                                    |
| `disabled`                | `boolean`  | Specifies whether the picker is disabled or not.                                                                                   |
| `multiselect`             | `boolean`  | Enables or disables multi-select mode in the picker.                                                                               |
| `setOrigin`               | `string`   | Sets the origin URL for the picker.                                                                                                |
| `showUploadView`          | `boolean`  | Determines whether the upload view should be displayed in the picker.                                                              |
| `showUploadFolders`       | `boolean`  | Specifies whether folders should be included in the upload view.                                                                   |
| `setParentFolder`         | `string`   | Sets the parent folder ID for the upload view and default view.                                                                    |
| `viewMimeTypes`           | `string[]` | An array of MIME types to restrict the file types shown in the picker.                                                              |
| `customViews`             | `any[]`    | An array of custom views to be added to the picker. Each custom view should be a valid DocsView object from the Picker API.       |
| `locale`                  | `string`   | The locale code for the picker's interface language (e.g., 'en' for English).                                                       |
| `setIncludeFolders`       | `boolean`  | Determines whether folders should be included in the default view.                                                                 |
| `setSelectFolderEnabled`  | `boolean`  | Specifies whether selecting folders is enabled in the default view.                                                                |
| `disableDefaultView`      | `boolean`  | Determines whether the default view should be disabled.                                                                            |
| `callbackFunction`        | `Function` | A callback function that will be called when a file or folder is selected. The function will receive the selected item as an argument. |

**Note:** Some props have default values that will be used if not provided.

For a complete list of `viewId` options and their descriptions, please refer to the code documentation.

| Option                  | Description                                       |
| ----------------------- | ------------------------------------------------- |
| DOCS                    | All Google Drive document types.                  |
| DOCS_IMAGES             | Google Drive photos.                              |
| DOCS_IMAGES_AND_VIDEOS  | Google Drive photos and videos.                   |
| DOCS_VIDEOS             | Google Drive videos.                              |
| DOCUMENTS               | Google Drive Documents.                           |
| FOLDERS                 | Google Drive Folders.                             |
| DRAWINGS                | Google Drive Drawings.                            |
| FORMS                   | Google Drive Forms.                               |
| PDFS                    | PDF files stored in Google Drive.                 |
| SPREADSHEETS            | Google Drive Spreadsheets.                        |



