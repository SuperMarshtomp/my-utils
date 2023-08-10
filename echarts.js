import * as echarts from 'echarts';
import debounce from 'lodash/debounce';

/*
示例数据：
sourceData: [{timestamp: xxx, id1: xx, id2: xx}, {timestamp: xxx, id1: xx, id2: xx}]
renderList: [{id: id1}, {id: id2}]
*/

export const renderLine = ({
  myChart,
  id,
  title,
  colors,
  sourceData,
  renderList,
  x,
  y,
}) => {
  if (!myChart) {
    const chartDom = document.getElementById(id);
    myChart = echarts.init(chartDom);
  }
  myChart.setOption({
    title: {
      text: title,
      textStyle: {
        fontSize: 14,
      },
    },
    legend: {
      type: 'scroll',
      left: 'center',
      bottom: 0,
    },
    grid: {
      top: '36',
      left: '12',
      right: '12',
      bottom: '32',
      containLabel: true,
    },
    color: colors || ['#3D73F5', '#27D68F', '#E6A23C', '#FF4545'],
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: sourceData.map((source) => source[x]),
    },
    yAxis: {
      type: 'value',
    },
    series: renderList.map((item) => {
      return {
        name: item[y],
        type: 'line',
        smooth: true,
        showSymbol: true,
        data: sourceData.map((source) => source[item[y]]),
        connectNulls: true,
      };
    }),
  });
  debounceResize = debounce(() => {
    myChart.resize();
  }, 300);
  window.addEventListener('resize', debounceResize);
};
