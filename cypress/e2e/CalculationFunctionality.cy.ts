//Imports
require('@cypress/xpath')
import {Limit} from "../components/limit";
import {mealFeature } from "../components/meal";
import {workoutComponent } from "../components/workout"; 


describe('#000008 Calculation functionality', ()=>{

    beforeEach(()=>{
       mealFeature.visit();
       mealFeature.clearAllData();
    
       cy.fixture('testDataLimit.json').as('testData');
    
        //Assertions
        cy.url().should('eq', 'https://trackmycals.netlify.app/?meal-name=&calorie-number=#' );
        cy.title().should('eq', 'TrackMyCals');
    })
    
    it('&000064 - Verify  calculation functionality by adding 4 meals and adding the exactly same amout of calories as for calorie limit (BVA)', ()=>{
       let numOfMeals = 4;
    
       for (let i = 0; i < numOfMeals; i++) { 
       mealFeature.addMeal('sandwich', '500');
     }
    
    //Assertions
    cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 4);
    
    cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equals('2000');
     })
    cy.get(mealFeature.calorieLimit).should('have.text', '2000');
    cy.get(mealFeature.remainingCaloriesCard).should('have.text', '0');
    cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
    cy.get(mealFeature.gainLossCard).should('have.text', '0');
    cy.get(mealFeature.gainLossBg).should('have.class', 'bg-success');
    cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equal('0')
    })
    cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equals('0')
    })
    cy.get(mealFeature.progressBar).should('have.class', 'bg-success');
    cy.get(mealFeature.progressBar).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equal('100%')
    })
    
       })
    
    it('&000065 - Verify  calculation functionality by adding more calories than the calorie limit (BVA)', ()=>{
       let meal = 'sandwitch';
       let calories = '2001'
       mealFeature.addMeal(meal, calories);
    //Assertions
    
    cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 1);
    
    cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equals(calories);
     })
    cy.get(mealFeature.calorieLimit).should('have.text', '2000');
    cy.get(mealFeature.remainingCaloriesCard).should('have.text', '-1');
    cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-danger');
    cy.get(mealFeature.gainLossCard).should('have.text', '1');
    cy.get(mealFeature.gainLossBg).should('have.class', 'bg-warning');
    cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equal('0')
    })
    cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equals('0')
    })
    cy.get(mealFeature.progressBar).should('have.class', 'bg-danger');
    cy.get(mealFeature.progressBar).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equal('100%')
    })
    
    })
    
    it('&000066 - Verify  calculation functionality by adding less calories than the calorie limit (BVA)', ()=>{
       let meal = 'sandwitch';
       let calories = '1999'
       mealFeature.addMeal(meal, calories);
    //Assertions
    
    cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 1);
    
    cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equals(calories);
     })
    cy.get(mealFeature.calorieLimit).should('have.text', '2000');
    cy.get(mealFeature.remainingCaloriesCard).should('have.text', '1');
    cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
    cy.get(mealFeature.gainLossCard).should('have.text', '-1');
    cy.get(mealFeature.gainLossBg).should('have.class', 'bg-success');
    cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equal('0')
    })
    cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equals('0')
    })
    cy.get(mealFeature.progressBar).should('have.class', 'bg-success');
    cy.get(mealFeature.progressBar).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equal('100%')
    })
    
    })
    
    it('&000067 - Verify  calculation functionality by adding 4 meal cards and 4 workout cards', ()=>{
       let numOfMeals = 4;
       let numberOfWorkouts = 4;
    
       for (let i = 0; i < numOfMeals; i++) { 
       mealFeature.addMeal('sandwich', '500');
     }
     for (let i = 0; i < numberOfWorkouts; i++) { 
       workoutComponent.addWorkout('gym', '500');
     }
    
    //Assertions
    cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 4);
    cy.get(workoutComponent.workoutWrapper).children('div').should('have.length', 4);
    
    cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equals('2000');
     })
    cy.get(mealFeature.calorieLimit).should('have.text', '2000');
    cy.get(mealFeature.remainingCaloriesCard).should('have.text', '2000');
    cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
    cy.get(mealFeature.gainLossCard).should('have.text', '-2000');
    cy.get(mealFeature.gainLossBg).should('have.class', 'bg-success');
    cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equal('2000')
    })
    cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equals('2000')
    })
    cy.get(mealFeature.progressBar).should('have.class', 'bg-success');
    cy.get(mealFeature.progressBar).then((text)=>{
       let text01 = text.text();
       expect(text01.trim()).to.equal('0%')
    })
    
       })
    
       it('&000068 - Verify  calculation functionality after deleting the last added meal card', ()=>{
          let numOfMeals = 4;
          let numberOfWorkouts = 4;
          let mealForRemoval = 3;
       
          for (let i = 0; i < numOfMeals; i++) { 
          mealFeature.addMeal('sandwich', '500');
        }
        for (let i = 0; i < numberOfWorkouts; i++) { 
          workoutComponent.addWorkout('gym', '500');
        }
       
        cy.get(mealFeature.mealCardWrapper).then((mealCards) => {
          cy.wrap(mealCards).then((mealArray)=>{
            mealFeature.removeSpecificMeals(mealForRemoval, mealArray);
          })
           
          });
    
      
       //Assertions
       cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 3);
       cy.get(workoutComponent.workoutWrapper).children('div').should('have.length', 4);
       
       cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
          let text01 = text.text();
          expect(text01.trim()).to.equals('1500');
        })
       cy.get(mealFeature.calorieLimit).should('have.text', '2000');
       cy.get(mealFeature.remainingCaloriesCard).should('have.text', '2500');
       cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
       cy.get(mealFeature.gainLossCard).should('have.text', '-2500');
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
    
          it('&000069 - Verify  calculation functionality after deleting the last added workout card', ()=>{
             let numOfMeals = 4;
             let numberOfWorkouts = 4;
             let workoutForRemoval = 3;
          
             for (let i = 0; i < numOfMeals; i++) { 
             mealFeature.addMeal('sandwich', '500');
           }
           for (let i = 0; i < numberOfWorkouts; i++) { 
             workoutComponent.addWorkout('gym', '500');
           }
          
           cy.get(workoutComponent.workoutWrapper).children('div').then((workoutCards) => {
             cy.wrap(workoutCards).then((workoutArray)=>{
               workoutComponent.removeSpecificWorkouts(workoutForRemoval, workoutArray);
             })
              
             });
       
         
          //Assertions
          cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 4);
          cy.get(workoutComponent.workoutWrapper).children('div').should('have.length', 3);
          
          cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
             let text01 = text.text();
             expect(text01.trim()).to.equals('2000');
           })
          cy.get(mealFeature.calorieLimit).should('have.text', '2000');
          cy.get(mealFeature.remainingCaloriesCard).should('have.text', '1500');
          cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
          cy.get(mealFeature.gainLossCard).should('have.text', '-1500');
          cy.get(mealFeature.gainLossBg).should('have.class', 'bg-success');
          cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
             let text01 = text.text();
             expect(text01.trim()).to.equal('1500')
          })
          
          cy.get(mealFeature.progressBar).should('have.class', 'bg-success');
          cy.get(mealFeature.progressBar).then((text)=>{
             let text01 = text.text();
             expect(text01.trim()).to.equal('25%')
          })
          
             })
    
       it('&000070 - Verify  calculation functionality after deleting all meals', ()=>{
             let numOfMeals = 4;
             let numberOfWorkouts = 4;
           
          
             for (let i = 0; i < numOfMeals; i++) { 
             mealFeature.addMeal('sandwich', '500');
           }
           for (let i = 0; i < numberOfWorkouts; i++) { 
             workoutComponent.addWorkout('gym', '500');
           }
          
           cy.get(mealFeature.mealCardWrapper).then((mealCards) => {
             cy.wrap(mealCards).then((mealArray)=>{
               mealFeature.removeAllMeals(mealArray);
             })
              
             });
       
         
          //Assertions
          cy.get(mealFeature.mealCardWrapper).should('not.exist');
          cy.get(workoutComponent.workoutWrapper).children('div').should('have.length', 4);
          
          cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
             let text01 = text.text();
             expect(text01.trim()).to.equals('0');
           })
          cy.get(mealFeature.calorieLimit).should('have.text', '2000');
          cy.get(mealFeature.remainingCaloriesCard).should('have.text', '4000');
          cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
          cy.get(mealFeature.gainLossCard).should('have.text', '-4000');
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
    
       it('&000071 - Verify  calculation functionality after deleting all workouts', ()=>{
                let numOfMeals = 4;
                let numberOfWorkouts = 4;
              
             
                for (let i = 0; i < numOfMeals; i++) { 
                mealFeature.addMeal('sandwich', '500');
              }
              for (let i = 0; i < numberOfWorkouts; i++) { 
                workoutComponent.addWorkout('gym', '500');
              }
             
              cy.get(workoutComponent.workoutWrapper).children('div').then((workoutCards) => {
                cy.wrap(workoutCards).then((workoutArray)=>{
                  workoutComponent.removeAllWorkouts(workoutArray);
                })
                 
                });
          
            
             //Assertions
             cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 4);
             cy.get(workoutComponent.workoutWrapper).should('not.be.visible');
             
             cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
                let text01 = text.text();
                expect(text01.trim()).to.equals('2000');
              })
             cy.get(mealFeature.calorieLimit).should('have.text', '2000');
             cy.get(mealFeature.remainingCaloriesCard).should('have.text', '0');
             cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
             cy.get(mealFeature.gainLossCard).should('have.text', '0');
             cy.get(mealFeature.gainLossBg).should('have.class', 'bg-success');
             cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
                let text01 = text.text();
                expect(text01.trim()).to.equal('0')
             })
             
             cy.get(mealFeature.progressBar).should('have.class', 'bg-success');
             cy.get(mealFeature.progressBar).then((text)=>{
                let text01 = text.text();
                expect(text01.trim()).to.equal('100%')
             })
             
                })
       
       it('&000072 - Verify  calculation functionality after adding the meal cards and lowering the limit to 1000', ()=>{
                   let numOfMeals = 4;
                  
                   for (let i = 0; i < numOfMeals; i++) { 
                   mealFeature.addMeal('sandwich', '500');
                 }
                 Limit.limitUpdate(1000)
    
                //Assertions
                cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 4);
                cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
                   let text01 = text.text();
                   expect(text01.trim()).to.equals('2000');
                 })
                cy.get(mealFeature.calorieLimit).should('have.text', '1000');
                cy.get(mealFeature.remainingCaloriesCard).should('have.text', '-1000');
                cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-danger');
                cy.get(mealFeature.gainLossCard).should('have.text', '1000');
                cy.get(mealFeature.gainLossBg).should('have.class', 'bg-warning');
                cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
                   let text01 = text.text();
                   expect(text01.trim()).to.equal('0')
                })
                cy.get(mealFeature.progressBar).should('have.class', 'bg-danger');
                cy.get(mealFeature.progressBar).then((text)=>{
                   let text01 = text.text();
                   expect(text01.trim()).to.equal('100%')
                })
                
                   })
    it('&000073 - Verify  calculation functionality after adding the meal cards and lowering the limit to 500', ()=>{
                   let numOfMeals = 4;
                  
                   for (let i = 0; i < numOfMeals; i++) { 
                   mealFeature.addMeal('sandwich', '500');
                 }
                 Limit.limitUpdate(500)
    
                //Assertions
                cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 4);
                cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
                   let text01 = text.text();
                   expect(text01.trim()).to.equals('2000');
                 })
                 cy.get(mealFeature.calorieLimit).should('have.text', '500');
                cy.get(mealFeature.remainingCaloriesCard).should('have.text', '-1500');
                cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-danger');
                cy.get(mealFeature.gainLossCard).should('have.text', '1500');
                cy.get(mealFeature.gainLossBg).should('have.class', 'bg-warning');
                cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
                   let text01 = text.text();
                   expect(text01.trim()).to.equal('0')
                })
                cy.get(mealFeature.progressBar).should('have.class', 'bg-danger');
                cy.get(mealFeature.progressBar).then((text)=>{
                   let text01 = text.text();
                   expect(text01.trim()).to.equal('100%')
                })
                
                   })
    it('&000074 - Verify  calculation functionality after adding the meal cards and lowering the limit to 1', ()=>{
                      let numOfMeals = 4;
                     
                      for (let i = 0; i < numOfMeals; i++) { 
                      mealFeature.addMeal('sandwich', '500');
                    }
                    Limit.limitUpdate(1)
       
                   //Assertions
                   cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 4);
                   cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
                      let text01 = text.text();
                      expect(text01.trim()).to.equals('2000');
                    })
                   cy.get(mealFeature.calorieLimit).should('have.text', '1');
                   cy.get(mealFeature.remainingCaloriesCard).should('have.text', '-1999');
                   cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-danger');
                   cy.get(mealFeature.gainLossCard).should('have.text', '1999');
                   cy.get(mealFeature.gainLossBg).should('have.class', 'bg-warning');
                   cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
                      let text01 = text.text();
                      expect(text01.trim()).to.equal('0')
                   })
                   cy.get(mealFeature.progressBar).should('have.class', 'bg-danger');
                   cy.get(mealFeature.progressBar).then((text)=>{
                      let text01 = text.text();
                      expect(text01.trim()).to.equal('100%')
                   })
                   
                      })
       it('&000075 - Verify  calculation functionality after adding the meal cards and lowering the limit to 0', ()=>{
                         let numOfMeals = 4;
                        
                         for (let i = 0; i < numOfMeals; i++) { 
                         mealFeature.addMeal('sandwich', '500');
                       }
    
                       Limit.limitUpdate(0);
                       Limit.confirmAlertMessage('Input must be a positive number!');
                    
    
                      //Assertions
                      cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 4);
                      cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
                         let text01 = text.text();
                         expect(text01.trim()).to.equals('2000');
                       })
                      cy.get(mealFeature.calorieLimit).should('have.text', '2000');
                      cy.get(mealFeature.remainingCaloriesCard).should('have.text', '0');
                      cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
                      cy.get(mealFeature.gainLossCard).should('have.text', '0');
                      cy.get(mealFeature.gainLossBg).should('have.class', 'bg-success');
                      cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
                         let text01 = text.text();
                         expect(text01.trim()).to.equal('0')
                      })
                      cy.get(mealFeature.progressBar).should('have.class', 'bg-success');
                      cy.get(mealFeature.progressBar).then((text)=>{
                         let text01 = text.text();
                         expect(text01.trim()).to.equal('100%')
                      })
                      
                         })
    
       it('&000076 - Verify  calculation functionality after adding the meal cards and lowering the limit to -1', ()=>{
                            let numOfMeals = 4;
                           
                            for (let i = 0; i < numOfMeals; i++) { 
                            mealFeature.addMeal('sandwich', '500');
                          }
       
                          Limit.limitUpdate(-1);
                          Limit.confirmAlertMessage('Input must be a positive number!');
                        
       
                         //Assertions
                         cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 4);
                         cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
                            let text01 = text.text();
                            expect(text01.trim()).to.equals('2000');
                          })
                         cy.get(mealFeature.calorieLimit).should('have.text', '2000');
                         cy.get(mealFeature.remainingCaloriesCard).should('have.text', '0');
                         cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
                         cy.get(mealFeature.gainLossCard).should('have.text', '0');
                         cy.get(mealFeature.gainLossBg).should('have.class', 'bg-success');
                         cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
                            let text01 = text.text();
                            expect(text01.trim()).to.equal('0')
                         })
                         cy.get(mealFeature.progressBar).should('have.class', 'bg-success');
                         cy.get(mealFeature.progressBar).then((text)=>{
                            let text01 = text.text();
                            expect(text01.trim()).to.equal('100%')
                         })
                         
                            })
    
       it('&000077 - Verify  calculation functionality after adding the meal cards and increasing the limit to 3000', ()=>{
                               let numOfMeals = 4;
                              
                               for (let i = 0; i < numOfMeals; i++) { 
                               mealFeature.addMeal('sandwich', '500');
                             }
          
                             Limit.limitUpdate(3000);
                           
          
                            //Assertions
                            cy.get(mealFeature.mealCardWrapper).children('div').should('have.length', 4);
                            cy.get(mealFeature.consumedCaloriesCard).then((text)=>{
                               let text01 = text.text();
                               expect(text01.trim()).to.equals('2000');
                             })
                            cy.get(mealFeature.calorieLimit).should('have.text', '3000');
                            cy.get(mealFeature.remainingCaloriesCard).should('have.text', '1000');
                            cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
                            cy.get(mealFeature.gainLossCard).should('have.text', '-1000');
                            cy.get(mealFeature.gainLossBg).should('have.class', 'bg-success');
                            cy.get(mealFeature.workoutBurnedCalories).then((text)=>{
                               let text01 = text.text();
                               expect(text01.trim()).to.equal('0')
                            })
                            cy.get(mealFeature.progressBar).should('have.class', 'bg-success');
                            cy.get(mealFeature.progressBar).then((text)=>{
                               let text01 = text.text();
                               expect(text01.trim()).to.equal('67%')
                            })
                            
                               })
       
       it('&000078 - Verify  calculation functionality after adding the workout cards and lowering the limit to 100', ()=>{
                                  let numOfWorkouts = 4;
                                 
                                  for (let i = 0; i < numOfWorkouts; i++) { 
                                  workoutComponent.addWorkout('gym', '500');
                                }
             
                                Limit.limitUpdate(100);
                              
             
                               //Assertions
                               cy.get(workoutComponent.workoutWrapper).children('div').should('have.length', 4);
                               cy.get(workoutComponent.consumedCaloriesCard).then((text)=>{
                                  let text01 = text.text();
                                  expect(text01.trim()).to.equals('0');
                                })
                               cy.get(mealFeature.calorieLimit).should('have.text', '100');
                               cy.get(mealFeature.remainingCaloriesCard).should('have.text', '2100');
                               cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
                               cy.get(mealFeature.gainLossCard).should('have.text', '-2100');
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
    
       it('&000079 - Verify  calculation functionality after adding the workout cards and lowering the limit to 0', ()=>{
                                     let numOfWorkouts = 4;
                                    
                                     for (let i = 0; i < numOfWorkouts; i++) { 
                                     workoutComponent.addWorkout('gym', '500');
                                   }
                
                                   Limit.limitUpdate(0);
                                   Limit.confirmAlertMessage('Input must be a positive number!');
                               
                
                                  //Assertions
                                  cy.get(workoutComponent.workoutWrapper).children('div').should('have.length', 4);
                                  cy.get(workoutComponent.consumedCaloriesCard).then((text)=>{
                                     let text01 = text.text();
                                     expect(text01.trim()).to.equals('0');
                                   })
                                  cy.get(mealFeature.calorieLimit).should('have.text', '2000');
                                  cy.get(mealFeature.remainingCaloriesCard).should('have.text', '4000');
                                  cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
                                  cy.get(mealFeature.gainLossCard).should('have.text', '-4000');
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
    
          it('&000080 - Verify  calculation functionality after adding the workout cards and lowering the limit to -1', ()=>{
                                        let numOfWorkouts = 4;
                                       
                                        for (let i = 0; i < numOfWorkouts; i++) { 
                                        workoutComponent.addWorkout('gym', '500');
                                      }
                   
                                      Limit.limitUpdate(-1);
                                      Limit.confirmAlertMessage('Input must be a positive number!');
                                   
                   
                                     //Assertions
                                     cy.get(workoutComponent.workoutWrapper).children('div').should('have.length', 4);
                                     cy.get(workoutComponent.consumedCaloriesCard).then((text)=>{
                                        let text01 = text.text();
                                        expect(text01.trim()).to.equals('0');
                                      })
                                     cy.get(mealFeature.calorieLimit).should('have.text', '2000');
                                     cy.get(mealFeature.remainingCaloriesCard).should('have.text', '4000');
                                     cy.get(mealFeature.remainingCaloriesBg).should('have.class', 'bg-success');
                                     cy.get(mealFeature.gainLossCard).should('have.text', '-4000');
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
       
    })
    