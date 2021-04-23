import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SkyID from 'skyid';

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

  function handleChange(event) {
    setFile(event.target.files[0]);
    // console.log(event.target.files[0]);
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
        // console.log(index);
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

  return (
    <div >
    
    {/* Display All Folder Files */}
    {
    index.Files ?
     index.Files.map((file) => {
       if(file.Category === folderName)
       {
        return (<div>{file.fileName}</div>)
       }
     }) 
    : <>Loading...</>
    }

    {/* Upload Encrypted Files to the Folder 
      take an input file and uploadEncryptedFile and save the skyLink, upload to Index  
    */}
    <br/>
    <form onSubmit = {handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type ="submit">Click to submit</button>
    </form>
    <br/>

    <button onClick={getFile}>Get file</button>
    {url ? <a href={bUrl} download="a.png">Download</a> : <div>File not Uploaded</div>}
    {/* Download All the Files */}
    
    </div>
  );
}

export default FolderFiles;
{/* <img alt="uploaded" src={burl}/> 
{console.log(getFileExtension("image1.jpeg"))}
*/}
{/* { folderName ? folderName : <>aa</>}
    {console.log(index)} */}
