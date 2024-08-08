

class MainPage {
   static resetButton(resetButton: any) {
      throw new Error("Method not implemented.");
   }
   calorieLimitInputCard = '#calorie-limit-show';
   gainLossCard = '#gain-loss > :first-child';
   gainLossBg = '#bg-gain-loss';
   remainingCaloriesCard = '#rem';
   mealCardWrapper = '#meal-wrapper > div';
   mealWrapper = '#meal-wrapper';
   consumedCaloriesCard = '#consumed-cals';
   remainingCaloriesBg = '#bg-remaining';
   progressBar = '.progress div';
   workoutBurnedCalories = '#burned-cals';
   calorieLimit = '#limit';
   resetButton = '#nav > ul > li:nth-child(3)';
   resetModal04 = '#modal04';
   resetText = '#modal04 >div > div >div>div > p';
   confirmResetButton = '#reset-button';
   resetModalCloseButton = '#modal04 >div > div >div>div > button';

   visit():void {
    cy.visit(`https://trackmycals.netlify.app/?meal-name=&calorie-number=#`)
   } 

   clearAllData():void {
      cy.clearAllLocalStorage();
      cy.clearAllCookies();
      cy.reload();
   }
}

export  {MainPage};