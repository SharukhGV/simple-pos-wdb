import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import DownloadPDFButton from "../downloadUploadFiles/DownloadPDFButton";
import Receipt from "../receipts/Receipt";
// import DownloadJSON from "../downloadUploadFiles/DownloadJSON"


function Receipts({ fileData }) {
  
  const[query,setQuery]=useState("")

function handletextChangeSearch(){
console.log("here is some code for searchbar")

}


  return (

    <div style={{marginLeft:"15px",marginRight:"15px"}} className="cardContact">
      <h1>All Receipts</h1>
      <div>Your Receipts are stored on a Database.Search for a receipt by the ID number of it </div>
      <input type="text" onChange={handletextChangeSearch} placeholder="Search by id..." value={query}></input>
      <div className="cardContact">

        {/* <table className="thedreamtable">
          <thead>
            <tr>
              <th>Date</th>
              <th>ID</th>
              <th>Total Cost</th>
            </tr></thead>
          {!!query ? <>{filterById.map((receipt) => {

            return (

              <tbody>
                <tr>
                  <td>{receipt.date}</td>
                  <td><Link to={`/receipts/${receipt.id}`}>{receipt.id}</Link>
                  </td>
                  <td>{receipt.total}</td>
                </tr>
              </tbody>
            );
          })}</>
            :
            dreams7.map((receipt) => {

              return (

                <Receipt
                  key={receipt.id} receipt={receipt}
                />
              );
            })}


        </table> */}
      

      </div></div>
  );
}


export default Receipts;