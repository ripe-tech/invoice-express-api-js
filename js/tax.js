export const TaxAPI = superclass =>
    class extends superclass {
        async getTaxes(options = {}) {
            const url = this.invoicingBaseUrl + "taxes.json";
            const response = await this.get(url, options);
            return response;
        }
    };
