<script setup lang="ts">
  import { reactive, onMounted, provide } from 'vue'
  import DataForm from "@/views/DataForm.vue"
  import AnnualRent from "@/views/AnnualRent.vue"

  // Default data.
  const dataDefault:any = {
    sender_name: 'M. Y',
    sender_address: '78 bd Matoni<br>53100 Mayenne',
    name: 'M. X',
    address: '6 rue Late<br>53100 Mayenne',
    quarter: 1,
    irl_previous: 100,
    irl_current: 105,
    irl_current_year: 2022,
    previous_income: 300,
    charges: 0.0,
    month: 1,
  };

  // Make this object reactive.
  let data = reactive(dataDefault);
  provide('data', data);

  onMounted(() => {
    getUrlQueryParams();
  });

  function getUrlQueryParams() {
    const url = new URL(window.location.href);
    const search_params = new URLSearchParams(url.search);

    // Fill data object with params.
    for (const param of search_params) {
      if (['name', 'address', 'sender_name', 'sender_address'].includes(param[0])) {
        data[param[0]] = param[1];
      } else {
        data[param[0]] = parseFloat(param[1]);
      }
    }
  }
</script>

<template>

  <DataForm></DataForm>
  <AnnualRent></AnnualRent>

</template>
