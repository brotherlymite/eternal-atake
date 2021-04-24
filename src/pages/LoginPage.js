import React, {useEffect, useState} from "react";
import SkyID from 'skyid';
import {useHistory} from "react-router-dom";
import Particles from "react-particles-js";
import "../login.css";
import {ArwesThemeProvider, Button, FrameHexagon, FrameLines, StylesBaseline, Text} from "@arwes/core";
import { AnimatorGeneralProvider } from "@arwes/animation";
import { BleepsProvider } from "@arwes/sounds";
import { Box } from 'grommet';
import MaterialTable from 'material-table';

function LoginPage() {
    let history = useHistory();
    function skyidEventCallback(message) {
        switch (message) {
            case 'login_fail':
                console.log('Login failed')
                break;
            case 'login_success':
                console.log('Login succeeded!');
                // history.push('/home');
                window.location.href = '/home';
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

    const [login,setLogin] = useState(false);

    const handleLogin = ()=> {
        skyid.sessionStart();
        // callback();
        setLogin(true);
        
        // history.push('/home')
    }


    const SOUND_ASSEMBLE_URL = '/assets/sounds/assemble.mp3';
    const animatorGeneral = { duration: { enter: 200, exit: 200 } };
    const audioSettings = { common: { volume: 0.25 } };
    const playersSettings = { assemble: { src: [SOUND_ASSEMBLE_URL], loop: true } };
    const bleepsSettings = { assemble: { player: 'assemble' } };

  const [activate, setActivate] = useState(true);

  useEffect(() => { 
    const timeout = setTimeout(() => setActivate(activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <div className="bg">
      {skyid.seed ? history.push('/home') : console.log("skyid seed undefined")}
      
        {!login ? 
        <ArwesThemeProvider>
        <AnimatorGeneralProvider animator={animatorGeneral} >
            <StylesBaseline styles={{
                button: { margin: '0 20px 20px 0' }
            }} />
            <BleepsProvider
              audioSettings={audioSettings}
              playersSettings={playersSettings}
              bleepsSettings={bleepsSettings}
            >
            </BleepsProvider>

            <Box direction='column' align="center" justify="center" alignSelf="centre" className="center" style={{ padding: "50px"}}>
            <FrameHexagon animator={{ activate }} style={{ padding: "10px"}}>
                <div>
                <Text style={{ width: "100%", height: "100%", fontSize:"8vw", textAlign:"center", margin:"auto",top:0,bottom:0 }}>ETERNAL ATAKE</Text>
                <Text style={{ width: "100%", height: "100%", fontSize:"2.5vw", textAlign:"center", margin:"auto",top:0,bottom:0 }}>Decentralised data storage for Digital Afterlife</Text>          
                </div>
            </FrameHexagon>
            <div style={{ padding: "50px"}}>
            <Button FrameComponent={FrameLines} animator={{ animate: false }} onClick={handleLogin}>
                <Text style={{ width: "100%", height: "100%", fontSize:"2.5vw", textAlign:"center", margin:"auto",top:0,bottom:0 }}>
                    Login / SignUp
                </Text>
            </Button>
            </div>
            </Box>

        </AnimatorGeneralProvider>
        </ArwesThemeProvider>
        : console.log(history)}
      
    {console.log(skyid)}

    <Particles 
    params={{
	    "particles": {
            color: "#3CA9D1",
	        "number": {
	            "value": 400,
	            "density": {
	                "enable": true,
	                "value_area": 1500
	            }
	        },
	        "line_linked": {
	            "enable": true,
	            "opacity": 0.08
	        },
	        "move": {
	            "direction": "random",
	            "speed": 0.09
	        },
	        "size": {
	            "value": 1
	        },
	        "opacity": {
	            "anim": {
	                "enable": true,
	                "speed": 1.5,
	                "opacity_min": 0.05
	            }
	        }
	    },
	    "retina_detect": true
	}}
    height="100vh"
    />
    </div>
  );
}
export default LoginPage;
{/* <div className="show-if-not-initialized show-if-not-logged-in" style={{display:""}}> */}