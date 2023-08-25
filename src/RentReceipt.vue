<script setup lang="ts">
  import { computed, inject } from 'vue'

  // Get reactive data from App.vue.
  const data:any = inject('data')!

  // Computed month name.
  const month = computed(() => {
    return new Date(2010, data.month, 1).toLocaleString('default', { month: 'long' });
  });

</script>

<template>
<div class="document">

  <header>

    <div class="header-layout">
      <div class="recipient">
        <p class="name">
          <span class="uppercase editable">{{ data.name }}</span>
        </p>
        <address class="editable">{{ data.address }}</address>
      </div>

      <div class="sender">
        <p class="name editable">
          {{ data.sender_name }}
        </p>
        <address class="editable">
          {{ data.sender_address }}
        </address>
      </div>
    </div>

  </header>

  <div class="object">
    <p>Objet&nbsp;: <strong>Quittance de loyer du mois MOIS ANNEE</strong></p>
  </div>

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
</template>
