import { t } from 'i18next'
import React, { Component } from 'react'
import { Button, Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
/*
后台管理的折线图路由组件
 */
export default class Line extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20],
    inventorys: [15, 30, 46, 20, 20, 40],
  }

  getOption = () => {
    const { sales, inventorys } = this.state
    return {
      title: {
        text: t('ECharts 入门示例'),
      },
      tooltip: {},
      legend: {
        data: [t('销量'), t('库存')],
      },
      xAxis: {
        data: [
          t('衬衫'),
          t('羊毛衫'),
          t('雪纺衫'),
          t('裤子'),
          t('高跟鞋'),
          t('袜子'),
        ],
      },
      yAxis: {},
      series: [
        {
          name: t('销量'),
          type: 'line',
          data: sales,
        },
        {
          name: t('库存'),
          type: 'line',
          data: inventorys,
        },
      ],
    }
  }

  getOption2 = () => {
    return {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {},
        },
      ],
    }
  }

  update = () => {
    const sales = this.state.sales.map((sale) => sale + 1)
    const inventorys = this.state.inventorys.map((inventory) => inventory - 1)
    this.setState({
      sales,
      inventorys,
    })
  }

  render() {
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.update}>
            {t('更新')}
          </Button>
        </Card>
        <Card title={t('折线图一')}>
          <ReactEcharts option={this.getOption()} style={{ height: 300 }} />
        </Card>
        <Card title={t('折线图二')}>
          <ReactEcharts option={this.getOption2()} style={{ height: 300 }} />
        </Card>
      </div>
    )
  }
}
