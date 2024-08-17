import React from 'react';
import jsPDF from 'jspdf';

const DownloadPDFButton = () => {
  const handleDownloadPDF = () => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('dataJSON'));

    const formatEntry = (entry) => {
      return `
      ID: ${entry.id} 
      Date: ${entry.date}
      Product_list: ${entry.product_list.map(x => {
        return (
          "\n" + `${x.name} --- ${x.cost}` + "\n"
        )
      })}
      Description: ${entry.receipt_description}
      Grand_Total: ${entry.total}
      Tax_Amount: ${entry.tax_Amount}
      -------------------------------
      `;
    };

    const formattedData = dataFromLocalStorage.map(formatEntry).join('\n');

    const doc = new jsPDF();
    doc.setFontSize(10);

    const lines = doc.splitTextToSize(formattedData, doc.internal.pageSize.getWidth() - 20);
    let cursorY = 10;

    lines.forEach((line) => {
      doc.text(10, cursorY, line);
      cursorY += 7;
      if (cursorY >= doc.internal.pageSize.getHeight() - 10) {
        doc.addPage();
        cursorY = 10;
      }
    });
    doc.save('local_storage_data.pdf');
  };

  return (

    <button style={{ backgroundColor: "#ccffff", color: "black" }} onClick={handleDownloadPDF}>💻 Download Data as PDF 📝</button>

  );
};

export default DownloadPDFButton;
