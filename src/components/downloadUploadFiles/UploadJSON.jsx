import React, { useRef } from 'react';

function UploadJSON({ setFileData }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      const validateJSON = (data) => {
        const requiredFields = ["id", "name", "product_list", "total", "date", "tax_Amount", "receipt_description", "total_tax"];

        for (let field of requiredFields) {
          if (!data.hasOwnProperty(field)) {
            console.error(`Missing field: ${field}`);
            return false;
          }
        }

        if (!Array.isArray(data.product_list)) {
          console.error('Invalid data types in JSON');
          return false;
        }

        return true;
      };

      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);

          if (validateJSON(jsonData[0])) {
            setFileData(jsonData);
            window.alert("You have successfully uploaded a JSON file");
          } else {
            window.alert("Invalid JSON structure");
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
          window.alert(`Error parsing JSON: ${error}`);
        }
      };

      reader.readAsText(file);
    }
  };



  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <button style={{ backgroundColor: "#99ff99", color: "black" }} onClick={triggerFileInput}>Upload JSON File for Repopulation ↩️</button>
    </>
  );
}

export default UploadJSON;
