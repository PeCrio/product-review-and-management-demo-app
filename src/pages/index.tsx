import Footer from "@/components/Landing/Layout/Footer";
import Navbar from "@/components/Landing/Layout/Navbar";
import ProductReviewPerformance from "@/components/Landing/ProductReviews/ProductReviewPerformance";
import ProductReviews from "@/components/Landing/ProductReviews/ProductReviews";
import ReviewForm from "@/components/Shared/ReviewForm";
import {
	Box,
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
import { createReview, getAllReviews } from "services/ReviewServices";
import { ReviewI } from "utils/types";

const Index = () => {
	const [reviews, setReviews] = useState<ReviewI[]>([]);
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const handleFormSubmission = async (
		values: ReviewI,
		formikProps: FormikHelpers<ReviewI>
	) => {
		const { setSubmitting, resetForm } = formikProps;
		let description = "";
		let status: "success" | "error" = "success";
		try {
			setSubmitting(true);
			setLoading(true);
			const res = await createReview(values);
			const newReview = res.data;
			setReviews((prevValues) => [newReview, ...prevValues]);
			description = "Review created successfully";
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
				const response = await getAllReviews();
				setReviews(response.data);
			} catch (error) {
				setReviews([]);
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
				<title>Customer feedback demo app</title>
				<meta
					property="og:title"
					content="Customer feedback demo app"
					key="title"
				/>
				<meta
					property="og:description"
					content="A customer feedback demo application for collecting reviews for a product after a successful purchase."
					key="description"
				/>
			</Head>
			<Navbar />
			<Container maxW="container.xl" py="16" px="5">
				<VStack align="stretch">
					<Text fontSize="sm" fontWeight="semibold">
						Review Product
					</Text>
					<Heading fontSize={["4xl", "4xl", "7xl"]}>Leave a feedback</Heading>
					<Text fontSize="xl" fontWeight="light">
						Tell us about your experience purchasing this product.
					</Text>
				</VStack>
				<Stack
					direction={["column", "row", "row"]}
					mt="8"
					spacing="10"
					align="center"
				>
					<Box w="full">
						<ReviewForm onSubmit={handleFormSubmission} />
					</Box>
					<Box w="full">
						<ProductReviewPerformance reviews={reviews} loading={loading} />
					</Box>
				</Stack>
			</Container>
			<Box bg="#D4F6F8" py="20">
				<Container maxW="container.xl" px="5">
					<ProductReviews reviews={reviews} loading={loading} />
				</Container>
			</Box>
			<Footer />
		</>
	);
};

export default Index;
