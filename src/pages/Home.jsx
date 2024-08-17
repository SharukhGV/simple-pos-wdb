// import { Link, useNavigate } from "react-router-dom"
// import { useState } from "react";

// // import "./home.css"
// export default function Home({ loginUsername }) {
// 	const navigate = useNavigate();

	
// 	return (
// 		<div  >
// 			<h3>{!!loginUsername ? "Welcome" : "Login to view all Features"}</h3>
// 			<h3>{loginUsername}</h3>
// 			<div >
// 				<br></br>
			
// 			</div>



// 		</div>
// 	);
// }

// import UploadJSON from "../Components/downloadUploadFiles/UploadJSON";
// import DownloadJSON from "../Components/DownloadJSON";
function Home({ fileData, setFileData }) {



  const pixstyle = {
    fontSize: "15px",
  };
  const pixstyle2 = {
    fontSize: "15px",
  };


  return (
    <div style={{marginLeft:"15px",marginRight:"15px"}}className="cardContact">

      <div className="homePAge">

        <h1>Simple POS</h1>
        <p>A Receipt and Sales Tracker for Small Businesses</p>
        <p style={pixstyle2}>
          An estimated 6000 entries containing about 500 characters each can be stored locally on this application. However, anticipate the scenario where this amount is much less. Remember to download a backup of your data every so often. This application is still in development, however, it has been tested to work, just not with lots of data. You can always repopulate your data whenever you feel the need to by downloading the JSON file of your data. When uploading data to the app, do not alter the data and do not submit any other JSON data besides the one from the app and it must have atleast one entry in it.

        </p>
      </div>

{/*  */}
    </div>
  );
}

export default Home;
