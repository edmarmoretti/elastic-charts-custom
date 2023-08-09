/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { boolean, color, number, select } from '@storybook/addon-knobs';
import React from 'react';

import {
  Axis,
  BarSeries,
  Chart,
  DisplayValueSpec,
  LabelOverflowConstraint,
  Position,
  ScaleType,
  Settings,
  PartialTheme,
} from '@elastic/charts';
import { SeededDataGenerator } from '@elastic/charts/src/mocks/utils';

import { ChartsStory } from '../../types';
import { useBaseTheme } from '../../use_base_theme';
import { customKnobs } from '../utils/knobs';

const dataGen = new SeededDataGenerator();
function generateDataWithAdditional(num: number) {
  return [...dataGen.generateSimpleSeries(num), { x: num, y: 0.25, g: 0 }, { x: num + 1, y: 8, g: 0 }];
}
const frozenDataSmallVolume = generateDataWithAdditional(5);
const frozenDataMediumVolume = generateDataWithAdditional(3);
const frozenDataHighVolume = generateDataWithAdditional(6);

const frozenData: { [key: string]: any[] } = {
  s: frozenDataSmallVolume,
  m: frozenDataMediumVolume,
  h: frozenDataHighVolume,
};

export const Example: ChartsStory = (_, { title, description }) => {
  const singleSeries = boolean('show single series', false);
  const showValueLabel = boolean('show value label', true);
  const isAlternatingValueLabel = boolean('alternating value label', false);
  const overflowChartEdges = boolean('hide label if overflows chart edges', false);
  const overflowBarGeometry = boolean('hide label if overflows bar geometry', false);
  const overflowConstraints: DisplayValueSpec['overflowConstraints'] = [];
  if (overflowChartEdges) {
    overflowConstraints.push(LabelOverflowConstraint.ChartEdges);
  }
  if (overflowBarGeometry) {
    overflowConstraints.push(LabelOverflowConstraint.BarGeometry);
  }
  const displayValueSettings = {
    showValueLabel,
    isAlternatingValueLabel,
    overflowConstraints,
  };

  const debug = boolean('debug', false);

  const theme: PartialTheme = {
    barSeriesStyle: {
      displayValue: {
        fontSize: Number(number('value font size', 10)),
        fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
        fontStyle: 'normal',
        padding: 0,
        fill: color('value color', '#000'),
        offsetX: Number(number('offsetX', 0)),
        offsetY: Number(number('offsetY', 0)),
      },
    },
  };

  const dataSize = select(
    'data volume size',
    {
      'small volume': 's',
      'medium volume': 'm',
      'high volume': 'h',
    },
    's',
  );
  const data = frozenData[dataSize];

  const isSplitSeries = boolean('split series', false);
  const isStackedSeries = boolean('stacked series', false);

  const splitSeriesAccessors = isSplitSeries ? ['g'] : undefined;
  const stackAccessors = isStackedSeries ? ['x'] : undefined;
  return (
    <Chart title={title} description={description} renderer="canvas">
      <Settings
        theme={theme}
        baseTheme={useBaseTheme()}
        debug={debug}
        rotation={customKnobs.enum.rotation()}
        showLegend
        showLegendExtra
        legendPosition={customKnobs.enum.position('legend')}
      />
      <Axis id="bottom" position={Position.Bottom} title="Bottom axis" showOverlappingTicks />
      <Axis id="left2" title="Left axis" position={Position.Left} tickFormat={(d: any) => Number(d).toFixed(2)} />
      <BarSeries
        id="bars"
        displayValueSettings={displayValueSettings}
        xScaleType={ScaleType.Linear}
        yScaleType={ScaleType.Linear}
        xAccessor="x"
        yAccessors={['y']}
        splitSeriesAccessors={splitSeriesAccessors}
        stackAccessors={stackAccessors}
        data={[
          { x: 0, y: 2000000.0005, g: 'a' },
          { x: 1, y: 7000000, g: 'a' },
          { x: 2, y: 300000, g: 'a' },
          { x: 3, y: 600000, g: 'a' },
          { x: 4, y: 6000, g: 'a' }
        ]}
      />
      {!singleSeries && (
        <BarSeries
          id="bars2"
          displayValueSettings={displayValueSettings}
          xScaleType={ScaleType.Linear}
          yScaleType={ScaleType.Linear}
          xAccessor="x"
          yAccessors={['y']}
          stackAccessors={['x']}
          splitSeriesAccessors={['g']}
          data={[
            { x: 0, y: 200, g: 'a' },
            { x: 1, y: 700, g: 'a' },
            { x: 2, y: 300, g: 'a' },
            { x: 3, y: 600, g: 'a' },
            { x: 0, y: 400, g: 'b' },
            { x: 1, y: 500, g: 'b' },
            { x: 2, y: 800, g: 'b' },
            { x: 3, y: 200, g: 'b' },
          ]}
        />
      )}
    </Chart>
  );
};