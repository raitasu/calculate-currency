<template>
  <form>
    <div class="border pa-4 d-flex flex-column align-center ">
      <div class="d-flex">
        <v-text-field
          v-model="firstAmount"
          :error-messages="firstErrorMessage"
          :max-width="250"
          min="0"
          type="number"
          :width="250"
          @input="updateSecondAmount"
        />
        <v-select
          v-model="firstCurrency"
          :items="firstCurrencyOptions"
          :max-width="100"
          :width="100"
          @update:model-value="firstCurrencyChange"
        />
      </div>
      <div class="d-flex">
        <v-text-field
          v-model="secondAmount"
          :error-messages="secondErrorMessage"
          :max-width="250"
          min="0"
          type="number"
          :width="250"
          @input="updateFirstAmount"
        />
        <v-select
          v-model="secondCurrency"
          :items="secondCurrencyOptions"
          :max-width="100"
          :width="100"
          @update:model-value="secondCurrencyChange"
        />
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">

  import { CURRENCIES, CURRENCY_LABELS } from '@/common/constants/currency'
  import { useAppStore } from '@/stores/app'
  import { COMMON_ROUTES } from '@/router/constants/CommonRoutes'
  import { defineRule, useField } from 'vee-validate'
  import { regex } from '@vee-validate/rules'

  defineRule('regex', regex)

  const store = useAppStore()

  const currencies = computed(() => store.currencies)

  const firstCurrency = ref(CURRENCIES.usd)

  const secondCurrency = ref(CURRENCIES.rub)

  const allCurrencyOptions = computed(() => Object.entries(CURRENCY_LABELS).map(([key, value]) => ({ title: value, value: key })))

  const firstCurrencyOptions = computed(() => allCurrencyOptions.value.filter(currency => currency.value !== secondCurrency.value))

  const secondCurrencyOptions = computed(() => allCurrencyOptions.value.filter(currency => currency.value !== firstCurrency.value))

  const { value: firstAmount, errorMessage: firstErrorMessage } = useField<number>('firstAmount', { regex: '^[0-9]+[,.]?[0-9]*$' })

  const { value: secondAmount, errorMessage: secondErrorMessage } = useField<number>('secondAmount', { regex: '^[0-9]+[,.]?[0-9]*$' })

  const updateSecondAmount = () => {
    if (String(firstAmount.value).startsWith('0')) {
      firstAmount.value = Number(String(firstAmount.value).slice(1))
    }
    secondAmount.value = Number((firstAmount.value * currencies.value![`${firstCurrency.value}-${secondCurrency.value}`]).toFixed(2))
  }

  const updateFirstAmount = () => {
    if (String(secondAmount.value).startsWith('0')) {
      secondAmount.value = Number(String(secondAmount.value).slice(1))
    }
    firstAmount.value = Number((secondAmount.value * currencies.value![`${secondCurrency.value}-${firstCurrency.value}`]).toFixed(2))
  }

  const firstCurrencyChange = () => {
    nextTick().then(() => {
      updateSecondAmount()
    })
  }

  const secondCurrencyChange = () => {
    nextTick().then(() => {
      updateFirstAmount()
    })
  }

  onMounted(() => {
    if (!currencies.value) {
      useRouter().replace(COMMON_ROUTES.main)
    }
  })

</script>
