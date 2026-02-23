import type {Product} from "../types/types.ts";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";

type ProductCardProps = {
    product: Product;
}

export function ProductCard({product}: ProductCardProps) {
    return (
        <Card
            sx={{
                maxWidth: 345,
                borderRadius: '20px',
                boxShadow: 'none',
                border: '1px solid #f0f0f0',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={product.image || 'https://via.placeholder.com/200'}
                alt={product.name}
                sx={{
                    objectFit: 'contain',
                    p: 2,
                    bgcolor: '#fafafa'
                }}
            />

            <CardContent sx={{ flexGrow: 1, pt: 1 }}>
                <Typography
                    variant="caption"
                    display="block"
                    sx={{ color: 'text.secondary', mb: 0.5, fontWeight: 400 }}
                >
                    {product.brand ? product.brand.name : ''}
                </Typography>

                <Typography
                    variant="body1"
                    component="div"
                    sx={{
                        fontWeight: 700,
                        lineHeight: 1.2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {product.name}
                </Typography>
            </CardContent>
        </Card>
    );
}