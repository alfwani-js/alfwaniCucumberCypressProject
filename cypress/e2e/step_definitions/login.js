import { Given, When, Then,} from "@badeball/cypress-cucumber-preprocessor";
import {loginPage} from '@pages/LoginPage';

Given("A user opens the login page", () => {
    cy.visit("https://www.saucedemo.com/");
});
When("A user enters the username {string}, the password {string}, and clicks on the login button", (username,password) => {
    loginPage.submitLogin(username,password)
});
When("A user enters incorrect credentials, and clicks on the login button", (table) => {
    table.hashes().forEach((row) => {
        cy.log(row.username);
        cy.log(row.password);
        loginPage.submitLogin(row.username, row.password)
    });
});
When("A user clicks on the login button", ()=>{
    loginPage.clickLogin();
})
Then("A user will be logged in", () => {
    cy.url().should("contains", "/inventory.html");
});
Then("The {string} error message is displayed", (errorMessage)=> {
    loginPage.elements.errorMessage().should("have.text", errorMessage);
});