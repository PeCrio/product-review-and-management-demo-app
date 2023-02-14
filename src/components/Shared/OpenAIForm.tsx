import React, { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormElement from "@/components/Shared/FormElement";
import {
  Box,
  Button,
  Flex,
  FormErrorMessage,
  FormLabel,
  HStack,
  Stack,
  VStack,
  Container,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { QueryI } from "utils/types";
interface OpenAIFormProps {
  query : QueryI;
  initialValues?: QueryI;
  onSubmit: (
    values: QueryI,
    formikHelpers: FormikHelpers<QueryI>
  ) => void | Promise<any>;
}
function OpenAIForm({
  query,
  initialValues = {
    query: "Donne moi la tendance de ma session :",
    resultQuery : query ? query.resultQuery : "",
  },
  onSubmit,
}: OpenAIFormProps) {
    const validationSchema = Yup.object({
    query: Yup.string().required("Open IA Query"),
    //resultQuery: Yup.string().required("..."),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({ isSubmitting, values, setFieldValue, errors }) => (
        
        <Form id="openAI-form">
          <Container maxW="container.xl" py="16" px="5">
          <VStack align="stretch" spacing="5">
            <Stack direction={["column", "column", "row"]}>
              <FormElement
                label="Query"
                name="query"
                inputProps={{
                  type: "text",
                  isRequired: true,
                  maxLength: 300,
                  placeholder: "Query OpenAI",
                }}
              />
             
            </Stack>
          <FormLabel mb="1" fontSize="sm" color="gray.500">
            {values.resultQuery}
          </FormLabel>
          </VStack>
            <Button
              isLoading={isSubmitting}
              type="submit"
              mt="4"
              w="full"
              colorScheme="brand.primary"
              color="brand.800"
              textTransform="capitalize"
            >
              Query OpenAI
            </Button>
            </Container>
        </Form>
        
      )}
    </Formik>
    
  );
}

export default OpenAIForm;
