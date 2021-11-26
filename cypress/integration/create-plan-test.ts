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
        cy.get('ion-searchbar').type(title)
        cy.get('ion-searchbar').trigger('search')
        cy.get('ion-card').then((card)=>{
            expect(card.length).to.equal(1)
        })
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