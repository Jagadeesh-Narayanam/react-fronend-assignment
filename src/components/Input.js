import React, { useState, useEffect } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';



const Input = (props) => {
  const [inputFile, setInputFile] = useState();
  const [convertedData, setConvertedData] = useState([]);

  useEffect(() => {

    if (inputFile) {
      ExcelRenderer(inputFile, (err, resp) => {
        if (err) {
          console.log("error");
        } else {
          const modifyData = resp.rows?.slice(1)?.map((itm, index) => ({
            "key": index,
            "name": itm[1] || "",
            "batch": itm[2] || "",
            "stock": itm[3] || "",
            "deal": itm[4] || 0,
            "free": itm[5] || 0,
            "mrp": itm[6] || "",
            "rate": itm[7] || "",
            "exp": getJsDateFromExcel(itm[8]).getDate() + "/" + getJsDateFromExcel(itm[8]).getMonth() + "/" + getJsDateFromExcel(itm[8]).getFullYear() || "",

          }));
          setConvertedData(modifyData);
        }
      });
    }
  }, [inputFile]);

  const inputFileHandler = (event) => {
    if (event.target.files[0]) {
      setInputFile(event.target.files[0]);
    }
    // console.log(inputFile);
  }
  const uploadConvertedData = (event) => {
    event.preventDefault();
    props.fileUploaded(convertedData);

  }

  const getJsDateFromExcel = excelDate => {
    return new Date((excelDate - (25567 + 2)) * 86400 * 1000);
  }
  return (
    <div className='container'>
      <div className='d-flex align-items-center justify-content-center' style={{ "margin": "10px" }}>
        <h3>Upload Excel File Here</h3>
      </div>
      <div className='d-flex align-items-center justify-content-center' style={{ "margin": "5px" }}>
        <input
          className="form-control"
          type="file"
          accept=".xlsx,.csv"
          id="excel-file"
          onChange={inputFileHandler}
          style={{ "width": "30rem", "margin": "3px" }} />
        <input
          className="btn btn-primary" 
          type="submit" 
          id="parse" 
          onClick={uploadConvertedData} 
          value="Parse Data" />
      </div>
    </div>
  )
}


export default Input;