// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

const firstName='Ricardo'
const lastName='Ribeiro'
const email='tupan93@gmail.com'
const wrongEmail='tupan93gmail.com'
const questionText='How can I learne more about cypress?'

describe('Central de Atendimento ao Cliente TAT', function() {


    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verify app title', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('fill mandatory information and submit', function() {
        cy.fillMandatoryFieldsAndSubmit(firstName,lastName,email,questionText);
        cy.get('.success').should('be.visible')
        
    })

    it('show error message when submit an invalid e-mail format', function() {
        cy.get('#firstName').type(firstName,{delay:0})
        cy.get('#lastName').type(lastName,{delay:0})
        cy.get('#email').type(wrongEmail,{delay:0})
        cy.get('#open-text-area').type(questionText,{delay:0})
        //cy.get('button[type="submit"]').click()
        //contains(css selector - element, text)
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('show error message when check Telefone and submit without a number', function() {
        cy.fillMandatoryFieldsAndSubmit(firstName,lastName,email,questionText);
        cy.get('#phone-checkbox').check()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('no not accept letters on telefone field', function() {
            cy.get('#phone').type("abecd",{delay:0}).should('have.value', '')
    })
    //select - select()
    it('using selector to select text "Blob"', function() {
        cy.get('#product')
        .select('Blog')
        .should('have.value','blog')
    })

    it('using selector to select value "mentoria"', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })

    it('using selector to select index', function() {
        cy.get('#product')
        .select(1)
        .should('have.value','blog')
    })
    //radio - check()
    it('check feedback', function() {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value','feedback')
    })
    //each() wrap()
    it('check all radio', function() {
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')

        })
    })
        //checkbox
    it('check all checkbox uncheck last', function() {
            cy.get('#check input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
            //.each(function($radio){
            //    cy.wrap($radio).check()
            //    cy.wrap($radio).should('be.checked')
    
     })


  })

  