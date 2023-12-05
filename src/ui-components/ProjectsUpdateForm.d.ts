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
export declare type ProjectsUpdateFormInputValues = {
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
export declare type ProjectsUpdateFormValidationValues = {
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
export declare type ProjectsUpdateFormOverridesProps = {
    ProjectsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type ProjectsUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProjectsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    projects?: any;
    onSubmit?: (fields: ProjectsUpdateFormInputValues) => ProjectsUpdateFormInputValues;
    onSuccess?: (fields: ProjectsUpdateFormInputValues) => void;
    onError?: (fields: ProjectsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProjectsUpdateFormInputValues) => ProjectsUpdateFormInputValues;
    onValidate?: ProjectsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProjectsUpdateForm(props: ProjectsUpdateFormProps): React.ReactElement;
