import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps as ChakraInputProps,
  TextareaProps as ChakraTextareaProps,
  Box,
} from "@chakra-ui/react";
import { Field, FieldProps as FormikFieldProps } from "formik";
import React from "react";
import FormElementSelector from "./FormElementSelector";

type BaseProps = {
  label: string;
  name: string;
};

type InputProps = {
  inputProps?: ChakraInputProps;
  textareaProps?: never;
};
type TextareaProps = {
  textareaProps: ChakraTextareaProps;
  inputProps?: never;
};

type Props = BaseProps & (InputProps | TextareaProps);

const FormElement: React.FC<Props> = ({
  label,
  name,
  inputProps = {},
  textareaProps = {},
}) => {
  return (
    <>
      <Field name={name}>
        {(formikProps: FormikFieldProps) => {
          const { form } = formikProps;
          const isInvalid = !!(form.errors[name] && form.touched[name]);
          const isRequired: boolean = !!(
            inputProps.isRequired || textareaProps.isRequired
          );

          return (
            <FormControl isInvalid={isInvalid}>
              <FormLabel mb="1" fontSize="sm" color="gray.500">
                {label}
                {isRequired && (
                  <Box as="span" color="red">
                    *
                  </Box>
                )}
              </FormLabel>

              <FormElementSelector
                formikProps={formikProps}
                inputProps={inputProps}
                textareaProps={textareaProps}
                name={name}
              />

              <FormErrorMessage fontSize="xs" lineHeight="none">
                {form.errors[name]}
              </FormErrorMessage>
            </FormControl>
          );
        }}
      </Field>
    </>
  );
};

export default FormElement;
