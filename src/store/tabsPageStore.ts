import { t } from 'i18next'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { PanesTab } from '@/components/tabPanes/data.d'

// 定义页面多tab相关状态数据类型
interface StoreState {
  // 菜单数据
  menuList: Array<object>
  // 设置菜单数据
  setMenuList: (menuList: Array<object>) => void
}
const useStore = create<StoreState>((set) => ({
  menuList: [],
  setMenuList: (menuList: Array<object>) => set({ menuList: menuList }),
}))

// 多页签数据持久化存储
interface PanesState {
  panesTab: Array<PanesTab> // 页签
  breadCrumbs: Array<string> // 面包屑
  activeKey: string // 当前激活的页签
  setActiveKey: (activeKey: string) => void
  setPanesTab: (panesTab: Array<PanesTab>) => void
  setBreadCrumbs: (breadCrumbs: Array<string>) => void
}
const usePanesState = create<PanesState>()(
  persist(
    (set) => ({
      panesTab: [
        {
          key: '/home',
          path: '/home',
          label: t('首页'),
          closable: false,
        },
      ],
      breadCrumbs: [],
      activeKey: '/home',
      setPanesTab: (panesTab: Array<PanesTab>) => set({ panesTab: panesTab }),
      setBreadCrumbs: (breadCrumbs: Array<string>) => set({ breadCrumbs: breadCrumbs }),
      setActiveKey:(activeKey:string)=>set({activeKey: activeKey})
    }),
    {
      name: 'panes-storage', // 存储名
      storage: createJSONStorage(() => sessionStorage), // 存储方式，也可以用localStorage
    }
  )
)

export default useStore
export { usePanesState }
