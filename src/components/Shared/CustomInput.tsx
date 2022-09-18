import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps as ChakraInputProps,
  Textarea,
  TextareaProps as ChakraTextareaProps,
  Box,
} from "@chakra-ui/react";
import { Field, FieldProps as FormikFieldProps } from "formik";
import React from "react";

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

type CustomInputProps = BaseProps & (InputProps | TextareaProps);

type CustomFormElementProps = {
  formikProps: FormikFieldProps;
  inputProps: ChakraInputProps;
  textareaProps: ChakraTextareaProps;
  name: string;
};

const CustomFormElement: React.FC<CustomFormElementProps> = ({
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

const CustomInput: React.FC<CustomInputProps> = ({
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

              <CustomFormElement
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

export default CustomInput;
