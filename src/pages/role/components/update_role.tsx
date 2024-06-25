import { t } from 'i18next'
import React, { useEffect } from 'react'
import { Form, Input, Modal, Radio } from 'antd'
import { RoleVo } from '../data'
import TextArea from 'antd/es/input/TextArea'

interface UpdateUserFormProps {
  open: boolean
  onCreate: (values: RoleVo) => void
  onCancel: () => void
  roleVo: RoleVo
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  open,
  onCreate,
  onCancel,
  roleVo,
}) => {
  const [form] = Form.useForm()
  const FormItem = Form.Item

  useEffect(() => {
    if (open && roleVo) {
      form.setFieldsValue(roleVo)
    }
  }, [open])

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields()
        onCreate(values)
      })
      .catch((error) => {
        // console.log('Validate Failed:', error)
      })
  }

  const roleFormContent = () => {
    return (
      <>
        <FormItem label="id" name="id" hidden={true}>
          <Input />
        </FormItem>
        <FormItem
          label={t('名称')}
          name="role_name"
          rules={[{ required: true, message: t('请输入角色名称!') }]}
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
        {roleFormContent()}
      </Form>
    </Modal>
  )
}

export default UpdateUserForm
