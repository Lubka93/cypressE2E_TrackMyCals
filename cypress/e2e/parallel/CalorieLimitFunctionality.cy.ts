//Imports
require('@cypress/xpath')

import {Limit} from "C:/Users/lubic/Desktop/Cypress/cypress/components/limit";
import {testDataLimitObject} from "../model";


describe("#000001 - Calorie limit functionality", () => {
    beforeEach(() => {
     Limit.visit();
     cy.getAllLocalStorage();
     cy.fixture('testDataLimit.json').as('testData');
  
      //Assertions
      cy.url().should('eq', 'https://trackmycals.netlify.app/?meal-name=&calorie-number=#' );
      cy.title().should('eq', 'TrackMyCals');
    })
  
      it("&000001 - &000004 - Verify  Limit calories funtionality after adding a valid input (positive)", ()=> {
      
        //Test Data
        //const testData: string[] = ['1800', '180.5', '00001', '12345'];
      cy.get<testDataLimitObject>('@testData').then((testData)=>{
           const dataArray:testDataLimitObject[] = JSON.parse(testData.limitTestDataValid);
  
           dataArray.forEach((item)=>{
              Limit.limitUpdate(item);
                //Assertions for the limit change
                cy.get(Limit.calorieLimitInputCard).then((text)=>{
                 const text01 = text.text().trim();
                 expect(text01).to.equal(`${Math.round(Number(item))}`)
                 });
                  
                 cy.get(Limit.gainLossCard).then((text)=>{
                    const text01=text.text().trim();
                    expect(text01).to.equal(`-${Math.round(Number(item))}`);
                 })
        
                 cy.get(Limit.remainingCaloriesCard).then((text)=>{
                    const text01 = text.text().trim();
                    expect(text01).to.equal(`${Math.round(Number(item))}`)
                 })
           })
        })
       
     })
  
     it('&000005 - &000009 - Verify  Limit calories funtionality after adding an invalid input (negative)', ()=>{
        //const testData:string[] = ['180,5', 'ABC1', '152#', '##', '1 2 3'];
       
        cy.get<testDataLimitObject>('@testData').then((testData)=>{
           const dataArray:testDataLimitObject[] = JSON.parse(testData.limitTestDataInvalid)
  
           dataArray.forEach((item)=>{
              Limit.limitUpdate(item);
              Limit.confirmAlertMessage('Input must be a number!');
                //Assertions for the limit change
                cy.get(Limit.calorieLimitInputCard).then((text)=>{
                 const text01 = text.text().trim();
                 expect(text01).to.equal('2000')
                 });
                  
                 cy.get(Limit.gainLossCard).then((text)=>{
                    const text01=text.text().trim();
                    expect(text01).to.equal('-2000');
                 })
        
                 cy.get(Limit.remainingCaloriesCard).then((text)=>{
                    const text01 = text.text().trim();
                    expect(text01).to.equal('2000')
                 })
           })
        })
      
     })
  
     it('&0000010 - Verify  Limit calories funtionality after adding more digets than 5 as invalid input (negative)', ()=>{
              Limit.limitUpdate('123456');
                 //Assertions for the limit change
             cy.get(Limit.calorieLimitInputCard).invoke('text').then((text)=>{
              //const text01 = text.text().trim();
              expect(text.trim()).to.equal('12345');
              cy.log(text)
              });
               
              cy.get(Limit.gainLossCard).invoke('text').then((text)=>{
                 expect(text.trim()).to.equal('-12345');
              })
     
              cy.get(Limit.remainingCaloriesCard).invoke('text').then((text)=>{
                 expect(text.trim()).to.equal('12345')
              })
  
     })
  
     it('&0000011 - Verify  Limit calories funtionality after adding none input (negative)', ()=>{
        Limit.limitUpdate('');
        Limit.confirmAlertMessage('Add number of calories!'); //changeee
      
        //Assertions for the limit change
        cy.get(Limit.calorieLimitInputCard).then((text)=>{
        const text01 = text.text().trim();
        expect(text01).to.equal('2000')
        });
      
        cy.get(Limit.gainLossCard).then((text)=>{
        const text01=text.text().trim();
        expect(text01).to.equal('-2000');
        })
  
        cy.get(Limit.remainingCaloriesCard).then((text)=>{
        const text01 = text.text().trim();
        expect(text01).to.equal('2000')
        })
     })
  })