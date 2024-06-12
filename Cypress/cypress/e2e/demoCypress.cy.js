context('Demo Cypress', () => {
  describe('Cypress locators and basic commands', () => {

    it('get and click on an element', () => {
      cy.visit('')
      cy.get(':nth-child(4) > .row > .col-xs-12 > .home-list > :nth-child(1) > ul > :nth-child(1) > a').click()
      cy.get('#query-btn').click()
      // cy.get('.btn-primary').click()
    })
    it('input and select element by attribute instead of id or class', () => {
      cy.visit('/commands/querying')
      // cy.get('input[placeholder="Name"]').type('JPIsTheBest')
      // cy.get('input[type="text"]').first().type('JPIsTheBest')
      cy.get('input[type="text"]').eq(0).type('JPIsTheBest')
      cy.get('input[type="text"]').eq(1).type('JPIsTheBest@mailIntheWorld.com')
      cy.get('input[type="text"]').last().type('JPIsTheBestPassword')
    })
  
  it('contains and click on an element', () => {
    cy.visit('/commands/querying')
    // cy.get('.btn-primary').contains('Button').click()
    // cy.get('#query-btn').should('contain', 'Button').click()
    // cy.get('#query-btn').contains('Button').click()
    cy.contains('#query-btn', 'Button').should('have.id', 'query-btn').click() // should = assert
    })
  it('within', () => {
    cy.visit('/commands/querying')
    cy.get('ul.query-list').within(()=>{
      cy.get('li.first').contains('apples').should('be.visible')      
      cy.get('li.second').contains('oranges').should('be.visible')      
      cy.get('li.third').contains('bananas').should('be.visible')      
      cy.get('li.fourth').contains('more apples').should('be.visible')    
    })
    cy.contains('Save Form').click()  
    // cy.contains('Save Form', {timeout:10000}).click()  
    })
    
  })

  describe('Action Cypress', () => {
    
    it('Checkbox should be enables', () => {
      cy.visit('/commands/actions')
      // cy.wait(2000)
      cy.get('.well:has(.action-checkboxes)').within(() => {
        // cy.get('.checkbox>label>input').eq(1).should('be.visible').should('be.disabled')
        cy.get('input[type="checkbox"]').eq(1).should('be.visible').should('be.disabled')
      })
    })
    it('Check and Uncheck Action', () => {
      cy.visit('/commands/actions')
      // cy.wait(2000)
      cy.get('.action-multiple-checkboxes').within(() => {
        cy.get('input[type="checkbox"]').check(['checkbox1', 'checkbox2', 'checkbox3'])
        cy.get('input[type="checkbox"]').should('be.checked')
        cy.get('input[type="checkbox"]').uncheck(['checkbox1', 'checkbox2', 'checkbox3'])
        cy.get('input[type="checkbox"]').should('be.not.checked')
      })
    })

    it('Invoke, Trigger, Then and Expect', () => {
      cy.visit('/commands/actions')
      cy.get('input[class="trigger-input-range"]').invoke('val', '25').trigger('change')
      // cy.get('.trigger-input-range').get('input[type=range]').siblings('p').should('have.text', '25')
      // cy.get('input[class="trigger-input-range"]+p').should('have.text', '25')
      cy.get('input[class="trigger-input-range"]+p').invoke('text').then((valeurText)=>{
        cy.log(valeurText)
        expect(Number(valeurText)).to.eq(25)
        expect(valeurText).to.eq('25')
        expect(valeurText).to.eq(String(25))
      })
    })

    it('Length', () => {
      cy.visit('/commands/traversal')
      cy.get('.healthy-foods>li').its('length').should('eq', 12)     
      cy.get('.healthy-foods>li').should('have.length', 12)     
    })
    it('Get Values in Array', () => {
      let array = [];
      cy.visit('/commands/traversal')
      cy.get('.healthy-foods>li').its('length').then((numberOfElements)=>{
        for (var i = 0; i<numberOfElements; i++){
          cy.get('.healthy-foods>li').eq(i).invoke('text').then((textElement) => {
            array.push(textElement)
            console.log(array)
          })
        }
        cy.log('Mon array final :', array)        
        //forEeach praticing
        array.forEach((item)=>{
          cy.log(item)
        })
      })     
    })

    it('Variables', () =>{
      let array = ['bananes', 'pommes', 'fraises']; // const ne peut être changée une fois déclarée
      cy.log(array).then(()=>{

        array.push('framboises')

        cy.log(array)
      })

    })

    it.only('Var Env', () => {
      cypress.env('Status', 'Fail'); // La variable d'environnement peut être utilisée partout et même dans d'autres fichiers
    })
  })

  describe('Should Assertion', () => {
    it('Have Value and contain text', () => {
      cy.visit('/commands/actions')
      cy.get('.action-multiple-checkboxes').within(() => {
        cy.get('input[type="checkbox"]').eq(0).should('have.value', 'checkbox1')
        cy.get('label').eq(1).should('contain.text', 'Checkbox two has value "checkbox2"')
      })
    })
    it('Should Have ID, Attribute, Class', () => {
      cy.visit('/commands/traversal')
      cy.get('.healthy-foods>li').first()
      .should('have.id', 'fruits')
      .should('have.class', 'header')
    })
    it('Should Not Have', () => {
      cy.visit('/commands/traversal')
      cy.get('.healthy-foods>li').eq(1).should('have.text', 'apples')
      cy.get('.healthy-foods>li').eq(1).should('not.have.attr', 'id')
      cy.get('.healthy-foods>li').eq(1).should('not.have.attr', 'class')
      cy.get('.healthy-foods>li').eq(0).should('not.have.id', 'veggies')
      cy.get('.healthy-foods>li').eq(5).should('not.have.attr', 'id') 
      // Pour vérifier si l'élément n'a pas d'id (ne fonctionne pas avec not.have.id car ça prend un id non défini donc ça passera même si l'élément a un id)
    })
  })

})
 
context("Exercice Tp Validation sur Cypress", () => {
 
  before(() => {
    cy.fixture('url.json').then((data) => {
      cy.wrap(data.baseUrl).as('baseUrl');
    });
  });
 
// Test case 4
  describe("Cas de test 4", () => {
    it("Cas de test 4 - Login with standard and sort and verify", () => {
      // Access to Sauce Demo
      cy.visit("/");
 
      // Input standard user account information (username and password)
      cy.get('[data-test="username"]').should("be.visible").type("standard_user");
      cy.get('[data-test="password"]').should("be.visible").type("secret_sauce");
 
      // Click on Login button
      cy.get('[data-test="login-button"]').should("be.visible").click();
 
      // Verify login is successful
      cy.url().should("eq", `${Cypress.config().baseUrl}inventory.html`);
 
      // Fetch all prices and store them in arrays
      cy.get('[data-test="inventory-item-price"]').then($prices => {
        const pricesLowToHigh = [...$prices].map(el => parseFloat(el.innerText.replace("$", ""))).sort((a, b) => a - b);
        const pricesHighToLow = [...pricesLowToHigh].reverse();
 
        // Sort prices from High to Low
        cy.get('[data-test="product-sort-container"]').should("be.visible").select("hilo");
        cy.get('[data-test="product-sort-container"]').should("have.value", "hilo");
 
        // Verify prices sorted from High to Low
        cy.get('[data-test="inventory-item-price"]').each(($el, index) => {
          expect(parseFloat($el.text().replace("$", ""))).to.eq(pricesHighToLow[index]);
        });
 
        // Sort prices from Low to High
        cy.get('[data-test="product-sort-container"]').should("be.visible").select("lohi");
        cy.get('[data-test="product-sort-container"]').should("have.value", "lohi");
 
        // Verify prices sorted from Low to High
        cy.get('[data-test="inventory-item-price"]').each(($el, index) => {
          expect(parseFloat($el.text().replace("$", ""))).to.eq(pricesLowToHigh[index]);
        });
      });
    });
  });
 
});

