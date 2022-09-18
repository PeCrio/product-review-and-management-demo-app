import {
  Input,
  InputProps as ChakraInputProps,
  Textarea,
  TextareaProps as ChakraTextareaProps,
} from "@chakra-ui/react";
import { FieldProps as FormikFieldProps } from "formik";
import React from "react";

type Props = {
  formikProps: FormikFieldProps;
  inputProps: ChakraInputProps;
  textareaProps: ChakraTextareaProps;
  name: string;
};

const FormElementSelector: React.FC<Props> = ({
  formikProps,
  name,
  inputProps,
  textareaProps,
}) => {
  if (Object.entries(textareaProps).length) {
    return (
      <Textarea
        bg="white"
        id={name}
        {...formikProps.field}
        {...textareaProps}
      ></Textarea>
    );
  }

  return <Input id={name} bg="white" {...formikProps.field} {...inputProps} />;
};

export default FormElementSelector;
