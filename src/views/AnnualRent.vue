<script setup lang="ts">
  import { computed, inject } from 'vue'

  const data:any = inject('data')!

  // Computed % increase.
  const increase = computed(() => {
    return Math.min(parseFloat(((Math.abs(data.irl_previous - data.irl_current)) * 100 / 101).toFixed(2)), 3.50)
  });

  // Computed new income.
  const newIncome = computed(() => {
    const income = (data.previous_income * data.irl_current) / data.irl_previous + data.charges;
    return income.toFixed(2);
  });

  // Computed month name.
  const month = computed(() => {
    return new Date(2010, data.month, 1).toLocaleString('default', { month: 'long' });
  });

</script>

<template>
<main>

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
    <p>Objet&nbsp;: <strong>Révision annuelle du loyer {{ new Date().getFullYear() }}</strong></p>
  </div>

  <div class="content">
    <p>Bonjour <span class="editable">{{ data.name }}</span>,</p>

    <p>
      Dans le cadre de la révision annuelle des loyers, à l'anniversaire
      du bail, votre loyer est indexé sur le nouvel
      <i>Indice de Référence des Loyers</i> (IRL).
    </p>

    <h2>
      Évolution de l'IRL du <span class="editable">{{ data.quarter }}</span>
      <sup>ème</sup> trimestre (Source : ANIL)
    </h2>

    <p>{{ data.irl_current_year - 1 }} : <strong class="editable">{{ data.irl_previous }}</strong></p>
    <p>{{ data.irl_current_year }} : <strong class="editable">{{ data.irl_current }} (+{{ increase }}%)</strong></p>

    <h2>Nouveau loyer</h2>

    <p>(Loyer précédent &times; nouvel IRL ) / IRL précédent + Charges locatives = <strong>Nouveau loyer</strong></p>
    <code class="editable">
      ( {{ data.previous_income }} x {{ data.irl_current }} )
      /
      {{ data.irl_previous }} + {{ data.charges }} = {{ newIncome }}&nbsp;€
    </code>

    <p>Votre nouveau loyer, charges comprises, à partir de
      <strong class="editable"><u>{{ month }} {{ new Date().getFullYear() }}</u></strong>&nbsp;:
    </p>
    <code class="total editable"><strong>{{ newIncome }} €</strong></code>

    <p>Pouvez-vous prendre les dispositions nécessaires pour mettre à jour
      votre virement&nbsp;?</p>

    <p class="spacing-1">Bien cordialement,</p>

  </div>

  <p class="signature">Le {{ new Date().toLocaleString('fr-FR', { day: 'numeric', month: 'long', year:"numeric"}) }}</p>

</main>
</template>
