<!-- eslint-disable @stylistic/comma-dangle -->
<script setup lang="ts">
const input = ref('')
const loading = ref(false)

const { model } = useModels()

async function createTopic(id: string, topic: string) {
  bufferChats.value = quickChats[id]
  input.value = 'Раздел в наполнении'
  if(bufferChats.value.length) input.value = 'Поиск в разделе ' + topic

  /*
  input.value = `${topic}`
  loading.value = true
  const chat = await $fetch('/api/chats', {
    method: 'POST',
    body: { input: prompt }
  })

  refreshNuxtData('chats')
  navigateTo(`/chat/${chat?.id}`)
  */
}

async function createChat(question: string, prompt: string) {
  input.value = `${question} ${prompt}`
  loading.value = true
  const chat = await $fetch('/api/chats', {
    method: 'POST',
    body: { input: prompt }
  })

  refreshNuxtData('chats')
  navigateTo(`/chat/${chat?.id}`)
}

function onSubmit() {
  createChat('', input.value)
}

const quickTopics = [
  {
    id: 'find',
    label: 'Поиск закупок',
    icon: ''
  },
  {
    id: 'info',
    label: 'Изучение требований и правил участия',
    icon: ''
  },
  {
    id: 'prepare',
    label: 'Подготовка и подача заявки',
    icon: ''
  },
  {
    id: 'action',
    label: 'Участие в конкретных процедурах',
    icon: ''
  },
  {
    id: 'post',
    label: 'Действия после проведения закупки (Победитель)',
    icon: ''
  },
  {
    id: 'abuse',
    label: 'Оспаривание и жалобы',
    icon: ''
  },
  {
    id: 'status',
    label: 'Работа с реестрами и статусами',
    icon: ''
  },
]

const aiChats = [
  {
    label: 'Как получить ЭЦП?',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Что нужно для участия в торгах',
    icon: 'i-logos-vue'
  },
]

const bufferChats = ref([])

const quickChats = {
  find: [],
  info: [],
  prepare: [],
  action: [
  {
    label: 'Обязательно ли вносить обеспечение заявки?',
    description: 'Необходимость внесения обеспечения заявки устанавливает Организатор торгов в извещении о проведении процедуры (п. 8.8.13).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'На какой счет вносится обеспечение заявки и плата за участие?',
    description: 'Денежные средства вносятся на Лицевой счет, открытый Оператором в Росэлторг.ID (п.п. 1, определение «Лицевой счет»; 4.2.5).',
    icon: 'i-logos-nuxt-icon'
  },

  {
    label: 'Можно ли отозвать поданную заявку?',
    description: 'Да, заявку можно отозвать не позднее окончания срока подачи заявок (п. 8.9.11).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Что такое двухэтапный аукцион?',
    description: 'Это аукцион, заявки на участие в котором подаются в двух частях: первая часть содержит согласие и характеристики, вторая – данные об участнике и документы (п. 8.1.5).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'В каких процедурах возможна подача альтернативных предложений?',
    description: 'Альтернативные предложения возможны в конкурсе, запросе предложений и конкурентных переговорах, если это установлено Организатором торгов (п. 8.10.2).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Что такое «переторжка»?',
    description: 'Это этап процедуры, на котором участники могут добровольно улучшить свои предложения (цену или иные условия) после рассмотрения заявок (п. 8.16.1).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Какие бывают формы переторжки?',
    description: 'Переторжка может проводиться в очной (непрерывная подача предложений в реальном времени) или заочной (подача новых заявок в установленный срок) форме (п. 8.16.5, 8.16.9, 8.16.10).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Когда публикуется протокол рассмотрения заявок?',
    description: 'Организатор торгов публикует протокол в срок, установленный им же в извещении о проведении процедуры (п. 8.12.5).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Кто может участвовать в Процедурах МСП?',
    description: 'Участниками Процедур МСП могут быть только субъекты малого и среднего предпринимательства (п. 1, определение «Процедура МСП»).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Из скольких частей состоит заявка на аукцион МСП?',
    description: 'Заявка на аукцион МСП состоит из двух частей. Сведения об участнике и ценовое предложение указываются только во второй части (п. 9.1.2).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Как предоставляется обеспечение заявки в Процедурах МСП?',
    description: 'Обеспечение можно предоставить путем блокирования денежных средств на специальном банковском счете или путем предоставления независимой банковской гарантии (п.п. 4.1.11, 9.7.7, 9.7.8).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Когда взимается плата за участие?',
    description: 'Плата взимается с победителя процедуры МСП. В процедурах общих плата взимается с участника в соответствии с Тарифом (п. 4.2.1).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Что происходит с обеспечением заявки, если я не прошел отбор?',
    description: 'Денежные средства разблокируются в течение 1 рабочего дня после публикации протокола, в котором участник не был допущен (п.п. 8.12.8, 8.14.5, 8.17.8).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Когда списывается плата за участие?',
    description: 'Плата списывается с Лицевого счета после подачи заявки на участие в процедуре (п. 8.9.12).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Что делать, если возник технический сбой во время подачи заявки или торгов?',
    description: 'Все действия фиксируются по времени сервера площадки. При нештатной ситуации Оператор проводит восстановительные работы и возобновляет процедуру с момента сбоя (п.п. 3.7, 4.2.9, 4.2.11).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Что делать, если есть разногласия по проекту договора?',
    description: 'Участник составляет протокол разногласий и направляет его Заказчику через функционал площадки (п. 9.11.6).',
    icon: 'i-logos-nuxt-icon'
  },
  {
    label: 'Что происходит, если победитель уклонился от заключения договора?',
    description: 'С победителя взыскивается плата за участие, а обеспечение заявки может быть переведено Заказчику. Договор предлагается следующему по рейтингу участнику (п.п. 8.18.9, 8.18.10, 8.18.12, 9.11.8).',
    icon: 'i-logos-nuxt-icon'
  },
  ],
  post: [],
  abuse: [],
  status: [],

}

</script>

<template>
  <UDashboardPanel id="home" :ui="{ body: 'p-0 sm:p-0' }">
    <template #header>
      <DashboardNavbar />
    </template>

    <template #body>
      <UContainer class="flex-1 flex flex-col justify-center gap-4 sm:gap-6 py-8">
        <h1 class="text-3xl sm:text-4xl text-highlighted font-bold">
          Введите свой вопрос в чат
        </h1>

        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="quickTopic in quickTopics"
            :key="quickTopic.label"
            :icon="quickTopic.icon"
            :label="quickTopic.label"
            size="sm"
            color="neutral"
            variant="outline"
            class="rounded-full"
            @click="createTopic(quickTopic.id, quickTopic.label)"
          />
        </div>

        <UChatPrompt
          v-model="input"
          :status="loading ? 'streaming' : 'ready'"
          class="[view-transition-name:chat-prompt]"
          variant="subtle"
          @submit="onSubmit"
        >
          <UChatPromptSubmit color="neutral" />

          <template #footer>
            <ModelSelect v-model="model" />
          </template>
        </UChatPrompt>

        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="quickChat in bufferChats"
            :key="quickChat.description"
            :icon="quickChat.icon"
            :label="quickChat.label"
            size="sm"
            color="neutral"
            variant="outline"
            class="rounded-full"
            @click="createChat(quickChat.label, quickChat.description)"
          />
        </div>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
