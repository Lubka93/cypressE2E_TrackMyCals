export interface TestDataLimit {
  limitTestDataValid: string[];
  limitTestDataInvalid: string[];
}

export interface testDataLimitObject {
    filterMealItems: string[];
    filterWorkoutItems: string[];
}

export interface testDataLimitObject {
    limitTestDataValid: string[];
    limitTestDataInvalid: string[];
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
        mealValidTestData: testDataObject[];
        mealInvalidTestData: testDataObject[];
        mealRemoveValidTestData: testDataObject[];
        mealFilterTestData: testDataObject[];
}

export interface testDataWorkoutValid {
    workoutValidTestData: testDataObjectWorkout[];
    workoutInvalidTestData: testDataObjectWorkout[];
    workoutRemoveValidTestData: testDataObjectWorkout[];
    workoutFilterValidTestData:testDataObjectWorkout[];
}