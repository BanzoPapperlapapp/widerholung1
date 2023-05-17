import React from 'react';
import Skeleton  from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const SkeletonFC = () => {
    return (
        <Stack spacing={1} margin={2}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Skeleton variant="rectangular" width={300} height={56} />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
                <Skeleton variant="rounded" width={300} height={219} />
                <Skeleton variant="rounded" width={300} height={219} />
                <Skeleton variant="rounded" width={300} height={219} />
            </div>
        </Stack>
    );
};
