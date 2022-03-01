describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'cypress user',
      username: 'cyUser',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login').click()
    cy.get('h2').contains('Login')
    cy.contains('Username')
    cy.contains('Password')
    cy.get('input').then(inputs => {
      expect(inputs.length).to.equal(2)
    })

    cy.get('button').contains('Login')
    cy.get('button').contains('Cancel')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('cyUser')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('.message').contains('Welcome cypress user!')
      cy.get('html').should('contain', 'cypress user is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('cyUser')
      cy.get('#password').type('sala')
      cy.get('#login-button').click()

      cy.get('.message').contains('Wrong username or password')
      cy.get('html').should('not.contain', 'Welcome cypress user!')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cyUser', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Cypress blog')
      cy.get('#author').type('Anna')
      cy.get('#url').type('www.post.com')
      cy.get('input').contains('Create new').click()
      cy.contains('A new blog, Cypress blog by Anna was added!')
      cy.reload()
      cy.get('div').contains('Anna:')
      cy.get('div').contains('Cypress blog')
    })


    describe('and a blog exists', function () {
      beforeEach(function () {

        cy.createBlog({
          title: 'another blog cypress',
          author: 'Pekka',
          url: 'www.pekka.com'
        })
      })
      it('A blog can be liked', function () {
        const startLikes = 0

        cy.contains('View').click()
        cy.get('.likes').contains(startLikes)
        cy.contains('Like').click()
        cy.reload()
        cy.contains('View').click()
        cy.get('.likes').contains(startLikes + 1)
      })
    })
  })
})