import { MainPage } from "./main";

class Workout extends MainPage {
    openWorkoutButton = '#workout-name';
    workoutInput = '#workout-input';
    workoutCaloriesInput = '#burned-cals-input';
    setWorkoutButton = '#add-workout-button';
    workoutModal = '#modal02';
    workoutCardName = '#workout-wrapper  p';
    wokroutCardCaloriesNumber = '#workout-wrapper  div div';
    workoutWrapper = '#workout-wrapper';
    workoutFilterInput = '#filter-workout-input';

    addWorkout(meal:string, calories:string) {
       

        cy.get(this.openWorkoutButton).click();

        if (meal.length === 0 && calories.length === 0) {
            cy.get(this.setWorkoutButton).click();
            cy.reload();
        }
        if (meal.length === 0 && calories.length !== 0 ) {
        cy.get(this.workoutCaloriesInput).type(calories)
        cy.get(this.setWorkoutButton).click();
        cy.reload();
        } 
        else if (calories.length === 0 && meal.length !== 0) {
            cy.get(this.workoutInput).type(meal);
            cy.get(this.setWorkoutButton).click();
            cy.reload();
        }
       
        else if (calories.length !== 0 && meal.length !== 0) {
            cy.get(this.workoutInput).type(meal);
            cy.get(this.workoutCaloriesInput).type(calories)
            cy.get(this.setWorkoutButton).click();
           // cy.reload();
        }
 
    }

    removeSpecificWorkouts(index:number, workoutcards: JQuery<HTMLElement>) {
        workoutcards.each((i, workoutCard) => {
            if( i===index) { 
            cy.wrap(workoutCard).find('#item-close-button').click();
       }
        });
    }

    removeAllWorkouts(workoutcards: JQuery<HTMLElement>) {
        workoutcards.each((i, workoutCard) => {
          
            cy.wrap(workoutCard).find('#item-close-button').click();
       
        });
    }

    filterWorkoutCards(workoutName:string) {
        cy.get(workoutComponent.workoutFilterInput).type(workoutName)
    }

    clearWorkoutFilterInput():void {
        cy.get(workoutComponent.workoutFilterInput).clear();
    }
}

export const workoutComponent = new Workout();