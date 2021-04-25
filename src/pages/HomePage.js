import React, {useState} from "react";
import "../homepage.css"
import SkyID from 'skyid';
import {useHistory} from "react-router-dom";
import { ArwesThemeProvider, Button, Card, FrameCorners, FramePentagon, StylesBaseline, Text } from "@arwes/core";
import { Box } from 'grommet';
import mindfileImage from "../images/mindfile.jpeg";
import eternalAI from "../images/eternalAI.jpeg";
import socialMedia from "../images/socialMedia2.jpeg";

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
var skyid = new SkyID('Eternal Atake',skyidEventCallback, opts)

function HomePage() {
    let history = useHistory();
    function to_mindfile(event) {
        history.push("/mindfile");
    }
    function to_bot(event) {
        history.push("/train");
    }
    const [login,setLogin] = useState(false);

    const handleLogout = async () => {
        skyid.sessionDestroy()
        setLogin(false)
        window.location.reload();
    }
    let themeSettings = {};
  return (
    <div style={{ backgroundColor:"#021114", height:"100vh"}}>
        <ArwesThemeProvider themeSettings={themeSettings}>
        <StylesBaseline />
        <div>
        {skyid.seed ? 
            <div>
            <pre className="header" >
            <Box direction="row" gap="small" pad="small">
                <Box style={{paddingLeft:"25vw"}}>
                <h2 style={{ marginBottom:0,padding:0}} className="textOut">Eternal Atake</h2>
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
        <br/>
        {/* CARDS -> MindFile, ChatBot, Export Data from Socail Media */}
        <div className="wrapper">
        <Box gap="xlarge" align="strech" alignSelf="center" pad="large" >
        <Card
            // animator={{ activate }}
            image={{
              src: mindfileImage,
              alt: 'mindfile'
            }}
            title='MindFile'
            options={
              <Button palette='secondary' active onClick= {to_mindfile}>
                <Text>Upload MindFile</Text>
              </Button>
            }
            landscape
            hover
            style={{ maxWidth: 800 }}
        >
            <Text style={{fontSize:"1.1em"}}>
            Store all your sensitive personal data including 
            Biometrics Photos Videos Chat Exports and your
            Last Will securely on MindFile. 
            </Text>
        </Card>
        <Card
            // animator={{ activate }}
            image={{
              src: eternalAI,
              alt: 'A nebula'
            }}
            title='Talk With Eternal AI'
            options={
              <Button palette='primary'>
                <Text>Coming Soon</Text>
              </Button>
            }
            landscape
            hover
            style={{ maxWidth: 800 }}
        >
            <Text style={{fontSize:"1.1em"}}>
              Talk with our Eternal AI which extracts out
              your personal data and perhaps your digital consciousness,
              while you talk to it, 
              which is then used to train your avatar. 
            </Text>
        </Card>
        <Card
            // animator={{ activate }}
            image={{
              src: socialMedia,
              alt: 'A nebula'
            }}
            title='Connect Social Media'
            options={
              <Button palette='disable'>
                <Text>Coming Soon</Text>
              </Button>
            }
            landscape
            hover
            style={{ maxWidth: 800 }}
        >
            <Text style={{fontSize:"1.1em"}}>
              Connect and export your data including
              your Posts, Profile Photo, Likes, etc.
              from your Social Media sites.
            </Text>
        </Card>
        </Box>
        </div>

        {/* Footer */}
        {/* <div style={{position:"fixed", bottom:0, width:"100%"}}>
        <hr />
        <Text animator={{ animate: false }}>
            Eternal Atake
        </Text>
        </div> */}
        </ArwesThemeProvider>
    </div>
  );
}

export default HomePage;
{/* <div className="show-if-initialized show-if-logged-in" style={{display:"none"}}> */}
{/* <button onClick= {to_mindfile}>MindFile</button>
<button onClick= {to_bot}>Bot</button> */}