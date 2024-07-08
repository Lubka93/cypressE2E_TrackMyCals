//Imports
require('@cypress/xpath')
import {mealFeature } from "../components/meal";
import { testDataObject } from "./model";
import {testDataMealValid } from "./model";
import {testDataLimitObject} from "./model";


describe('#000006 Filter meals functionality', ()=>{
    beforeEach(()=>{
          mealFeature.visit();
          mealFeature.clearAllData();
          cy.fixture('testDataMeal.json').as('testData');
          cy.fixture('testFilterData.json').as('filterData');
          cy.title().should('eq', 'TrackMyCals');
          cy.url().should('eq', 'https://trackmycals.netlify.app/?meal-name=&calorie-number=#');
    })
 
    it('&000046, &000047, &000048, &000049, &000050,&000052,&000053, &000054 - Verify filtering meal cards functionality with valid filter input which is the same as one of the meal card items', () => {
       cy.get<testDataMealValid>('@testData').then((testData) => {
           const arrData: testDataObject[] = JSON.parse(testData.mealFilterTestData);
   
           // Add meal cards
           arrData.forEach((card) => {
               mealFeature.addMeal(card.meal, card.calories);
           });
   
           // Assertion to check number of added meal cards
           cy.get(mealFeature.mealWrapper).children().should('have.length', 5);
   
           // Filter meal
           cy.get<testDataLimitObject>('@filterData').then((filterData) => {
               const filterItemsArr: string[] = JSON.parse(filterData.filterMealsItems);
               filterItemsArr.forEach((filterItem) => {
                  
                // Filter meal cards
                   mealFeature.filterMealCards(filterItem);
 
                   if (filterItem === 'none' || filterItem === '100' ) {
                      // Check that no meal cards are visible
                      cy.get(mealFeature.mealWrapper)
                          .children(':visible')
                          .should('not.exist')
                          .then(() => {
                              // Clear the filter input
                              mealFeature.clearFilterInput();  
                          }); 
                               }
                              
                   else  { 
   
                   // Get all visible meal cards and extract their text
                   const mealNameArr: string[] = [];
                   cy.get(mealFeature.mealWrapper).children(':visible').find('p').each(($item) => {
                       cy.wrap($item).invoke('text').then((text) => {
                           mealNameArr.push(text);
                       });
                   }).then(() => {
                       
                       // Assertion for filtering the item
                        if (mealNameArr.length > 0 && filterItem !== '   ') {
                           cy.get(mealFeature.mealWrapper).children(':visible').should('have.length', mealNameArr.length);
   
                           // Assert the text of each visible meal card includes the filter item
                           cy.get(mealFeature.mealWrapper).children(':visible').find('p').each(($item) => {
                               cy.wrap($item).invoke('text').should('include', filterItem.trim());
                           });
                        } else if (mealNameArr.length > 0 && filterItem === '   ') {
                         cy.get(mealFeature.mealWrapper).children(':visible').should('have.length', mealNameArr.length);
                        }
                       mealFeature.clearFilterInput();
                   }) }
               });
           });
   
           // Clear all data after the test
           mealFeature.clearAllData();
       });
   });
   
   it ('&000051 - Verify  filtering meal cards functionality by empty filter input (clicking into filter input window)', ()=>{
    cy.get<testDataMealValid>('@testData').then((testData) => {
       const arrData: testDataObject[] = JSON.parse(testData.mealFilterTestData);
 
       // Add meal cards
       arrData.forEach((card) => {
           mealFeature.addMeal(card.meal, card.calories);
       });
 
       // Assertion to check number of added meal cards
       cy.get(mealFeature.mealWrapper).children().should('have.length', 5);
   
          cy.get(mealFeature.filterInput).invoke('val', '')
          //Assertion
          cy.get(mealFeature.mealWrapper).children(':visible').should('exist').then(() => {
                              // Clear the filter input
                              mealFeature.clearFilterInput();  
                          }).then(()=>{ mealFeature.clearFilterInput();  })
          //Assertion
          cy.get(mealFeature.mealWrapper).children().should('have.length', 5)
  })
 
   })
 
 })