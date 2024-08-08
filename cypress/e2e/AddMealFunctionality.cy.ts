//Imports
require('@cypress/xpath')
import {Limit} from "../components/limit";
import {mealFeature } from "../components/meal";
import { testDataObject } from "./model";
import {testDataMealValid } from "./model";


describe('#000002 -  Add meal functionality', ()=>{
   
    beforeEach(()=>{
       Limit.visit();
       Limit.clearAllData();
       cy.fixture('testDataMeal.json').as('testData');
 
        //Assertions
       cy.url().should('eq', 'https://trackmycals.netlify.app/?meal-name=&calorie-number=#' );
       cy.title().should('eq', 'TrackMyCals');
    })
 
 
 
    it('&000012; &000013; &000017; &000019; &000020; &000022, &000025 - Verify  Add meal funtionality after adding valid name and valid calories for the meal (positive)', ()=>{
      
     cy.get<testDataMealValid>('@testData').then((testData)=>{
       const testArray:testDataObject[] = testData.mealValidTestData;
 
       testArray.forEach((item)=>{
          mealFeature.clearAllData();
          mealFeature.addMeal(item.meal, item.calories);
    
          //Assertions
        
          cy.get(mealFeature.mealCardWrapper).should('be.visible');
         cy.get(mealFeature.mealCardName).should('be.visible');
          cy.get(mealFeature.mealCardName).should('have.text', `${item.meal}`);
          cy.get(mealFeature.mealCardCaloriesNumber).should('be.visible');
          cy.get(mealFeature.mealCardCaloriesNumber).should('have.class', 'btn-success');
          cy.get(mealFeature.mealCardCaloriesNumber).should('have.text', `${Math.round((Number(item.calories)))}`);
          cy.get(mealFeature.calorieLimitInputCard).then((text)=>{
             const text01 = text.text().trim();
             expect(Math.round(Number(text01))).to.equal(Number('2000'))
          })
        cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
          const text01 = text.text().trim();
          expect(text01).equal(`${Math.round(Number(item.calories))}`);
        })
       
          cy.get(mealFeature.gainLossCard).should('have.text', `-${2000 - Math.round(Number(item.calories))}`)
          cy.get(mealFeature.remainingCaloriesCard).should('have.text', `${2000 - Math.round(Number(item.calories))}`);
          cy.get(mealFeature.progressBar).then((text)=>{
             const text01 = text.text().trim();
             expect(text01).to.equal(`${Math.round((100/2000)*Math.round(Number(item.calories)))}%`)
          });
          cy.get(mealFeature.progressBar).should('have.class', 'bg-success');
          cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
             const text01 = text.text().trim();
             expect(text01).equal(`${Math.round(Number(0))}`);
             })
          cy.get(mealFeature.calorieLimit).should('have.text', '2000');     
          cy.reload(); // to clear LS
       })
     })
    })
 
 it ('&000014; &000015; &000016 - Verify  Add meal funtionality  after adding none input (negative)', ()=>{
 
    cy.get<testDataMealValid>('@testData').then((testData)=>{
       const testArray:testDataObject[] = testData.mealInvalidTestData;
 
    
     // Set up event listeners for window alert and window confirm events
     cy.on('window:confirm', (alertMessage) => {
       expect(alertMessage).to.equal('Calorie input should be a positive number');
     });
 
     cy.on('window:alert', (alertMessage) => {
       expect(alertMessage).to.equal('Fill the input windows!');
     });
 
       testArray.forEach((item)=>{
          mealFeature.clearAllData();
          mealFeature.addMeal(item.meal, item.calories)
 
          //Assertions
 
          cy.get(mealFeature.calorieLimitInputCard).then((text)=>{
             const text01 = text.text().trim();
             expect(Math.round(Number(text01))).to.equal(Number('2000'))
          })
        cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
          const text01 = text.text().trim();
          expect(text01).equal(`${Math.round(Number(0))}`);
        })
       
          cy.get(mealFeature.gainLossCard).should('have.text', `-${2000 - Math.round(Number(0))}`)
          cy.get(mealFeature.remainingCaloriesCard).should('have.text', `${2000 - Math.round(Number(0))}`);
          cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
             const text01 = text.text().trim();
             expect(text01).equal(`${Math.round(Number(0))}`);
             })
          cy.get(mealFeature.calorieLimit).should('have.text', '2000');    
       })
     })
 })
 
 it ('&000018 - Verify Add meal funtionality  after adding negative integer  into calories  input (negative)', ()=>{
 
     // Set up event listeners for window alert and window confirm events
     cy.on('window:alert', (alertMessage) => {
       expect(alertMessage).to.equal('Calorie input should be a positive number');
     });
          mealFeature.clearAllData();
          mealFeature.addMeal("sandwitch", "-1");
 
        //Assertions     
          cy.get(mealFeature.calorieLimitInputCard).then((text)=>{
             const text01 = text.text().trim();
             expect(Math.round(Number(text01))).to.equal(Number('2000'))
          })
        cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
          const text01 = text.text().trim();
          expect(text01).equal(`${Math.round(Number(0))}`);
        })
       
          cy.get(mealFeature.gainLossCard).should('have.text', `-${2000 - Math.round(Number(0))}`)
          cy.get(mealFeature.remainingCaloriesCard).should('have.text', `${2000 - Math.round(Number(0))}`);
          cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
             const text01 = text.text().trim();
             expect(text01).equal(`${Math.round(Number(0))}`);
             })
          cy.get(mealFeature.calorieLimit).should('have.text', '2000');
 })
 
 
 it ('&000021 - Verify  Add meal funtionality  after adding positive decimal number with comma  into calories  input (negative)', ()=>{
 
     // Set up event listeners for window alert and window confirm events
     cy.on('window:alert', (alertMessage) => {
       expect(alertMessage).to.equal('Calorie input should be a number');
     });
 
          mealFeature.clearAllData();
          mealFeature.addMeal("sandwitch", "99,5");
 
        //Assertions     
          cy.get(mealFeature.calorieLimitInputCard).then((text)=>{
             const text01 = text.text().trim();
             expect(Math.round(Number(text01))).to.equal(Number('2000'))
          })
        cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
          const text01 = text.text().trim();
          expect(text01).equal(`${Math.round(Number(0))}`);
        })
       
          cy.get(mealFeature.gainLossCard).should('have.text', `-${2000 - Math.round(Number(0))}`)
          cy.get(mealFeature.remainingCaloriesCard).should('have.text', `${2000 - Math.round(Number(0))}`);
          cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
             const text01 = text.text().trim();
             expect(text01).equal(`${Math.round(Number(0))}`);
             })
          cy.get(mealFeature.calorieLimit).should('have.text', '2000');
 })
 
 it('&000023 - Verify  Add meal funtionality  after adding more  than 4  digets into calorie  input  (positive)', ()=>{
     
         mealFeature.clearAllData();
         mealFeature.addMeal("sandwitch", "12345");
 
 
       //Assertions
       cy.get(mealFeature.mealCardName).then((mealName)=>{
          expect(mealName.text()).to.equal('sandwitch');
         })
       
         cy.get(mealFeature.calorieLimitInputCard).then((text)=>{
            const text01 = text.text().trim();
            expect(Math.round(Number(text01))).to.equal(Number('2000'))
         })
       cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
         const text01 = text.text().trim();
         expect(text01).equal(`${Math.round(Number(1234))}`);
       })
      
         cy.get(mealFeature.gainLossCard).should('have.text', `-${2000 - Math.round(Number(1234))}`)
         cy.get(mealFeature.remainingCaloriesCard).should('have.text', `${2000 - Math.round(Number(1234))}`);
         cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
          const text01 = text.text().trim();
          expect(text01).equal(`${Math.round(Number(0))}`);
          })
       cy.get(mealFeature.calorieLimit).should('have.text', '2000');
 })
 
 
 it('&000024 - Verify  Add meal funtionality  after adding more  than 9 characters  into meal name  input (positive)', ()=>{
 
    // Set up event listeners for window alert and window confirm events
    cy.on('window:alert', (alertMessage) => {
      expect(alertMessage).to.equal('Too long input');
    });
     
         mealFeature.clearAllData();
         mealFeature.addMeal("jhdqudwôoppppp", "500");
 
       //Assertions     
         cy.get(mealFeature.mealCardName).then((mealName)=>{
          expect(mealName.text()).to.equal('jhdqudwôoppppp');  
         })
 
         cy.get(mealFeature.calorieLimitInputCard).then((text)=>{
          const text01 = text.text().trim();
          expect(Math.round(Number(text01))).to.equal(Number('2000'))
       })
 
       cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
         const text01 = text.text().trim();
         expect(text01).equal(`${Math.round(Number(500))}`);
       })
      
         cy.get(mealFeature.gainLossCard).should('have.text', `-${2000 - Math.round(Number(500))}`)
         cy.get(mealFeature.remainingCaloriesCard).should('have.text', `${2000 - Math.round(Number(500))}`);
         cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
          const text01 = text.text().trim();
          expect(text01).equal(`${Math.round(Number(0))}`);
          })
       cy.get(mealFeature.calorieLimit).should('have.text', '2000');
 
 })
 })