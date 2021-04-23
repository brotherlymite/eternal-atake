import { ArwesThemeProvider,Button, FrameBox, FrameHexagon, FramePentagon, FrameUnderline, StylesBaseline, Text } from "@arwes/core";
import { Box, FileInput } from "grommet";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import SkyID from 'skyid';
import "../homepage.css";

function skyidEventCallback(message) {
	switch (message) {
		case 'login_fail':
			console.log('Login failed')
			break;
		case 'login_success':
			console.log('Login succeeded!')
			// fetchNote()
			break;
		case 'destroy':
			console.log('Logout succeeded!')
			break;
		default:
			console.log(message)
			break;
	}
}
if (window.location.hostname === 'idtest.local' || window.location.hostname === 'localhost' || window.location.protocol === 'file:') {
	var devMode = true
} else {
	var devMode = false
}

var opts = { 'devMode': devMode  }
var skyid = new SkyID('App name',skyidEventCallback, opts)

function getFileExtension(filename)
{
  return filename.split('.').pop();
}

function FolderFiles() {

  const { folderName } = useParams();
  const [index,setIndex] = useState({});
  const [file, setFile] = useState();
  const [url,setUrl] = useState();
  const [bUrl,setBUrl] = useState();
  const [login,setLogin] = useState(false);
  let history = useHistory();

  const getIndex = async () => {
    skyid.getJSON("index", function(response) {
    if (response === false) {
    alert('Sorry, skyid.getFile failed :(')
    }
    var responseObject = JSON.parse(response);
    console.log(response);
    setIndex(responseObject);
    })
  }

  useEffect(() => {
    getIndex();
    return () => {
        //
    };
  }, []);

  const handleLogout = async () => {
    skyid.sessionDestroy()
    setLogin(false)
    window.location.reload();
  }

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleChangewrapper() {
    document.getElementById('inputFile').click();
  }
  
  const uploadIndex = () => 
  {
    let jsonData = JSON.stringify(index);
    skyid.setJSON('index', jsonData, function(response) 
    {
      if (response !== true) {
      alert('Sorry, skyid.setFile failed :(');
      }
      else {
      var responseObject = JSON.parse(response);
      console.log(responseObject);
      getIndex();
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();      
    skyid.uploadEncryptedFile(file, '', function(skylink) 
    {
      console.log('Uploaded:', skylink);
      setUrl(skylink);
      let todaysDate = new Date;
      todaysDate = todaysDate.toDateString();
      let obj = {fileName: file.name, Date: todaysDate, Category: folderName, Link: skylink};
      setIndex(index.Files.push(obj));
      uploadIndex();
    })
    alert("Encrypted File uploaded to the Skynet network")
  }

  const getFile = async () => {
    console.log("get file started");
    skyid.downloadEncryptedFile(url, '', function(blobUrl){
      console.log('File downloaded', blobUrl);
      setBUrl(blobUrl);
    })
  }
  let themeSettings = {};

  const downloadUploadedFile = (link,filename) =>
  {
    console.log(link);
    skyid.downloadEncryptedFile(link, '', function(blobUrl){
      console.log('File downloaded', blobUrl);
      let tempLink = document.createElement('a');
      tempLink.href = blobUrl;
      tempLink.setAttribute('download', filename);
      tempLink.click();
    })
  }

  return (
    <div style={{ backgroundColor:"#021114", height:"100vh"}}>
    
    <ArwesThemeProvider themeSettings={themeSettings}>
      <StylesBaseline />
      {/* NavBar */}
      <div>
      {skyid.seed ? 
          <div>
          <pre className="header" >
          <Box direction="row" gap="small" pad="small">
            <Box style={{paddingLeft:"20vw"}}>
            <h2 style={{ marginBottom:0,padding:0}} className="textOut">{folderName.replace("_", " ")}</h2>
            </Box>
            <Box className="logOut" style={{paddingLeft:"15vw"}}>
            <Button onClick= {handleLogout} FrameComponent={FramePentagon} animator={{ animate: false }} className="logOut" >
                <Text style={{ width: "100%", height: "100%"}} className="textLog">Log Out</Text>
            </Button>
            </Box>
          </Box>
          </pre>
          </div>
      : history.push('/')
      }
      </div>
      
      {/* File Upload */}
      <br/>
      <Box direction="column" align="center" padding="small" margin="medium">
      <FrameBox>
      <div style={{paddingLeft:"4vw", paddingRight:"4vw", paddingTop:"2vw"}}>
        <Button FrameComponent={FrameUnderline} onClick={handleChangewrapper} >
          <Text className="uploadButton">Upload file</Text>
        </Button>
      </div>
      <div style={{paddingLeft:"4vw", paddingRight:"4vw", paddingTop:"2vw", paddingBottom:"2vw"}}>
        <form onSubmit = {handleSubmit}>
          <input type="file" onChange={handleChange} style={{ display: "none" }} id="inputFile"/>
          <br/>
          <Button FrameComponent={FrameBox} type ="submit"><Text className="uploadButton">Click to submit</Text></Button>
        </form>
      </div>
      </FrameBox>
      </Box>
      <br/>


    {/* Display All Folder Files */}
    {
    index.Files ?
     index.Files.map((file) => {
       if(file.Category === folderName)
       {
        return (
        <div>
          <button onClick={() => { downloadUploadedFile(file.Link,file.fileName)}} >{file.fileName}</button>
          
        </div>
        )
       }
     }) 
    : <>Loading...</>
    }

    {/* <button onClick={getFile}>Get file</button>
    {url ? <a href={bUrl} download="a.png">Download</a> : <div>File not Uploaded</div>} */}
    </ArwesThemeProvider>
    </div>
  );
}

export default FolderFiles;
{/* <img alt="uploaded" src={burl}/> 
{console.log(getFileExtension("image1.jpeg"))}
*/}
{/* { folderName ? folderName : <>aa</>}
    {console.log(index)} */}
