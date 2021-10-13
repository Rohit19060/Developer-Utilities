pm.test("Status code is 201", () => {
    pm.response.to.have.status(201);
    pm.response.to.be.success;
    pm.response.to.be.json;
    pm.expect(pm.response.code).to.equal(201);
});

pm.test("Message", () => {
    pm.expect(true, "No why fail").to.be.ok;
});

var schema = {
    items: {
        type: "boolean",
    },
};

var data1 = [true, false];
var data2 = [true, 123];

pm.test("Schema is valid", () => {
    pm.expect(tv4.validate(data1, schema)).to.be.true;
});

pm.test("Response time is less than 200ms", () => {
    pm.expect(pm.response.responseTime).to.be.below(250);
});

pm.test("Content type is JSON", () => {
    pm.response.to.be.json;
});

pm.test("Is Content type present", () => {
    pm.response.to.have.header("Content-Type");
});

let jsonresponse = pm.response.json();

pm.test("Response should be a parsable json", () => {
    pm.expect(jsonresponse).to.be.ok;
});

pm.test("Response body should be an array", () => {
    console.log(jsonresponse);
    pm.expect(jsonresponse).to.be.a("Array");
});

pm.test("Does not return password", () => {
    pm.expect(jsonresponse).to.not.include("password");
});

pm.environment.set("id", jsonresponse[0]["id"]);
pm.globals.set("exampleLocalVariable", "this-example-of-a-local-variable");

console.log(pm.environment.get("variable_key"));
console.log(pm.globals.get("variable_key"));
console.log(pm.variables.get("variable_key"));
console.log(pm.collectionVariables.get("variable_key"));
console.log(pm.environment.set("variable_key", "variable_value"));

pm.test("Item name is correct", function () {
    let response = pm.response.json();
    let savedItemName = pm.environment.get("bitcoinRate");
    pm.expect(response).to.be.equal(savedItemName);
});

pm.test("Cart does not include deleted item", function () {
    let savedItemId = pm.environment.get("itemId");
    pm.response.to.not.include(savedItemId);
});

pm.test("Body Contain String", () => {
    pm.expect(pm.response.text()).to.include("id");
});

pm.test("status code as array", () => {
    pm.expect(pm.response.code).to.be.oneOf([201, 200]);
});

pm.test("Check the active environment", () => {
    pm.expect(pm.environment.name).to.eql("Api-Template");
});

pm.test("Content-Type header is application/json", () => {
    pm.expect(pm.response.headers.get("Content-Type")).to.eql("application/json");
});

pm.test("Response property matches environment variable", function () {
    pm.expect(pm.response.json().name).to.eql(pm.environment.get("name"));
});

/* response has this structure:
{
  "name": "Jane",
  "age": 29,
  "hobbies": [
    "skating",
    "painting"
  ],
  "email": null
}
*/
const jsonData = pm.response.json();
pm.test("Test data type of the response", () => {
    pm.expect(jsonData).to.be.an("object");
    pm.expect(jsonData.name).to.be.a("string");
    pm.expect(jsonData.age).to.be.a("number");
    pm.expect(jsonData.hobbies).to.be.an("array");
    pm.expect(jsonData.website).to.be.undefined;
    pm.expect(jsonData.email).to.be.null;
});


pm.sendRequest("https://postman-echo.com/get", function (err, response) {
    console.log(response.json());
});

// Prerequest Script
var uuid = require("uuid");
var id = uuid.v4();
var email = `testuser-${id.slice(id.length - 6)}@unbreakableapi.com`;
pm.collectionVariables.set("userEmail", email);
