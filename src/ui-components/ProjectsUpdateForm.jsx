/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getProjects } from "../graphql/queries";
import { updateProjects } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function ProjectsUpdateForm(props) {
  const {
    id: idProp,
    projects: projectsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    description: "",
    problem_statement: "",
    solution: "",
    solution_diagram: "",
    demourl: "",
    services_used: [],
    tags: [],
    isdisabled: false,
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [problem_statement, setProblem_statement] = React.useState(
    initialValues.problem_statement
  );
  const [solution, setSolution] = React.useState(initialValues.solution);
  const [solution_diagram, setSolution_diagram] = React.useState(
    initialValues.solution_diagram
  );
  const [demourl, setDemourl] = React.useState(initialValues.demourl);
  const [services_used, setServices_used] = React.useState(
    initialValues.services_used
  );
  const [tags, setTags] = React.useState(initialValues.tags);
  const [isdisabled, setIsdisabled] = React.useState(initialValues.isdisabled);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = projectsRecord
      ? { ...initialValues, ...projectsRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setDescription(cleanValues.description);
    setProblem_statement(cleanValues.problem_statement);
    setSolution(cleanValues.solution);
    setSolution_diagram(cleanValues.solution_diagram);
    setDemourl(cleanValues.demourl);
    setServices_used(cleanValues.services_used ?? []);
    setCurrentServices_usedValue("");
    setTags(cleanValues.tags ?? []);
    setCurrentTagsValue("");
    setIsdisabled(cleanValues.isdisabled);
    setErrors({});
  };
  const [projectsRecord, setProjectsRecord] = React.useState(projectsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getProjects.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getProjects
        : projectsModelProp;
      setProjectsRecord(record);
    };
    queryData();
  }, [idProp, projectsModelProp]);
  React.useEffect(resetStateValues, [projectsRecord]);
  const [currentServices_usedValue, setCurrentServices_usedValue] =
    React.useState("");
  const services_usedRef = React.createRef();
  const [currentTagsValue, setCurrentTagsValue] = React.useState("");
  const tagsRef = React.createRef();
  const validations = {
    title: [{ type: "Required" }],
    description: [{ type: "Required" }],
    problem_statement: [],
    solution: [],
    solution_diagram: [],
    demourl: [],
    services_used: [],
    tags: [],
    isdisabled: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          description,
          problem_statement: problem_statement ?? null,
          solution: solution ?? null,
          solution_diagram: solution_diagram ?? null,
          demourl: demourl ?? null,
          services_used: services_used ?? null,
          tags: tags ?? null,
          isdisabled: isdisabled ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateProjects.replaceAll("__typename", ""),
            variables: {
              input: {
                id: projectsRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ProjectsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              description,
              problem_statement,
              solution,
              solution_diagram,
              demourl,
              services_used,
              tags,
              isdisabled,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description: value,
              problem_statement,
              solution,
              solution_diagram,
              demourl,
              services_used,
              tags,
              isdisabled,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Problem statement"
        isRequired={false}
        isReadOnly={false}
        value={problem_statement}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              problem_statement: value,
              solution,
              solution_diagram,
              demourl,
              services_used,
              tags,
              isdisabled,
            };
            const result = onChange(modelFields);
            value = result?.problem_statement ?? value;
          }
          if (errors.problem_statement?.hasError) {
            runValidationTasks("problem_statement", value);
          }
          setProblem_statement(value);
        }}
        onBlur={() =>
          runValidationTasks("problem_statement", problem_statement)
        }
        errorMessage={errors.problem_statement?.errorMessage}
        hasError={errors.problem_statement?.hasError}
        {...getOverrideProps(overrides, "problem_statement")}
      ></TextField>
      <TextField
        label="Solution"
        isRequired={false}
        isReadOnly={false}
        value={solution}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              problem_statement,
              solution: value,
              solution_diagram,
              demourl,
              services_used,
              tags,
              isdisabled,
            };
            const result = onChange(modelFields);
            value = result?.solution ?? value;
          }
          if (errors.solution?.hasError) {
            runValidationTasks("solution", value);
          }
          setSolution(value);
        }}
        onBlur={() => runValidationTasks("solution", solution)}
        errorMessage={errors.solution?.errorMessage}
        hasError={errors.solution?.hasError}
        {...getOverrideProps(overrides, "solution")}
      ></TextField>
      <TextField
        label="Solution diagram"
        isRequired={false}
        isReadOnly={false}
        value={solution_diagram}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              problem_statement,
              solution,
              solution_diagram: value,
              demourl,
              services_used,
              tags,
              isdisabled,
            };
            const result = onChange(modelFields);
            value = result?.solution_diagram ?? value;
          }
          if (errors.solution_diagram?.hasError) {
            runValidationTasks("solution_diagram", value);
          }
          setSolution_diagram(value);
        }}
        onBlur={() => runValidationTasks("solution_diagram", solution_diagram)}
        errorMessage={errors.solution_diagram?.errorMessage}
        hasError={errors.solution_diagram?.hasError}
        {...getOverrideProps(overrides, "solution_diagram")}
      ></TextField>
      <TextField
        label="Demourl"
        isRequired={false}
        isReadOnly={false}
        value={demourl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              problem_statement,
              solution,
              solution_diagram,
              demourl: value,
              services_used,
              tags,
              isdisabled,
            };
            const result = onChange(modelFields);
            value = result?.demourl ?? value;
          }
          if (errors.demourl?.hasError) {
            runValidationTasks("demourl", value);
          }
          setDemourl(value);
        }}
        onBlur={() => runValidationTasks("demourl", demourl)}
        errorMessage={errors.demourl?.errorMessage}
        hasError={errors.demourl?.hasError}
        {...getOverrideProps(overrides, "demourl")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              description,
              problem_statement,
              solution,
              solution_diagram,
              demourl,
              services_used: values,
              tags,
              isdisabled,
            };
            const result = onChange(modelFields);
            values = result?.services_used ?? values;
          }
          setServices_used(values);
          setCurrentServices_usedValue("");
        }}
        currentFieldValue={currentServices_usedValue}
        label={"Services used"}
        items={services_used}
        hasError={errors?.services_used?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("services_used", currentServices_usedValue)
        }
        errorMessage={errors?.services_used?.errorMessage}
        setFieldValue={setCurrentServices_usedValue}
        inputFieldRef={services_usedRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Services used"
          isRequired={false}
          isReadOnly={false}
          value={currentServices_usedValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.services_used?.hasError) {
              runValidationTasks("services_used", value);
            }
            setCurrentServices_usedValue(value);
          }}
          onBlur={() =>
            runValidationTasks("services_used", currentServices_usedValue)
          }
          errorMessage={errors.services_used?.errorMessage}
          hasError={errors.services_used?.hasError}
          ref={services_usedRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "services_used")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              description,
              problem_statement,
              solution,
              solution_diagram,
              demourl,
              services_used,
              tags: values,
              isdisabled,
            };
            const result = onChange(modelFields);
            values = result?.tags ?? values;
          }
          setTags(values);
          setCurrentTagsValue("");
        }}
        currentFieldValue={currentTagsValue}
        label={"Tags"}
        items={tags}
        hasError={errors?.tags?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("tags", currentTagsValue)
        }
        errorMessage={errors?.tags?.errorMessage}
        setFieldValue={setCurrentTagsValue}
        inputFieldRef={tagsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Tags"
          isRequired={false}
          isReadOnly={false}
          value={currentTagsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.tags?.hasError) {
              runValidationTasks("tags", value);
            }
            setCurrentTagsValue(value);
          }}
          onBlur={() => runValidationTasks("tags", currentTagsValue)}
          errorMessage={errors.tags?.errorMessage}
          hasError={errors.tags?.hasError}
          ref={tagsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "tags")}
        ></TextField>
      </ArrayField>
      <SwitchField
        label="Isdisabled"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isdisabled}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              description,
              problem_statement,
              solution,
              solution_diagram,
              demourl,
              services_used,
              tags,
              isdisabled: value,
            };
            const result = onChange(modelFields);
            value = result?.isdisabled ?? value;
          }
          if (errors.isdisabled?.hasError) {
            runValidationTasks("isdisabled", value);
          }
          setIsdisabled(value);
        }}
        onBlur={() => runValidationTasks("isdisabled", isdisabled)}
        errorMessage={errors.isdisabled?.errorMessage}
        hasError={errors.isdisabled?.hasError}
        {...getOverrideProps(overrides, "isdisabled")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || projectsModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || projectsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
