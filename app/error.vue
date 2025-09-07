<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: 'Страница не найдена',
  description: 'Вы попали сюда по неизвестной ошибке'
})

useHead({
  htmlAttrs: {
    lang: 'ru'
  }
})
</script>

<template>
  <UApp>
    <UError :error="error" />
  </UApp>
</template>
