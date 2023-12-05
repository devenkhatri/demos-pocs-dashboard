/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProjectsCreateFormInputValues = {
    title?: string;
    description?: string;
    problem_statement?: string;
    solution?: string;
    solution_diagram?: string;
    demourl?: string;
    services_used?: string[];
    tags?: string[];
    isdisabled?: boolean;
};
export declare type ProjectsCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    problem_statement?: ValidationFunction<string>;
    solution?: ValidationFunction<string>;
    solution_diagram?: ValidationFunction<string>;
    demourl?: ValidationFunction<string>;
    services_used?: ValidationFunction<string>;
    tags?: ValidationFunction<string>;
    isdisabled?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProjectsCreateFormOverridesProps = {
    ProjectsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    problem_statement?: PrimitiveOverrideProps<TextFieldProps>;
    solution?: PrimitiveOverrideProps<TextFieldProps>;
    solution_diagram?: PrimitiveOverrideProps<TextFieldProps>;
    demourl?: PrimitiveOverrideProps<TextFieldProps>;
    services_used?: PrimitiveOverrideProps<TextFieldProps>;
    tags?: PrimitiveOverrideProps<TextFieldProps>;
    isdisabled?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ProjectsCreateFormProps = React.PropsWithChildren<{
    overrides?: ProjectsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProjectsCreateFormInputValues) => ProjectsCreateFormInputValues;
    onSuccess?: (fields: ProjectsCreateFormInputValues) => void;
    onError?: (fields: ProjectsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProjectsCreateFormInputValues) => ProjectsCreateFormInputValues;
    onValidate?: ProjectsCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProjectsCreateForm(props: ProjectsCreateFormProps): React.ReactElement;
