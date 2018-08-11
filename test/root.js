var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Test /', function(){
      it('it should return 200 status', function(){

        chai.request(app.server)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
            });
      });
});