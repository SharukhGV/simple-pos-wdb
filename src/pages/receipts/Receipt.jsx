import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Receipt({ receipt }) {


  return (
    <>
      <tbody>
        <tr>
          <td>{date1}</td>
          <td><Link to={`/receipts/${theId}`}>{theId}</Link>
          </td>
          <td>{total1}</td>
        </tr>
      </tbody>


    </>


  );
}

export default Receipt;