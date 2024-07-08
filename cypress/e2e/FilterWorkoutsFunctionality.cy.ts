
require('@cypress/xpath')

import {testDataLimitObject} from "./model";
import {workoutComponent } from "../components/workout"; 
import {testDataWorkoutValid} from "./model";
import {testDataObjectWorkout } from "./model";


describe('#000007  Filter workouts functionality', ()=>{
    beforeEach(()=>{
          workoutComponent.visit();
          workoutComponent.clearAllData();
          cy.fixture('testDataWorkout.json').as('testData');
          cy.fixture('testFilterData.json').as('filterData');
          cy.title().should('eq', 'TrackMyCals');
          cy.url().should('eq', 'https://trackmycals.netlify.app/?meal-name=&calorie-number=#');
    })
 
    it('&000055, &000056, &000057, &000058, &000059,&000061,&000062, &000063 - Verify filtering meal cards functionality with valid filter input which is the same as one of the meal card items', () => {
       cy.get<testDataWorkoutValid>('@testData').then((testData) => {
           const arrData: testDataObjectWorkout[] = JSON.parse(testData.workoutFilterValidTestData);
   
           // Add meal cards
           arrData.forEach((card) => {
               workoutComponent.addWorkout(card.workout, card.calories);
           });
   
           // Assertion to check number of added meal cards
           cy.get(workoutComponent.workoutWrapper).children().should('have.length', 5);
   
           // Filter meal
           cy.get<testDataLimitObject>('@filterData').then((filterData) => {
               const filterItemsArr: string[] = JSON.parse(filterData.filterWorkoutItems);
               filterItemsArr.forEach((filterItem) => {
                  
                // Filter meal cards
                   workoutComponent.filterWorkoutCards(filterItem);
 
                   if (filterItem === 'none' || filterItem === '200' ) {
                      // Check that no meal cards are visible
                      cy.get(workoutComponent.workoutWrapper)
                          .children(':visible')
                          .should('not.exist')
                          .then(() => {
                              // Clear the filter input
                              workoutComponent.clearWorkoutFilterInput();  
                          }); 
                               }
                              
                   else  { 
   
                   // Get all visible meal cards and extract their text
                   const workoutNameArr: string[] = [];
                   cy.get(workoutComponent.workoutWrapper).children(':visible').find('p').each(($item) => {
                       cy.wrap($item).invoke('text').then((text) => {
                         workoutNameArr.push(text);
                       });
                   }).then(() => {
                       
                       // Assertion for filtering the item
                        if (workoutNameArr.length > 0 && filterItem !== '   ') {
                           cy.get(workoutComponent.workoutWrapper).children(':visible').should('have.length', workoutNameArr.length);
   
                           // Assert the text of each visible meal card includes the filter item
                           cy.get(workoutComponent.workoutWrapper).children(':visible').find('p').each(($item) => {
                               cy.wrap($item).invoke('text').should('include', filterItem.trim());
                           });
                        } else if (workoutNameArr.length > 0 && filterItem === '   ') {
                         cy.get(workoutComponent.workoutWrapper).children(':visible').should('have.length', workoutNameArr.length);
                        }
                       workoutComponent.clearWorkoutFilterInput();
                   }) }
               });
           });
   
           // Clear all data after the test
           workoutComponent.clearAllData();
       });
   });
   
   it ('&000060 - Verify  filtering meal cards functionality by empty filter input (clicking into filter input window)', ()=>{
    cy.get<testDataWorkoutValid>('@testData').then((testData) => {
       const arrData: testDataObjectWorkout[] = JSON.parse(testData.workoutFilterValidTestData);
 
       // Add meal cards
       arrData.forEach((card) => {
           workoutComponent.addWorkout(card.workout, card.calories);
       });
 
       // Assertion to check number of added meal cards
       cy.get(workoutComponent.workoutWrapper).children().should('have.length', 5);
   
          cy.get(workoutComponent.workoutFilterInput).invoke('val', '')
          //Assertion
          cy.get(workoutComponent.workoutWrapper).children(':visible').should('exist').then(() => {
                              // Clear the filter input
                              workoutComponent.clearWorkoutFilterInput();  
                          }).then(()=>{ workoutComponent.clearWorkoutFilterInput();  })
          //Assertion
          cy.get(workoutComponent.workoutWrapper).children().should('have.length', 5)
  })
 
   })
 
 })