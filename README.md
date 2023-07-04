# Google Drive Picker

 The Google Drive Picker allows you to integrate Google Drive file selection into your web application. With the picker, users can browse their Google Drive files and select one or more files to be used by your application.

To get started with the Google Drive Picker API, you'll need to perform the following steps:

Enable the Google Drive API: Visit the Google API Console (https://console.developers.google.com/), create a new project, and enable the Google Drive API.



## [Demo Link](https://codesandbox.io/s/google-drive-picker-drfv2t?file=/src/App.tsx)
## [Full Documentation](https://gist.github.com/Sivamani-18/4d4ff56006d85b48cd63b5928ec7fc66)
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