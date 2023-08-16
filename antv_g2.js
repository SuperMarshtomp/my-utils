import { Chart } from '@antv/g2';

/*
示例数据：[{name: 'xxx', timestamp: xxx, count: xx}]
*/

export const renderChart = (container, callback, height = 280) => {
  const chart = new Chart({
    container,
    autoFit: true,
    height,
  });
  chart.scale('timestamp', {
    type: 'timeCat',
    mask: 'MM-DD',
  });
  callback(chart, ['#3d73f5', '#27d68f', '#ff8f34', '#ff4545']);
  chart.render();
  return chart;
};
// 柱状图
export const renderHistogram = ({ id, data, cusColor, x, y }) => {
  renderChart(id, (chart, color) => {
    chart.data(data);
    chart.scale(y || 'count', {
      type: 'linear',
      minTickInterval: 1,
      alias: '数量',
    });
    // xy 轴
    chart
      .interval()
      .position(`${x || 'timestamp'}*${y || 'count'}`)
      .color(x || 'timestamp', cusColor || color[0]);
    chart.legend(false);
  });
};
// 折线图
export const renderLine = ({ id, data, height, cusColors, x, y, name }) => {
  renderChart(
    id,
    (chart, color) => {
      chart.data(data);
      chart.scale(y || 'count', {
        nice: true,
      });
      chart.tooltip({
        showCrosshairs: true,
        shared: true,
      });
      chart
        .line()
        .position(`${x || 'timestamp'}*${y || 'count'}`)
        .color(name || 'name', cusColors || color)
        .shape('smooth');
    },
    height || 230
  );
};

export default {
  renderChart,
  renderHistogram,
  renderLine,
};
