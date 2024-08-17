import React from 'react';
import jsPDF from 'jspdf';

function DownloadReceipt({ receipt9 }) {
  const handleDownloadPDF = () => {
    const dataFromLocalStorage = receipt9

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

    const formattedData = formatEntry(dataFromLocalStorage);

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
    doc.save(`${receipt9.id}.pdf`);
  };

  return (

    <button onClick={handleDownloadPDF}> Download Data as PDF </button>

  );
};

export default DownloadReceipt;
