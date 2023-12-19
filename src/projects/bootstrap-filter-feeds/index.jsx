import React, { useEffect } from 'react';
import {
  // Button,
  // Card,
  DropZone,
  Flex,
  Grid,
  Heading,
  // Text,
  View,
  VisuallyHidden,
  useTheme,
  TextAreaField
} from "@aws-amplify/ui-react";
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import { MdOutlineFileUpload } from "react-icons/md";
import Papa from "papaparse";
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
const allowedExtensions = ["csv"];
import 'bootstrap/dist/css/bootstrap.min.css';

const BootstrapFilterFeeds = () => {
  const { tokens } = useTheme();
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
  const hiddenInput = React.useRef(null);
  
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
            }, complete: function(results){
              results=null;
            }
        });
    };
    reader.readAsText(files[0]);
    setFiles(Array.from(files));
  };
  const exportToExcel = (data,fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const FileName = fileName +".xlsx";
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
                  } else {
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
        reader.addEventListener('progress', function(e){
          var progress_width = Math.ceil(e.loaded/e.total * 100);
          setPercent(progress_width)
        }, true);
        reader.readAsText(files[0]);
        setStartProcess(false)
      } else {
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
      } else {
        setIncludedColumnsInExcel("")
      }
    }
  }, [csvColumnsList])
  
  return (
    <Container>
      <ToastContainer />
      <Card className="p-4 shadow bg-body rounded border-0">
        <Card
          className="p-3"
          style={{backgroundColor : tokens.colors.primary[80], color: tokens.colors.white }}
        >
          <h1 style={{"color" :tokens.colors.white}}>
            Filter Feeds
          </h1>
        </Card>
        <Card
          className="mt-3 border-2"
          style={{ "borderStyle" : "dotted"}}
        >
          <Card.Body>
            <p>Drag 'n' Drop csv file here or click to select file</p>
            <button className="btn-light px-3 py-2" type="button" onClick={() => {document.getElementById("file-upload").click()}}>
              <p className="m-0" style={{"paddingInlineStart": "0.3rem"}}> 
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zM7 9l1.41 1.41L11 7.83V16h2V7.83l2.59 2.58L17 9l-5-5-5 5z"></path>
              </svg> Choose File</p>
            </button>
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
            <Col className="ps-0">
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
            <Col className="pe-0">
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
      </Card>
    </Container>
  );
};

export default BootstrapFilterFeeds;
