<template>
  <v-app-bar>
    <v-app-bar-nav-icon
      v-if="$vuetify.display.smAndDown"
      variant="text"
      @click.stop="drawer = !drawer"
    />

    <nav
      v-if="$vuetify.display.mdAndUp"
      class="w-100 d-flex justify-center"
    >
      <div class="d-flex ga-sm-2">
        <v-btn
          :disabled="COMMON_ROUTES.main === currentRoute.path"
          :to="COMMON_ROUTES.main"
        >Главная</v-btn>
        <v-btn
          :disabled="COMMON_ROUTES.convert === currentRoute.path"
          :to="COMMON_ROUTES.convert"
        >Конвертация</v-btn>
      </div>
    </nav>

    <select-currency class="pt-1 ma-auto mr-3" />

  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    temporary
  >
    <div class="d-flex flex-column pa-5 ga-sm-2">
      <v-btn
        :disabled="COMMON_ROUTES.main === currentRoute.path"
        :to="COMMON_ROUTES.main"
      >Главная</v-btn>
      <v-btn
        :disabled="COMMON_ROUTES.convert === currentRoute.path"
        :to="COMMON_ROUTES.convert"
      >Конвертация</v-btn>
    </div>
  </v-navigation-drawer>

</template>

<script setup lang="ts">

  import { COMMON_ROUTES } from '@/router/constants/CommonRoutes'

  const router = useRouter()

  const currentRoute = computed(() => router.currentRoute.value)

  const drawer = ref(false)
</script>
