export interface testDataLimit {
string:[];
}


export interface testDataLimitObject {
    filterMealsItems: string;
    filterWorkoutItems: string;
}

export interface testDataLimitObject {
    limitTestDataValid: string;
    limitTestDataInvalid: string;
}

export interface testDataObject {
    meal: string;
    calories: string;
}

export interface testDataObjectWorkout {
    workout: string;
    calories: string;
}

export interface testDataMealValid {
        mealValidTestData: string;
        mealInvalidTestData: string;
        mealRemoveValidTestData: string;
        mealFilterTestData: string;
        filterItems:string;
}

export interface testDataWorkoutValid {
    workoutValidTestData: string;
    workoutInvalidTestData: string;
    workoutRemoveValidTestData: string;
    workoutFilterValidTestData:string;
}