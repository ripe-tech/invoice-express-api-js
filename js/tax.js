export const TaxAPI = superclass =>
    class extends superclass {
        async getTaxes(payload, options = {}) {
            const url = this.invoicingBaseUrl + "taxes.json";
            const response = await this.get(url);
            return response;
        }
    };
