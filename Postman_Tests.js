pm.test("Status code is 201", () => {
    pm.response.to.have.status(200);
    pm.expect(pm.response.code).to.equal(200);
    pm.expect(pm.response.code).to.be.oneOf([201, 200]);
    pm.response.to.be.ok;
});

pm.test("Response time is less than 200ms", () => {
    pm.expect(pm.response.responseTime).to.be.below(250);
});

pm.test("Content type is present", () => {
    pm.response.to.have.header("Content-Type");
    pm.expect(pm.response.headers.get("Content-Type")).to.be.equal(
        "application/json"
    );
    pm.response.to.be.json;
});

pm.test("Test data type of the response", () => {
    const res = pm.response.json();
    pm.expect(res[0]).to.be.an("object");
    pm.expect(res[0].name).to.be.a("string");
    pm.expect(res[0].id).to.be.a("number");
    pm.expect(res).to.be.an("array");
    pm.expect(res[0].website).to.be.undefined;
    pm.expect(res[0].email).to.be.undefined;
    // pm.expect(res[0].email).to.be.null;
    pm.expect(res).to.be.ok;
});

pm.test("Response body should be an array", () => {
    let res = pm.response.json();
    pm.expect(res).to.be.an("array");
    pm.expect(res).to.have.length.above(0);
});

pm.test("Response should have a name & id property", () => {
    let res = pm.response.json();
    pm.expect(res[0]).to.have.property("name");
    pm.expect(pm.response.text()).to.include("id");
});

pm.test("Response body should not return password", () => {
    let res = pm.response.json();
    pm.expect(res).to.not.include("password");
    pm.expect(res).to.not.have.property("password");
});

let res = pm.response.json();
pm.environment.set("id", res[0]["id"]);
pm.collectionVariables.set("id", res[0].id);
pm.globals.set("id", res[0]["id"]);
console.log(pm.environment.get("id"));

pm.test("Check the active environment", () => {
    pm.expect(pm.environment.name).to.eql("Api-Template");
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

pm.sendRequest("https://postman-echo.com/get", function (err, response) {
    console.log(response.json());
});

// Pre Request Script
var uuid = require("uuid");
var id = uuid.v4();
var email = `testUser-${id.slice(id.length - 6)}@unbreakableapi.com`;
pm.collectionVariables.set("userEmail", email);
