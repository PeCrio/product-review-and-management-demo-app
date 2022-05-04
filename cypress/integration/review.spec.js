import {
	getReviewSummary,
	getPercentageOfRatingsGreaterThanTwo,
} from "utils/helpers.ts";
/// <reference types="cypress" />

context("Tests for review form", () => {
	before(() => {
		cy.visit("http://localhost:3000");
	});

	it("Can fetch reviews from API", () => {
		cy.request("http://localhost:3000/api/reviews").should(
			"have.property",
			"status",
			200
		);
	});
	describe("Review form", () => {
		it("should show review form", () => {
			cy.get("#review-form").should("be.visible");
		});
		it("should add a new review", () => {
			cy.get("#firstname").type("John");
			cy.get("#lastname").type("Doe");
			cy.get("#4-star").click();
			cy.get("#email").type("johndoe@example.com");
			cy.get("#comment").type("New product review demo");
			cy.get('button[type="submit"]').click();
			cy.wait(2000);
			cy.get("#review-grid")
				.find("#customer-review:first")
				.find("#customer-comment")
				.should("contain", "New product review demo");
		});
	});
	describe("Product review performance helpers", () => {
		describe("Chart Data", () => {
			it("should show chart data for no reviews", () => {
				const result = getReviewSummary([]);
				expect(result).to.deep.equal({
					1: 0,
					2: 0,
					3: 0,
					4: 0,
					5: 0,
				});
			});
			it("should show chart data for reviews with some ratings", () => {
				const result = getReviewSummary([
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 4,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 2,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 5,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 5,
						comment: "New product review demo",
					},
				]);
				expect(result).to.deep.equal({
					1: 0,
					2: 1,
					3: 0,
					4: 1,
					5: 2,
				});
			});
			it("should show chart data for reviews with all ratings", () => {
				const result = getReviewSummary([
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 1,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 2,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 3,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 4,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 5,
						comment: "New product review demo",
					},
				]);
				expect(result).to.deep.equal({
					1: 1,
					2: 1,
					3: 1,
					4: 1,
					5: 1,
				});
			});
		});
		describe("Product performance", () => {
			it("should show percentage of reviews greater than two for reviews with all ratings", () => {
				const result = getPercentageOfRatingsGreaterThanTwo([
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 1,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 2,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 3,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 4,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 5,
						comment: "New product review demo",
					},
				]);
				expect(result).to.equal(60);
			});
			it("should show percentage of reviews greater than two for reviews with ratings all above 2", () => {
				const result = getPercentageOfRatingsGreaterThanTwo([
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 3,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 3,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 3,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 4,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 5,
						comment: "New product review demo",
					},
				]);
				expect(result).to.equal(100);
			});
			it("should show percentage of reviews greater than two for reviews with ratings less than 3", () => {
				const result = getPercentageOfRatingsGreaterThanTwo([
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 1,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 2,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 2,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 1,
						comment: "New product review demo",
					},
					{
						firstname: "John",
						lastname: "Doe",
						email: "johndoe@example.com",
						rating: 2,
						comment: "New product review demo",
					},
				]);
				expect(result).to.equal(0);
			});
			it("should show percentage of reviews greater than two for no reviews", () => {
				const result = getPercentageOfRatingsGreaterThanTwo([]);
				expect(result).to.equal(0);
			});
		});
	});
});
