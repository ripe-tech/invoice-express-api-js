export const InvoiceAPI = superclass =>
    class extends superclass {
        async createInvoice(payload, options = {}) {
            const url = this.invoicingBaseUrl + "invoices.json";
            const response = await this.post(url, {
                dataJ: payload
            });
            return response;
        }
    };
