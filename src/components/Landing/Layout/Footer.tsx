import {
	Box,
	Button,
	Container,
	Divider,
	Heading,
	Link as ChakraLink,
	List,
	ListItem,
	Stack,
	Text,
} from "@chakra-ui/react";
import {
	AUTHOR_EMAIL_URL,
	AUTHOR_WEBSITE_URL,
	PROJECT_DOCS_URL,
	developerDetails,
} from "utils/constants";
function Footer() {
	return (
		<Box bg="#0C1142" py="8">
			<Container maxW="container.xl" px="5">
				<Stack
					direction={["column", "row", "row"]}
					justify="space-between"
					spacing={6}
				>
					<Box maxW="lg" mb="5">
						<Heading
							fontSize="sm"
							textTransform="uppercase"
							fontWeight="semibold"
							color="white"
							mb="2"
						>
							About Project
						</Heading>
						<Text fontSize="sm" fontWeight="thin" color="gray.400" mb="3">
							A customer feedback demo application for collecting reviews for a
							product after a successful purchase.
						</Text>
						<ChakraLink
							fontSize="sm"
							textDecor="underline"
							textDecorationColor="brand.secondary"
							fontWeight="normal"
							color="gray.400"
							isExternal
							href={PROJECT_DOCS_URL}
						>
							Link to docs
						</ChakraLink>
					</Box>
					<Box maxW="sm" mb="5">
						<Heading
							fontSize="sm"
							textTransform="uppercase"
							fontWeight="semibold"
							color="white"
							mb="2"
						>
							Contact Developer
						</Heading>
						<List spacing={2}>
							{developerDetails.map((link) => (
								<ListItem key={link.title}>
									<ChakraLink
										isExternal
										href={link.url}
										fontSize="sm"
										fontWeight="normal"
										color="gray.400"
									>
										{link.title}
									</ChakraLink>
								</ListItem>
							))}
						</List>
						<ChakraLink isExternal href={AUTHOR_EMAIL_URL}>
							<Button
								bg="brand.secondary"
								mt="2"
								size="xs"
								_hover={{
									bg: "rgba(255,255,255,0.3)",
									color: "brand.secondary",
									textDecor: "underline",
								}}
								textDecorationColor="brand.secondary"
							>
								Send a message
							</Button>
						</ChakraLink>
					</Box>
				</Stack>
				<Divider my="8" borderTopWidth="0.5px" borderColor="gray.500" />
				<Text fontSize="sm" textAlign="center" color="gray.500">
					&copy; 2022,{" "}
					<Box as="span" color="white">
						<ChakraLink isExternal href={AUTHOR_WEBSITE_URL}>
							Ossai Precious
						</ChakraLink>
					</Box>
					, All Rights Reserved
				</Text>
			</Container>
		</Box>
	);
}

export default Footer;
