import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Button, Divider, Dropdown, Modal, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { UserListSearch, UserVo, defaultUserVo } from './data.d'
import CreateUserForm from './components/add_user'
import UpdateUserForm from './components/update_user'
import {
  addUser,
  removeUser,
  update_user_role,
  updateUser,
  userList,
} from './service'
import AdvancedSearchForm from './components/search_user'
import SetUserRoleForm from './components/set_user_role'

const User: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isShowAddModal, setShowAddModal] = useState<boolean>(false)
  const [isShowEditModal, setShowEditModal] = useState<boolean>(false)
  const [isShowRoleModal, setShowRoleModal] = useState<boolean>(false)
  const [userListData, setUserListData] = useState<UserVo[]>([])
  const [currentUser, setCurrentUser] = useState<UserVo>(defaultUserVo)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(10)
  const [needLoad, setNeedLoad] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<UserListSearch>()

  const tag_style = { height: 30, paddingTop: 4 };
  const columns: ColumnsType<UserVo> = [
    {
      title: t('手机号码'),
      dataIndex: 'mobile',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: t('用户名'),
      dataIndex: 'user_name',
    },
    {
      title: t('状态'),
      dataIndex: 'status',
      width: 80,
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
      width: 230,
    },
    {
      title: t('更新时间'),
      dataIndex: 'update_time',
      width: 230,
    },
    {
      title: t('操作'),
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Dropdown menu={actionMenu(record)} trigger={['click']}>
          <Button type="primary" danger style={{ width: 60 }}>
             ...
          </Button>
        </Dropdown>
      ),
    },
  ]

  const actionMenu = (record: UserVo) => ({
    items: [
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: t('编辑'),
        onClick: () => showEditModal(record),
      },
      {
        key: 'role',
        icon: <SettingOutlined />,
        label: t('设置角色'),
        style: { color: '#626aef' },
        onClick: () => showRoleModal(record),
      },
      {
        key: 'delete',
        icon: <DeleteOutlined />,
        label: t('删除'),
        danger: true,
        onClick: () => showDeleteConfirm(record),
      },
    ],
  });

  const showModal = () => {
    setShowAddModal(true)
  }

  const handleAddOk = async (user: UserVo) => {
    const res = await addUser(user)
    if (res.code === 0) {
      setShowAddModal(false)
      setNeedLoad(!needLoad)
    }
  }

  const handleAddCancel = () => {
    setShowAddModal(false)
  }

  const showEditModal = (user: UserVo) => {
    setCurrentUser(user)
    setShowEditModal(true)
  }

  const handleEditOk = async (user: UserVo) => {
    const res = await updateUser(user)
    if (res.code === 0) {
      setShowEditModal(false)
      setNeedLoad(!needLoad)
    }
  }

  const handleEditCancel = () => {
    setShowEditModal(false)
  }

  const showRoleModal = (user: UserVo) => {
    setCurrentUser(user)
    setShowRoleModal(true)
  }

  const handleRoleOk = async (user_id: number, role_ids: number[]) => {
    const res = await update_user_role(user_id, role_ids)
    if (res.code === 0) {
      setShowRoleModal(false)
      setNeedLoad(!needLoad)
    }
  }

  const handleRoleCancel = () => {
    setShowRoleModal(false)
  }

  //删除单条数据
  const showDeleteConfirm = (user: UserVo) => {
    Modal.confirm({
      content: t('确定删除{slot1}吗?', { slot1: user.user_name }),
      async onOk() {
        await handleRemove([user.id])
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  //批量删除
  const handleRemove = async (ids: number[]) => {
    const res = await removeUser(ids)
    if (res.code === 0) {
      setNeedLoad(!needLoad)
    }
  }

  const handleSearchOk = async (user: UserVo) => {
    setSearch({
      ...user,
    })
    setNeedLoad(!needLoad)
  }

  // 重置搜索条件 
  const handleResetOk = async () => {
    setSearch({})
    // setNeedLoad(!needLoad)
  }

  const handleList = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    const res = await userList({ page_no: currentPage, page_size: pageSize, ...search })
    if (res.code === 0) {
      setUserListData(res.data.items)
      setTotal(res.data.total)
      setCurrentPage(res.data.page_no)
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
    <div style={{ paddingLeft: 12 }}>
      <div>
        <Space size={60}>
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
        dataSource={userListData}
        rowKey={'id'}
        pagination={paginationProps}
        // tableLayout={"fixed"}
      />

      <CreateUserForm
        onCancel={handleAddCancel}
        onCreate={handleAddOk}
        open={isShowAddModal}
      ></CreateUserForm>
      <UpdateUserForm
        onCancel={handleEditCancel}
        onCreate={handleEditOk}
        open={isShowEditModal}
        userVo={currentUser}
      ></UpdateUserForm>
      <SetUserRoleForm
        onCancel={handleRoleCancel}
        onCreate={handleRoleOk}
        open={isShowRoleModal}
        userVo={currentUser}
      ></SetUserRoleForm>

      {selectedRowKeys.length > 0 && (
        <div>
          {t('已选择')}
          {selectedRowKeys.length}
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

export default User
