import {Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Paper, Typography} from "@mui/material";
import {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

type SideBarProps = {
    categoryFacets: Record<string, number>,
    brandFacets: Record<string, number>,
    selectedBrands: string[],
    selectedCategories: string[],
    onBrandChange: (brands: string[]) => void,
    onCategoryChange: (categories: string[]) => void,
}

export function SideBar({ categoryFacets, onCategoryChange, onBrandChange, selectedCategories, selectedBrands, brandFacets }: SideBarProps) {
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [showAllBrands, setShowAllBrands] = useState(false);

    const handleToggle = (item: string, selectedList: string[], onChange: (list: string[]) => void) => {
        const currentIndex = selectedList.indexOf(item);
        const newList = [...selectedList];

        if (currentIndex === -1) {
            newList.push(item);
        } else {
            newList.splice(currentIndex, 1);
        }
        onChange(newList);
    };

    const mergedBrands: Record<string, number> = { ...brandFacets };

    selectedBrands.forEach(brand => {
        if (mergedBrands[brand] === undefined) {
            mergedBrands[brand] = 0;
        }
    });
    const brandsEntries = Object.entries(mergedBrands)
    const visibleBrands = showAllBrands ? brandsEntries : brandsEntries.slice(0, 10);

    const mergedCategories: Record<string, number> = { ...categoryFacets };

    selectedCategories.forEach(category => {
        if (mergedCategories[category] === undefined) {
            mergedCategories[category] = 0;
        }
    });
    const categoryEntries = Object.entries(mergedCategories)
    const visibleCategories = showAllCategories ? categoryEntries : categoryEntries.slice(0, 10);

    return (
        <Paper sx={{ p: 2, borderRadius: '20px', boxShadow: 'none', border: '1px solid #eee', width: 280 }}>

            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700, color: '#333' }}>
                Categories
            </Typography>
            <FormGroup sx={{ mb: 3 }}>
                {visibleCategories.map(([name, count]) => (
                    <FormControlLabel
                        key={name}
                        control={
                            <Checkbox
                                size="small"
                                checked={selectedCategories.includes(name)}
                                onChange={() => handleToggle(name, selectedCategories, onCategoryChange)}
                            />
                        }
                        label={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '180px' }}>
                                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>{name}</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{count}</Typography>
                            </Box>
                        }
                        sx={{ margin: 0 }}
                    />
                ))}
            </FormGroup>
            {categoryEntries.length > 10 && (
                <Button
                    size="small"
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    startIcon={showAllCategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    sx={{ textTransform: 'none', color: 'text.secondary', mb: 2 }}
                >
                    {showAllCategories ? 'Show Less' : `Show More (${categoryEntries.length - 10})`}
                </Button>
            )}

            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700, color: '#333' }}>
                Brands
            </Typography>
            <FormGroup>
                {visibleBrands.map(([name, count]) => (
                    <FormControlLabel
                        key={name}
                        control={
                            <Checkbox
                                size="small"
                                checked={selectedBrands.includes(name)}
                                onChange={() => handleToggle(name, selectedBrands, onBrandChange)}
                            />
                        }
                        label={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '180px' }}>
                                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>{name}</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{count}</Typography>
                            </Box>
                        }
                        sx={{ margin: 0 }}
                    />
                ))}
            </FormGroup>
            {brandsEntries.length > 10 && (
                <Button
                    size="small"
                    onClick={() => setShowAllBrands(!showAllBrands)}
                    startIcon={showAllBrands ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    sx={{ textTransform: 'none', color: 'text.secondary', mb: 2 }}
                >
                    {showAllBrands ? 'Show Less' : `Show More (${brandsEntries.length - 10})`}
                </Button>
            )}
        </Paper>
    );


}