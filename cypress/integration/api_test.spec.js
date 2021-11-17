/// <reference types="cypress" />

let randomString = Math.random().toString(36).substr(2, 5)
describe('Library API', () => {
  context('POST /Library/Addbook.php', () => {
      it('should add a new book', () => {
          cy.request({
              method: 'POST',
              url: '/Library/Addbook.php',
              body: {
                "name":"Automation using Cypress",
                "isbn": randomString,
                "aisle":"345",
                "author":"Saudia Iway"
              }
          })
          .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.Msg).to.equal('successfully added');
            expect(response.body.ID).to.equal(randomString + 345);
          });
      });
  });
  context('GET /Library/GetBook.php?AuthorName=Saudia Iway', () => {
    it('should retrieve all books affiliated to the author', () => {
        cy.request({
            method: 'GET',
            url: '/Library/GetBook.php?AuthorName=Saudia Iway'
        })
        .then(response => {
          for (var x=0; x<=response.body.length; x++) {
            if (response.body[0]['isbn'] === randomString) {
              expect(response.status).to.equal(200);
              expect(response.body[0]['book_name']).to.equal('Automation using Cypress');
              expect(response.body[0]['isbn']).to.equal(randomString);
              expect(response.body[0]['aisle']).to.equal('345');
            }
          }
        });
    });
  });
});