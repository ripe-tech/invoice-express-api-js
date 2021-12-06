const assert = require("assert");
const invoiceExpress = require("../..");

describe("API", function() {
    it("should be able to instantiate the API", async () => {
        const api = new invoiceExpress.API({
            accountName: "name",
            apiKey: "key"
        });
        assert.strictEqual(Boolean(api.accountName), true);
        assert.strictEqual(Boolean(api.apiKey), true);
    });
});
