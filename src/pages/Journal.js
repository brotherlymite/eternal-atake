import { ArwesThemeProvider,Button, FrameBox, FramePentagon, LoadingBars, StylesBaseline, Text } from "@arwes/core";
import { Box } from "grommet";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import SkyID from 'skyid';
import "../homepage.css";
import TextArea from '@leafygreen-ui/text-area';
import Modal from "@leafygreen-ui/modal";
import MaterialTable from "material-table";

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
var opts = { 'devMode': devMode  };
var skyid = new SkyID('Eternal Atake',skyidEventCallback, opts);

function Journal() {

  let history = useHistory();
  const [Data,setData] = useState({});
  const [text,setText] = useState("");
  const [login,setLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const loadData = async() => {
    skyid.getJSON("index", function(response) {
      if (response === false) {
      alert('Sorry, skyid.getFile failed :(')
      }
      console.log(response.Journal);
      setData(response);
  })
  }

  useEffect(() => {
    loadData();
    return () => {
        //
    };
  }, []);

  function handleChange(event) {
    const Text = event.target.value;
    let todaysDate = new Date;
    todaysDate = todaysDate.toDateString();
    setText({date:todaysDate, text:Text});
  }

  const handleLogout = async () => {
    skyid.sessionDestroy();
    setLogin(false);
    window.location.reload();
  }

  function handelSubmit(event) {
    event.preventDefault();
    setData(Data.Journal.push(text));
    console.log(text);
    // pushData(data);
    skyid.setJSON('index', Data, function(response) 
    {
      if (response !== true) {
      alert('Sorry, skyid.setJSON failed :(');
      }
      else {
      console.log(response);
      loadData();
      }
    })
  }
  let themeSettings = {};
  
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
            <Box style={{paddingLeft:"32vw"}}>
            <h2 style={{ marginBottom:0,padding:0}} className="textOut">Journal</h2>
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

      {/* UPLOAD JOURNAL */}
      <Box width="xlarge" pad="large" gap="large" style={{margin:"auto"}}>
      <div>
        <form onSubmit={handelSubmit}>
          {/* <input className="textArea" type="textarea" name="textValue" onChange={handleChange} style={{backgroundColor:"white", color:"black",}}/> */}
          <Box width="xlarge" pad="large" gap="large">
          <TextArea style={{backgroundColor:"#7efcf6", color:"#021114", height:"30vh"}}
            label=" "
            onChange={handleChange}
          />
          <Button FrameComponent={FrameBox} style={{maxWidth:"200px",margin:"auto"}} type ="submit">Click to submit</Button>
          </Box>
        </form>
      </div>
      

      {/* Table View Modal */}
      {Data.Journal ?
        <Box width="xlarge" alignSelf="center" pad="medium" margin="medium" alignContent="center" justify="center" style={{margin:"auto"}}>
        <MaterialTable style={{backgroundColor:"#021114",color:"#7efcf6"}}
          title="Uploaded Journals"
          search="False"
          paging="false"
          data={Data.Journal}
          columns={[
            { title: 'Date', field: 'date' },
            // { title: 'Date Added', field: 'Date' },
            { title: '', field: 'status', render: (journal) => <div><Button onClick={() => {setOpen(curr => !curr); setModalText(journal.text)}}>View</Button></div> },
          ]}
          options={{
            search:false , 
            paging:false ,
            rowStyle: {
              backgroundColor: '#021114',
              color:"#7efcf6"
            },
            headerStyle: {
              backgroundColor: '#06d8d7',
              color:"#021114"
            }
          }}
        />
        </Box>
        : <LoadingBars size={1.5} speed={4}  animator={{ activate:"False" }}/>
      }

      <Modal open={open} setOpen={setOpen}>
        {modalText}
      </Modal>
      </Box>
      </ArwesThemeProvider>
    </div>
  );
}

export default Journal;
{/* {data.Journal ? console.log(data.Journal[0]) : <>Loading...</>} */}