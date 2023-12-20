import React, { useEffect } from 'react';
import { Button, ProgressBar, Card, Form, Container, Row, Col } from 'react-bootstrap';
import Papa from "papaparse";
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
const allowedExtensions = ["csv"];
import 'bootstrap/dist/css/bootstrap.min.css';
import './pulsebootstrap.min.css'
const BootstrapFilterFeeds = () => {
  const [files, setFiles] = React.useState([]);
  const [listOfTotalData, setListOfTotalData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [startProcess, setStartProcess] = React.useState(false);
  const [enableDownload, setEnableDownload] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const [inputList, setInputList] = React.useState(window.localStorage.getItem("keywords") || "");
  const [percent, setPercent] = React.useState(0);
  const [csvColumnsList, setCsvColumnsList] = React.useState("");
  const [includedColumnsInExcel, setIncludedColumnsInExcel] = React.useState("");

  const resetAllData = () => {
    setPercent(0)
    setEnableDownload(false)
    setFilteredData([])
    setStartProcess(false)
    setFileName("")
    setCsvColumnsList("")
  }
  const getExtension = (filename) => {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }
  const onFilePickerChange = (event) => {
    resetAllData()
    const { files } = event.target;
    if (!files || files.length === 0) {
      return;
    }
    if (!allowedExtensions.includes(getExtension(files[0].name))) {
      toast.error('Please Upload CSV File Only', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const fullPath = files[0].name;
    setFileName(fullPath.substring(0, fullPath.lastIndexOf('.')) || fullPath)

    const reader = new FileReader();
    reader.onload = ({ target }) => {
      Papa.parse(target.result, {
        header: true,
        step: function(results, parser) {
          if (results?.meta?.fields && results?.meta?.fields?.length) {
            setCsvColumnsList(results?.meta?.fields.join(", "))
          }
          parser.abort();
          results = null;
        },
        complete: function(results) {
          results = null;
        }
      });
    };
    reader.readAsText(files[0]);
    setFiles(Array.from(files));
  };
  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const FileName = fileName + ".xlsx";
    XLSX.writeFile(workbook, FileName);
  };
  useEffect(() => {
    if (startProcess) {
      if (files && files.length) {
        const reader = new FileReader();
        reader.onload = async ({ target }) => {
          const csv = Papa.parse(target.result, {
            header: true
          });
          const parsedData = csv?.data
          setListOfTotalData(parsedData)
          const searchInput = inputList.split(",")?.map((splitedItem) => splitedItem.trim())
          const includedColumnsInExcelList = includedColumnsInExcel.split(",")?.map((splitedItem) => splitedItem.trim())
          const finalList = []
          parsedData.forEach((item) => {
            const valuesList = Object.values(item)
            let findItem = false;
            searchInput.forEach((searchItem) => {
              if (!findItem) {
                if (searchItem.toLowerCase() && valuesList.toString().toLowerCase().includes(searchItem.toLowerCase())) {
                  findItem = true;
                }
              }
            })
            if (findItem) {
              let finalObject = {}
              if (includedColumnsInExcel && includedColumnsInExcelList.length) {
                includedColumnsInExcelList.forEach((columnName) => {
                  if (item.hasOwnProperty(columnName)) {
                    finalObject[columnName] = item[columnName]
                  }
                })
              }
              else {
                finalObject = item
              }
              finalList.push(finalObject);
            }
          })
          setFilteredData(finalList)
          const fullPath = files[0].name;
          setFileName(fullPath.substring(0, fullPath.lastIndexOf('.')) || fullPath)
          toast('Content filtered successfully', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            theme: "light",
          });
          setEnableDownload(true)
        };
        reader.addEventListener('progress', function(e) {
          var progress_width = Math.ceil(e.loaded / e.total * 100);
          setPercent(progress_width)
        }, true);
        reader.readAsText(files[0]);
        setStartProcess(false)
      }
      else {
        toast.error('Enter a valid file', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }, [startProcess])

  useEffect(() => {
    if (csvColumnsList) {
      if (window.localStorage.getItem(csvColumnsList)) {
        setIncludedColumnsInExcel(window.localStorage.getItem(csvColumnsList))
      }
      else {
        setIncludedColumnsInExcel("")
      }
    }
  }, [csvColumnsList])

  return (
    <Container>
      <ToastContainer />
      <Card className="p-4 shadow bg-body rounded border-0">
        <Card
          border="0"
          className="p-3 bg-primary"
        >
          <h1 className="text-white">
            Filter Feeds
          </h1>
        </Card>
        <Card
          className="mt-3 border-2"
          style={{ "borderStyle" : "dotted"}}
        >
          <Card.Body>
            <p>Drag 'n' Drop csv file here or click to select file</p>
            <Button variant="secondary" onClick={() => {document.getElementById("file-upload").click()}}>
              <p className="m-0" style={{"paddingInlineStart": "0.3rem"}}> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                </svg> Choose File
              </p>
            </Button>
            <Form.Control
              id="file-upload"
              type="file"
              size="lg" 
              onChange={onFilePickerChange}
              multiple={false}
              accept={allowedExtensions.join(",")}
              className="d-none"
            />
          </Card.Body>
        </Card>
        {files.map((file) => (
            <p className="mb-0" key={file?.name}>{file?.name}</p>
        ))}
        {csvColumnsList?.length ?
            <Card className="mt-3 shadow bg-body rounded border-0">
              <Card.Title style={{"textAlign":"left"}}>Existing Columns In CSV</Card.Title>
              <p className="mb-0" style={{"textAlign":"left"}}>{csvColumnsList}</p>
            </Card>
          : null}
        <Card border="0" className="m-0 mt-4 p-0">
          <Row className="p-0 m-0">
            <Col className="ps-sm-0" xs={12} sm={6}>
              <Card border="0" className="p-0 m-0">
                <Card.Title className="text-start">Output Columns</Card.Title>
                <Form.Control
                  className="border-2"
                  as="textarea"
                  placeholder="Add comma seperated columns name"
                  style={{ height: '70px' }}
                  value={includedColumnsInExcel}
                  onChange={(e) => {
                      if (csvColumnsList) {
                        window.localStorage.setItem(csvColumnsList, e.target.value);
                      }
                      setIncludedColumnsInExcel(e.target.value)
                    }
                  }
                />
              </Card>
            </Col>
            <Col className="pe-sm-0" xs={12} sm={6}>
              <Card border="0" className="p-0 m-0">
                <Card.Title className="text-start">Keywords</Card.Title>
                <Form.Control
                  className="border-2"
                  as="textarea"
                  placeholder="Add coma separated keywords"
                  style={{ height: '70px' }}
                  value={inputList}
                  onChange={(e) => {
                    window.localStorage.setItem("keywords", e.target.value);
                    setInputList(e.target.value)
                  }}
                />
              </Card>
            </Col>
          </Row>
        </Card>
        <Card border="0" className="m-0 mt-4 p-0">
          <Row className="p-0 m-0">
            <Col className="ps-0" xs={5} sm={2}>
              <div>
                <Button
                  className="w-100"
                  variant="primary"
                  onClick={() => setStartProcess(true)}
                  disabled = {inputList.length && files.length ? false : true}
                >
                  Process
                </Button>
              </div>
            </Col>
            <Col xs={7} sm={10} className="pe-0 align-self-center">
              <ProgressBar now={percent} variant="info"/>
            </Col>
          </Row>
        </Card>
        <Card border="0" className="mt-4" style={{"background" : "#edecec"}}>
          <Row className="justify-content-center">
            <h2>Output Section</h2>
            <p>The generated excel file can be downloaded from here once the process is completed</p>
            {enableDownload && <div><b>Total rows in Input CSV:</b> {listOfTotalData.length}</div>}
            {enableDownload && <div className="mb-4"><b>Total Extracted rows in Output Excel:</b> {filteredData.length}</div>}
            <Button
              style={{"maxWidth" : "200px"}}
              variant="primary"
              disabled = {!enableDownload}
              onClick={() => exportToExcel(filteredData, fileName)}
            >
              Download
            </Button>
          </Row>
        </Card>
      </Card>
    </Container>
  );
};

export default BootstrapFilterFeeds;
