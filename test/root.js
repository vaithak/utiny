var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Testing routes', function(){
      it('it should return 200 status', function(){
        chai.request(app.server)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
            });
      });

      it('get on anything else should return 404 status', function(){
        chai.request(app.server)
            .get('/hello')
            .end(function(err, res) {
                res.should.have.status(404);
            });
      });

      it('get on /encode should return 404 status', function(){
        chai.request(app.server)
            .get('/encode')
            .end(function(err, res) {
                res.should.have.status(404);
            });
      });
});
