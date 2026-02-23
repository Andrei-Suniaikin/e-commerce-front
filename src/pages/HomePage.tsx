import {type ChangeEvent, useEffect, useState} from "react";
import type {Product} from "../types/types.ts";
import {fetchProducts} from "../api/api.ts";
import {Box, CircularProgress, Container, Grid, Pagination} from "@mui/material";
import {TopBar} from "../components/TopBar.tsx";
import {ProductCard} from "../components/ProductCard.tsx";
import {useSearchParams} from "react-router-dom";
import {SideBar} from "../components/SideBar.tsx";
import axios from "axios";
import ErrorSnackbar from "../components/ErrorSnackbar.tsx";

type Filters = {
    query: string;
    brands: string[];
    categories: string[];
}

export function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const page = parseInt((searchParams.get("page")) || "0");
    const filters = {
        query: searchParams.get("query") || '',
        brands: searchParams.getAll("brands"),
        categories: searchParams.getAll("categories"),
    };
    const [facets, setFacets] = useState({
        categories: {},
        brands: {}
    });
    const [totalPages, setTotalPages] = useState(1);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const updateFilters = (newFilters: Filters) => {
        const params = new URLSearchParams();
        if(newFilters.query) {params.set("query", newFilters.query);}

        newFilters.brands.forEach((brand: string) => {params.append("brands", brand);})
        newFilters.categories.forEach((category: string) => {params.append("categories", category);})

        params.set("page", '0')
        setSearchParams(params);
    }

    const loadData = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await fetchProducts({
                ...filters,
                page: page,
                size: 20
            })
            setProducts(response.products)
            setFacets({categories: response.categoryFacets, brands: response.brandFacets});
            setTotalPages(Math.ceil(response.totalElements/20))
        }
        catch (error: unknown) {
            console.log(error);
            let backendMessage = "Check your Internet connection.";
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;

                if (responseData) {
                    backendMessage = responseData.detail || responseData.title || "Internal server error";
                } else if (error.request) {
                    backendMessage = "Server is unavailable tight now, please try again later";
                }
            } else if (error instanceof Error) {
                backendMessage = error.message;
            }

            setErrorMessage(backendMessage);
            setErrorSnackbarOpen(true);
        }
        finally {
            setLoading(false);
        }
    }

    const onSearch = (query: string) => {
        updateFilters({query: query, brands: filters.brands, categories: filters.categories});
    }

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams);

        params.set("page", (value - 1).toString());

        setSearchParams(params);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        loadData();
    }, [searchParams])

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            <TopBar onSearch={onSearch} query={filters.query}/>

            <ErrorSnackbar
                open={errorSnackbarOpen}
                message={errorMessage}
                severity="error"
                handleClose={() => setErrorSnackbarOpen(false)}
            />

            {loading ? (
                <Box sx={{ display: "grid", placeItems: "center", minHeight: '80vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', p: 3 }}>
                    <Box sx={{ width: 280, flexShrink: 0 }}>
                        <SideBar
                            categoryFacets={facets.categories}
                            brandFacets={facets.brands}
                            selectedBrands={filters.brands}
                            selectedCategories={filters.categories}
                            onBrandChange={(newBrands) => updateFilters({...filters, brands: newBrands})}
                            onCategoryChange={(newCategories) => updateFilters({...filters, categories: newCategories})}
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Container maxWidth="lg" sx={{ mt: 4 }}>
                            <Grid container spacing={3}>
                                {products.map((product) => (
                                    <Grid size={{xs:12, sm:6, md:4, lg:3}}>
                                        <ProductCard product={product} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                        {totalPages > 1 && (
                            <Box sx={{display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
                                <Pagination
                                    count={totalPages}
                                    page={page + 1}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
                                    showFirstButton
                                    showLastButton
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
}