# Google Drive Picker

This is a custom hook that allows you to integrate the Google Drive Picker functionality into your React application. The Google Drive Picker enables users to select files from their Google Drive account and retrieve the selected files for further processing.

## [Demo Link](https://codesandbox.io/s/google-drive-picker-drfv2t?file=/src/App.tsx).
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

Import the necessary dependencies and the **__GoogleDrivePicker__** hook:

```shell
import React, { useState, useEffect } from "react";
import GoogleDrivePicker from "google-drive-picker";
```

Create a function component and use the **__GoogleDrivePicker__** hook:

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

- `clientId` (required): The Google client ID for your application.
- `developerKey` (required): The Google developer key for your application.
- `callbackFunction` (required): The callback function that will be called when the user performs an action in the picker.
- `viewId` (optional): The default view of the picker. You can choose from various view IDs such as "DOCS", "DOCUMENTS", "FOLDERS", etc.
- `token` (optional): An access token to skip the authentication process if you already have one.
- `multiselect` (optional): Enable/disable the ability to select multiple files in the picker.
- `supportDrives` (optional): Enable/disable support for shared drives.
- `showUploadView` (optional): Enable/disable the upload view in the picker.
- `showUploadFolders` (optional): Enable/disable the ability to select folders for uploading files.
- `customViews` (optional): An array of custom views you want to add to the picker.

For a complete list of configuration options and their descriptions, please refer to the following table:

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



