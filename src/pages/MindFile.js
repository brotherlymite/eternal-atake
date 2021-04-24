import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
import SkyID from 'skyid';
import { ArwesThemeProvider, Button, Card, FrameBox, FramePentagon, LoadingBars, StylesBaseline, Text } from "@arwes/core";
import "../mindfile.css";
import "../homepage.css";
import { Box } from 'grommet';
import journalImage from "../images/journal.jpeg";

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

function MindFile() {
    const [login,setLogin] = useState(false);
    const [file, setFile] = useState();
    const [url,setUrl] = useState();
    const [burl,setBUrl] = useState();
    const [activate, setActivate] = useState(true);

    let obj = { Folder:["Personal Journal" ,"Freeform Audio" ,"Freeform Video","Freeform Photos", "Chat exports"] };
    const [index,setIndex] = useState({});
    let history = useHistory();

    function handleChange(event) {
      setFile(event.target.files[0]);
    }
    let themeSettings = {};
    const handleSubmit = async (event) => {
      event.preventDefault();
      skyid.uploadEncryptedFile(file, '', function(skylink) {
      console.log('Uploaded:', skylink)
      setUrl(skylink)
      })
      alert("Encrypted File uploaded to the Skynet network")
    }

    const handleLogout = async () => {
      skyid.sessionDestroy()
      setLogin(false)
      window.location.reload();
    }

    const getFile = async () => {
      console.log("get file started");
      skyid.downloadEncryptedFile(url, '', function(blobUrl){
        console.log('File downloaded', blobUrl);
        setBUrl(blobUrl);
      })
    }
    
    const setInitialIndex = async () => 
    {
        let initialObject = { Folder:[ "freeform_audio" ,"freeform_video","freeform_photos", "chat_exports","biometrics","last_will","others"], Files:[] , Journal:[] };
        let jsonData = JSON.stringify(initialObject);
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

    const getIndex = async () => {
        skyid.getJSON("index", function(response) {
        if (response === false) {
        alert('Sorry, skyid.getFile failed :(')
        }
        var responseObject = JSON.parse(response);
        console.log(responseObject);
        setIndex(responseObject);
    })
    }

    const setIndexifEmpty = async () => {
        skyid.getJSON('index', function(response) {
        if (response === false) {
          alert('Sorry, skyid.getFile failed :(');
        }
        else if(response === '')
        {
          console.log("Initializing mindfile ........");
          setInitialIndex();
        }
        else {
          getIndex();
        }
    })
    }

		const setIndextest = async () => 
    {
        let initialObject = { Folder:["Freeform Audio" ,"Freeform Video","Freeform Photos", "Chat exports"], Journal: [{date:"date1" ,text:"text1"}, {date:"date2" ,text:"text2"}] };
        let jsonData = JSON.stringify(initialObject);
        skyid.setJSON('index', jsonData, function(response) 
        {
            if (response !== true) {
            alert('Sorry, skyid.setFile failed :(');
            }
        })
    }

    useEffect(() => {
			setIndexifEmpty();
      // const timeout = setTimeout(() => setActivate(!activate), 2000);
      // return () => clearTimeout(timeout);
			return () => {
					//
			};
    }, []);

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
              <h2 style={{ marginBottom:0,padding:0}} className="textOut">Upload Mindfile</h2>
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

        <div className="wrapper">
        <Box gap="small" align="strech" alignSelf="center" pad="large" width="large">
        <Card
          // animator={{ activate }}
          image={{
            src: journalImage,
            alt: 'Personal Journal'
          }}
          title='Personal Journal'
          options={
            <Button palette='secondary' active onClick={() => {history.push("/journal")}}>
              <Text>Upload Journal</Text>
            </Button>
          }
          landscape
          hover
          style={{ maxWidth: 800 }}
        >
          <Text style={{fontSize:"1.1em"}}>
            Upload and maintain your personal journal and tell your Diary how was your day.
          </Text>
        </Card>
        <br/>
      
        {/* <button onClick={setInitialIndex}>Set Initial Index</button>
				<button onClick={setIndextest}>Set Index test</button>
        <button onClick={getIndex}>Get Index</button>
        <br/> */}
        
				<br/>
        <Box gap="medium" width="large" alignSelf="center" direction="column">
          {/* <FrameCorners > */}
            <h4 style={{marginBottom:0}}>Choose Category to Upload Files to :-</h4>
          {/* </FrameCorners> */}
          <hr/>
					{
					index.Folder ? index.Folder.map((x) => 
					{ 
            let y =x;
            x = x.toUpperCase();
            x = x.replace("_", " ");
						return (
              <FrameBox animator={{ animate: false }} onClick={() => {history.push(`/mindfile/${y}`)}} style={{cursor:"pointer"}}>
              <Text style={{}} >{x}</Text>
              </FrameBox>
            )
					} )  
					:<LoadingBars size={1.5} speed={4} animator={{ activate:"True" }} />
					}
				</Box>
        <br/>
        </Box>
        </div>
      </ArwesThemeProvider>
    </div>
  );
}

export default MindFile;

{/* Encrypted Files
<br/>
<form onSubmit = {handleSubmit}>
    <input type="file" onChange={handleChange} />
    <button type ="submit">Click to submit</button>
</form>
<br/>
<button onClick={getFile}>Get file</button>
{url ? <img alt="uploaded" src={burl}/> : <div>File not Uploaded</div>}
<br/> 
{skyid.seed}
{fileName:"image1.jpeg" , Category:"freeform_audio" ,Link:"Link1",Date:"12 Sep"}, {fileName:"image2.jpeg",Category:"freeform_audio" ,Link:"Link2",Date:"12 October"} 
*/}
{/* <div className="show-if-initialized show-if-logged-in" style={{display:"none"}}> */}
// {skyid.seed ? 
//   <div>
//   Loaded and you are logged in! 
//   <button onClick= {handleLogout}>LogOut</button>
//   </div>
// : history.push('/')
// }
{/* <button onClick={() => {history.push("/journal")}}>Personal Journal</button> */}