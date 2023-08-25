<script setup lang="ts">
  import { computed, inject } from 'vue'

  const data:any = inject('data')

  type StringObject = {
    name: string
  }

  // Generate link.
  const queryLink = computed(() => {
    let query = window.location.origin + '?';

    const dataString: any = {};
    for (const key of Object.keys({...data})) {
      dataString[key] = data[key as keyof StringObject].toString()
    }

    const searchParams = new URLSearchParams(dataString);
    return query + searchParams.toString();
  });

  const monthObjects = Array.from({ length: 12 }, (_, i) => {
    return {
      index: i + 1,
      name: new Date(2022, i).toLocaleString("default", { month: "long" })
    };
  });

  function print() {
    window.print();
  }

</script>

<template>
<form class="setting-form">

  <div class="form-row">
    <textarea :value="queryLink"></textarea>
    <a :href="queryLink">Lien direct avec ces données</a>
  </div>

  <div class="form-row">
    <label for="sender_name">Expéditeur</label>
    <input type="text" name="sender_name" id="sender_name" :value="data.sender_name"
      @input="event => data.sender_name = (event.target as HTMLInputElement).value">
  </div>

  <div class="form-row">
    <label for="sender_address">Adresse expéditeur</label>
    <textarea type="text" name="sender_address" id="sender_address"
      :value="data.sender_address"
      @input="event => data.sender_address = (event.target as HTMLInputElement).value">
    </textarea>
  </div>

  <div class="form-row">
    <label for="name">Civilité et nom</label>
    <input type="text" name="name" id="name" :value="data.name"
      @input="event => data.name = (event.target as HTMLInputElement).value">
  </div>

  <div class="form-row">
    <label for="address">Adresse</label>
    <textarea type="text" name="address" id="address"
      :value="data.address"
      @input="event => data.address = (event.target as HTMLInputElement).value">
    </textarea>
  </div>

  <div class="form-row">
    <label for="quarter">Trimestre de référence</label>
    <select name="quarter" id="quarter"
      :value="data.quarter"
      @input="event => data.quarter = Number((event.target as HTMLInputElement).value)">
      <option value="1">1er trimestre</option>
      <option value="2">2ème trimestre</option>
      <option value="3">3ème trimestre</option>
      <option value="4">4ème trimestre</option>
    </select>
  </div>

  <div class="form-row">
    <label for="year">Année du dernier T{{ data.quarter }} de référence </label>
    <select name="year" id="year"
      :value="data.irl_current_year"
      @input="event => data.irl_current_year = Number((event.target as HTMLInputElement).value)">
      <option :value="new Date().getFullYear()">{{ new Date().getFullYear() }}</option>
      <option :value="new Date().getFullYear()-1">{{ new Date().getFullYear()-1 }}</option>
    </select>
  </div>

  <div class="form-row">
    <label for="irl_previous">IRL précédent (T{{ data.quarter }} {{ data.irl_current_year - 1 }})</label>
    <input type="number" name="irl_previous" id="irl_previous" :value="data.irl_previous"
      @input="event => data.irl_previous = Number((event.target as HTMLInputElement).value)">
  </div>

  <div class="form-row">
    <label for="irl_current">Dernier IRL (T{{ data.quarter }} {{ data.irl_current_year }})</label>
    <input type="number" name="irl_current" id="irl_current" :value="data.irl_current"
      @input="event => data.irl_current = Number((event.target as HTMLInputElement).value)">
  </div>

  <div class="form-row">
    <label for="charges">Charges locatives (&euro;)</label>
    <input type="number" name="charges" id="charges" :value="data.charges"
      @input="event => data.charges = Number((event.target as HTMLInputElement).value)">
  </div>

  <div class="form-row">
    <label for="previous_income">Loyer précédent (&euro;)</label>
    <input type="number" name="previous_income" id="previous_income" :value="data.previous_income"
      @input="event => data.previous_income = Number((event.target as HTMLInputElement).value)">
  </div>

  <div class="form-row">
    <label for="month">Anniversaire du bail</label>
    <select name="month" id="month"
      :value="data.month"
      @input="event => data.month = Number((event.target as HTMLInputElement).value)">
      <option v-for="(month, index) in monthObjects" :key="index" :value="index">{{ month.name }}</option>
    </select>
  </div>

  <button type="button" @click="print()" class="submit">Générer le PDF</button>

</form>
</template>
