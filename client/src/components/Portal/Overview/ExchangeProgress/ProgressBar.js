import React from 'react';
import { Progress } from 'semantic-ui-react'

export const ProgressBar = ({ percent, label }) => (
    <div className='progress-bar'>
        <Progress
            percent={percent}
            label={label}
            color="yellow"
        />
    </div>
);
