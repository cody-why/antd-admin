import { t } from 'i18next'
import React from 'react'
import { Form, Input, message, Modal, Radio } from 'antd'
import { RoleVo } from '../data'
import TextArea from 'antd/es/input/TextArea'

interface CreateUserFormProps {
  open: boolean
  onCreate: (values: RoleVo) => void
  onCancel: () => void
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm()
  const FormItem = Form.Item

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values)
        form.resetFields()
      })
      .catch((error) => {
        if (error && error.errorFields.length  > 0) {
            // console.error(error.errorFields);
            message.error(t('请检查输入项!'))
        }
      })
  }

  const roleFormContent = () => {
    return (
      <>
        <FormItem
          label={t('名称')}
          name="role_name"
          rules={[{ required: true, message: t('请输入手机号!') }]}
        >
          <Input />
        </FormItem>

        <FormItem
          label={t('状态')}
          name="status"
          rules={[{ required: true, message: t('请输入状态!') }]}
        >
          <Radio.Group>
            <Radio value={1}>{t('启用')}</Radio>
            <Radio value={0}>{t('禁用')}</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          label={t('备注')}
          name="remark"
          // rules={[{ required: true, message: t('请输入备注!') }]}
        >
          <TextArea rows={2} />
        </FormItem>
      </>
    )
  }

  const modalFooter = {
    title: t('新建'),
    okText: t('保存'),
    onOk: handleOk,
    onCancel,
    cancelText: t('取消'),
    open,
    width: 480,
  }
  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
    form,
    initialValues: { status: 1 },
  }

  return (
    <Modal {...modalFooter} style={{ top: 150 }}>
      <Form {...formLayout} style={{ marginTop: 30 }}>
        {roleFormContent()}
      </Form>
    </Modal>
  )
}

export default CreateUserForm
