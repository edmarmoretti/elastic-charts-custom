/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { select } from '@storybook/addon-knobs';
import React from 'react';

import { Axis, BarSeries, Chart, ScaleType, Settings, PartialTheme } from '@elastic/charts';

import { BARCHART_1Y0G_LINEAR } from '../../../packages/charts/src/utils/data_samples/test_dataset';
import { useBaseTheme } from '../../use_base_theme';
import { getChartRotationKnob } from '../utils/knobs';

export const Example = () => {
  const theme: PartialTheme = {
    barSeriesStyle: {
      displayValue: {
        fontSize: 15,
        fill: { textBorder: 2.5, color: 'white', borderColor: 'black' },
        alignment: {
          horizontal: select(
            'Horizontal alignment',
            {
              Default: undefined,
              Left: 'left',
              Center: 'center',
              Right: 'right',
            },
            undefined,
          ),
          vertical: select(
            'Vertical alignment',
            {
              Default: undefined,
              Top: 'top',
              Middle: 'middle',
              Bottom: 'bottom',
            },
            undefined,
          ),
        },
      },
    },
  };

  return (
    <Chart>
      <Settings theme={theme} baseTheme={useBaseTheme()} rotation={getChartRotationKnob()} />
      <BarSeries
        id="bars"
        xAccessor="x"
        yAccessors={['y']}
        xScaleType={ScaleType.Linear}
        displayValueSettings={{ showValueLabel: true }}
        data={[
          { x: 0, y: 20000.0005, g: 'a' },
          { x: 1, y: 70000, g: 'a' },
          { x: 2, y: 3000, g: 'a' },
          { x: 3, y: 6000, g: 'a' },
          { x: 4, y: 60, g: 'a' },
          { x: 10, y: 20000.0005, g: 'a' },
          { x: 11, y: 71000, g: 'a' },
          { x: 12, y: 3000, g: 'a' },
          { x: 13, y: 6000, g: 'a' },
          { x: 14, y: 60, g: 'a' }
        ]}
      />
      <Axis id="bottom-axis" position="bottom" tickFormat={(d) => `${d} H`} />
      <Axis id="left-axis" position="left" tickFormat={(d) => `${d}`} />
    </Chart>
  );
};
