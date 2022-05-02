import React, { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Shared/CustomInput";
import {
	Box,
	Button,
	Flex,
	FormErrorMessage,
	FormLabel,
	HStack,
	Stack,
	VStack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { ReviewI, ReviewRatingI } from "utils/types";
interface ReviewFormProps {
	initialValues?: ReviewI;
	onSubmit?: (
		values: ReviewI,
		formikHelpers: FormikHelpers<ReviewI>
	) => void | Promise<any>;
}
function ReviewForm({
	initialValues = {
		firstname: "",
		lastname: "",
		email: "",
		rating: 3,
		comment: "",
	},
	onSubmit,
}: ReviewFormProps) {
	const [activeStars, setActiveStars] = useState(initialValues.rating);
	const validationSchema = Yup.object({
		firstname: Yup.string().required("First name is required"),
		lastname: Yup.string().required("Last name is required"),
		email: Yup.string().required("Email address is required"),
		rating: Yup.number()
			.integer("Please provide a valid number")
			.required("Rating is required"),
		comment: Yup.string().required("Your feedback is required"),
	});
	const stars: ReviewRatingI[] = [1, 2, 3, 4, 5];
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
			enableReinitialize={true}
		>
			{({ isSubmitting, values, setFieldValue, errors }) => (
				<Form id="review-form">
					<VStack w="full" align="stretch" spacing="5">
						<Box>
							<Flex>
								<FormLabel my="auto" mr="2" fontSize="sm" color="gray.500">
									Rating:
								</FormLabel>

								<HStack justify="center" spacing={1}>
									{stars.map((starValue) => {
										return (
											<StarIcon
												key={starValue}
												role="button"
												fontSize="xl"
												id={`${starValue}-star`}
												onMouseEnter={() => setActiveStars(starValue)}
												onMouseLeave={() => setActiveStars(values.rating)}
												onClick={() => setFieldValue("rating", starValue)}
												color={
													starValue - 1 < activeStars
														? "orange.300"
														: "gray.300"
												}
											/>
										);
									})}
								</HStack>
							</Flex>
							<FormErrorMessage fontSize="xs" lineHeight="none">
								{errors.rating}
							</FormErrorMessage>
						</Box>
						<Stack direction={["column", "column", "row"]}>
							<CustomInput
								label="First Name"
								name="firstname"
								fieldProps={{
									type: "text",
									isRequired: true,
									maxLength: 40,
									placeholder: "First Name",
								}}
							/>
							<CustomInput
								label="Last Name"
								name="lastname"
								fieldProps={{
									type: "text",
									isRequired: true,
									maxLength: 40,
									placeholder: "Last Name",
								}}
							/>
						</Stack>
						<CustomInput
							label="Email"
							name="email"
							fieldProps={{
								type: "email",
								isRequired: true,
								placeholder: "Email address",
								maxLength: 40,
							}}
						/>
						<CustomInput
							label="Comment"
							name="comment"
							type="textarea"
							fieldProps={{
								placeholder: "Please leave a feedback",
								maxLength: 200,
							}}
						></CustomInput>
					</VStack>
					{values._id ? (
						<Button
							isLoading={isSubmitting}
							type="submit"
							colorScheme="purple"
							textTransform="capitalize"
						>
							Update review
						</Button>
					) : (
						<Button
							isLoading={isSubmitting}
							type="submit"
							mt="4"
							w="full"
							colorScheme="brand.primary"
							color="brand.800"
							textTransform="capitalize"
						>
							Send review
						</Button>
					)}
				</Form>
			)}
		</Formik>
	);
}

export default ReviewForm;
