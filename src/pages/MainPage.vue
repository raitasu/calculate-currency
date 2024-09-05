<template>
  <div
    v-if="isFetching"
    class="d-flex justify-center mt-3"
  >
    <v-progress-circular
      indeterminate
    />
  </div>
  <div
    v-if="currencies && !isFetching"
    class="d-flex justify-center"
  >
    <div class="border pa-4 mt-4 rounded-lg text-h6 text-md-h4">
      <div v-if="selectedCurrency === CURRENCIES.rub">
        <p>1 USD = {{ currencies['usd-rub'] }} RUB</p>
        <p>1 EUR = {{ currencies['eur-rub'] }} RUB</p>
      </div>

      <div v-if="selectedCurrency === CURRENCIES.usd">
        <p>1 RUB = {{ currencies['rub-usd'] }} USD</p>
        <p>1 EUR = {{ currencies['eur-usd'] }} USD</p>
      </div>

      <div v-if="selectedCurrency === CURRENCIES.eur">
        <p>1 RUB = {{ currencies['rub-eur'] }} EUR</p>
        <p>1 USD = {{ currencies['usd-eur'] }} EUR</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { useAppStore } from '@/stores/app'
  import { CURRENCIES } from '@/common/constants/currency'

  const store = useAppStore()

  const currencies = computed(() => store.currencies)

  const selectedCurrency = computed(() => store.selectedCurrency)

  const isFetching = computed({
    get () {
      return store.isFetching
    },
    set (value) {
      store.isFetching = value
    },
  })

  onMounted(() => {
    isFetching.value = true
    axios.get('https://status.neuralgeneration.com/api/currency')
      .then(res => {
        store.currencies = res.data
      })
      .finally(() => {
        isFetching.value = false
      })
  })
</script>
