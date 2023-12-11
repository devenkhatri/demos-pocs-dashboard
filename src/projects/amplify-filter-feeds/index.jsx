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
} from "@aws-amplify/ui-react";
import { MdOutlineFileUpload } from "react-icons/md";
import Papa from "papaparse";
import { exportToExcel } from 'react-json-to-excel';
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
      alert("Extension Not allowed");
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
  useEffect(() => {
    if (startProcess && files && files.length) {
      if (!files) return alert("Enter a valid file");
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
          setEnableDownload(true)
      };
      reader.addEventListener('progress', function(e){
        var progress_width = Math.ceil(e.loaded/e.total * 100);
        setPercent(progress_width)
      }, true);
      reader.readAsText(files[0]);
    }
  }, [startProcess]);
  useEffect(() => {
    if (csvColumnsList && window.localStorage.getItem(csvColumnsList)) {
      setIncludedColumnsInExcel(window.localStorage.getItem(csvColumnsList))
    }
  }, [csvColumnsList])
  return (
    <Card variation="elevated">
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
        <Card columnStart="1" columnEnd="-1">
          <View marginBottom="1rem">
            <Heading level={3} color={tokens.colors.primary[90]}>
              Input Section
            </Heading>
          </View>
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
            <Flex direction="column" margin="1rem 0">
              <Text><b>Existing Columns In CSV :</b> {csvColumnsList}</Text>
            </Flex>
          : null}
          <Flex direction="column" margin="1rem 0">
            <Text>Output Columns : </Text>
            <Input placeholder="Add comma seperated columns name" value={includedColumnsInExcel} onChange={(e) => {
                if (csvColumnsList) {
                  window.localStorage.setItem(csvColumnsList, e.target.value);
                }
                setIncludedColumnsInExcel(e.target.value)
              }
            }/>
          </Flex>
          <Flex direction="column" margin="1rem 0">
            <Text>Keywords : </Text>
            <Input placeholder="Add comma seperated keywords" value={inputList} onChange={(e) => { window.localStorage.setItem("keywords", e.target.value); setInputList(e.target.value)}}/>
          </Flex>
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
            // colorTheme="info"
            loadingText=""
            disabled = {!enableDownload}
            onClick={() => exportToExcel(filteredData, fileName)}
          >
            Download
          </Button>
          
        </Card>
      </Grid>
    </Card>
  );
};

export default AmplifyFilterFeeds;
