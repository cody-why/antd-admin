import { t } from 'i18next'
import React, { useState } from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, Col, Row, Statistic } from 'antd'
import ReactEcharts from 'echarts-for-react'

const Home: React.FC = () => {
  const [sales, setSales] = useState<number[]>([5, 20, 36, 10, 10, 20])
  const [inventorys, setInventorys] = useState<number[]>([
    15, 30, 46, 20, 20, 40,
  ])

  const getOption = () => {
    return {
      title: {
        text: t('销量与库存'),
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
          type: 'bar',
          data: sales,
        },
        {
          name: t('库存'),
          type: 'bar',
          data: inventorys,
        },
      ],
    }
  }

  const getOption2 = () => {
    return {
      title: {
        text: t('用户访问来源'),
        subtext: t('纯属虚构'),
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: [
          t('直接访问'),
          t('邮件营销'),
          t('联盟广告'),
          t('视频广告'),
          t('搜索引擎'),
        ],
      },
      series: [
        {
          name: t('访问来源'),
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: t('直接访问') },
            { value: 310, name: t('邮件营销') },
            { value: 234, name: t('联盟广告') },
            { value: 135, name: t('视频广告') },
            { value: 1548, name: t('搜索引擎') },
          ],

          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
  }

  const getOption3 = () => {
    return {
      title: {
        text: t('销量与库存'),
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
          data: [5, 20, 36, 10, 10, 20],
        },
        {
          name: t('库存'),
          type: 'line',
          data: [15, 30, 46, 20, 20, 40],
        },
      ],
    }
  }
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title={t('总销售额')}
              value={126560}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              suffix={<ArrowUpOutlined />}
              prefix="￥"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title={t('访问量')}
              value={8846}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title={t('支付笔数')}
              value={6560}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              suffix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title={t('运营活动效果')}
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 10, padding: 5 }}>
        <Col span={12}>
          <Card bordered={false} hoverable>
            <ReactEcharts option={getOption()} style={{ height: 280 }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} hoverable>
            <ReactEcharts option={getOption2()} style={{ height: 280 }} />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: 10, backgroundColor: 'white', padding: 5 }}>
        <Col span={24}>
          <Card bordered={false} hoverable>
            <ReactEcharts option={getOption3()} style={{ height: 280 }} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Home
