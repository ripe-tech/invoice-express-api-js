export const SequenceAPI = superclass =>
    class extends superclass {
        async getSequences(options = {}) {
            const url = this.invoicingBaseUrl + "sequences.json";
            const response = await this.get(url, options);
            return response;
        }

        async createSequence(payload, options = {}) {
            const url = this.invoicingBaseUrl + "sequences.json";
            const response = await this.post(url, {
                ...options,
                dataJ: payload
            });
            return response;
        }
    };
