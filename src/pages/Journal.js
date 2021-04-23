import React, { useEffect, useState } from "react";
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
var opts = { 'devMode': devMode  };
var skyid = new SkyID('App name',skyidEventCallback, opts);

function Journal() {

  const [data,setData] = useState({});
  const [text,setText] = useState("");

  const loadData = async() => {
    skyid.getJSON("index", function(response) {
      if (response === false) {
      alert('Sorry, skyid.getFile failed :(')
      }
      var responseObject = JSON.parse(response);
      console.log(responseObject.Journal);
      setData(responseObject);
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

  function handelSubmit(event) {
    event.preventDefault();
    setData(data.Journal.push(text));
    console.log(text);
    // pushData(data);
    let xdata = JSON.stringify(data);
    skyid.setJSON('index', xdata, function(response) 
    {
      if (response !== true) {
      alert('Sorry, skyid.setFile failed :(');
      }
      else {
      var responseObject = JSON.parse(response);
      console.log(responseObject);
      loadData();
      }
    })
    
  }

  return (
    <div >
      {data.Journal ? console.log(data.Journal[0]) : <>Loading...</>}
      <div>
      <form onSubmit={handelSubmit}>
      <input type="textarea" name="textValue" onChange={handleChange}/>
        <button type ="submit">Click to submit</button>
      </form>
      </div>
    </div>
  );
}

export default Journal;
