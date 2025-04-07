
export interface Page<T> {
    content: T[];
    empty: boolean
    first: boolean;
    las: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    pageSize: number;
    size: number;
    totalElements: number;
    totalPages: number;

}

export interface Pageable {
    offset: number;

    pageNumber: number;

    pageSize: number;

    paged: boolean;

    unpaged: boolean;

}
export interface AddEditViewProps<T> {
    open: boolean;
    handleClose: () => void;
    mode: ModeComponent;
    initialData?: T;

}

export enum ModeComponent {
    view, edit, create
}
