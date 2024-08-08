
require('@cypress/xpath');

import {Limit} from "../components/limit";
import {mealFeature} from "../components/meal";
import {testDataObject} from "./model";
import {testDataMealValid} from "./model";


describe('#000003 - Remove meal functionality', ()=>{

    beforeEach(()=>{
       Limit.visit();
       Limit.clearAllData();
       cy.fixture('testDataMeal.json').as('testData');
    
        //Assertions
        cy.url().should('eq', 'https://trackmycals.netlify.app/?meal-name=&calorie-number=#' );
        cy.title().should('eq', 'TrackMyCals');
    
    })
    
    it('&000026 - Verify  Remove meal functionality after adding the same 5 valid meals (positive)', ()=>{
       mealFeature.clearAllData();
    
       let numberOfMeals = 10;
       let mealName = 'sandwitch';
       let numberOfCalories = '500';
    
       for (let i = 0; i < numberOfMeals; i ++) {
          mealFeature.addMeal(mealName, numberOfCalories);
       }
      
     //Assertion if meals were added
       cy.get(mealFeature.mealCardWrapper).should('have.length', 10)
    
       cy.get(mealFeature.mealCardWrapper).then((mealCards)=>{
          cy.wrap(mealCards).then((mealArray)=>{ 
             mealFeature.removeAllMeals(mealArray)
          })
       })
        //Assertion if the meals were removed
        cy.get(mealFeature.mealCardWrapper).should('have.length', 0);
        cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
          let text01 = text.text().trim();
          expect(text01).equal('0')
          })
       cy.get(mealFeature.gainLossCard).should('have.text', '-2000');
       cy.get(mealFeature.remainingCaloriesCard).should('have.text', '2000');
       cy.get(mealFeature.progressBar).then((bar)=>{
          let bar01 = bar.text().trim();
          expect(bar01).to.equal('0%')
        })
        cy.get(mealFeature.calorieLimit).should('have.text', '2000')
        cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
          let text01 = text.text().trim();
          expect(text01).to.equal('0')
        })
        cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
          const text01 = text.text().trim();
          expect(text01).equal(`${Math.round(Number(0))}`);
          })
       cy.get(mealFeature.calorieLimit).should('have.text', '2000');
    
    })
    
    it ('&000027 - Verify  Remove meal functionality after adding  5 different valid meals (positive)', function () {
       cy.get<testDataMealValid>('@testData').then((testData)=>{
          const dataArray:testDataObject[] = testData.mealRemoveValidTestData
          mealFeature.clearAllData();
          dataArray.forEach((item:testDataObject)=>{
          mealFeature.addMeal(item.meal, item.calories);
          })
    
          //Assertion if meals were added
          cy.get(mealFeature.mealCardWrapper).should('have.length', 5)
       })
    
       cy.get(mealFeature.mealCardWrapper).then((mealCards) => {
        cy.wrap(mealCards).then((mealArray)=>{
          mealFeature.removeAllMeals(mealArray);
        })
         
        });
    
        //Assertion if the meals were removed
        cy.get(mealFeature.mealCardWrapper).should('have.length', 0);
        cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
          let text01 = text.text().trim();
          expect(text01).equal('0')
        })
        cy.get(mealFeature.gainLossCard).should('have.text', '-2000');
        cy.get(mealFeature.remainingCaloriesCard).should('have.text', '2000');
        cy.get(mealFeature.progressBar).then((bar)=>{
          let bar01 = bar.text().trim();
          expect(bar01).to.equal('0%')
        })
        cy.get(mealFeature.calorieLimit).should('have.text', '2000')
        cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
          let text01 = text.text().trim();
          expect(text01).to.equal('0');
        })
        cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
          const text01 = text.text().trim();
          expect(text01).equal(`${Math.round(Number(0))}`);
          })
       cy.get(mealFeature.calorieLimit).should('have.text', '2000');
    })
    
    it ('&000028 - Verify  Remove meal functionality after adding  5 diffrent valid meals and removing fourth meal', function () {
    
    let removedCalories = 1000;
    const mealCaloriesArr:any = [];
    let sumOfCalories;
    
       cy.get<testDataMealValid>('@testData').then((testData)=>{
          const dataArray:testDataObject[] = testData.mealRemoveValidTestData;

          mealFeature.clearAllData();
          dataArray.forEach((item:testDataObject)=>{
          mealFeature.addMeal(item.meal, item.calories);
          mealCaloriesArr.push(Number(item.calories))
       
        
          })
    
          sumOfCalories = mealCaloriesArr.reduce((acc, current)=> acc+current, 0);
    
          //Assertion if meals were added
     cy.get(mealFeature.mealCardWrapper).should('have.length', 5);
     cy.get(mealFeature.consumedCaloriesCard).should('contain', sumOfCalories);
     cy.get(mealFeature.workoutBurnedCalories).should('contain', 0);
     cy.get(mealFeature.remainingCaloriesCard).should('contain', 2000-sumOfCalories);
     cy.get(mealFeature.gainLossCard).should('contain', `-${2000-sumOfCalories}`);
    
      
    
    
          //Meal removal
          let mealForRemoval = 3;
       cy.get(mealFeature.mealCardWrapper).then((mealCards) => {
        cy.wrap(mealCards).then((mealArray)=>{
          mealFeature.removeSpecificMeals(mealForRemoval, mealArray);
        })
         
        });
    
        //Assertion if the meals were removed
        cy.get(mealFeature.mealCardWrapper).should('have.length', 4);
        cy.get(mealFeature.consumedCaloriesCard).should('contain', sumOfCalories-removedCalories);
        cy.get(mealFeature.gainLossCard).should('contain', `-${2000-(sumOfCalories-removedCalories)}`);
        cy.get(mealFeature.remainingCaloriesCard).should('contain', 2000-(sumOfCalories-removedCalories));
        cy.get(mealFeature.progressBar).should('contain', `${Math.round((100*(sumOfCalories-removedCalories))/2000)}%`);
        cy.get(mealFeature.workoutBurnedCalories).should('contain', 0);
        cy.get(mealFeature.calorieLimit).should('contain', '2000');
    })
    })
    })