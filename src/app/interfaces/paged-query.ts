import { Filter } from './filter';

export interface PagedQuery {
    startIndex: number;
    nbItems: number;
    filters: Filter<any>[];
}

