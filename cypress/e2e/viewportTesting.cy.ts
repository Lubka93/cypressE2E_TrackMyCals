//Imports
require('@cypress/xpath')

import {Limit} from "../components/limit";


//Viewport testing

describe('Test different viewports',()=>{
    const viewports:Cypress.ViewportPreset[] = ['ipad-2', 'iphone-5'];
    beforeEach(()=>{
        Limit.visit()
    })
    viewports.forEach((viewport)=>{
    
     it(`This is viewport for ${viewport}`, ()=>{
        cy.viewport(viewport);
    // Here can I add tests for viewport testing  ... without it block!!

     })
    })
})
