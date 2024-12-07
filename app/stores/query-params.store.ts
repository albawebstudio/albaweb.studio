import { defineStore } from 'pinia';
import type { LocationQuery } from 'vue-router';

export interface QueryParamsState {
    queryParams: Record<string, string>;
}

export const useQueryParamStore = defineStore('query-params', {
    state: (): QueryParamsState => ({ queryParams: {} }),

    getters: {
        thereAreQueryStrings: (state) => !isEmpty(state.queryParams),

        queryString: (state) => {
            const query = state.queryParams;

            if (isEmpty(query)) {
                return '';
            }

            const queryString =
                '?' +
                Object.keys(query)
                    .map((key) => {
                        return `${key}=${encodeURIComponent(query[key] as string)}`;
                    })
                    .join('&');
        },
    },

    actions: {
        setParameters(params: LocationQuery) {
            useForOwn(params, (value, key) => {
                this.queryParams[key] = value as string;
            });
        },
    },
});
