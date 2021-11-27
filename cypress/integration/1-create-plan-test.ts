describe('CREATING A PLAN', () => {
    let date = new Date()
    let title= `test ${date.toUTCString()}`
    before(()=>{
      cy.visit('/')
      cy.contains('edu@gmail.com').click();
      cy.get('#tab-button-create-plan').click();
    })  
    after(()=>{
        cy.visit('/home/search-plan')
        cy.contains('edu@gmail.com').click();
        cy.get('ion-searchbar').type(title)
        cy.get('ion-searchbar').trigger('search')
        cy.get('ion-card').then((card)=>{
            expect(card.length).to.equal(1)
        })
    })
    it('should show porfavor rellene todos los campos toast',()=>{
        // click submit button 
        cy.get('[type=submit]').click()

        // shows porfavor rellena todos los campos
        cy.get('#ion-overlay-4').should('exist','if overalys exists, toast is showing')
    })

    it('should remove tag selection',()=>{
        // select tag 
        cy.get('.test_b').click()

        // selecting clubbing
        cy.get('ion-item').contains('Clubbing').click()

        // removing clubbing
        cy.get('ion-item').contains('Clubbing').click()

        // selecting jamming
        cy.get('ion-item').contains('Jam Session').click()

        // save tags
        cy.get('[aria-label=close]').click()

        // tag selected succesfully
        cy.get('.chip-t').contains('Jam Session').should('exist')

        // tag removed succesfully
        cy.get('.chip-t').contains('Jam Session').get('[name=close-circle]').click()
        cy.get('.chip-t').should('not.exist')
    })

    it('should add a max participants number',()=>{
        cy.get('ion-toggle').click()

        cy.get('.minPeople > .native-input').should('have.value',2)

        cy.get('.maxPeople > .native-input').should('have.value',2)

        //add three more participants
        cy.get('.opacity-100').find('[name=add-outline]').click()
        cy.get('.opacity-100').find('[name=add-outline]').click()
        cy.get('.opacity-100').find('[name=add-outline]').click()

        //remove one participant
        cy.get('.opacity-100').find('[name=remove-outline]').click()

        // should have max 4 participants 
        cy.get('.maxPeople > .native-input').should('have.value',4)

        //adding two then removing one in min participants
        cy.get('.min').find('[name=add-outline]').click()
        cy.get('.min').find('[name=add-outline]').click()
        cy.get('.min').find('[name=remove-outline]').click()
        cy.get('.minPeople > .native-input').should('have.value',3)
    })
    it('should create a plan',()=>{
        let place = 'blasco ibañez valencia'
        let description = 'plan de testeo en marcha'
        cy.get('[formControlName=title]').type(title)
        cy.get('ion-searchbar').type(place)
        cy.wait(5000)
        cy.get('.test').first().click()
        cy.get('[formControlName=description]').type(description)
        cy.get('[formControlName=when]').click()
        cy.contains('Done').click()
        cy.fixture('prueba.jpg').then((file)=>{
            cy.get('input[type="file"]').attachFile({
                fileContent: file.toString(),
                fileName: 'prueba.jpg',
                mimeType: 'image/jpg'
            });
        })
        cy.get('.test_b').click()
        cy.contains('Jam Session').click()
        cy.get('[aria-label=close]').click()
        cy.get('[type=submit]').click()
        cy.wait(10000)
    })

})