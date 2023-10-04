import { API as BaseAPI, mix, load, conf, verify } from "yonius";

import { InvoiceAPI } from "./invoice";
import { SequenceAPI } from "./sequence";
import { TaxAPI } from "./tax";

export class API extends mix(BaseAPI).with(InvoiceAPI, SequenceAPI, TaxAPI) {
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

    async _handleResponse(response, errorMessage = "Problem in request") {
        const result = await this._getResult(response);
        const errors = result.errors ? JSON.stringify(result.errors) : null;
        verify(!errors, errors, response.status || 500);
        verify(response.ok, errorMessage, response.status || 500);
        return result;
    }

    /**
     * Obtains the response object from the provided response making sure that the
     * content type is respected when doing so.
     *
     * @param {Response} response The HTTP response resulting from the request
     * made by the API client
     * @returns {Object|String|Blob} The parsed result value for the provided
     * response object taking into account the content type of it.
     */
    async _getResult(response) {
        let result = null;
        if (
            response.headers.get("content-type") &&
            response.headers.get("content-type").toLowerCase().startsWith("application/json")
        ) {
            result = await response.json();
        } else if (
            response.headers.get("content-type") &&
            response.headers.get("content-type").toLowerCase().startsWith("text/")
        ) {
            result = await response.text();
        } else {
            result = await response.blob();
        }
        return result;
    }
}
