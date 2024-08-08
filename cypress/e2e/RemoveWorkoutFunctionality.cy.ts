//Imports
require('@cypress/xpath')
import {workoutComponent } from "../components/workout"; 
import {testDataWorkoutValid} from "./model";
import {testDataObjectWorkout } from "./model";


describe('#000005 Remove workout functionality', ()=>{
    beforeEach(()=>{
       workoutComponent.visit();
       workoutComponent.clearAllData();
      cy.fixture('testDataWorkout.json').as('testData')
 
        //Assertions
    cy.url().should('eq', 'https://trackmycals.netlify.app/?meal-name=&calorie-number=#' );
    cy.title().should('eq', 'TrackMyCals');
    })
 
    it('&000043 - Verify  removing workout functionality after adding the same 50 valid workouts  ', ()=>{
 
       //Add 50 workout cards
      let numberOfCards = 50;
      let numberOfCalories = '500';
      let nameOfWorkout = 'gym'
       for(let i=0; i<numberOfCards; i++) {
          
          workoutComponent.addWorkout(nameOfWorkout, numberOfCalories)
  }
     //Assertion if meals were added
     cy.get(workoutComponent.workoutWrapper).should('exist').children().should('have.length', numberOfCards);
     cy.get(workoutComponent.workoutBurnedCalories).should('contain', numberOfCards*Number(numberOfCalories));
     cy.get(workoutComponent.remainingCaloriesCard).should('contain', numberOfCards*Number(numberOfCalories)+2000 );
     cy.get(workoutComponent.gainLossCard).should('contain', `-${(2000 + numberOfCards*Number(numberOfCalories))}` );
     cy.get(workoutComponent.calorieLimit).should('contain', 2000 );
     cy.get(workoutComponent.progressBar).should('contain', `0%`);
     cy.get(workoutComponent.progressBar).should('have.class', `bg-success`);
 
     //Remove all added workout cards
     cy.get(workoutComponent.workoutWrapper).children().then((workoutCards)=>{
    
       cy.wrap(workoutCards).then((workoutArray)=>{
       
             workoutComponent.removeAllWorkouts(workoutArray)
        })
     })
 
      //Assertion if meals were removed
      cy.get(workoutComponent.workoutWrapper).should('exist').children().should('have.length', 0);
      cy.get(workoutComponent.workoutBurnedCalories).should('contain', 0);
      cy.get(workoutComponent.remainingCaloriesCard).should('contain', 0 );
      cy.get(workoutComponent.gainLossCard).should('contain', 0);
      cy.get(workoutComponent.calorieLimit).should('contain', 2000);
      cy.get(workoutComponent.progressBar).should('contain', `0%`);
      cy.get(workoutComponent.progressBar).should('have.class', `bg-success`);
 
    }) 
 
    it('&000044 - Verify  removing workout  functionality after adding  25 different valid workouts ', ()=>{
       workoutComponent.clearAllData();
       cy.get<testDataWorkoutValid>('@testData').then(function (testData) {
          const testArray:testDataObjectWorkout[] = testData.workoutRemoveValidTestData;
          
 
 
          let numberOfRepeat = 5;
          const calorieArr:any = [];
          testArray.forEach((card)=>{
            
             for (let i = 0; i < numberOfRepeat; i++) {
                workoutComponent.addWorkout(card.workout, card.calories);
              }
 
          })
 
          testArray.forEach((card)=>{
             calorieArr.push(Number(card.calories));
          })
 
          const sumOfCalories =  calorieArr.reduce((acc, current)=>  acc + current ,0);
 
 
        
          //Assertions that cards were added
 
        cy.get(workoutComponent.workoutWrapper).should('exist').children().should('have.length', 5*numberOfRepeat);
        cy.get(workoutComponent.workoutBurnedCalories).should('contain', sumOfCalories*numberOfRepeat);
        cy.get(workoutComponent.remainingCaloriesCard).should('contain', (sumOfCalories*numberOfRepeat)+2000 );
        cy.get(workoutComponent.gainLossCard).should('contain', `-${(2000 + (sumOfCalories*numberOfRepeat))}` );
        cy.get(workoutComponent.calorieLimit).should('contain', 2000 );
        cy.get(workoutComponent.progressBar).should('contain', `0%`);
        cy.get(workoutComponent.progressBar).should('have.class', `bg-success`);
 
          //Remove all workout cards
         cy.get(workoutComponent.workoutWrapper).children().then((cards)=>{
          cy.wrap(cards).then((workoutArray)=>{
             workoutComponent.removeAllWorkouts(workoutArray)
          })
         })
 
         //Assertion if the cards were removed
         cy.get(workoutComponent.workoutWrapper).should('exist').children().should('have.length', 0);
         cy.get(workoutComponent.workoutBurnedCalories).should('contain', 0);
         cy.get(workoutComponent.remainingCaloriesCard).should('contain', 0 );
         cy.get(workoutComponent.gainLossCard).should('contain', 0);
         cy.get(workoutComponent.calorieLimit).should('contain', 2000);
         cy.get(workoutComponent.progressBar).should('contain', `0%`);
         cy.get(workoutComponent.progressBar).should('have.class', `bg-success`);
       })
 
    })
 
 
 
    it('&000045 - Verify  filtering meal cards functionality with valid filter input which is the same as one of the meal card  items', ()=>{
       workoutComponent.clearAllData();
       cy.get<testDataWorkoutValid>('@testData').then(function (testData) {
          const testArray:testDataObjectWorkout[] = testData.workoutRemoveValidTestData;
          
 
 
          let numberOfRepeat = 1;
          let caloriesOfDeletedCard = 1000;
          const calorieArr:any = [];
          testArray.forEach((card)=>{
            
             for (let i = 0; i < numberOfRepeat; i++) {
                workoutComponent.addWorkout(card.workout, card.calories);
              }
 
          })
 
          testArray.forEach((card)=>{
             calorieArr.push(Number(card.calories));
          })
 
          const sumOfCalories =  calorieArr.reduce((acc, current)=>  acc + current ,0);
 
 
        
          //Assertions that cards were added
 
        cy.get(workoutComponent.workoutWrapper).should('exist').children().should('have.length', 5*numberOfRepeat);
        cy.get(workoutComponent.workoutBurnedCalories).should('contain', sumOfCalories*numberOfRepeat);
        cy.get(workoutComponent.remainingCaloriesCard).should('contain', (sumOfCalories*numberOfRepeat)+2000 );
        cy.get(workoutComponent.gainLossCard).should('contain', `-${(sumOfCalories*numberOfRepeat)+2000}` );
        cy.get(workoutComponent.calorieLimit).should('contain', 2000 );
        cy.get(workoutComponent.progressBar).should('contain', `0%`);
        cy.get(workoutComponent.progressBar).should('have.class', `bg-success`);
 
          //Remove all workout cards
         cy.get(workoutComponent.workoutWrapper).children().then((cards)=>{
          cy.wrap(cards).then((workoutArray)=>{
             workoutComponent.removeSpecificWorkouts(3,workoutArray)
          })
         })
 
         //Assertion if the cards were removed
         cy.get(workoutComponent.workoutWrapper).should('exist').children().should('have.length', 4);
         cy.get(workoutComponent.workoutBurnedCalories).should('contain', 0);
         cy.get(workoutComponent.remainingCaloriesCard).should('contain', ((sumOfCalories*numberOfRepeat)-caloriesOfDeletedCard)+2000 );
         cy.get(workoutComponent.gainLossCard).should('contain', `-${((sumOfCalories*numberOfRepeat)-caloriesOfDeletedCard)+2000}`);
         cy.get(workoutComponent.calorieLimit).should('contain', 2000);
         cy.get(workoutComponent.progressBar).should('contain', `0%`);
         cy.get(workoutComponent.progressBar).should('have.class', `bg-success`);
       })
 
    })
 
 })