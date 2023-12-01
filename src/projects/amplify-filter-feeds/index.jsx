import React from "react";
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

const AmplifyFilterFeeds = () => {
  const acceptedFileTypes = ["text/*"];
  const [files, setFiles] = React.useState([]);
  const hiddenInput = React.useRef(null);
  const onFilePickerChange = (event) => {
    const { files } = event.target;
    if (!files || files.length === 0) {
      return;
    }
    setFiles(Array.from(files));
  };
  const { tokens } = useTheme();
  return (
    <Card variation="elevated" style={{ margin: "0 auto" ,width: "100vh"}}>
      <Grid
        columnGap="0.5rem"
        rowGap="0.5rem"
        templateColumns="1fr 1fr 1fr"
        templateRows="1fr 3fr 1fr"
      >
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
            gap="1rem"
          >
            <Heading level={1} color={tokens.colors.white}>
              Filter Feeds
            </Heading>
          </Flex>
        </Card>
        <Card columnStart="1" columnEnd="-1">
          <View as="p" marginBottom="1rem">
            <Heading level={3} color={tokens.colors.primary[90]}>
              Input Section
            </Heading>
          </View>

          <DropZone
            acceptedFileTypes={acceptedFileTypes}
            onDropComplete={({ acceptedFiles, rejectedFiles }) => {
              setFiles(acceptedFiles);
            }}
          >
            <Flex direction="column" alignItems="center">
              <Text>Drag 'n' Drop csv file here or click to select file</Text>
              <Button size="small" onClick={() => hiddenInput.current.click()}>
                <MdOutlineFileUpload />
                <Text paddingLeft={'0.3rem'}>Choose File</Text>
              </Button>
            </Flex>
            <VisuallyHidden>
              <input
                type="file"
                tabIndex={-1}
                ref={hiddenInput}
                onChange={onFilePickerChange}
                multiple={true}
                accept={acceptedFileTypes.join(",")}
              />
            </VisuallyHidden>
          </DropZone>
          {files.map((file) => (
            <Text key={file.name}>{file.name}</Text>
          ))}
          <Flex direction="column" margin="1rem 0">
            <Text>Keywords : </Text>
            <Input placeholder="Add comma seperated keywords" />
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
              onClick={() => alert("WIP")}
            >
              Process
            </Button>
            {/* <View
              as="progress"
              data-progress-bar
              // color={tokens.colors.primary[90]}
              padding="1rem"
              max="100"
              value="75"
            /> */}
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
          <Text>The generated excel file can be downloaded from here once the process is completed</Text>
          <Button
            variation="primary"
            // colorTheme="info"
            loadingText=""
            disabled
            onClick={() => alert("hello")}
          >
            Download
          </Button>
        </Card>
      </Grid>
    </Card>
  );
};

export default AmplifyFilterFeeds;
