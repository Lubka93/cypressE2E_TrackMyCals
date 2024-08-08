import { MainPage } from "./main";



class MealComponent extends MainPage {
    openMealButton = '#open-meal-button';
    mealInput = '#meal-name';
    mealCaloriesInput = '#calorie-number';
    setMealButton = '#add-meal-button';
    mealModal = '#modal01';
    mealCardName = '#meal-wrapper  p';
    mealCardCaloriesNumber = '#meal-wrapper  div div';
    filterInput = '#filter-input';
  

    addMeal(meal:string, calories:string) {

        cy.get(this.openMealButton).click();

        if (meal.length === 0 && calories.length === 0) {
            cy.get(this.setMealButton).click();
            cy.reload();
        }
        if (meal.length === 0 && calories.length !== 0 ) {
        cy.get(this.mealCaloriesInput).type(calories)
        cy.get(this.setMealButton).click();
        cy.reload();
        } 
        else if (calories.length === 0 && meal.length !== 0) {
            cy.get(this.mealInput).type(meal);
            cy.get(this.setMealButton).click();
            cy.reload();
        }
       
        else if (calories.length !== 0 && meal.length !== 0) {
            cy.get(this.mealInput).type(meal);
            cy.get(this.mealCaloriesInput).type(calories)
            cy.get(this.setMealButton).click();
        }}


    removeSpecificMeals(index:number, mealcards: JQuery<HTMLElement>) {
        mealcards.each((i, mealCard) => {
            if( i===index) { 
            cy.wrap(mealCard).find('#item-close-button').click();
       }
        });
    }

    removeAllMeals(mealcards: JQuery<HTMLElement>) {
        mealcards.each((index, mealCard) => {
            cy.wrap(mealCard).find('#item-close-button').click();
        });
    }

    filterMealCards(mealName:string) {
        cy.get(this.filterInput).type(mealName)
    }

    clearFilterInput():void {
        cy.get(this.filterInput).clear();
    }

}

export const mealFeature = new MealComponent();