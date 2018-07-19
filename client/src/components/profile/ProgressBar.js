import React from 'react';
import { Progress } from 'semantic-ui-react'

export const ProgressBar = ({ percent, label }) => (
    <div style={{fontSize: '20px', padding: '20px 0', margin: '40px 0', lineHeight: '1.5em'}}>
        <Progress percent={percent} label={label} color="yellow"/>
    </div>
);
