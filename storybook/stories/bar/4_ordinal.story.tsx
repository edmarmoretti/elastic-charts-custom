/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { Axis, BarSeries, Chart, Position, ScaleType, Settings, PartialTheme } from '@elastic/charts';

import { useBaseTheme } from '../../use_base_theme';

export const Example = () => {
  const displayValueSettings = {
    showValueLabel: true
  };
  const theme: PartialTheme = {
    barSeriesStyle: {
      displayValue: {
        fontSize: 12,
        fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
        fontStyle: 'normal',
        padding: 0
      },
    },
  };
  return(
  <Chart>
    <Settings
    theme={theme}
    baseTheme={useBaseTheme()} 
    rotation={90}
    
    />
    <Axis id="bottom" position={Position.Left} title="Bottom axis" showOverlappingTicks />
    <Axis id="left2" title="Left axis" position={Position.Bottom} tickFormat={(d: any) => Number(d).toFixed(2)} />

    <BarSeries
      id="bars"
      displayValueSettings={displayValueSettings}
      xScaleType={ScaleType.Ordinal}
      yScaleType={ScaleType.Linear}
      xAccessor="x"
      yAccessors={['y']}
      data={[
        { x: 'aaaaaaaaaaa aaaaaaaaaaaaa-', y: 20000 },
        { x: 'aaaaaaaaaaaaa bbbbbbbbbbbbb-', y: 70000 },
        { x: 'cccccc ffff-', y: 300 },
        { x: 'zero-', y: 0 },
        { x: 'djjjjj-', y: 1000 },
        { x: '1aaaaaaaaaaa aaaaaaaaaaaaa-', y: 20000 },
        { x: '1aaaaaaaaaaaaa bbbbbbbbbbbbb-', y: 70000 },
        { x: '1cccccc ffff-', y: 300 },
        { x: '1zero-', y: 0 },
        { x: '1djjjjj-', y: 1000 },
        { x: '2aaaaaaaaaaa aaaaaaaaaaaaa-', y: 20000 },
        { x: '2aaaaaaaaaaaaa bbbbbbbbbbbbb-', y: 70000 },
        { x: '2cccccc ffff-', y: 300 },
        { x: '2zero-', y: 0 }
      ]}
    />
  </Chart>
  );
};
