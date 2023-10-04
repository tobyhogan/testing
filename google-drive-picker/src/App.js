import logo from './logo.svg';
import './App.css';

import React, { useEffect } from 'react';
import useDrivePicker from 'react-google-drive-picker';

function App() {

  const [openPicker, data, authResponse] = useDrivePicker();

  const handleOpenPicker = () => {
    openPicker({
      clientId: "",
      developerKey: "",
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true

    })
  }

  useEffect(() => {

    if (data) {
      data.docs.map((i) => console.log(i))
    }

  }, [data])

  return (

    <div>
      <button onClick={() => handleOpenPicker()}> Open Picker </button>
    </div>
    

  );
}

export default App;
