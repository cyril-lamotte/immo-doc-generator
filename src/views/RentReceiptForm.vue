<script setup lang="ts">
  import { defineEmits } from 'vue'

  defineEmits(['monthUpdate', 'yearUpdate'])

  // Get array of month objects.
  const monthObjects = Array.from({ length: 12 }, (_, i) => {
    return {
      index: i + 1,
      name: new Date(2022, i).toLocaleString("default", { month: "long" })
    };
  });

</script>

<template>

  <div class="form-row">
    <fieldset class="form-group">
      <legend>Quittance</legend>

      <div class="form-row">
        <label for="month">Mois</label>
        <select name="month" id="month"
          :value="new Date().getMonth()"
          @change="$emit('monthUpdate', $event.target.value)">
          <option v-for="(month, index) in monthObjects" :key="index" :value="index">{{ month.name }}</option>
        </select>
      </div>

      <div class="form-row">
        <label for="receipt-year">Année</label>
        <select name="receipt-year" id="receipt-year"
          :value="new Date().getFullYear()"
          @change="$emit('yearUpdate', $event.target.value)">
          <option :value="new Date().getFullYear()">{{ new Date().getFullYear() }}</option>
          <option :value="new Date().getFullYear()-1">{{ new Date().getFullYear()-1 }}</option>
        </select>
      </div>

      Ajouter le montant du loyer hors charges
      Montant des charges
      Calculer le montant total du loyer

    </fieldset>
  </div>
</template>
