import { t } from 'i18next'
// import { message } from 'antd'
import { message } from '@/App';


export const showStatusMessage = (status: number | string) => {
  let msg: string
  switch (status) {
    case 400:
      msg = t('status-400')
      break
    case 401:
      msg = t('status-401')
      break
    case 403:
      msg = t('status-403')
      break
    case 404:
      msg = t('status-404')
      break
    case 408:
      msg = t('status-408')
      break
    case 422:
        msg = t('status-422')
        break
    case 500:
      msg = t('status-500')
      break
    case 501:
      msg = t('status-501')
      break
    case 502:
      msg = t('status-502')
      break
    case 503:
      msg = t('status-503')
      break
    case 504:
      msg = t('status-504')
      break
    case 505:
      msg = t('status-505')
      break
    default:
      msg = t('status-default')
  }
  // return `${message}，请检查网络或联系管理员！`;
  message.error(msg);
}
