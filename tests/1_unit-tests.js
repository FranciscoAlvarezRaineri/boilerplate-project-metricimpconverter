const chai = require("chai");
const { suite } = require("mocha");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Numbers", function () {
    test("read whole number", function (done) {
      assert.equal(convertHandler.getNum("32L"), 32);
      done();
    });
    test("read decimal number", function (done) {
      assert.equal(convertHandler.getNum("32.5L"), 32.5);
      done();
    });
    test("read fractional number", function (done) {
      assert.equal(convertHandler.getNum("1/4L"), eval(1 / 4));
      done();
    });
    test("read decimal fractional number", function (done) {
      assert.equal(convertHandler.getNum("1.5/4L"), eval(1.5 / 4));
      done();
    });
    test("error on nan", function (done) {
      assert.equal(convertHandler.getNum("1/4/4L"), "invalid number");
      done();
    });
    test("one on null", function (done) {
      assert.equal(convertHandler.getNum("lbs"), "1");
      done();
    });
  });
  suite("Units", function () {
    test("get units", function (done) {
      assert.equal(convertHandler.getUnit("10L"), "L");
      assert.equal(convertHandler.getUnit("10gal"), "gal");
      assert.equal(convertHandler.getUnit("10mi"), "mi");
      assert.equal(convertHandler.getUnit("10km"), "km");
      assert.equal(convertHandler.getUnit("10lbs"), "lbs");
      assert.equal(convertHandler.getUnit("10kg"), "kg");
      done();
    });
    test("error on invalid nit", function (done) {
      assert.equal(convertHandler.getUnit("10Lit"), "invalid unit");
      assert.equal(convertHandler.getUnit("10gals"), "invalid unit");
      assert.equal(convertHandler.getUnit("10min"), "invalid unit");
      assert.equal(convertHandler.getUnit("10kom"), "invalid unit");
      assert.equal(convertHandler.getUnit("10pounds"), "invalid unit");
      assert.equal(convertHandler.getUnit("10k"), "invalid unit");
      done();
    });
    test("return unit", function (done) {
      assert.equal(convertHandler.getReturnUnit("L"), "gal");
      assert.equal(convertHandler.getReturnUnit("gal"), "L");
      assert.equal(convertHandler.getReturnUnit("mi"), "km");
      assert.equal(convertHandler.getReturnUnit("km"), "mi");
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
      assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
      done();
    });
    test("spelled out unit", function (done) {
      assert.equal(convertHandler.spellOutUnit("l"), "liters");
      assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
      assert.equal(convertHandler.spellOutUnit("mi"), "miles");
      assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
      assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
      assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
      done();
    });
  });
  suite("Convertions", function (done) {
    test("gal to L", function (done) {
      assert.equal(convertHandler.convert(10, "gal"), "37.85410");
      done();
    });
    test("L to gal", function (done) {
      assert.equal(convertHandler.convert(10, "L"), "2.64172");
      done();
    });
    test("mi to km", function (done) {
      assert.equal(convertHandler.convert(10, "mi"), "16.0934");
      done();
    });
    test("km to mi", function (done) {
      assert.equal(convertHandler.convert(10, "km"), "6.21373");
      done();
    });
    test("lbs to kg", function (done) {
      assert.equal(convertHandler.convert(10, "lbs"), "4.53592");
      done();
    });
    test("kg to lbs", function (done) {
      assert.equal(convertHandler.convert(10, "kg"), "22.04624");
      done();
    });
  });
});
