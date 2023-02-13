import Footer from "@/components/Landing/Layout/Footer";
import Navbar from "@/components/Landing/Layout/Navbar";
import ProductReviewPerformance from "@/components/Landing/ProductReviews/ProductReviewPerformance";
import ProductReviews from "@/components/Landing/ProductReviews/ProductReviews";
import OpenAIForm from "@/components/Shared/OpenAIForm";
import FormElement from "@/components/Shared/FormElement";
import { Form, Formik } from "formik";
import {
	Box,
	Button,
	Flex,
	FormLabel,
	Container,
	Heading,
	Stack,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import Head from "next/head";
import { useEffect, useState } from "react";
import { QueryI, ReviewI } from "utils/types";
import { callOpenAI } from "services/OpenAIServices";

const OpenAI = () => {
	const [reviews, setReviews] = useState<ReviewI[]>([]);
	const [query, setQuery] = useState<QueryI>();
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const handleFormSubmission = async (
		values: QueryI,
		formikProps: FormikHelpers<QueryI>
	) => {
		const { setSubmitting, resetForm } = formikProps;
		let description = "";
		let status: "success" | "error" = "success";
		try {
			setSubmitting(true);
			setLoading(true);
			const res = await callOpenAI(values);
			var openAICompletion = "";
			if (res.choices[0].text !== "undefined")
			{
				openAICompletion = res.choices[0].text;
			}

			const query:QueryI = { query: "", resultQuery : openAICompletion };

			setQuery((prevValues) => query);
			description = "Power OpenAI successfully called";

			resetForm();
		} catch (error) {
			description = "An error occured processing your request";
			status = "error";
		} finally {
			setSubmitting(false);
			setLoading(false);
			toast({
				position: "top-right",
				description,
				status,
				isClosable: true,
			});
		}
	};

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				setLoading(true);
				
				//const response = await getAllReviews();
				//setReviews(response.data);
			} catch (error) {
				//setReviews([]);		
				toast({
					position: "top-right",
					description: "An error occured fetching reviews",
					status: "error",
					isClosable: true,
				});
			} finally {
				setLoading(false);
			}
		};
		fetchReviews();
	}, [toast]);

	return (
		<>
			<Head>
				<title>Customer feedback Open IA demo</title>
				<meta
					property="og:title"
					content="Customer feedback Open IA demo"
					key="title"
				/>
				<meta
					property="og:description"
					content="A customer feedback demo application for collecting reviews for a product after a successful purchase."
					key="description"
				/>
			</Head>
			<Navbar />
			<Box w="full">
				<OpenAIForm query={query!} onSubmit={handleFormSubmission} />
			</Box>
			<Box bg="#D4F6F8" py="20">
				<Container maxW="container.xl" px="5">
					<ProductReviews reviews={reviews} loading={loading} />
				</Container>
			</Box>
			<Footer />
		</>
	);
};

export default OpenAI;
