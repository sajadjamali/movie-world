import Box from '@mui/material/Box';
import { TabPanelProps } from '@/types';

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2, textAlign: 'justify', lineHeight: "1.8rem" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default TabPanel;