import { t } from 'i18next'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tabs, Dropdown, Alert } from 'antd'
import { getMenuItemFromPath, getRoutesElement } from '@/utils/publicFunc'
import tabsPageStore, { usePanesState } from '@/store/tabsPageStore'
import { PanesTab } from '@/components/tabPanes/data.d'
import type { MenuProps } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
type TargetKey = React.MouseEvent | React.KeyboardEvent | string

const tabsStyle = {
  backgroundColor: 'white',
}

const TabPanes: React.FC = () => {
  let navigate = useNavigate()
  // 当前路由url，和参数
  const { pathname, search } = useLocation()
  
  const fullPath = pathname + search
  // 菜单数据
  const { menuList } = tabsPageStore() as any
  // 页签数据
  const { panesTab, activeKey, setPanesTab, setBreadCrumbs, setActiveKey } = usePanesState()
  // 页签选中key
  // const [activeKey, setActiveKey] = useState(
  //   panesTab.length > 0 ? panesTab[0].key : ''
  // )
  // 监听路由变化
  useEffect(() => {
    const pathname1 = pathname === '/' ? '/home' : pathname
  
    // 根据路由获取菜单对象，及面包屑
    const { menuItem, names } = getMenuItemFromPath(pathname1, menuList)
    if (names.length > 0) setBreadCrumbs(names)
    // 根据路由获取路由对象
    const { element } = getRoutesElement(pathname1)
    // 无效的新tab，return
    if (!element) return
    const newPath = pathname1 + search
    const index = panesTab.findIndex((item: any) => item.key === pathname1)
    // 新tab已存在，重新覆盖掉
    if (index > -1) {
      const newPanesTab = [...panesTab]
      newPanesTab[index].path = newPath
      newPanesTab[index].label =
        newPanesTab[index].label || (menuItem ? menuItem.name : '')
      setPanesTab(newPanesTab)
      setActiveKey(pathname1)
      return
    }
    // 添加新tab并保存起来
    const newPane = {
      key: pathname1,
      path: newPath,
      label: menuItem ? menuItem.name : '',
      closable: true,
    }
    setPanesTab([...panesTab, newPane])
    setActiveKey(pathname1)
  }, [pathname, search, menuList])
  // tab 被点击的回调
  const onTabClick = (
    key: string,
    e: React.MouseEvent | React.KeyboardEvent
  ) => {
    const target = e.target as HTMLElement
    // 如果点击的是右键菜单中的元素，则不切换tab
    if (
      target &&
      target.classList &&
      target.classList.contains('ant-dropdown-menu-title-content')
    )
      return
    setActiveKey(key)
    const selfPanes = panesTab.filter((item) => item.key === key)
    navigate(selfPanes[0].path)
  }
  // 页签关闭回调
  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey
    let lastIndex = -1
    panesTab.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const newPanes = panesTab.filter((item) => item.key !== targetKey)
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
      } else {
        newActiveKey = newPanes[0].key
      }
    }
    const selfPanes = newPanes.filter((item) => item.key === newActiveKey)
    navigate(selfPanes[0].path)
    setPanesTab(newPanes)
    setActiveKey(newActiveKey)
  }
  // 新增和删除页签的回调，在 type="editable-card" 时有效
  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove'
  ) => {
    if (action === 'remove') {
      remove(targetKey)
    }
  }

  // 当前右键选中打开页签数据
  const [selectedPanel, setSelectedPanel] = useState<PanesTab>({
    key: '', // 对应 activeKey（路由路径，不带参数）
    path: '', // 路由（完整路径，带参数的）
    label: '', // 选项卡头显示文字
    closable: true, // 是否显示选项卡的关闭按钮
  })
  //
  const [reloadPath, setReloadPath] = useState<string>('')
  // 刷新当前 tab
  const refreshTab = (): void => {
    setReloadPath(pathname)
    setTimeout(() => {
      setReloadPath('')
    }, 500)
  }
  // 关闭其他或关闭所有
  const removeAll = async (isCloseAll?: boolean) => {
    const { path, key } = selectedPanel
    navigate(isCloseAll ? '/home' : path)
    const homePanel = [
      {
        key: '/home',
        path: '/home',
        label: t('首页'),
        closable: false,
      },
    ]

    const nowPanes =
      key !== '/home' && !isCloseAll ? [...homePanel, selectedPanel] : homePanel
    setPanesTab(nowPanes)
    setActiveKey(isCloseAll ? '/home' : key)
  }

  const isDisabled = () => selectedPanel.path === '/home'
  // 右键菜单点击回调
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    e.domEvent.stopPropagation()
    if (e.key === 'refresh') {
      // 刷新
      refreshTab()
    }
    if (e.key === 'close') {
      // 关闭
      remove(selectedPanel.key)
    }
    if (e.key === 'closeOther') {
      // 关闭其他
      removeAll()
    }
    if (e.key === 'closeAll') {
      // 全部关闭
      removeAll(true)
    }
  }
  // tab右击菜单
  const items: MenuProps['items'] = [
    {
      key: 'refresh',
      label: t('刷新'),
      disabled: selectedPanel.path !== fullPath,
    },
    {
      key: 'close',
      label: t('关闭'),
      disabled: isDisabled(),
    },
    {
      key: 'closeOther',
      label: t('关闭其他'),
    },
    {
      key: 'closeAll',
      label: t('全部关闭'),
      disabled: isDisabled(),
    },
  ]

  // 阻止右键默认事件
  const preventDefault = (e: Record<string, any>, panel: PanesTab) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedPanel(panel)
  }

  return (
    <div>
      <Tabs
        style={tabsStyle}
        hideAdd
        type="editable-card"
        activeKey={activeKey}
        onEdit={onEdit}
        onTabClick={onTabClick}
        items={panesTab.map((pane) => ({
          key: pane.key,
          label: (
            <Dropdown
              menu={{ items, onClick: handleMenuClick }}
              placement="bottomLeft"
              trigger={['contextMenu']}
            >
              <span onContextMenu={(e) => preventDefault(e, pane)}>
                {reloadPath && pane.path === fullPath && (
                  <SyncOutlined title={t('刷新')} spin={true} />
                )}

                {pane.label}
              </span>
            </Dropdown>
          ),
          closable: pane.closable,
          children:
            reloadPath !== pane.key ? (
              getRoutesElement(pane.key).element
            ) : (
              <div style={{ height: '100vh' }}>
                <Alert message={t('刷新中...')} type="info" />
              </div>
            ),
        }))}
      ></Tabs>
    </div>
  )
}

export default TabPanes
