import React from "react";
import { HamburgerIcon, InfoIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
	Box,
	Container,
	Flex,
	IconButton,
	Text,
	Link as ChakraLink,
	Image,
	useDisclosure,
	Button,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	List,
	ListItem,
	DrawerFooter,
} from "@chakra-ui/react";
import {
	AUTHOR_EMAIL_URL,
	developerDetails,
	PROJECT_DOCS_URL,
} from "utils/constants";

function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Box bg="brand.secondary" borderBottomWidth="thin">
				<Container maxW="container.xl" py="3" px="5">
					<Flex align="center">
						<InfoOutlineIcon fontSize="md" mt="1" mr="4" />
						<Box>
							<Text fontSize="sm" color="gray.600" fontWeight="semibold" mb="1">
								This is a demo project for proof of concept only
							</Text>
							<Text fontSize="xs" color="gray.600">
								To learn more about this project, visit
								<ChakraLink
									textDecor="underline"
									ml="1"
									fontWeight="semibold"
									color="gray.800"
									isExternal
									href={PROJECT_DOCS_URL}
								>
									this link
								</ChakraLink>
							</Text>
						</Box>
					</Flex>
				</Container>
			</Box>
			<Box borderBottomWidth="thin">
				<Container maxW="container.xl" py="5" px="5">
					<Flex justify="space-between" align="center">
						<Flex align="center">
							<Image
								w="6"
								h="6"
								mr="2"
								src="/images/brand-icon-transparent.png"
								alt="logo"
							/>
							<Text
								fontWeight="semibold"
								fontSize={["xl", "xl", "2xl"]}
								color="#0C1142"
							>
								review
								<Box as="span" fontWeight="thin">
									.com
								</Box>
							</Text>
						</Flex>
						<IconButton
							onClick={onOpen}
							bg="white"
							aria-label="menu-icon"
							icon={<HamburgerIcon fontSize="2xl" />}
						/>
					</Flex>
				</Container>
			</Box>
			<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Contact developer</DrawerHeader>

					<DrawerBody>
						<List spacing={2}>
							{developerDetails.map((link) => (
								<ListItem key={link.title}>
									<ChakraLink
										isExternal
										href={link.url}
										fontSize="md"
										fontWeight="normal"
										color="gray.600"
									>
										{link.title}
									</ChakraLink>
								</ListItem>
							))}
							<ListItem>
								<ChakraLink isExternal href={AUTHOR_EMAIL_URL}>
									<Button
										color="brand.secondary"
										_hover={{ bg: "#3D4168" }}
										bg="#0C1142"
										mt="2"
										size="md"
									>
										Send a message
									</Button>
								</ChakraLink>
							</ListItem>
						</List>
					</DrawerBody>
					<DrawerFooter>
						<ChakraLink
							w="full"
							color="#3D4168"
							textDecor="underline"
							isExternal
							href={PROJECT_DOCS_URL}
						>
							Link to Docs
						</ChakraLink>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default Navbar;
