import { t } from 'i18next'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Space } from 'antd'
import { UserVo } from '../data'

const { Option } = Select

interface CreateUserFormProps {
  search: (values: UserVo) => void
  reSet: () => void
}

const AdvancedSearchForm: React.FC<CreateUserFormProps> = ({
  search,
  reSet,
}) => {
  const FormItem = Form.Item
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    // let status = values.status ? parseInt(values.status, 10) : undefined;
    if (values.status) {
      values.status = parseInt(values.status, 10);
    }
    search(values)
  }

  const onReset = () => {
    form.resetFields()
    reSet()
  }

  const searchForm = () => {
    return (
      <>
        <FormItem label={t('手机号码')} name="mobile">
          <Input placeholder={t('手机号码')} />
        </FormItem>
        <FormItem label={t('状态')} name="status">
          <Select style={{ width: 200 }}>
            <Option value="null">{t('全部')}</Option>
            <Option value="1">{t('启用')}</Option>
            <Option value="0">{t('禁用')}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              style={{ width: 120 }}
            >
              {t('查询')}
            </Button>
            <Button htmlType="button" onClick={onReset} style={{ width: 100 }}>
              {t('重置')}
            </Button>
          </Space>
        </FormItem>
      </>
    )
  }
  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
    >
      {searchForm()}
    </Form>
  )
}

export default AdvancedSearchForm
