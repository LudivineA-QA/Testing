context ('Démo Real World App', () => {

    describe('Log Features', () => {

        it('Log In', () => {
            cy.visit('/signin')
            cy.get('#username').type('Heath93')
            cy.get('#password').type('s3cret')
            cy.get('.MuiButton-label').click()
            cy.get('[data-test="sidenav-username"]').should('have.text', '@Heath93')         

        })
        it('Log In Error', () => {
            cy.visit('/signin')
            cy.get('#username').type('Heath93')
            cy.get('#password').type('secret')
            cy.get('.MuiButton-label').click()  
            cy.get('[data-test="signin-error"]').should('be.visible')      

        })

        it('Log Out', () => {
            cy.visit('/signin')
            cy.get('#username').type('Heath93')
            cy.get('#password').type('s3cret')
            cy.get('.MuiButton-label').click()
            cy.get('[data-test="sidenav-signout"]').click()
            cy.url().should('eq', 'http://localhost:3000/signin')
        })


    })

    describe('Transaction Features', () => {

        it('Send Money Account A to B', () => {
            logIn('Heath93', 's3cret')
            cy.get('[data-test="nav-top-new-transaction"]').click()
            cy.get('[data-test^="user-list-item-"]').contains('Darrel Ortiz').click()
            cy.get('#amount').type('54')
            cy.get('#transaction-create-description-input').type('test everyone')
            cy.get('.MuiButton-label').contains('Pay').click()
            cy.get('.MuiBox-root-67 > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root').should('contain.text', 'Paid')           
        })

        it('Transaction Verification Account A in Mine List', () => {
            logIn('Heath93', 's3cret')
            cy.get('[data-test="nav-personal-tab"] > .MuiTab-wrapper').contains('Mine').click()
            cy.get('.ReactVirtualized__Grid__innerScrollContainer').first().should('contain.text', 'Ted Parisian paid Darrel Ortiz')        
        })
        it('Transaction Verification Account B', () => {
            logIn('Dina20', 's3cret')
            cy.get('[data-test="nav-personal-tab"] > .MuiTab-wrapper').contains('Mine').click()
            cy.get('.ReactVirtualized__Grid__innerScrollContainer').first().should('contain.text', 'Ted Parisian paid Darrel Ortiz')        
        })

        it('Account C can see Transaction A to B in Everyone List', () => {
            logIn('Arvilla_Hegmann', 's3cret')
            cy.get('.MuiTab-wrapper').contains('Everyone').click()
            cy.get('.ReactVirtualized__Grid__innerScrollContainer').first().should('contain.text', 'Ted Parisian paid Darrel Ortiz')
        })

        it('Account without friends should have Friends List empty', () => {
            logIn('Titato', 's3cret')
            cy.get('.MuiTab-wrapper').contains('Friends').click()
            cy.get('[data-test="empty-list-header"] > .MuiTypography-root').should('contain.text', 'No Transactions')
        })

        it('Request paiement', () => {
            logIn('Heath93', 's3cret')
            cy.get('[data-test="nav-top-new-transaction"]').click()
            cy.get('[data-test^="user-list-item-"]').contains('Darrel Ortiz').click()
            cy.get('#amount').type('564')
            cy.get('#transaction-create-description-input').type('give my money back !')
            cy.get('[data-test="transaction-create-submit-request"]').click()
            cy.get('.MuiBox-root-67 > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root').should('contain.text', 'Requested')
        })

        it('Pay amount requested', () => {
            logIn('Dina20', 's3cret')
            cy.get('[data-test="nav-personal-tab"] > .MuiTab-wrapper').contains('Mine').click()
            cy.get('div.MuiGrid-container p.MuiTypography-body1').eq(0).click({force:true})
            cy.get('.MuiButton-label').contains('Accept Request').click()
            cy.get('[data-test="sidenav-home"]').click()
            cy.get('[data-test="nav-personal-tab"] > .MuiTab-wrapper').contains('Mine').click()
            cy.get('.ReactVirtualized__Grid__innerScrollContainer').first().should('contain.text', 'charged')
        })     


    })

    describe('Notification Features', () => {

        it('notifications are operational', () => {
            logIn('Heath93', 's3cret')
            cy.get('[data-test="nav-top-notifications-link"]').should('be.visible')
            // cy.wait(2000)
            cy.get('span.MuiBadge-badge').should('be.visible').invoke('text').then((baseNotificationValue) => {
                cy.log(baseNotificationValue)
                cy.get('[data-test="sidenav-notifications"]').click()
                cy.get('button.MuiButtonBase-root').eq(1).click({force:true})
                cy.get('[data-test="sidenav-home"]').click()
                cy.get('span.MuiBadge-badge').should('be.visible').invoke('text').then((newNotificationValue) => {
                    cy.log(newNotificationValue)
                    expect(baseNotificationValue).to.not.eq(newNotificationValue)
                })
            })
        })
        
        it('Dismiss 1 Notification', () => {
            logIn('Arvilla_Hegmann', 's3cret')
            cy.get('[data-test="sidenav-notifications"]').click()
            cy.get('button.MuiButtonBase-root').eq(1).click({force:true})
        })

        // it('Dismiss all notification', () => {
        //     logIn('Dina20', 's3cret')
        //     cy.get('[data-test="sidenav-notifications"]').click()
        // })
        // à faire
    })

    describe('Commentary', () => {
        it('Like and Comments', () => {
            logIn('Arvilla_Hegmann', 's3cret')
            cy.get('[data-test="nav-personal-tab"] > .MuiTab-wrapper').contains('Mine').click()
            cy.get('div.MuiGrid-container p.MuiTypography-body1').eq(0).click({force:true})
            cy.get('[data-test^="transaction-like-button-"]').click()
            cy.get('[id^="transaction-comment-input-"]').type('test comment').type('{enter}')
        })
    })

    describe('User Info and Bank Account', () => {
        it('Edit User Info', () => {
            let newName = 'Prosaccoco'
            logIn('Reyes.Osinski', 's3cret')
            cy.get('[data-test="sidenav-user-settings"]').click()
            cy.get('.MuiPaper-root > .MuiTypography-root').should('contain.text', 'User Settings')
            cy.get('#user-settings-lastName-input').invoke('val').then(oldName => {
                cy.log(oldName)
                cy.get('#user-settings-lastName-input').clear()
                cy.get('#user-settings-lastName-input').type(newName)
                expect(oldName).to.not.eq(newName)
                cy.log(newName)
            })
            cy.get('[data-test="user-settings-submit"]').click()
            cy.get('#user-settings-lastName-input').should('have.value', newName)            
        })

        it('Balance Info', () => {
            logIn('Heath93', 's3cret')
            cy.get('[data-test="sidenav-user-balance"]').invoke('text').then((oldBalance) => {
                let oldBalance2 = oldBalance.replace('$','')
                let oldBalance3 = oldBalance2.replace(',','')
                cy.log(Number(oldBalance3))
                payment('Kristian Bradtke', '50', 'test balance info')
                cy.get('[data-test="sidenav-home"]').click()
                cy.get('[data-test="sidenav-user-balance"]').invoke('text').then((newBalance) => {
                    let newBalance2 = newBalance.replace('$','')
                    let newBalance3 = newBalance2.replace(',','')
                    expect(newBalance3).to.not.eq(oldBalance3)
                    expect(Number(newBalance3)).to.eq(Number(oldBalance3-50))
                })
            })
        })

        it('Create Bank Account', () => {
            logIn('Heath93', 's3cret')
            cy.get('[data-test="sidenav-bankaccounts"]').click()
            cy.get('[data-test="bankaccount-list"]>li').its('length').then((numberOfElement) =>{
                cy.log(numberOfElement)
                cy.get('[data-test="bankaccount-new"]').scrollIntoView().should('be.visible').click({force:true})
                cy.get('#bankaccount-bankName-input').type('Waters, King and O Reilly Bank')
                cy.get('#bankaccount-routingNumber-input').type('333444555')
                cy.get('#bankaccount-accountNumber-input').type('012345678')
                cy.get('[data-test="bankaccount-submit"]').click()
                cy.get('[data-test="bankaccount-list"]>li').its('length').then((newNumberOfElement) => {
                    cy.get('[data-test="bankaccount-list"]>li').should('have.length', newNumberOfElement)
                })
            })
        })

        it('Delete Bank Account', () => {
            logIn('Heath93', 's3cret')
            cy.get('[data-test="sidenav-bankaccounts"]').click()
            cy.get('[data-test="bankaccount-delete"]').eq(0).should('be.visible').click()
            cy.get('[data-test^="bankaccount-list-item-"] > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root').should('contain.text', 'Deleted')
        })

        
    })






})



// ----- Functions ------ //

function logIn(username, pwd){
    cy.visit('/signin')
            cy.get('#username').type(username)
            cy.get('#password').type(pwd)
            cy.get('.MuiButton-label').click()
}

function payment(receiverName, amount, comment){
    cy.get('[data-test="nav-top-new-transaction"]').click()
    cy.get('[data-test^="user-list-item-"]').contains(receiverName).click()
    cy.get('#amount').type(amount)
    cy.get('#transaction-create-description-input').type(comment)
    cy.get('.MuiButton-label').contains('Pay').click()
}