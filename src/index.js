import {SciChartSurface} from "scichart/charting/Visuals/SciChartSurface";
import {NumericAxis} from "scichart/charting/Visuals/Axis/NumericAxis";
import {FastLineRenderableSeries} from "scichart/charting/visuals/RenderableSeries/FastLineRenderableSeries";
import {XyDataSeries} from "scichart/charting/Model/XyDataSeries";
import { EAxisAlignment } from 'scichart/types/AxisAlignment.js';

SciChartSurface.setRuntimeLicenseKey("UNv9MCDJ1adH/EaiLd2o/5kD2MJhGnnPuYp3I5vLlh+IH/H8snv5E5lxfEC+T3ii+Kkvhfctwht2+Jx1I3UzqRczVy0R6yk3vtlPdFpqr7kzXdTa9+WSNB103Gt6T9d3lj76jUTwm1YA9mfh8viWQYGAYmcyX9wAFYnavEcbYutj56yMkw/YM2lfEGt7aJDynEfLX8mYbHjr26aZRRfbiLDQMon39uKxvVplCUsJkTlZIi8pZr9UAFFse3bus0V3lFhpJDMNoXMWFqLllh5ZWo/shHdZtPGhuMB4amk4Q+H/Oqnx8iYW9RmI6o/CksycC1mA0xgE1FoNAZpPUI5eicmQW1o+UMTNQw7E52raHUgpnzGGTO8ov9PG1TQ1bHTsYY1VavdeW1mCTRboMdEaZPYoiVlXhWR/HT4j1yhVXKuCagAzkrgptNvx9N3+GJTFGlupemAd/cIvCKGD4W9UhnhWS4dyMoc6GNpbMMK47Us3PtQRjz0sJarcRzcUvkldNvqSa4cTw/Zs51GO+K/jZOPXRKK/pfxcvbHXfMnqhji1gUF6o5MmLFkpQ6vfOSY=");

import covidData from './assets/covid2.csv';

async function initSciChart() {
  // Create the SciChartSurface in the div 'scichart-root'
  // The SciChartSurface, and webassembly context 'wasmContext' are paired. This wasmContext
  // instance must be passed to other types that exist on the same surface.
  const {sciChartSurface, wasmContext} = await SciChartSurface.create("scichart-root");
  // Create an X,Y Axis and add to the chart
  // Create an X,Y Axis and add to the chart
  const xAxis = new NumericAxis(wasmContext, {
    axisTitle: "Primary XAxis",
    axisAlignment: EAxisAlignment.Bottom,
  });
  const xAxis2 = new NumericAxis(wasmContext, {
    axisTitle: "Secondary XAxis",
    id: "XAxis_2",
    axisAlignment: EAxisAlignment.Top,
  });
  const yAxis = new NumericAxis(wasmContext,
    {
      axisTitle: "Primary YAxis",
      axisAlignment: EAxisAlignment.Left,
    });
  const yAxis2 = new NumericAxis(wasmContext,
    {
      axisTitle: "Secondary YAxis",
      id: "YAxis_2",
      axisAlignment: EAxisAlignment.Right,
    });

  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.xAxes.add(xAxis2);
  sciChartSurface.yAxes.add(yAxis);
  sciChartSurface.yAxes.add(yAxis2);

  // That's it! You just created your first SciChartSurface!
  const dataLength = covidData.length;

  for (let seriesCount = 1; seriesCount < dataLength; seriesCount++) {


    //
    // // Create first series and bind to the first Y axis
    // const lineSeries1 = new FastLineRenderableSeries(wasmContext, { });
    // sciChartSurface.renderableSeries.add(lineSeries1);
    // lineSeries1.dataSeries = new XyDataSeries(wasmContext, {xValues: [0, 1, 2, 3], yValues:[0, 60, 160, 300]});
    //
    //
    // Create second series and bind to the second Y axis
    // const lineSeries2 = new FastLineRenderableSeries(wasmContext, { stroke: "#33ff33"});
    // sciChartSurface.renderableSeries.add(lineSeries2);
    // lineSeries2.dataSeries = new XyDataSeries(wasmContext, {xValues: [0, 1, 2, 3, 4], yValues:[0, 101, 240, 500, 600]});




    const xyDataSeries = new XyDataSeries(wasmContext);
    xyDataSeries.append(seriesCount, 0);
    xyDataSeries.append(seriesCount, +covidData[seriesCount][4]);

    const xyDataSeries2 = new XyDataSeries(wasmContext);
    xyDataSeries2.append(seriesCount, 0);
    xyDataSeries2.append(seriesCount, +covidData[seriesCount][7]);

    // Add and create a line series with this data to the chart
    // Create a line series
    const lineSeries = new FastLineRenderableSeries(wasmContext, {
      dataSeries: xyDataSeries,
      xAxisId: "XAxis_2" ,
      yAxisId: "YAxis_2",
      stroke: `rgba(255, 0, 0, 0.8)`,
      strokeThickness:2
    });

    const lineSeries2 = new FastLineRenderableSeries(wasmContext, {
      dataSeries: xyDataSeries2,
      stroke: `rgba(0, 255, 93, 0.2)`,
      strokeThickness:2
    });

    sciChartSurface.renderableSeries.add(lineSeries);
    sciChartSurface.renderableSeries.add(lineSeries2);
  }

  // zoom to fit
  sciChartSurface.zoomExtents();
}
initSciChart();
