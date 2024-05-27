import React, { Component, useState, useEffect } from 'react';
import * as echarts from 'echarts';
import {getDataFromAO, getDataByTime} from '../../util/utils'
import {DEX_ADDRESS, MUL} from '../../util/constant'
import { Select } from "antd";
import "./chart.css"

var dataformat = "all";

class DynamicChart2 extends Component {
  chartRef = React.createRef();

  data = [];


  async componentDidMount() {
    var a = await getDataFromAO(DEX_ADDRESS, "GetResults", '')
    if (a.length === 0) {
      this.data = []
      return
    }
    for (var i in a) {
        var t = new Date(a[i].time)
        var v = a[i].price / MUL;
        var da = {
            name: t.toString(),
            value: [
              [t.getFullYear().toString().padStart(2, '0'), t.getMonth().toString().padStart(2, '0'), t.getDate().toString().padStart(2, '0')].join('/')  + " " +  t.getHours().toString().padStart(2, '0') + ":" + t.getMinutes().toString().padStart(2, '0'),
              v,
            ],
            time: t.getUTCSeconds()
        }
        this.data.push(da)
    }
    
    this.myChart = echarts.init(this.chartRef.current);
    this.setChartOption();
    this.updateData();
  }

  async updateOrderData(showType) {
    console.log(showType)
    var now = new Date()
    if (showType === 'all') {
      this.data = []
      var a = await getDataFromAO(DEX_ADDRESS, "GetResults", '')
      if (a.length === 0) {
        this.data = []
        return
      }
      for (var i in a) {
          var t = new Date(a[i].time)
          var v = a[i].price / MUL;
          var da = {
              name: t.toString(),
              value: [
                [t.getFullYear(), t.getMonth().toString().padStart(2, '0'), t.getDate().toString().padStart(2, '0')].join('/')  + " " +  t.getHours().toString().padStart(2, '0') + ":" + t.getMinutes().toString().padStart(2, '0'),
                v,
              ],
              time: t.getUTCSeconds()
          }
          this.data.push(da)
      }
    } else if (showType === 'oneDay') {
      dataformat = 'oneDay'
      var startTime = now.getTime()
      startTime = startTime - 3600 * 24 * 1000
      console.log(startTime)
      var dataT = []
      var a = await getDataByTime(DEX_ADDRESS, startTime)
      console.log(a)
      if (a.length === 0) {
        this.data = []
        return
      }
      for (var i in a) {
          var t = new Date(a[i].time)
          var v = a[i].price / MUL;
          var da = {
              name: t.toString(),
              value: [
                [t.getFullYear(), t.getMonth().toString().padStart(2, '0'), t.getDate().toString().padStart(2, '0')].join('/')  + " " +  t.getHours().toString().padStart(2, '0') + ":" + t.getMinutes().toString().padStart(2, '0'),
                v,
              ],
              time: t.getTime()
          }
          dataT.push(da)
      }
      this.data = dataT
    } else {
      var startTime = now.getTime()
      startTime = startTime - 3600 * 1000
      var dataT = []
      var a = await getDataByTime(DEX_ADDRESS, startTime)
      console.log(a)
      if (a.length === 0) {
        this.data = []
        return
      }
      for (var i in a) {
          var t = new Date(a[i].time)
          var v = a[i].price / MUL;
          var da = {
              name: t.toString(),
              value: [
                [t.getFullYear().toString().padStart(2, '0'), t.getMonth().toString().padStart(2, '0'), t.getDate().toString().padStart(2, '0')].join('/')  + " " +  t.getHours().toString().padStart(2, '0') + ":" + t.getMinutes().toString().padStart(2, '0'),
                v,
              ],
              time: t.getTime()
          }
          dataT.push(da)
      }
      this.data = dataT
    }
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
            date.getDate().toString().padStart(2, '0') +
            '/' +
            (date.getMonth().toString().padStart(2, '0')) +
            '/' +
            date.getFullYear() + " " +  date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') +
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
        axisLabel: {
          formatter: function (value) {
            var date = new Date(value);
            if (dataformat == 'all') {
              return [date.getFullYear(), date.getMonth().toString().padStart(2, '0'), date.getDate().toString().padStart(2, '0')].join('/');
            } else {
              return [date.getMonth().toString().padStart(2, '0'), date.getDate().toString().padStart(2, '0')].join('/') + " " + date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');
            }
          }
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Price Data',
          type: 'line',
          showSymbol: false,
          data: this.data,
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
          v,
        ],
        time: d.getTime()
      };
      this.data.unshift(dd);
      console.log(this.data)
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
    return <div>
          <div ref={this.chartRef} style={{height: 400, width: 1000}}></div>
          <div>
            <Select style={{width: 200, paddingLeft: 30}} defaultValue='all' onChange={(value) => this.updateOrderData(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="oneDay">1 Day</Select.Option>
              <Select.Option value="1-H">1 Hour</Select.Option>
            </Select>
          </div>
    </div>
  }
}

export default DynamicChart2;