import { StarIcon } from "@chakra-ui/icons";
import {
	Box,
	Flex,
	Heading,
	HStack,
	SimpleGrid,
	Spinner,
	Text,
} from "@chakra-ui/react";
import React from "react";

function ProductReviews({ reviews = [], loading = false }) {
	return (
		<Box id="review-grid">
			{loading ? (
				<Flex justify="center" align="center" w="full" h="full">
					<Spinner size="xl" />
				</Flex>
			) : reviews && reviews.length > 0 ? (
				<>
					<Heading fontSize="2xl" color="brand.800" maxW="container.sm" mb="5">
						See below reviews and ratings for this product by other customers:
					</Heading>
					<SimpleGrid columns={[1, 2, 3]} spacing={4}>
						{reviews.map((review) => (
							<Flex
								key={review._id}
								bg="white"
								borderRadius="md"
								shadow="md"
								p="5"
								rounded="md"
								id="customer-review"
								flexDir="column"
							>
								<Box flex="1">
									<Text fontSize="lg" fontWeight="light" id="customer-comment">
										{review.comment}
									</Text>
								</Box>
								<Flex justify="space-between" mt="2">
									<Text
										fontSize="md"
										fontWeight="semibold"
										mr="1"
										noOfLines={1}
										id="customer-name"
									>
										{review.firstname} {review.lastname}
									</Text>
									<HStack spacing={1} id="customer-rating">
										{Array(review.rating)
											.fill("")
											.map((_, index) => (
												<StarIcon
													fontSize="md"
													id={`${index + 1}-star`}
													key={index}
													color={
														index < review.rating ? "orange.200" : "gray.300"
													}
												/>
											))}
									</HStack>
								</Flex>
							</Flex>
						))}
					</SimpleGrid>
				</>
			) : (
				<Heading fontSize="xl" fontWeight="normal" mb="4">
					No reviews have been submitted for this product yet
				</Heading>
			)}
		</Box>
	);
}

export default ProductReviews;
