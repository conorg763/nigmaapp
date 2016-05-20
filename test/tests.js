var assert = require('assert');
var request = require('supertest');

describe('Sample unit test', function() {
    var server;
    beforeEach(function () {
        server = require('../server');
    })

    it('should return the projects data if project found',function(done) {
        request(server)
            .get('http://localhost:3000/projects')
            .expect(200)
            .end(function (err,response,body) {
                json = JSON.parse.body;
                assert.equal(response.statusCode,200)
                assert.equal('json._id','56ae32fd12fd49dee04a75f6');
                done();

            })
    })

    it('should respond with an html file when root is requested',function(done) {
        request(server)
            .get('/')
            .expec(200)
            .end(function (err,response) {
                assert.equal(response.header['content-type'],'text/html; charset=UTF-8');
                done();
            });
    })



    //function add(x,y) {
    //    return x+y;
    //}
    //
    //it('should return 5',function () {
    //    assert.equal(add(2,3),6);
    //})
})