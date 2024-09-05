import { defineStore } from 'pinia'
import { CURRENCIES } from '@/common/constants/currency'

type storeType = {
  isFetching : boolean
  selectedCurrency: typeof CURRENCIES[keyof typeof CURRENCIES]
  currencies : {[key: string]: number} | null
}

export const useAppStore = defineStore('app', {
  state: () : storeType => ({
    isFetching: false,
    selectedCurrency: CURRENCIES.usd,
    currencies: null,
  }),
})
