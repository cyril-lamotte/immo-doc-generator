<script setup lang="ts">
  import { inject } from 'vue'

  // Get reactive data from App.vue.
  const data:any = inject('data')!
</script>

<template>
  <header>
    <div class="header-layout">
      <div class="recipient">
        <p class="name">
          <span class="uppercase editable">{{ data.name }}</span>
          <em>(Locataire)</em>
        </p>
        <address class="editable">{{ data.address }}</address>
      </div>

      <div class="sender">
        <p class="name">
          <span class="uppercase editable">{{ data.sender_name }}</span>
          <em>(Bailleur)</em>
        </p>
        <address class="editable">
          {{ data.sender_address }}
        </address>
      </div>
    </div>
  </header>
</template>
