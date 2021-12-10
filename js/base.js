import { API as BaseAPI, mix, load, conf } from "yonius";

import { InvoiceAPI } from "./invoice";

export class API extends mix(BaseAPI).with(InvoiceAPI) {
    constructor(kwargs = {}) {
        super(kwargs);
        this.accountName = conf("ACCOUNT_NAME", null);
        this.apiKey = conf("API_KEY", null);
        this.accountName = kwargs.accountName === undefined ? this.accountName : kwargs.accountName;
        this.apiKey = kwargs.apiKey === undefined ? this.apiKey : kwargs.apiKey;
        this.invoicingBaseUrl =
            kwargs.invoicingBaseUrl === undefined
                ? `https://${this.accountName}.app.invoicexpress.com/`
                : kwargs.invoicingBaseUrl;
    }

    static async load() {
        await load();
    }

    async build(method, url, options = {}) {
        await super.build(method, url, options);
        options.headers = options.headers !== undefined ? options.headers : {};
        options.kwargs = options.kwargs !== undefined ? options.kwargs : {};
        options.params = options.params !== undefined ? options.params : {};
        options.params.api_key = this.apiKey;
    }
}
