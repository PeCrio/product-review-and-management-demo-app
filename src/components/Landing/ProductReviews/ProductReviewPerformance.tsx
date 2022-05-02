import { Box, Heading, Skeleton, Text } from "@chakra-ui/react";
import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
	getPercentageOfRatingsGreaterThanTwo,
	getReviewSummary,
} from "utils/helpers";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);
function ProductReviewPerformance({ reviews = [], loading = false }) {
	const handleReviewSummary = () => getReviewSummary(reviews);
	const countData = {
		labels: Object.keys(handleReviewSummary()).map((key) => key),
		datasets: [
			{
				label: "No. of reviews",
				data: Object.values(handleReviewSummary()).map((value) => value),
				backgroundColor: "#54DDE2",
				hoverBackgroundColor: "#54DDE2",
			},
		],
	};
	const options = { indexAxis: "y" as const };
	return (
		<Box w="full" shadow="md" p="5" rounded="md">
			<Text fontSize="md" fontWeight="semibold">
				Ratings above 2 for this product is currently at:
			</Text>
			{loading ? (
				<>
					<Skeleton w="32" height="16" mt="2" />
				</>
			) : (
				<>
					<Heading fontSize={["4xl", "4xl", "7xl"]} fontWeight="light">
						{getPercentageOfRatingsGreaterThanTwo(reviews)}%
					</Heading>
				</>
			)}
			<Box w="80">
				<Bar options={options} data={countData} width={100} height={100} />
			</Box>
		</Box>
	);
}

export default ProductReviewPerformance;
