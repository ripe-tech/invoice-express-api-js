export const InvoiceAPI = superclass =>
    class extends superclass {
        async createInvoice(payload) {
            const url = this.invoicingBaseUrl + "invoices.json";
            const response = await this.post(url, {
                dataJ: payload
            });
            return response;
        }

        async changeInvoiceStatus(invoiceId, payload) {
            const url = this.invoicingBaseUrl + `invoice/${invoiceId}/change-state.json`;
            const response = await this.put(url, {
                dataJ: payload
            });
            return response;
        }

        async getInvoicePDF(invoiceId, options = {}) {
            const url = this.invoicingBaseUrl + `api/pdf/${invoiceId}.json`;
            const response = await this.get(url, options);
            return response;
        }
    };
