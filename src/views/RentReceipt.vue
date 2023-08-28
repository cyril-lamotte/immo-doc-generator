<script setup lang="ts">
  import { inject } from 'vue'
  import DataForm from '@/views/DataForm.vue'
  import DocumentHeader from '@/views/DocumentHeader.vue'
  import DocumentObject from '@/views/DocumentObject.vue'
  import ReceiptForm from '@/views/ReceiptForm.vue'

  // Get reactive data from App.vue.
  const data:any = inject('data')!

  // Document object.
  const object = `Quittance de loyer du mois MOIS ANNEE`;

</script>

<template>
  <div class="main-layout">

    <DataForm></DataForm>
    <ReceiptForm></ReceiptForm>

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
          du 01/07 au 31/07 2023 et lui en donne quittance,
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
