function ConvertHandler() {
  this.getNum = function (input) {
    let result = input.match(/[.\d\/]+/g) || ["1"];
    let nums = result[0].split("/");
    if (nums.length > 2) {
      return "invalid number";
    }
    let num1 = nums[0];
    let num2 = nums[1] || "1";
    if (isNaN(num1) || isNaN(num2)) {
      return "invalid number";
    }
    result = parseFloat(num1) / parseFloat(num2);
    return result;
  };

  this.getUnit = function (input) {
    let string = input.match(/[a-zA-Z]+/g)[0].toLowerCase();
    switch (string) {
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return "invalid unit";
    }
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case "gal":
        return "L";
      case "L":
        return "gal";
      case "mi":
        return "km";
      case "km":
        return "mi";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return "invalid unit";
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case "gal":
        return "gallons";
      case "l":
        return "liters";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      default:
        return null;
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const miToKm = 1.60934;
    const lbsToKg = 0.453592;
    let result;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
    }
    result = +result.toFixed(5);
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return result;
  };
}

module.exports = ConvertHandler;
