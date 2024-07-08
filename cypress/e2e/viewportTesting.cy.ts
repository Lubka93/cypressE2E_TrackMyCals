//Imports
require('@cypress/xpath')
import { forEach, round } from "cypress/types/lodash";
import {Limit} from "../components/limit";
import {mealFeature } from "../components/meal";
import { testDataObject } from "./model";
import {testDataMealValid } from "./model";
import {testDataLimitObject} from "./model";
import {workoutComponent } from "../components/workout"; 
import {testDataWorkoutValid} from "./model";
import {testDataObjectWorkout } from "./model";
import { MainPage } from "../components/main";
import { should } from "chai";
import { filter } from "cypress/types/bluebird";

//Viewport testing

describe('Test different viewports',()=>{
    const viewports:Cypress.ViewportPreset[] = ['ipad-2', 'iphone-5'];
    beforeEach(()=>{
        Limit.visit()
    })
    viewports.forEach((viewport)=>{
    
     it(`This is viewport for ${viewport}`, ()=>{
        cy.viewport(viewport);
    // Here can I add tests for viewport testing


     })
    })
})
