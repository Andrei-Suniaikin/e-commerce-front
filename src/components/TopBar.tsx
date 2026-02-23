import {alpha, AppBar, Badge, Box, IconButton, InputBase, styled, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

type TopBarProps = {
    onSearch: (query: string) => void,
    query: string,
}

const SearchWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '24px',
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.08),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    maxWidth: '500px',
    transition: 'all 0.3s ease',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1.2, 1, 1.2, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

export function TopBar({ onSearch, query }: TopBarProps) {
    const [queryText, setQueryText] = useState(query);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter') {
            onSearch(queryText)
        }
    }

    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>

                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1976d2', cursor: 'pointer' }}>
                    JMA
                </Typography>

                <SearchWrapper>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search products..."
                        value={queryText}
                        onChange={(e) => setQueryText(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                </SearchWrapper>

                <Box sx={{ display: 'flex' }}>
                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <IconButton size="large" color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Box>

            </Toolbar>
        </AppBar>
    )

}