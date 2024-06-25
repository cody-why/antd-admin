import { t } from 'i18next'
import React from 'react'
import { Modal, Select } from 'antd'
import { IconMaps } from '@/pages/admin/icons'

interface IconPickerProps {
  open: boolean
  onPick: (icon: string) => void
  onCancel: () => void
  selectedIcon: string
}

const IconPicker: React.FC<IconPickerProps> = ({
  open,
  onPick,
  onCancel,
  selectedIcon,
}) => {
  return (
    <Modal title={t('选择图标')} open={open} onCancel={onCancel} footer={null}>
      <Select value={selectedIcon} style={{ width: '100%' }} onChange={onPick}>
        {Object.keys(IconMaps).map((icon) => (
          <Select.Option key={icon} value={icon}>
            {IconMaps[icon]} {icon}
          </Select.Option>
        ))}
      </Select>
    </Modal>
  )
}

export default IconPicker
