import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'

dayjs.locale(ja)

export const formatToDate = (date: Date | string) => {
  return dayjs(date).format('YYYY/MM/DD')
}
