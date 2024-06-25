import { t } from 'i18next'
import React, { useEffect } from 'react'
import { Form, Input, Modal, Radio } from 'antd'
import { UserVo } from '../data'
import TextArea from 'antd/es/input/TextArea'

interface UpdateUserFormProps {
  open: boolean
  onCreate: (values: UserVo) => void
  onCancel: () => void
  userVo: UserVo
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  open,
  onCreate,
  onCancel,
  userVo,
}) => {
  const [form] = Form.useForm()
  const FormItem = Form.Item

  useEffect(() => {
    if (open && userVo) {
      form.setFieldsValue(userVo)
    }
  }, [open])

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields()
        onCreate(values)
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  const userFormContent = () => {
    return (
      <>
        <FormItem label="id" name="id" hidden={true}>
          <Input />
        </FormItem>
        <FormItem
          label={t('手机号')}
          name="mobile"
          rules={[{ required: true, message: t('请输入手机号!') }]}
        >
          <Input />
        </FormItem>

        <FormItem
          label={t('用户名')}
          name="user_name"
          rules={[{ required: true, message: t('请输入用户名!') }]}
        >
          <Input />
        </FormItem>

        <FormItem
          label={t('状态')}
          name="status"
          rules={[{ required: true, message: t('请输入状态!') }]}
        >
          <Radio.Group defaultValue={1}>
            <Radio value={1}>{t('启用')}</Radio>
            <Radio value={0}>{t('禁用')}</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem label={t('备注')} name="remark">
          <TextArea rows={2} />
        </FormItem>
      </>
    )
  }

  const modalFooter = {
    title: t('更新'),
    okText: t('保存'),
    onOk: handleOk,
    onCancel,
    cancelText: t('取消'),
    open,
    width: 480,
  }
  const formLayout = { labelCol: { span: 7 }, wrapperCol: { span: 13 }, form }

  return (
    <Modal {...modalFooter} style={{ top: 150 }}>
      <Form {...formLayout} style={{ marginTop: 30 }}>
        {userFormContent()}
      </Form>
    </Modal>
  )
}

export default UpdateUserForm
