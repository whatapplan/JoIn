describe('Testing search page', () => {
  
  before(()=>{
    cy.visit('/')
    cy.contains('edu@gmail.com').click();
    cy.visit('/home/search-plan')
  })
  beforeEach(()=>{
  })
  // it('shows 11 results (all plans in database)', () => {
  //   cy.get('ion-card').should('have.length',13);
  // })
  it('search bar works', () => {
    let input = 'prueba'
    cy.wait(2000)
    cy.get('ion-searchbar').type(input)
    cy.get('ion-searchbar').trigger('search')
    cy.get('ion-card-title').then((eachCard)=>{
      let arr = eachCard.toArray()
      arr.forEach((ele)=>{
        console.log(ele.textContent)
        expect(ele.textContent.toLowerCase()).to.includes(input)
      })
    }).then(()=>{

      cy.get('ion-searchbar').clear()
      input='ir'
      cy.get('ion-searchbar').type(input)
      cy.get('ion-searchbar').trigger('search')
      cy.get('ion-card-title').then((eachCard)=>{
        let arr = eachCard.toArray()
        arr.forEach((ele)=>{
          console.log(ele.textContent)
          expect(ele.textContent.toLowerCase()).to.includes(input)
        })
      })
      cy.get('ion-searchbar').clear()

    })
  })



  // faltaria añadir lo del dia y la hora

  it('filters works', ()=>{
    let tagCat = 'Social'
    let tag = 'Cervezas'
    let day = '23-11-2021'
    let time = 'Tarde'
    cy.get('[name=options]').click()
    //first porque segment - segment button
    // cy.get(`[value=${tagCat}]`).first().click()
    cy.get('.t-tags').then((t)=>{
      console.log(t)
      let a =t.toArray()
      a.forEach((e)=>{
        console.log(e.innerText)
        if(e.innerText.includes(tag)){
          cy.wrap(e).first().click().then(()=>{
            cy.contains('Aceptar').click();
            cy.wait(1000)
          })
        }
      })      
    })

    
    cy.get('ion-card').then((e)=>{
      var numCards = e.length
      cy.get('ion-card ion-chip').then((el)=>{
        let aar = el.filter((i,val)=>{    
          return val.innerText.includes(tag)
        })
        let numChips = aar.length
        expect(numCards).equal(numChips,'in each card there is one tag that matches the filter')
      })
    })
    cy.get('[name=close-circle]').click()
    cy.log('filter removed')
    cy.get('[name=options]').click()
    cy.get('[aria-label=Todos]').click()
    cy.wait(1000)
    cy.get('.elige').last().click() 
    cy.wait(1000) 
    cy.contains('Done').click()
    cy.contains('Aceptar').click();
    cy.wait(1000)
    cy.get('ion-card').then((e)=>{
      var numCards = e.length
      cy.get('.test_fecha').then((el)=>{
        let aar = el.filter((i,val)=>{
          let today = new Date()    
          let date = new Date(val.innerText)    
          today.setHours(0,0,0,0)
          date.setHours(0,0,0,0)
          return +today==+date
        })
        let numChips = aar.length
        expect(numCards).equal(numChips,'in each card there is one tag that matches the filter')
      })
    })
    cy.get('[name=options]').click()
    // cy.contains('Cancel').click()
    cy.get('.button-clear').first().click()
    cy.log('filter removed with trash button in filters') 
    cy.get('[value=toeldia]').first().click()
    cy.get('.test_noche').last().click()
    cy.contains('Aceptar').click();
    cy.wait(1000)
    cy.get('ion-card').then((e)=>{
      var numCards = e.length
      cy.get('.test_fecha').then((el)=>{
        let s_time_first = new Date();
        let s_time_last = new Date();
        s_time_first.setHours(21,0,0)
        s_time_last.setHours(6,0,0)
        s_time_last.setDate(s_time_last.getDate()+1)
        let aar = el.filter((i,val)=>{
          let dplan = new Date(val.innerText)
          let hh = dplan.getHours()
          let mm = dplan.getMinutes()
          let ftime = new Date()
          ftime.setHours(hh,mm,0)
          return +ftime >= +s_time_first && +ftime <= +s_time_last
        })
        let numChips = aar.length
        expect(numCards).equal(numChips,'in each card there is one tag that matches the filter')
      })
    })
  })

  it('show plan detail works!!',()=>{
    cy.get('ion-card-title').first().then((first)=>{
      let title = first.text().toLowerCase()
      console.log('title',title)
      cy.log(`plan selected : ${title}`)
      cy.get('ion-card').first().click()
      cy.get('.title_test').then((el)=>{
        expect(el.text().toLowerCase()).to.includes(title,'shows de plan selected')
      })
    })

  })

})
