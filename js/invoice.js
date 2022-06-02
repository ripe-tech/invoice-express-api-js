export const InvoiceAPI = superclass =>
    class extends superclass {
        async listInvoices(payload, options = {}) {
            const url = this.invoicingBaseUrl + "invoices.json";
            const response = await this.get(url, options);
            return response;
        }

        async getInvoice(invoiceId, options = {}) {
            const url = this.invoicingBaseUrl + `invoices/${invoiceId}.json`;
            const response = await this.get(url, options);
            return response;
        }

        async createInvoice(payload, options = {}) {
            const url = this.invoicingBaseUrl + "invoices.json";
            const response = await this.post(url, {
                ...options,
                dataJ: payload
            });
            return response;
        }

        async changeInvoiceStatus(invoiceId, payload, options = {}) {
            const url = this.invoicingBaseUrl + `invoice/${invoiceId}/change-state.json`;
            const response = await this.put(url, {
                ...options,
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
