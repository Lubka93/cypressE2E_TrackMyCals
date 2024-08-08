//Imports
require('@cypress/xpath')
import {Limit} from "../components/limit";
import {mealFeature } from "../components/meal";
import {workoutComponent } from "../components/workout"; 


describe('#000009 Reset all data', ()=>{

    beforeEach(()=>{
       mealFeature.visit();
       mealFeature.clearAllData();  
    
        //Assertions
        cy.url().should('eq', 'https://trackmycals.netlify.app/?meal-name=&calorie-number=#' );
        cy.title().should('eq', 'TrackMyCals');
    
    })
    
    it('&000081 - Verify reset all data functionality when no meal cards and workout cards are added in the app', ()=>{
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
    
    it('&000082 - Verify reset all data functionality when meal cards and workout cards are added in the app', ()=>{
    
       let numOfMeals = 4;
       let numberOfWorkouts = 4;
     
    
       for (let i = 0; i < numOfMeals; i++) { 
       mealFeature.addMeal('sandwich', '500');
     }
     for (let i = 0; i < numberOfWorkouts; i++) { 
       workoutComponent.addWorkout('gym', '500');
     }
    
     // Assertions that cards were added 
     cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 4);
     cy.get(workoutComponent.workoutWrapper).children('div').should('have.length', 4);
    
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
    it('&000083 - Verify  reset  functionality when  meal cards, workout cards and limit are added in the app but close button is used', ()=>{
    
       let numOfMeals = 4;
       let numberOfWorkouts = 4;
     
    
       for (let i = 0; i < numOfMeals; i++) { 
       mealFeature.addMeal('sandwich', '500');
     }
     for (let i = 0; i < numberOfWorkouts; i++) { 
       workoutComponent.addWorkout('gym', '500');
     }
     
     // Assertions that cards were added 
     cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 4);
     cy.get(workoutComponent.workoutWrapper).children('div').should('have.length', 4);
    
     Limit.limitUpdate('1000');
      //Assertion that limit is changed
      cy.get(Limit.calorieLimit).should('have.text', '1000')
    
       cy.get(mealFeature.resetButton).click();
    
    
    //Assertions for confirm message
    //  cy.get(mealFeature.resetModal04).should('be.visible');
      cy.get(mealFeature.resetText).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equal('Are you sure? This will reset all data!')
      })
     cy.get(mealFeature.resetModalCloseButton).click()
    
     //Assertions after reset
     cy.get(workoutComponent.consumedCaloriesCard).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equals('2000');
     })
    cy.get(mealFeature.calorieLimit).should('have.text', '1000');
    cy.get(mealFeature.remainingCaloriesCard).should('have.text', '1000');
    cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
    cy.get(mealFeature.gainLossCard).should('have.text', '-1000');
    cy.get(mealFeature.gainLossBg).should('have.class', 'bg-success');
    cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equal('2000')
    })
    cy.get(mealFeature.progressBar).should('have.class', 'bg-success');
    cy.get(mealFeature.progressBar).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equal('0%')
    })
    
    })
    
    
    it('&000084 - Verify  reset  functionality when  meal cards and workout cards are added  and limit change is made ', ()=>{
    
       let numOfMeals = 4;
       let numberOfWorkouts = 4;
     
    
       for (let i = 0; i < numOfMeals; i++) { 
       mealFeature.addMeal('sandwich', '500');
     }
     for (let i = 0; i < numberOfWorkouts; i++) { 
       workoutComponent.addWorkout('gym', '500');
     }
    
     // Assertions that cards were added 
     cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 4);
     cy.get(workoutComponent.workoutWrapper).children('div').should('have.length', 4);
    
    
      Limit.limitUpdate('1000');
      //Assertion that limit is changed
      cy.get(Limit.calorieLimit).should('have.text', '1000')
    
    
       cy.get(mealFeature.resetButton).click();
    
    
    //Assertions for confirm message
    //  cy.get(mealFeature.resetModal04).should('be.visible');
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