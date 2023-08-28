<script setup lang="ts">
  import { ref, inject } from 'vue'
  import DataForm from '@/views/DataForm.vue'
  import DocumentHeader from '@/views/DocumentHeader.vue'
  import DocumentObject from '@/views/DocumentObject.vue'
  import RentReceiptForm from '@/views/RentReceiptForm.vue'

  // Get reactive data from App.vue.
  const data:any = inject('data')!

  let object = ref();
  let month = ref();
  let year = ref();

  // Default value for month and year.
  monthUpdate(new Date().getMonth());
  yearUpdate(new Date().getFullYear());

  object.value = getObject();

  function getObject() {
    return `Quittance de loyer pour ${month.value} ${year.value}`;
  }

  function monthUpdate(monthNumber: number) {
    month.value = new Date(2010, monthNumber, 1).toLocaleString('default', { month: 'long' });
    object.value = getObject();
  }

  function yearUpdate(yearNumber: number) {
    year.value = yearNumber;
    object.value = getObject();
  }

</script>

<template>
  <div class="main-layout">

    <div class="setting-form">
      <RentReceiptForm @month-update="monthUpdate" @year-update="yearUpdate"></RentReceiptForm>
      <!-- <DataForm></DataForm> -->
    </div>

    <div class="document">

      <DocumentHeader></DocumentHeader>
      <DocumentObject :object="object"></DocumentObject>

      <div class="content">

        <h2>Adresse de la location</h2>

        <p class="editable">{{ data.address }}</p>

        <p>Je soussigné {{ data.sender_name }}, propriétaire du logement désigné ci-dessus,
          déclare avoir reçu de <span class="editable">{{ data.name }}</span>
          la somme <span class="editable">{{ data.rent }}</span> euros,
          au titre du paiement du loyer et des charges pour la période de location
          <strong>{{ month }} {{ year }}</strong> et lui en donne quittance,
          sous réserve de tous mes droits.</p>

        <h2>Détail du règlement</h2>

        <p>
          Loyer : 459 €
          Provision pour charges : 90 €
          Total : 549 €

          Date du paiement : le 05/07/2023
        </p>

      </div>

      <p class="signature">Le {{ new Date().toLocaleString('fr-FR', { day: 'numeric', month: 'long', year:"numeric"}) }}</p>

    </div>
  </div>
</template>
