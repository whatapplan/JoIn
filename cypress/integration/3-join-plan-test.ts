describe('Joining a plan & check is succesfully added to my accepted plans',()=>{
    let title = '';
    before(()=>{
        cy.visit('/')
        // log in with different user
        cy.contains('testeo@gmail.com').click();
        cy.get('#tab-button-search-plan').click();
        
    })
    it('join a plan',()=>{
        // select the plan we just created
        cy.get('ion-card').first().click()

        // view plan detail

        // save plan title for future check
        cy.get('.title_test').then((el)=>{
            title = el.text().toLowerCase();
        })

        // click join button
        cy.get('.join').click()


        
        // shows 'te has unido al plan' message
        cy.get('#ion-overlay-5').should('exist','if overalys exists, toast is showing')
        

        // go to my plans
        cy.visit('/home/my-plans')
        // cy.get('#tab-button-my-plans').click();
        
        cy.wait(8000)

        // check if title of plan is the plan we joined
        cy.get('.test_tit').first().then((val)=>{
            expect(title).to.includes(val.text().toLowerCase().trim())
        })

        // view plan detail from myplans (full coverage)
        cy.get('.test_tit').first().click()

        cy.wait(3000)

        // go back button
        cy.get('.show-back-button').click()
        

    })

    it('go to my chats and there is no plan we joined',()=>{
        // change user with no plans joined
        cy.visit('home/my-plans')

        // log-out
        // cy.contains('Cerrar').click()

        // select user with no plans joined
        cy.contains('oscar@gmail.com').click()

        // go to my plans
        // cy.get('#tab-button-my-plans').click();

        // go to my chats
        cy.get('[name=chatbubble-ellipses]').click()

        // we can't go to my chats if there is no plans you joined
        cy.get('.alert-head').should('exist','shows alert')
        
        // close alert
        cy.get('.alert-button').click()

        // alert should be closed
        cy.get('.alert-head').should('not.exist','alert is closed')

    })
})