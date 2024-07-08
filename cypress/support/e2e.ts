/// <reference types="@testing-library/cypress" />
// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import './exceptions';
import 'cypress-mochawesome-reporter/register';
import { Limit } from "../components/limit";


// Alternatively you I use CommonJS syntax:
// require('./commands')

beforeEach(()=>{
    cy.session('Main global session', ()=>{
        Limit.visit();
    })
   
})

afterEach(()=>{
    cy.session('Main global after session', ()=>{
        Limit.visit();
    })
   
})