import { MainPage } from "./main";

class LimitComponent extends MainPage {
     limitInput = '#limit-input';
     setLimitButton = '#set-button';
     openLimitModalButton = '.navbar-nav >  :first-child';
        
limitUpdate(input:any) {
    if (input === "") {
        cy.clearAllLocalStorage();
        cy.clearAllCookies();
        cy.get(this.openLimitModalButton).click();
        cy.get(this.setLimitButton).click();
        
    
        }
    else if(input !== "") { 
   // cy.clearAllLocalStorage();
    cy.clearAllCookies();
    cy.get(this.openLimitModalButton).click();
    cy.get(this.limitInput).type(input);
    cy.get(this.setLimitButton).click()
     }
    }


confirmAlertMessage(_message: string) {
    cy.on('window:alert', (message)=>{ 
        expect (message).to.be.equal(_message)
       // return true
     })
}
}

export const Limit = new LimitComponent();  