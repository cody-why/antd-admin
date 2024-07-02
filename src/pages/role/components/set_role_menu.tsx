import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Form, Input, Modal, Tree } from 'antd'
import { RoleVo } from '../data'
import { query_role_menu } from '../service'
import { tree } from '../../../utils/treeUtils'

interface UpdateUserFormProps {
  open: boolean
  onCreate: (role_id: Number, menu_ids: Number[]) => void
  onCancel: () => void
  roleVo: RoleVo
}

const SetRoleMenuForm: React.FC<UpdateUserFormProps> = ({
  open,
  onCreate,
  onCancel,
  roleVo,
}) => {
  const [form] = Form.useForm()
  const FormItem = Form.Item
  const [treeData, setTreeData] = useState([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  // 包括半选状态的key
  const [updateKeys, setUpdateKeys] = useState<React.Key[]>([])
  const [needUpade, setNeedUpade] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }
    if (roleVo) {
      form.setFieldsValue(roleVo)
    }
    setNeedUpade(false)
    setCheckedKeys([])
    query_role_menu(roleVo.id || 0).then((res) => {
      if (res.code === 0) {
        // @ts-ignore
        setTreeData(tree(res.data.menu_list, 0, 'parent_id'))
        if (res.data.role_menus) {
          // setCheckedKeys(res.data.role_menus.map((r: number) => r.toString()))
          getCheckedKeys(res.data.role_menus)
        }
      }
    })
  }, [open])

  const handleOk = () => {
    if (!needUpade) {
      return
    }
    onCreate(
      roleVo.id || 0,
      updateKeys.map((i) => Number(i))
    )

  }
  

  const onCheck = (checkedKeys: any, info: any) => {
    setCheckedKeys(checkedKeys);
    // console.log('onCheck checkedKeys: ', checkedKeys);
    // console.log('onCheck info: ', info.halfCheckedKeys);
    // 半选状态的父节点
    let keys = [...checkedKeys, ...info.halfCheckedKeys];
    setUpdateKeys(keys);
    setNeedUpade(true);
    console.log('onCheck Keys: ', keys);
    
  }

  const getCheckedKeys = (keys: any) => {
    // setCheckedKeys(keys.map((r: number) => r.toString()))
    // 父节点选中的话,子节点也全部选中, 所以要所有子节点都选中，父节点才选中 
    let newKeys: React.Key[] = [];
    treeData.forEach((item: any) => {
      // console.log('item: ', item);
      if (keys.includes(item.id)) {
        getChildren(item)
      }
    })

    function getChildren(item: any) {
      if (item.children) {
        item.children.forEach((child: any) => {
          if (keys.includes(child.id)) {
            getChildren(child)
          }
        })
      } else {
        newKeys.push(item.id.toString())
      }
    }

    setCheckedKeys(newKeys);
  }

  const roleFormContent = () => {
    return (
      <>
        <FormItem label="id" name="id" hidden={true}>
          <Input />
        </FormItem>
        <Tree
          checkable
          // @ts-ignore
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={treeData}
        />
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

export default SetRoleMenuForm
