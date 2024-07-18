import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { RoleListSearch, RoleVo, defaultRoleVo } from './data.d'
import CreateRoleForm from './components/add_role'
import UpdateRoleForm from './components/update_role'
import {
  addRole,
  removeRole,
  roleList,
  update_role_menu,
  updateRole,
} from './service'
import AdvancedSearchForm from './components/search_role'
import SetRoleMenuForm from './components/set_role_menu'
import { handleResp } from '@/api/ajax'

const Role: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isShowAddModal, setShowAddModal] = useState<boolean>(false)
  const [isShowEditModal, setShowEditModal] = useState<boolean>(false)
  const [isShowMenuModal, setShowMenuModal] = useState<boolean>(false)
  const [roleListData, setRoleListData] = useState<RoleVo[]>([])
  const [currentRole, setCurrentRole] = useState<RoleVo>(defaultRoleVo)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(10)
  const [needLoad, setNeedLoad] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<RoleListSearch>()

  const tag_style = { height: 30, paddingTop: 4 };
  const columns: ColumnsType<RoleVo> = [
    {
      title: t('名称'),
      dataIndex: 'role_name',
      // render: (text: string) => <a>{text}</a>,
    },
    {
      title: t('状态'),
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {
            <Tag
              color={status === 0 ? '#ff4d4f' : '#67c23a'}
              style={tag_style}
            >
              {status === 0 ? t('禁用') : t('启用')}
            </Tag>
          }
        </>
      ),
    },
    {
      title: t('备注'),
      dataIndex: 'remark',
    },
    {
      title: t('创建时间'),
      dataIndex: 'create_time',
    },
    {
      title: t('更新时间'),
      dataIndex: 'update_time',
    },
    {
      title: t('操作'),
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            {t('编辑')}
          </Button>
          <Button
            type="default"
            style={{ backgroundColor: '#626aef', color: 'white' }}
            icon={<SettingOutlined />}
            onClick={() => showRoleMenuModal(record)}
          >
            {t('设置菜单')}
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record)}
          >
            {t('删除')}
          </Button>
        </Space>
      ),
    },
  ]

  const showModal = () => {
    setShowAddModal(true)
  }

  const handleAddOk = async (role: RoleVo) => {
    if (handleResp(await addRole(role))) {
      setShowAddModal(false)

      setNeedLoad(!needLoad)
    }
  }

  const handleAddCancel = () => {
    setShowAddModal(false)
  }

  const showEditModal = (role: RoleVo) => {
    setCurrentRole(role)
    setShowEditModal(true)
  }

  const handleEditOk = async (role: RoleVo) => {
    if (handleResp(await updateRole(role))) {
      setShowEditModal(false)

      setNeedLoad(!needLoad)
    }
  }

  const handleEditCancel = () => {
    setShowEditModal(false)
  }

  const showRoleMenuModal = (role: RoleVo) => {
    setCurrentRole(role)
    setShowMenuModal(true)
  }

  const handleMenuOk = async (role_id: Number, menu_ids: Number[]) => {
    if (handleResp(await update_role_menu(role_id, menu_ids))) {
      setShowMenuModal(false)

      setNeedLoad(!needLoad)
    }
  }

  const handleMenuCancel = () => {
    setShowMenuModal(false)
  }

  //删除单条数据
  const showDeleteConfirm = (role: RoleVo) => {
    Modal.confirm({
      content: t('确定删除{slot1}吗?', { slot1: role.role_name }),
      async onOk() {
        await handleRemove([role.id])
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  //批量删除
  const handleRemove = async (ids: number[]) => {
    if (handleResp(await removeRole(ids))) {
      setNeedLoad(!needLoad)
    }
  }

  const handleSearchOk = async (role: RoleVo) => {
    setSearch({
      ...role,
    })
    setNeedLoad(!needLoad)
  }

  const handleResetOk = async () => {
    setSearch({})
    setNeedLoad(!needLoad)
  }

  const handleList = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    let res = await roleList({ pageNo: currentPage, pageSize, ...search })
    if (handleResp(res)) {
      setTotal(res.total)
      setRoleListData(res.data) 
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    handleList()
  }, [needLoad])

  const paginationProps = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    current: currentPage, //当前页码
    pageSize, // 每页数据条数
    pageSizeOptions: [10, 20, 30, 40, 50],
    showQuickJumper: true,
    showTotal: (total: number) => (
      <span>
        {t('总共')}
        {total}
        {t('条')}
      </span>
    ),

    total,
    onChange: async (page: number, pageSize: number) => {
      console.log('onChange', page, pageSize)
      setCurrentPage(page)
      setPageSize(pageSize)
      setNeedLoad(!needLoad)
    }, //改变页码的函数
    onShowSizeChange: (current: number, size: number) => {
      console.log('onShowSizeChange', current, size)
    },
  }

  return (
    <div style={{ padding: 24 }}>
      <div>
        <Space size={100}>
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            {t('新建')}
          </Button>
          <AdvancedSearchForm
            search={handleSearchOk}
            reSet={handleResetOk}
          ></AdvancedSearchForm>
        </Space>
      </div>

      <Divider />

      <Table
        rowSelection={{
          onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(selectedRowKeys)
          },
        }}
        size={'middle'}
        columns={columns}
        dataSource={roleListData}
        rowKey={'id'}
        pagination={paginationProps}
        // tableLayout={"fixed"}
      />

      <CreateRoleForm
        onCancel={handleAddCancel}
        onCreate={handleAddOk}
        open={isShowAddModal}
      ></CreateRoleForm>
      <UpdateRoleForm
        onCancel={handleEditCancel}
        onCreate={handleEditOk}
        open={isShowEditModal}
        roleVo={currentRole}
      ></UpdateRoleForm>
      <SetRoleMenuForm
        onCancel={handleMenuCancel}
        onCreate={handleMenuOk}
        open={isShowMenuModal}
        roleVo={currentRole}
      ></SetRoleMenuForm>

      {selectedRowKeys.length > 0 && (
        <div>
          {t('已选择')}
          {selectedRowKeys.length}
          {t('项')}
          <Button
            style={{ float: 'right' }}
            danger
            icon={<DeleteOutlined />}
            type={'primary'}
            onClick={async () => {
              await handleRemove(selectedRowKeys as number[])
              setSelectedRowKeys([])
            }}
          >
            {t('批量删除')}
          </Button>
        </div>
      )}
    </div>
  )
}

export default Role
