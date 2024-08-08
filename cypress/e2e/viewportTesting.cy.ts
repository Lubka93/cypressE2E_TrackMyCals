//Imports
require('@cypress/xpath')

import {Limit} from "../components/limit";
import { mealFeature } from "../components/meal";
import { workoutComponent } from "../components/workout";


//Viewport testing

describe('Test different viewports',()=>{
    const viewports:Cypress.ViewportPreset[] = ['ipad-2', 'macbook-16', 'macbook-11'];
    beforeEach(()=>{
        Limit.visit();
        Limit.clearAllData();  

         //Assertions
         cy.url().should('eq', 'https://trackmycals.netlify.app/?meal-name=&calorie-number=#' );
         cy.title().should('eq', 'TrackMyCals');

    })

    viewports.forEach((viewport)=>{
    
     it(`This is viewport for ${viewport}`, ()=>{
        cy.viewport(viewport);
    // Here can I add tests for viewport testing  ... without it block!!

    cy.get(mealFeature.resetButton).click();
    
    //Assertions for confirm message
      cy.get(mealFeature.resetModal04).should('be.visible');
      cy.get(mealFeature.resetText).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equal('Are you sure? This will reset all data!')
      })
     cy.get(mealFeature.confirmResetButton).click()
    
     //Assertions after reset
     cy.get(workoutComponent.consumedCaloriesCard).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equals('0');
     })
    cy.get(mealFeature.calorieLimit).should('have.text', '2000');
    cy.get(mealFeature.remainingCaloriesCard).should('have.text', '2000');
    cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
    cy.get(mealFeature.gainLossCard).should('have.text', '-2000');
    cy.get(mealFeature.gainLossBg).should('have.class', 'bg-success');
    cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equal('0')
    })
    cy.get(mealFeature.progressBar).should('have.class', 'bg-success');
    cy.get(mealFeature.progressBar).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equal('0%')
    })

     })
    })
})
