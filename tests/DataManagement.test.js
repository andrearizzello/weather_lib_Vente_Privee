const convertDate = require("../utils/DataManagement");

it("Test convertDate function", () => {
    expect(convertDate(new Date())).toBeInstanceOf(Date)
});