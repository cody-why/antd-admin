import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { MenuListParam, MenuVo } from './data.d'
import CreateMenuForm from './components/add_menu'
import UpdateMenuForm from './components/update_menu'
import AdvancedSearchForm from './components/search_menu'
import {
  addMenu,
  menuList,
  removeMenu,
  updateMenu,
} from './service'
import { tree } from '../../utils/treeUtils'
import { IResponse, handleResp } from '../../api/ajax'

const Menu: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isShowAddModal, setShowAddModal] = useState<boolean>(false)
  const [isShowEditModal, setShowEditModal] = useState<boolean>(false)
  const [menuListData, setMenuListData] = useState<MenuVo[]>([])
  const [currentMenu, setCurrentMenu] = useState<MenuVo>()
  const [search, setSearch] = useState<MenuListParam>()
  const [needLoad, setNeedLoad] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const tag_style = { height: 30, paddingTop: 4 };
  const columns: ColumnsType<MenuVo> = [
    {
      title: t('名称'),
      dataIndex: 'menu_name',
      // render: (text: string) => <a>{text}</a>,
    },
    {
      title: t('路径'),
      dataIndex: 'menu_url',
    },
    {
      title: t('接口地址'),
      dataIndex: 'api_url',
    },
    {
      title: t('类型'),
      dataIndex: 'menu_type',
      render: (_, { menu_type }) => (
        <>
          {menu_type === 1 && (
            <Tag
              color={'#ef62df'}
              style={tag_style}
             
            >
              {t('目录')}
            </Tag>
          )}

          {menu_type === 2 && (
            <Tag
              color={'#3f80e9'}
              style={tag_style}
            >
              {t('菜单')}
            </Tag>
          )}

          {menu_type === 3 && (
            <Tag
              color={'#67c23a'}
              style={tag_style}
            >
              {t('功能')}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: t('排序'),
      dataIndex: 'sort',
    },
    {
      title: t('图标'),
      dataIndex: 'icon',
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
    // {
    //     title: '创建时间',
    //     dataIndex: 'create_time',
    // },
    // {
    //     title: '更新时间',
    //     dataIndex: 'update_time',
    // },
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

  const handleAddOk = async (menu: MenuVo) => {
    console.log(menu)
    if (handleResp(await addMenu(menu))) {
      setShowAddModal(false)
      setNeedLoad(!needLoad)
    }
  }

  const handleAddCancel = () => {
    setShowAddModal(false)
  }

  const showEditModal = (menu: MenuVo) => {
    setCurrentMenu(menu)
    setShowEditModal(true)
  }

  const handleEditOk = async (menu: MenuVo) => {
    if (handleResp(await updateMenu(menu))) {
      setShowEditModal(false)
      setNeedLoad(!needLoad)
    }
  }

  const handleEditCancel = () => {
    setShowEditModal(false)
  }

  //删除单条数据
  const showDeleteConfirm = (menu: MenuVo) => {
    Modal.confirm({
      content: t('确定删除{slot1}吗?', { slot1: menu.menu_name }),
      async onOk() {
        await handleRemove([menu.id])
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  //批量删除
  const handleRemove = async (ids: number[]) => {
    if (handleResp(await removeMenu(ids))) {
      setNeedLoad(!needLoad)
    }
  }

  const handleSearchOk = async (param: MenuListParam) => {
    setSearch({
      ...param,
    })
    setNeedLoad(!needLoad)
  }

  const handleResetOk = async () => {
    setSearch({})
    setNeedLoad(!needLoad)
  }

  const setMenuDataTree = (res: IResponse) => {
    setMenuListData(tree(res.data, 0, 'parent_id'))
  }

  const handleList = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    let res = await menuList({ ...search })
    if (handleResp(res)) {
      setMenuDataTree(res);
    // setTotal(res.total)
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    handleList()
  }, [needLoad])

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
        dataSource={menuListData}
        rowKey={'id'}
        // tableLayout={'fixed'}
        pagination={false}
      />

      <CreateMenuForm
        onCancel={handleAddCancel}
        onCreate={handleAddOk}
        open={isShowAddModal}
        menuListData={menuListData}
      ></CreateMenuForm>
      <UpdateMenuForm
        onCancel={handleEditCancel}
        onCreate={handleEditOk}
        open={isShowEditModal}
        menuVo={currentMenu}
      ></UpdateMenuForm>

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

export default Menu
