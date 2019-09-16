import { Filter } from './filter';

export interface PagedQuery {
    StartIndex: number;
    NbItems: number;
    Filters: Filter<any>[];
}

