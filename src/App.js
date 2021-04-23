import React from "react";
import {Route, BrowserRouter} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MindFile from "./pages/MindFile";
import Bot from "./pages/Bot";
import LoginPage from "./pages/LoginPage";
import Journal from "./pages/Journal";
import FolderFiles from "./pages/FolderFiles";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Route path="/" exact component={LoginPage} />
        <Route path="/home" exact component={HomePage}/>
        <Route path="/mindfile" exact component={MindFile}/>
        <Route path="/mindfile/:folderName" component={FolderFiles}/>
        <Route path="/train" exact component={Bot} />
        <Route path="/journal" exact component={Journal} />
      </BrowserRouter>

    </div>
  );
}

export default App;
{/* <form onSubmit = {handleSubmit}>
<input type="file" onChange={handleChange} />
<button type ="submit">Click to submit</button>
</form>
{url ? <img alt="uploaded" src={url}/> : <div>File not Uploaded</div>}
const [file, setFile] = useState();
const [url,setUrl] = useState();

function handleChange(event) {
  setFile(event.target.files[0]);
}

const handleSubmit = async (event) => {
  event.preventDefault();
  <button type ="submit">Click to submit</button>
  const {skylink} = await client.uploadFile(file);
  const skylinkUrl = await client.getSkylinkUrl(skylink);
  setUrl(skylinkUrl);
  console.log(`Upload successful, skylink: ${skylinkUrl}`);
  alert("File uploaded to the Skynet network")
} 
{!login ? <Redirect to="/" /> : <div></div>}
<form onSubmit = {handleSubmit}>
  <input type="file" onChange={handleChange} />
  <button type ="submit">Click to submit</button>
</form>

<br/>

<button onClick={getFile}>Get file</button>
{url ? <img alt="uploaded" src={burl}/> : <div>File not Uploaded</div>}

<br/>

<button onClick={uploadJSON}>Set JSON</button>
<button onClick={downloadJSON}>Get JSON</button>
{login ? <Redirect to="/home" /> : <div></div>}

const portal = 'https://siasky.net/';
const client = new SkynetClient(portal);
*/}

{/* <div className="show-if-not-initialized show-if-not-logged-in" style={{display:""}}>
        {!login ? <button onClick= {handleLogin}>Login</button> : console.log(history)}
      </div>
      HomePage component after Login
      <div className="show-if-initialized show-if-logged-in" style={{display:"none"}}>
        <HomePage />
      </div> */}