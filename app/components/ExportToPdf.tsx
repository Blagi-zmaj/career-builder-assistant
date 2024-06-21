import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

const ExportToPdf = () => {
  const contentRef = useRef();

  const handleDownloadPdf = () => {
    const element = contentRef.current;

    const opt = {
      margin: 1,
      filename: "myDocument.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
      <div ref={contentRef}>
        <h1>Hello, World!</h1>
        <p>This is a sample PDF document generated from HTML content.</p>
      </div>
      <button onClick={handleDownloadPdf}>Download PDF</button>
    </div>
  );
};

export default ExportToPdf;
