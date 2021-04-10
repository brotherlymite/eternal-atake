import React, { useState } from "react";
import { SkynetClient } from 'skynet-js';

const portal = 'https://siasky.net/';
const client = new SkynetClient(portal);

function App() {

  const [file, setFile] = useState();
  const [url,setUrl] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {skylink} = await client.uploadFile(file);
    const skylinkUrl = await client.getSkylinkUrl(skylink);
    setUrl(skylinkUrl);
    console.log(`Upload successful, skylink: ${skylinkUrl}`);
    alert("File uploaded to the Skynet network")
  }

  return (
    <div >
      <form onSubmit = {handleSubmit}>
      <input type="file" onChange={handleChange} />
      <button type ="submit">Click to submit</button>
      </form>
      {url ? <img alt="uploaded" src={url}/> : <div>File not Uploaded</div>}
    </div>
  );
}

export default App;
