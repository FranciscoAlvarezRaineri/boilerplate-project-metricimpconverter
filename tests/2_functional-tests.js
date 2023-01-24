const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Valid input 10L", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "10L" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, "gal");
        done();
      });
  });
  test("Invalid input 32g", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "32g" })
      .end(function (err, res) {
        console.log(res.text);
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit");
        done();
      });
  });
  test("Invalid number 3/7.2/4kg", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kg" })
      .end(function (err, res) {
        console.log(res.text);
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number");
        done();
      });
  });
  test("Invalid number and unit 3/7.2/4kilomegagram", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kilomegagram" })
      .end(function (err, res) {
        console.log(res.text);
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });
  test("Valid input kg", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "kg" })
      .end(function (err, res) {
        console.log(res.body);
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        assert.approximately(res.body.returnNum, 2.20462, 0.1);
        assert.equal(res.body.returnUnit, "lbs");
        done();
      });
  });
});
