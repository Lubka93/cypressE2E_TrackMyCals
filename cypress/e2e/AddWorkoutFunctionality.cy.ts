//Imports
require('@cypress/xpath')
import {workoutComponent } from "../components/workout"; 
import {testDataWorkoutValid} from "./model";
import {testDataObjectWorkout } from "./model";


describe('#000004 Add workout functionality ', ()=>{

    beforeEach(()=>{
       workoutComponent.visit();
       workoutComponent.clearAllData();
       cy.fixture('testDataWorkout.json').as('testData');
    
        //Assertions
        cy.url().should('eq', 'https://trackmycals.netlify.app/?meal-name=&calorie-number=#' );
        cy.title().should('eq', 'TrackMyCals');
    
    
    })
      
       it('&000029, &000030, &000035, &000037, &000041, &000042 - Verify  add workout funtionality after adding valid workout name and valid calories for burned calories input (positive)', ()=>{
       
          cy.get<testDataWorkoutValid>('@testData').then((testData)=>{
             const testArray:testDataObjectWorkout[] = JSON.parse(testData.workoutValidTestData);
    
       testArray.forEach((item) => {
          workoutComponent.addWorkout(item.workout, item.calories);
     
       //Assertions
       cy.get(workoutComponent.workoutCardName).should('have.text', item.workout);
       cy.get(workoutComponent.wokroutCardCaloriesNumber).should('have.text', `${Math.ceil(Number(item.calories))}`);
       cy.get(workoutComponent.calorieLimitInputCard).then((text)=>{
          const text01 = text.text().trim();
          expect(Math.round(Number(text01))).to.equal(Number('2000'))
       })
       cy.get(workoutComponent.consumedCaloriesCard).then((text)=>{
       const text01 = text.text().trim();
       expect(text01).equal(`${Math.round(Number(0))}`);
       })
       cy.get(workoutComponent.workoutBurnedCalories).then((text)=>{
          const text01 = text.text().trim();
          expect(text01).equal(`${Math.ceil(Number(item.calories))}`);
          })
    
       cy.get(workoutComponent.gainLossCard).should('contain', `-${2000 + Math.round(Number(item.calories))}`)
       cy.get(workoutComponent.remainingCaloriesCard).should('have.text', `${2000 + Math.round(Number(item.calories))}`);
       cy.get(workoutComponent.calorieLimit).should('have.text', '2000');
       workoutComponent.clearAllData();
    });
     })
       })
    
       
       it('&000031, &000032, &000033 - Verify  add workout funtionality  after adding none input into workout name input and/or none input for burned calories (negative)', ()=>{
          cy.get<testDataWorkoutValid>('@testData').then((testData)=>{
             const testArray:testDataObjectWorkout[] = JSON.parse(testData.workoutInvalidTestData);
    
       testArray.forEach((item) => {
          workoutComponent.addWorkout(item.workout, item.calories);
     
        //Assertion
        cy.on('window:alert', (alertMessage) => {
          expect(alertMessage).to.equal('Fill the input windows!');
        });
        cy.get(workoutComponent.calorieLimitInputCard).then((text)=>{
          const text01 = text.text().trim();
          expect(Math.round(Number(text01))).to.equal(Number('2000'))
       })
       cy.get(workoutComponent.consumedCaloriesCard).then((text)=>{
       const text01 = text.text().trim();
       expect(text01).equal(`${Math.round(Number(0))}`);
       })
       cy.get(workoutComponent.workoutBurnedCalories).then((text)=>{
          const text01 = text.text().trim();
          expect(text01).equal(`${Math.round(Number(0))}`);
          })
    
       cy.get(workoutComponent.gainLossCard).should('have.text', `-${2000 + Math.round(Number(0))}`)
       cy.get(workoutComponent.remainingCaloriesCard).should('have.text', `${2000 + Math.round(Number(0))}`);
       cy.get(workoutComponent.calorieLimit).should('have.text', '2000');
       cy.get(workoutComponent.workoutWrapper).should('exist').children().should('have.length', 0);
       workoutComponent.clearAllData();
    });
     })
    
       })
    
       it('&000034 - Verify  Add workout funtionality  after adding more  than 4  digets into calorie  input', ()=>{
          workoutComponent.addWorkout('gym', '12345');
          
           //Assertions
       cy.get(workoutComponent.workoutCardName).should('have.text', 'gym');
       cy.get(workoutComponent.wokroutCardCaloriesNumber).should('have.text', `${Math.ceil(Number('1234'))}`);
       cy.get(workoutComponent.calorieLimitInputCard).then((text)=>{
          const text01 = text.text().trim();
          expect(Math.round(Number(text01))).to.equal(Number('2000'))
       })
       cy.get(workoutComponent.consumedCaloriesCard).then((text)=>{
       const text01 = text.text().trim();
       expect(text01).equal(`${Math.round(Number(0))}`);
       })
       cy.get(workoutComponent.workoutBurnedCalories).then((text)=>{
          const text01 = text.text().trim();
          expect(text01).equal(`${Math.ceil(Number('1234'))}`);
          })
    
       cy.get(workoutComponent.gainLossCard).should('contain', `-${2000 + Math.round(Number('1234'))}`)
       cy.get(workoutComponent.remainingCaloriesCard).should('have.text', `${2000 + Math.round(Number('1234'))}`);
       cy.get(workoutComponent.calorieLimit).should('have.text', '2000');
    
       })
    
       it('&000036 - Verify  Add workout funtionality  after adding more characters then is alowed  into workout name  input', ()=>{
             workoutComponent.addWorkout('abcdefghijppppppppppt', '500');
    
                  //Assertions
       cy.get(workoutComponent.workoutCardName).should('have.text', 'abcdefghijpppppppppp');
       cy.get(workoutComponent.wokroutCardCaloriesNumber).should('have.text', `${Math.ceil(Number('500'))}`);
       cy.get(workoutComponent.calorieLimitInputCard).then((text)=>{
          const text01 = text.text().trim();
          expect(Math.round(Number(text01))).to.equal(Number('2000'))
       })
       cy.get(workoutComponent.consumedCaloriesCard).then((text)=>{
       const text01 = text.text().trim();
       expect(text01).equal(`${Math.round(Number(0))}`);
       })
       cy.get(workoutComponent.workoutBurnedCalories).then((text)=>{
          const text01 = text.text().trim();
          expect(text01).equal(`${Math.ceil(Number('500'))}`);
          })
    
       cy.get(workoutComponent.gainLossCard).should('contain', `-${2000 + Math.round(Number('500'))}`)
       cy.get(workoutComponent.remainingCaloriesCard).should('have.text', `${2000 + Math.round(Number('500'))}`);
       cy.get(workoutComponent.calorieLimit).should('have.text', '2000');
       })
    
       it('&000038 - Verify add workout funtionality  after adding negative integer  into burned calories  input (BVA)', ()=>{
          workoutComponent.addWorkout('gym', '-1');
          
        //Assertion
        cy.on('window:alert', (alertMessage) => {
          expect(alertMessage).to.equal('Calorie input should be a positive number');
        });
        cy.get(workoutComponent.calorieLimitInputCard).then((text)=>{
          const text01 = text.text().trim();
          expect(Math.round(Number(text01))).to.equal(Number('2000'))
       })
       cy.get(workoutComponent.consumedCaloriesCard).then((text)=>{
       const text01 = text.text().trim();
       expect(text01).equal(`${Math.round(Number(0))}`);
       })
       cy.get(workoutComponent.workoutBurnedCalories).then((text)=>{
          const text01 = text.text().trim();
          expect(text01).equal(`${Math.round(Number(0))}`);
          })
    
       cy.get(workoutComponent.gainLossCard).should('have.text', `-${2000 + Math.round(Number(0))}`)
       cy.get(workoutComponent.remainingCaloriesCard).should('have.text', `${2000 + Math.round(Number(0))}`);
       cy.get(workoutComponent.calorieLimit).should('have.text', '2000');
       cy.get(workoutComponent.workoutWrapper).should('exist').children().should('have.length', 0);
       })
    
       it('&000040 - Verify  add workout funtionality  after adding positive decimal number  with comma into burned calories  input', ()=>{
          workoutComponent.addWorkout('gym', '99,5');
          
        //Assertion
        cy.on('window:alert', (alertMessage) => {
          expect(alertMessage).to.equal('Calorie input should be a number');
        });
        cy.get(workoutComponent.calorieLimitInputCard).then((text)=>{
          const text01 = text.text().trim();
          expect(Math.round(Number(text01))).to.equal(Number('2000'))
       })
       cy.get(workoutComponent.consumedCaloriesCard).then((text)=>{
       const text01 = text.text().trim();
       expect(text01).equal(`${Math.round(Number(0))}`);
       })
       cy.get(workoutComponent.workoutBurnedCalories).then((text)=>{
          const text01 = text.text().trim();
          expect(text01).equal(`${Math.round(Number(0))}`);
          })
    
       cy.get(workoutComponent.gainLossCard).should('have.text', `-${2000 + Math.round(Number(0))}`)
       cy.get(workoutComponent.remainingCaloriesCard).should('have.text', `${2000 + Math.round(Number(0))}`);
       cy.get(workoutComponent.calorieLimit).should('have.text', '2000');
       cy.get(workoutComponent.workoutWrapper).should('exist').children().should('have.length', 0);
       })
    })
    