export type Product = {
    id: string;
    name: string;
    brand: Brand | null;
    image: string;
    categories: Category[]
}

export type Brand = {
    name: string;
    id: number;
}

export type SearchResponse = {
    products: Product[];
    brandFacets: Record<string, number>;
    categoryFacets: Record<string, number>;
    totalElements: number;
}

export type SearchRequest = {
    query: string;
    brands: string[];
    categories: string[];
    page: number;
    size: number;
}

export type Category = {
    id: number;
    name: string;
}