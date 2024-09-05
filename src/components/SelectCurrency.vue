<template>
  <v-select
    v-model="selectedCurrency"
    :item-title="(item:string) => item.toUpperCase()"
    :items="Object.values(CURRENCIES)"
    max-width="110px"
    width="110px"
  />
</template>
<script setup lang="ts">
  import { CURRENCIES } from '@/common/constants/currency'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()

  const selectedCurrency = computed({
    get () {
      return store.selectedCurrency
    },
    set (value) {
      store.selectedCurrency = value.toLowerCase() as 'usd' | 'eur' | 'rub'
    },
  })
</script>
