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
import { UserListSearch, UserVo } from './data.d'
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
import { handleResp } from '@/api/ajax'

const User: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isShowAddModal, setShowAddModal] = useState<boolean>(false)
  const [isShowEditModal, setShowEditModal] = useState<boolean>(false)
  const [isShowRoleModal, setShowRoleModal] = useState<boolean>(false)
  const [userListData, setUserListData] = useState<UserVo[]>([])
  const [currentUser, setCurrentUser] = useState<UserVo>({
    create_time: '',
    id: 0,
    mobile: '',
    user_name: '',
    remark: '',
    status: 0,
    update_time: '',
  })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(10)
  const [needLoad, setNeedLoad] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<UserListSearch>()

  const columns: ColumnsType<UserVo> = [
    {
      title: t('手机号'),
      dataIndex: 'mobile',
      // render: (text: string) => <a>{text}</a>,
    },
    {
      title: t('用户名'),
      dataIndex: 'user_name',
    },
    {
      title: t('状态'),
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {
            <Tag
              color={status === 0 ? '#ff4d4f' : '#67c23a'}
              style={{
                width: 50,
                height: 30,
                textAlign: 'center',
                paddingTop: 4,
              }}
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
            onClick={() => showRoleModal(record)}
          >
            {t('设置角色')}
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

  const handleAddOk = async (user: UserVo) => {
    if (handleResp(await addUser(user))) {
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
    if (handleResp(await updateUser(user))) {
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
    if (handleResp(await update_user_role(user_id, role_ids))) {
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
    if (handleResp(await removeUser(ids))) {
      setNeedLoad(!needLoad)
    }
  }

  const handleSearchOk = async (user: UserVo) => {
    setSearch({
      ...user,
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
    let res = await userList({ pageNo: currentPage, pageSize, ...search })
    if (handleResp(res)) {
      setUserListData(res.data);
      setTotal(res.total);
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

export default User
