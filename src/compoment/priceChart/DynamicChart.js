import React, { Component, useEffect } from 'react';
import * as echarts from 'echarts';
import {getDataFromAO} from '../../util/utils'
import {DEX_ADDRESS, MUL} from '../../util/constant'

class DynamicChart extends Component {
  chartRef = React.createRef();

  data = [];
  oneDay = 24 * 3600 * 1000;
  value = Math.random() * 1000;


  async componentDidMount() {
    var a = await getDataFromAO(DEX_ADDRESS, "GetResults", '')
    if (a.length === 0) {
      this.data = []
      return
    }
    var lastP = a[0].price / MUL
    var lastT = a[0].time
    for (var i in a) {
        var t = new Date(a[i].time)
        var v = a[i].price / MUL;
        var da = {
            name: t.toString(),
            value: [
              [t.getFullYear(), t.getMonth(), t.getDate()].join('/')  + " " +  t.getHours() + ":" + t.getMinutes(),
              v,
            ],
        }
        this.data.push(da)
    }
    var nowT = new Date()
    for (; lastT < nowT.getTime();)  {
        var _t = new Date(lastT)
        var _da = {
            name: _t.toString(),
            value: [
              [_t.getFullYear(), _t.getMonth(), _t.getDate()].join('/') + " " +  _t.getHours() + ":" + _t.getMinutes(),
              lastP,
            ],
        }
        this.data.push(_da)
        lastT += 10000
    }
    
    this.myChart = echarts.init(this.chartRef.current);
    this.setChartOption();
    this.updateData();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setChartOption() {
    const option = {
      title: {
        text: 'Price',
        left: 0,
        top:0,
        textStyle: {
            fontSize:20
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          params = params[0];
          var date = new Date(params.name);
          return (
            date.getDate() +
            '/' +
            (date.getMonth()) +
            '/' +
            date.getFullYear() + " " +  date.getHours() + ":" + date.getMinutes() +
            ' : ' +
            params.value[1]
          );
        },
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'Price Data',
          type: 'line',
          showSymbol: false,
          data: this.data,
          encode: {
            y: 1 // 指定Y轴使用value数组的第一个值（索引为0）
          }
        },
      ],
    };
    this.myChart.setOption(option);
  }

  updateData() {
    console.log(this.data)
    this.timer = setInterval(async () => {
      var d = new Date();
      var tt = await getDataFromAO(DEX_ADDRESS, "GetPrice", '');
      var v = tt / MUL;
      var dd = {
        name: d.toString(),
        value: [
            [d.getFullYear(), d.getMonth(), d.getDate()].join('/') + " " +  d.getHours() + ":" + d.getMinutes(),
          v.toFixed(6),
        ],
      };
      this.data.shift();
      this.data.push(dd);
      this.myChart.setOption({
        series: [
          {
            data: this.data,
          },
        ],
      });
    }, 2000);
  }

  render() {
    return <div ref={this.chartRef}></div>;
  }
}

export default DynamicChart;