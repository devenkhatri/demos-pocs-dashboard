import React, { useEffect } from 'react';
import {
  Button,
  Card,
  DropZone,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
  View,
  VisuallyHidden,
  useTheme,
  Divider,
  TextAreaField
} from "@aws-amplify/ui-react";
import { MdOutlineFileUpload } from "react-icons/md";
import Papa from "papaparse";
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
const allowedExtensions = ["csv"];

const AmplifyFilterFeeds = () => {
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
      toast.error('Please Enter CSV File', {
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
    if (startProcess && files && files.length) {
      if (!files){
        toast.error('Enter a valid file', {
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
    <>
    <ToastContainer />
    <Card variation="elevated" padding="2rem">
      <Card
        backgroundColor={tokens.colors.primary[80]}
        color={tokens.colors.white}
        columnStart="1"
        columnEnd="-1" 
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
        >
          <Heading level={1} color={tokens.colors.white}>
            Filter Feeds
          </Heading>
        </Flex>
      </Card>
      <Grid
        columnGap="0.5rem"
        rowGap="0.5rem"
        templateColumns="1fr 1fr 1fr"
      >
        <Card columnStart="1" columnEnd="-1" padding="1rem 0">
          <DropZone
            acceptedFileTypes={allowedExtensions}
            onDropComplete={({ acceptedFiles, rejectedFiles }) => {
              setFiles(acceptedFiles);
            }}
          >
            <Flex direction="column" alignItems="center">
              <Text>Drag 'n' Drop csv file here or click to select file</Text>
              <Button size="small" onClick={() => hiddenInput.current.click()}>
                <MdOutlineFileUpload />
                <Text paddingLeft={"0.3rem"}>Choose File</Text>
              </Button>
            </Flex>
            <VisuallyHidden>
              <input
                type="file"
                tabIndex={-1}
                ref={hiddenInput}
                onChange={onFilePickerChange}
                multiple={false}
                accept={allowedExtensions.join(",")}
              />
            </VisuallyHidden>
          </DropZone>
          {files.map((file) => (
            <Text key={file?.name}>{file?.name}</Text>
          ))}
          {csvColumnsList?.length ?
            <Card  variation="elevated" marginTop="15px" marginBottom="15px">
              <Heading level={5} alignSelf={"flex-start"} style={{"text-align":"left"}} >
                Existing Columns In CSV
              </Heading>
              <Text style={{"text-align":"left"}}>{csvColumnsList}</Text>
            </Card>
          : null}
          <Grid  columnGap="2rem" templateColumns={{ base: '1fr', large: '1fr 1fr' }} direction="row" margin="2rem 0">
            <View >
              <Text style={{"text-align":"left"}} fontWeight="600">Output Columns</Text>
              <TextAreaField placeholder="Add comma seperated columns name" style={{"text-align":"left"}} rows={2} value={includedColumnsInExcel} onChange={(e) => {
                  if (csvColumnsList) {
                    window.localStorage.setItem(csvColumnsList, e.target.value);
                  }
                  setIncludedColumnsInExcel(e.target.value)
                }
              }/>
            </View>
            <View>
              <Text style={{"text-align":"left"}} fontWeight="600">Keywords</Text>
              <TextAreaField placeholder="Add comma seperated keywords" style={{"text-align":"left"}} rows={2} value={inputList} onChange={(e) => { window.localStorage.setItem("keywords", e.target.value); setInputList(e.target.value)}}/>
            </View>
          </Grid>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            alignContent="space-between"
            wrap="nowrap"
            gap="1rem"
          >
            <Button
              variation="primary"
              loadingText=""
              onClick={() => setStartProcess(true)}
              disabled = {!inputList.length}
            >
              Process
            </Button>
            <View
              as="progress"
              data-progress-bar
              color={tokens.colors.primary[90]}
              padding="1rem"
              width="100%"
              max="100"
              value={percent}
            />
            <View as="div">{percent}%</View>
          </Flex>
        </Card>
        <Card
          backgroundColor={tokens.colors.primary[10]}
          columnStart="1"
          columnEnd="-1"
        >
          <View as="p" marginBottom="1rem">
            <Heading level={3} color={tokens.colors.primary[90]}>
              Output Section
            </Heading>
          </View>
          <Flex direction="column"  gap="0.5rem" marginBottom="0.5rem">
            <Text>
              The generated excel file can be downloaded from here once the
              process is completed
            </Text>
            {enableDownload && <View as="div"><b>Total rows in Input CSV:</b> {listOfTotalData.length}</View>}
            {enableDownload && <View as="div"><b>Total Extracted rows in Output Excel:</b> {filteredData.length}</View>}
          </Flex>
          <Button
            variation="primary"
            loadingText=""
            disabled = {!enableDownload}
            onClick={() => exportToExcel(filteredData, fileName)}
          >
            Download
          </Button>
          
        </Card>
      </Grid>
    </Card>
    </>
  );
};

export default AmplifyFilterFeeds;
