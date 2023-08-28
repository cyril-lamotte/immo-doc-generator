<script setup lang="ts">
  import { inject } from 'vue'

  const data:any = inject('data')

  const monthObjects = Array.from({ length: 12 }, (_, i) => {
    return {
      index: i + 1,
      name: new Date(2022, i).toLocaleString("default", { month: "long" })
    };
  });

  const receiptMonth = Number(0);

</script>

<template>

  <div class="form-row">
    <fieldset class="form-group">
      <legend>Propriétaire</legend>

      <div class="form-row">
        <label for="month">Mois</label>
        <select name="month" id="month"
          :value="receiptMonth"
          @change="event => receiptMonth = Number((event.target as HTMLInputElement).value)">
          <option v-for="(month, index) in monthObjects" :key="index" :value="index">{{ month.name }}</option>
        </select>
      </div>
<!--
      <div class="form-row">
        <label for="month">Année</label>
        <select name="month" id="month"
          value="1"
          @input="event => data.month = Number((event.target as HTMLInputElement).value)">
          <option v-for="(month, index) in monthObjects" :key="index" :value="index">{{ month.name }}</option>
        </select>
      </div> -->

    </fieldset>
  </div>
</template>
