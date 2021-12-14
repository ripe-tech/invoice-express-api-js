const assert = require("assert");
const invoiceExpress = require("../..");

describe("API", function() {
    it("should be able to instantiate the API", async () => {
        const api = new invoiceExpress.API({
            accountName: "name",
            apiKey: "key"
        });
        assert.strictEqual(api.accountName, "name");
        assert.strictEqual(api.apiKey, "key");
        assert.strictEqual(api.invoicingBaseUrl, "https://name.app.invoicexpress.com/");
    });
});
