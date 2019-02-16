import React from 'react';

export const units = {
    metric:'metric',
    imperial:'imperial'
}

export const UnitContext = React.createContext(
    units.metric
)