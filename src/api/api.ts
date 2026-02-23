import axios from "axios";
import type {SearchRequest, SearchResponse} from "../types/types.ts";

const API_URL = import.meta.env.BASE_URL;

export async function fetchProducts(request: SearchRequest): Promise<SearchResponse>{
    try {
        const response = await axios.get(API_URL + 'api/get_products', {
            params: {
                query: request.query,
                brands: request.brands.join(','),
                categories: request.categories.join(','),
                page: request.page,
                size: request.size
            }
        })

        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}