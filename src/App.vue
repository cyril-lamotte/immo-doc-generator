<script setup lang="ts">
  import { reactive, computed, onMounted } from 'vue'

  const dataDefault = {
    name: 'Nom',
    address: 'Adresse',
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

  onMounted(() => {
    getUrlQueryParams();
  });

  function getUrlQueryParams() {
    const url = new URL(window.location.href);
    const search_params = new URLSearchParams(url.search);

    // Get all the available keys.
    for (const key of Object.keys(data)) {
      if (search_params.get(key)) {
        let typedValue;
        if (key == 'name' || key == 'address' ) {
          typedValue = search_params.get(key)
        } else {
          typedValue = parseFloat(search_params.get(key));
        }

        data[key] = typedValue;
      }
    }
  }

  // Generate link.
  const queryLink = computed(() => {
    let query = window.location.origin + '?';
    const searchParams = new URLSearchParams(data);
    return query + searchParams.toString();
  });

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

  const monthObjects = Array.from({ length: 12 }, (_, i) => {
    return {
      index: i + 1,
      name: new Date(2022, i).toLocaleString("default", { month: "long" })
    };
  });

  const autocomplete:any = {
    'stb': {
      name: 'M. Cornu',
      address: '7 rue de la croix Melleray<br>53100 Mayenne',
      quarter: 4,
      irl_previous: 132.62,
      irl_current: 137.26,
      irl_current_year: 2022,
      previous_income: 394.68,
      charges: 20,
      month: 2,
    },
    'jf': {
      name: 'M. X',
      address: '29 rue Jules Ferry<br>53100 Mayenne',
      quarter: 3,
      irl_previous: 132,
      irl_current: 137,
      irl_current_year: 2022,
      previous_income: 320,
      charges: 0,
      month: 1,
    },
    'ch': {
      name: 'Mme Dubois',
      address: '64 rue du Dr Chabrun<br>53100 Mayenne',
      quarter: 3,
      irl_previous: 132,
      irl_current: 137,
      irl_current_year: 2022,
      previous_income: 449,
      charges: 0,
      month: 9,
    },
  };

  function completeForm(code: string) {
    data.name = autocomplete[code].name;
    data.address = autocomplete[code].address;
    data.quarter = autocomplete[code].quarter;
    data.irl_previous = autocomplete[code].irl_previous;
    data.irl_current = autocomplete[code].irl_current;
    data.irl_current_year = autocomplete[code].irl_current_year;
    data.previous_income = autocomplete[code].previous_income;
    data.charges = autocomplete[code].charges;
    data.month = autocomplete[code].month;
  }

  function print() {
    window.print();
  }

</script>

<template>

  <form class="setting-form">

    <div class="form-row">
      <textarea :value="queryLink"></textarea>
      <a :href="queryLink">Lien</a>
    </div>

    <div class="form-row">
      <label for="name">Civilité et nom</label>
      <input type="text" name="name" id="name" :value="data.name"
        @input="event => data.name = event.target.value">
    </div>

    <div class="form-row">
      <label for="address">Adresse</label>
      <textarea type="text" name="address" id="address"
        :value="data.address"
        @input="event => data.address = event.target.value"
      ></textarea>
    </div>

    <div class="form-row">
      <label for="quarter">Trimestre de référence</label>
      <select name="quarter" id="quarter"
        :value="data.quarter"
        @input="event => data.quarter = event.target.value">
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
        @input="event => data.irl_current_year = event.target.value">
        <option :value="new Date().getFullYear()">{{ new Date().getFullYear() }}</option>
        <option :value="new Date().getFullYear()-1">{{ new Date().getFullYear()-1 }}</option>
      </select>
    </div>

    <div class="form-row">
      <label for="irl_previous">IRL précédent (T{{ data.quarter }} {{ data.irl_current_year - 1 }})</label>
      <input type="number" name="irl_previous" id="irl_previous" :value="data.irl_previous"
        @input="event => data.irl_previous = event.target.value">
    </div>

    <div class="form-row">
      <label for="irl_current">Dernier IRL (T{{ data.quarter }} {{ data.irl_current_year }})</label>
      <input type="number" name="irl_current" id="irl_current" :value="data.irl_current"
        @input="event => data.irl_current = event.target.value">
    </div>

    <div class="form-row">
      <label for="charges">Charges locatives (&euro;)</label>
      <input type="number" name="charges" id="charges" :value="data.charges"
        @input="event => {
          return data.charges = Number(event.target.value)
        }">
    </div>

    <div class="form-row">
      <label for="previous_income">Loyer précédent (&euro;)</label>
      <input type="number" name="previous_income" id="previous_income" :value="data.previous_income"
        @input="event => data.previous_income = event.target.value">
    </div>

    <div class="form-row">
      <label for="month">Anniversaire du bail</label>
      <select name="month" id="month"
        :value="data.month"
        @input="event => data.month = event.target.value">
        <option v-for="(month, index) in monthObjects" :key="index" :value="index">{{ month.name }}</option>
      </select>
    </div>

    <button type="button" @click="print()" class="submit">Générer le PDF</button>

  </form>

  <main>

      <header>

        <div class="header-layout">
          <div class="recipient">
            <p class="name">
              <span class="uppercase editable">{{ data.name }}</span>
            </p>
            <address v-html="data.address" class="editable"></address>
          </div>

          <div class="sender">
            <p class="name">
              Vanessa <span class="uppercase">Lebrun</span> /
              Cyril <span class="uppercase">Lamotte</span>
            </p>
            <address>
              175 rue Louis Blériot<br>
              53100 Mayenne
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

        <p>Nouveau loyer = (Loyer précédent &times; nouvel IRL ) / IRL précédent + Charges locatives</p>
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

      <p class="signature">Vanessa &amp; Cyril, le {{ new Date().toLocaleString('fr-FR', { day: 'numeric', month: 'long', year:"numeric"}) }}</p>
      <p class="align-right"><img width="200" src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUzLjA1bW0iIGhlaWdodD0iNjguMTU3bW0iIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDE1My4wNSA2OC4xNTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1Ljc4NyAtMjEuNDYzKSI+CiAgICA8cGF0aCBkPSJtMTM0Ljg5IDg5LjI1OWMtMS41OTg2LTAuMzc1MTktNC45OTktMi43MTgyLTguMjk5NC01LjcxODctMS4yNzctMS4xNjEtMy4wMzYyLTIuNDIyOC0zLjkwOTMtMi44MDQtNC41MjY5LTEuOTc2Ni0xNi45MDItNy44Mjc0LTI2LjI4Mi0xMi40MjYtMTQuNTIxLTcuMTE4OC0xNS44MzMtNy43Mzg3LTI0Ljg3MS0xMS43NDUtMTAuMzA4LTQuNTY5OS0xNi45NjctNy40MzMzLTIxLjM0My05LjE3NzMtMTUuMzExLTYuMTAxOC0yNS43NjgtMTAuODIyLTMwLjAwMi0xMy41NDQtMy4yODY1LTIuMTEyNC00LjM5MzgtMy40NDcyLTQuMzkzOC01LjI5NjIgMC0yLjA1MDEgMS42NDgxLTMuNTE3IDUuMjE2OC00LjY0MzQgOS40MzI3LTIuOTc3MSAyMy4xNzYtMy4yMzEyIDQxLjE3NC0wLjc2MTE2IDIuMTM0MyAwLjI5MjkzIDUuOTQ0MyAwLjc2NjY4IDguNDY2NyAxLjA1MjggMi41MjI0IDAuMjg2MTIgNS42OTc0IDAuNjgxMzUgNy4wNTU2IDAuODc4MjkgMS4zNTgyIDAuMTk2OTQgMy4zNDI2IDAuMzYzNjUgNC40MDk3IDAuMzcwNDYgMS4zODQ3IDllLTMgMS43ODg4IDAuMTEwMzEgMS40MTExIDAuMzU0MzctMC44NDU0MSAwLjU0NjM1IDAuMDM4NzIgMC40MDYzMiAxLjY3MDctMC4yNjQ1OCAxLjUwNTYtMC42MTg5NSAxLjk1ODItMS4xNDY1IDAuOTgzNy0xLjE0NjUtMC4yODYzNSAwLTEuMDI2OS0wLjMwNzktMS42NDU3LTAuNjg0MjJsLTEuMTI1MS0wLjY4NDIxIDAuODkwMDgtMC4yMjM0YzAuNTAxNTYtMC4xMjU4OSAxLjQzODQgNmUtMyAyLjE0NjEgMC4zMDE0MSAwLjY5MDgzIDAuMjg4NjUgMS4zMzQ4IDAuNDQ2MDkgMS40MzEgMC4zNDk4NyAwLjA5NjIyLTAuMDk2MiAwLjUwMDEzLTFlLTMgMC44OTc1OCAwLjIxMTc5IDEuNzEzMiAwLjkxNjg3LTAuODg4NSAyLjYzMDMtNC40NjU1IDIuOTQwOS0zLjA4MjggMC4yNjc2OS02LjYxNTEtMC4wNzQyLTI0LjI0My0yLjM0NjgtMTMuNjk1LTEuNzY1NS0yMS42NTctMS45NTE5LTMwLjUwNS0wLjcxNDE3LTcuMDg0NSAwLjk5MTA3LTEwLjQwMSAyLjAzODYtMTEuODMgMy43MzY5LTEuMTkxOSAxLjQxNjUtMS4xMTIxIDIuMDQ1OCAwLjQ0MjI5IDMuNDg2OCAyLjA2MyAxLjkxMjYgMy4zNDQ0IDIuNzA0NyA4LjU4MTEgNS4zMDQzIDQuNjE5MSAyLjI5MyA1Ljg5MDIgMi44NTYyIDEwLjI5MyA0LjU1OTcgMS4wMTg2IDAuMzk0MTggMi4xNjk2IDAuODYwOTcgMi41NTc2IDEuMDM3MyAxLjQ2NjEgMC42NjYyMyA5LjQ0MDIgMy45NTQ2IDEwLjY5IDQuNDA4NCAwLjcxNzM4IDAuMjYwNDYgMi4wOTgxIDAuODM3MTMgMy4wNjgyIDEuMjgxNSAwLjk3MDE0IDAuNDQ0MzYgMS45NTU1IDAuODQxMjEgMi4xODk2IDAuODgxODkgMC4yMzQxNCAwLjA0MDcgMC45NDg1MSAwLjM0MDUzIDEuNTg3NSAwLjY2NjM0czIuMzUyNCAxLjA0MTggMy44MDc2IDEuNTkxMmMxLjQ1NTIgMC41NDkzNSAzLjEyMjEgMS4yMzgyIDMuNzA0MiAxLjUzMDcgMC41ODIwOCAwLjI5MjU0IDQuNjMwMiAyLjE1IDguOTk1OCA0LjEyNzYgOC42ODMgMy45MzM0IDEyLjE1NSA1LjU1NDIgMTcuMzc0IDguMTA5NyAxLjg5MTggMC45MjYzMiAzLjQzOTYgMS41MjYgMy40Mzk2IDEuMzMyNSAwLTAuNDk1MjgtMi45OTU5LTUuOTkyMS00LjgzMjItOC44NjYyLTIuMDAwMy0zLjEzMDYtNC45NDg0LTYuMTE5OS01LjQ5NTctNS41NzI1LTAuNTk2ODEgMC41OTY4MS0xLjMxMzUgMC40NzY0Ni0xLjMxNTQtMC4yMjA5MS0wLjAwMTEtMC4zMzk1NC0wLjQwOTMyLTEuMDkzNi0wLjkwNzQ2LTEuNjc1Ny0wLjQ5ODE0LTAuNTgyMDgtMC43OTU2OS0wLjg0NDA2LTAuNjYxMjMtMC41ODIxNiAwLjE5NzAyIDAuMzgzNzIgMC4wOTkyMyAwLjM5ODQzLTAuNTAzNjUgMC4wNzU4LTAuNDExNDctMC4yMjAyMi0wLjc0ODEzLTAuNDgzNTUtMC43NDgxMy0wLjU4NTE4IDAtMC4xMDE2NCAwLjE5ODQ0LTAuMDgyMyAwLjQ0MDk3IDAuMDQzIDAuMjQyNTMgMC4xMjUzIDAuMDQ0MS0wLjA5OTktMC40NDA5Ny0wLjUwMDUtMC44ODYwOS0wLjczMTc1LTEuMjg3My0wLjg4ODE0LTEuOTQwMy0wLjc1NjM5LTAuMTk0MDMgMC4wMzkxLTAuMjMxOTgtMC4wNDk2LTAuMDg0MzUtMC4xOTcyNiAwLjMxMzAzLTAuMzEzMDMtNC4zNDk3LTMuMzQ0OC00Ljc1Ny0zLjA5My0wLjE1MDY3IDAuMDkzMS0wLjI3Mzk1IDAuMDE1NC0wLjI3Mzk1LTAuMTcyNjYgMC0wLjUwNC00LjA2NS0yLjk4MzEtNy45NDU2LTQuODQ1OC0zLjA3MDEtMS40NzM3LTQuMTI0Mi0yLjMwNDQtMy41OTUyLTIuODMzMyAwLjEwMzM4LTAuMTAzMzkgMS4yNzM5IDAuMjg2MDUgMi42MDEyIDAuODY1NDIgMS4zMjczIDAuNTc5MzYgNC45NTMyIDIuMDEyIDguMDU3NyAzLjE4MzYgNC42OTI0IDEuNzcwOSAxMS45OTYgNC42NjU3IDE4LjYxMyA3LjM3NzQgMC43Mjk2OSAwLjI5OTAzIDEuNDAxNiAwLjQ2ODg2IDEuNDkzIDAuMzc3MzkgMC4wOTE0Ny0wLjA5MTUtMC4xNjUyNi0xLjI2NzItMC41NzA1Mi0yLjYxMjYtMC40ODExNi0xLjU5NzUtMC43NTQzOS0zLjU0OC0wLjc4NzQ2LTUuNjIxMy0wLjA0NTY4LTIuODYzOSAwLjA0MjctMy4zMzM4IDAuOTAyMDItNC43OTU1IDAuNTIzOTYtMC44OTEyNyAxLjU1NTgtMi4wODE5IDIuMjkzMS0yLjY0NTggMy40NTUtMi42NDI5IDkuNDYxNy0wLjI0OTc5IDE2LjMyMiA2LjUwMyA0LjM2NjMgNC4yOTc5IDEwLjQ1MSAxMi44NyAxNC42NTQgMjAuNjQyIDAuOTA2MDkgMS42NzU4IDEuODMxOSAzLjE2NTcgMi4wNTcyIDMuMzEwOSAwLjQ1MDU1IDAuMjkwMjYgMS40OTI3IDAuNzQ4ODggMTEuMzQ2IDQuOTkyOSA4LjU3NTMgMy42OTM2IDI1LjUyOCAxMi4xMjQgMjcuNDUxIDEzLjY1MSAzLjU2OSAyLjgzNDcgMy4zMzM1IDIuNTg3MyAyLjQ3NjMgMi42MDE1LTAuNDIwMzkgN2UtMyAtMC44MTc5MS0wLjE0Nzk5LTAuODgzMzgtMC4zNDQzOS0wLjM4MDMzLTEuMTQxLTE2LjgyMi05LjQ0NzktMjguNjkxLTE0LjQ5Ni00LjA3NDYtMS43MzMtOC4wODMtMy40NjM1LTguOTA3Ni0zLjg0NTYtMS4xNTg1LTAuNTM2ODctMS40OTkzLTAuNTg1NzYtMS40OTkzLTAuMjE1MDkgMCAwLjI2MzgzIDEuNTg3NSAzLjc0MzIgMy41Mjc4IDcuNzMxOSAxLjk0MDMgMy45ODg3IDMuNTI3OCA3LjQ3NDkgMy41Mjc4IDcuNzQ3MiAwIDAuMjcyMjYgMC4xMTc3MiAwLjYxMjc1IDAuMjYxNjEgMC43NTY2NHMwLjU4MDQ1IDEuMTU3OCAwLjk3MDE0IDIuMjUzMWMwLjY0Nzk3IDEuODIxMyAwLjgyOTEzIDIuMDI1MyAyLjExOTYgMi4zODY0IDAuODc4NyAwLjI0NTkgMS40NTc4IDAuNjM1MDYgMS41MzUgMS4wMzE0IDAuMTA5MDIgMC41NjAzNS0wLjA1MjUgMC42MDgzNi0xLjM0OTQgMC40MDA5OS0xLjM4MDQtMC4yMjA3Mi0xLjQ1ODQtMC4xODg5OC0xLjIzODYgMC41MDM2NiAwLjIxNzAzIDAuNjgzNzktMC42NDUyNiAyLjE1OTEtMS4yMDY2IDIuMDY0NC0wLjExNTQ1LTAuMDE5NS0wLjgyNzg3LTAuMTgwNDctMS41ODMyLTAuMzU3NzJ6bTEuOTAyNC0xLjU0NzFjMC0wLjU5NzI2LTEuMjIzNi0xLjk0MDMtMS43Njc3LTEuOTQwMy0wLjE5NjE0IDAtMS4wMjk2LTAuMzEwMDgtMS44NTIxLTAuNjg5MDctMi4zNzA0LTEuMDkyMi01LjI3ODMtMi4xNzIxLTUuNDMyOS0yLjAxNzUtMC4wNzc4IDAuMDc3OCAwLjI2NTM2IDAuNDA4MTMgMC43NjI2NiAwLjczMzk4IDAuNDk3MzEgMC4zMjU4NSAwLjgyMTUxIDAuNzI2MjQgMC43MjA0NSAwLjg4OTc2czAuMDgzMSAwLjUxMzczIDAuNDA5MjYgMC43NzgyNWMwLjUwMTk2IDAuNDA3MTEgMC41NDc5OCAwLjQwNjIyIDAuMjk5NzgtNmUtMyAtMC4yMDM4NS0wLjMzODQtMC4xNDM4NS0wLjQzMjQ4IDAuMTk2ODctMC4zMDg2OCAwLjI2OTU0IDAuMDk3OSAwLjQzNzE2IDAuMzk2MzMgMC4zNzI0OSAwLjY2MzEyLTAuMDY0NyAwLjI2Njc5LTVlLTMgMC4zNzI4OCAwLjEzMTczIDAuMjM1NzUgMC4xMzcxMy0wLjEzNzEzIDAuNzUwNDIgMC4xMzI4NyAxLjM2MjggMC42IDIuMDI2IDEuNTQ1MyA0Ljc5NjYgMi4xNTc4IDQuNzk2NiAxLjA2MDR6bS0xLjA1ODMtMy42MjRjMC0wLjc5NjMxLTIuNDU3OC02LjQxODYtNS43Njc4LTEzLjE5NC0yLjg5NTYtNS45MjctMy45MTYxLTcuNzAwNy00LjUzOTktNy44OTA1LTAuODEwMzQtMC4yNDY1Ni02LjI5ODEtMi41MjU4LTguOTE4Ni0zLjcwNDEtMC43NzYxMS0wLjM0ODk5LTQuMzQ4LTEuODQ5Mi03LjkzNzUtMy4zMzM4LTMuNTg5NS0xLjQ4NDYtNy44MjM5LTMuMjQzNy05LjQwOTgtMy45MDkxLTMuODY1Mi0xLjYyMTgtNC4xMTc4LTEuNjAyNy0zLjgyODkgMC4yODk0OCAwLjEyNTkgMC44MjQ2MSAwLjM2MDE2IDEuODk2MiAwLjUyMDU4IDIuMzgxMiAwLjE2MDQyIDAuNDg1MDYgMC40NjgzIDEuNTM1NiAwLjY4NDE5IDIuMzM0NSAwLjMwMDU1IDEuMTEyMiAwLjc0Mzc4IDEuNjgyNSAxLjg5MTcgMi40MzQxIDIuMzk2OCAxLjU2OTQgOC40Nzg2IDYuMzA4OSAxNC4yMzIgMTEuMDkxIDExLjA2NSA5LjE5NjcgMTEuNjQ0IDkuNTc3MiAxOS4wMTggMTIuNDkgMy4yNTkzIDEuMjg3NSA0LjA1NyAxLjQ4NjQgNC4wNTcgMS4wMTE0em0tMTguODQtOC41NjgzYy0xLjI1NzItMS4xNzYtMi43NjgxLTIuNDg1Ny0zLjM1NzctMi45MTA0LTIuNjY4OC0xLjkyMjYtNi4yOTIyLTUuMDMwMi02LjE0NDktNS4yNzAxIDAuMDg5My0wLjE0NTUyLTAuMTAxODUtMC4yNjQ1OC0wLjQyNDg0LTAuMjY0NTgtMC41MzE3MyAwLTEuNzUxNy0wLjgxMjYyLTMuNDIzMS0yLjI4MDItMC4zMzk1NS0wLjI5ODEzLTAuNzM2NDItMC41NDI4MS0wLjg4MTk0LTAuNTQzNzQtMC4xNDU1Mi0xZS0zIC0wLjgzNDU0LTAuNTE2ODctMS41MzEyLTEuMTQ2NS0xLjQ3NDItMS4zMzI1LTMuNDYwNC0yLjUzMjctMy43MzU4LTIuMjU3My0wLjEwNTA1IDAuMTA1MDYgMC4wODU4IDEuMDcxMiAwLjQyNDIxIDIuMTQ2OSAwLjM3NTggMS4xOTQ4IDAuNTQxODggMi41MDI3IDAuNDI2NzYgMy4zNjA5LTAuMTc5OCAxLjM0MDUtMC4xMzMzNiAxLjQyNDkgMS4wMTEzIDEuODM4OSAwLjY1OTg5IDAuMjM4NjEgMS4xOTk4IDAuNTYwNzEgMS4xOTk4IDAuNzE1NzYgMCAwLjE1NTA0IDAuMTg0OTIgMC4yODE5IDAuNDEwOTQgMC4yODE5IDAuMjI2MDMgMCAyLjQwODggMC45ODAyOCA0Ljg1MDcgMi4xNzg0IDguMzg2NiA0LjExNDkgMTIuOTA3IDYuMjY3MyAxMy4xODQgNi4yNzc4IDAuMTUyNjIgNmUtMyAtMC43NTEwOS0wLjk1MTcxLTIuMDA4Mi0yLjEyNzd6bS0yMC4xMjEtMTEuMzU2Yy0wLjEzNTY5LTEuNDA2Ny0wLjQ3MzcxLTIuOTA5Mi0wLjc1MTE0LTMuMzM5LTAuMjc3NDQtMC40Mjk3My0wLjUwNDQzLTEuMDIxNC0wLjUwNDQzLTEuMzE0OHMtMC4zOTU1MS0wLjc5MjYtMC44Nzg5MS0xLjEwOTNjLTAuNDgzNC0wLjMxNjc0LTAuNzkxNTMtMC43MTcyOC0wLjY4NDc0LTAuODkwMDggMC4xMDY4LTAuMTcyOC0wLjEwODA4LTAuMzE0MTktMC40Nzc1Mi0wLjMxNDE5LTAuMzY5NDMgMC0wLjk1OTAzLTAuMzE3NS0xLjMxMDItMC43MDU1Ni0wLjM1MTE5LTAuMzg4MDUtMC44Mzg4MS0wLjcwNTU1LTEuMDgzNi0wLjcwNTU1LTAuMjQ0OCAwLTAuNTE1OTctMC4xOTg0NC0wLjYwMjU4LTAuNDQwOTctMC4wODY2Mi0wLjI0MjU0LTAuMjg1NjgtMC4zMjEyOS0wLjQ0MjM2LTAuMTc1LTAuMTU2NjggMC4xNDYyOCAwLjAzOTU0IDAuNjIyNTMgMC40MzYwNSAxLjA1ODMgMC44Mzk1OCAwLjkyMjc3IDIuMzM1OCAzLjQ4OCA0LjQyMzIgNy41ODMzIDAuODE1ODkgMS42MDA3IDEuNjI3MyAyLjkxMDQgMS44MDMyIDIuOTEwNCAwLjE4NDQyIDAgMC4yMTUzMi0xLjA4MjQgMC4wNzMtMi41NTc2em0yOC4zNzgtMi41Mzg3YzAtMC42MTQ5MS03LjAxODYtMTEuODMzLTkuODMzNy0xNS43MTgtMS4wNTQ2LTEuNDU1Mi0zLjY3ODctNC4zOTIxLTUuODMxNC02LjUyNjQtNC4wOTcyLTQuMDYyMi03LjQ1NzgtNi4zNzMzLTkuODIzLTYuNzU1Ni0wLjcyNzYxLTAuMTE3NTgtMS4zMjI5LTAuMzMwMjMtMS4zMjI5LTAuNDcyNTVzLTAuMzk2ODctMC4xODI5LTAuODgxOTQtMC4wOTAyLTAuODgxOTUgMC4zMTgyLTAuODgxOTUgMC41MDEwNi0wLjE1ODc1IDAuMjM0MzYtMC4zNTI3OCAwLjExNDQ1Yy0wLjE5NDAyLTAuMTE5OTItMC4zNTI3Ny0wLjAyMzUtMC4zNTI3NyAwLjIxNDM2IDAgMC4yMzc4Mi0wLjEwMTE0IDAuMzMxMjUtMC4yMjQ3NiAwLjIwNzYzLTAuMzY3MjEtMC4zNjcyMS0yLjEzNjEgMS4wODI4LTIuOTczMiAyLjQzNzMtMC42OTA0OCAxLjExNzItMC43NTYwNiAxLjU4MzktMC41ODE1OCA0LjEzODggMC4xMDgxNiAxLjU4MzggMC40Mjg1NiAzLjU5NCAwLjcxMTk5IDQuNDY3MSAwLjI4MzQzIDAuODczMTMgMC43MTgxMSAyLjI2MjIgMC45NjU5NSAzLjA4NjggMC4yNDc4NCAwLjgyNDYyIDAuNDY2IDEuNDk5MyAwLjQ4NDc5IDEuNDk5MyAwLjAxODggMCAxLjc3OTMgMC43Mjc2OSAzLjkxMjMgMS42MTcxIDIuMTMzIDAuODg5NCA1Ljk0MTkgMi40NTQ4IDguNDY0MiAzLjQ3ODggNS45MTU4IDIuNDAxNSAxMS45MTcgNS4wMTMyIDE2LjIyOCA3LjA2MjcgMS44MDMgMC44NTcxNyAyLjI5MyAxLjAxNDYgMi4yOTMgMC43MzY3M3ptLTMxLjI4LTguODM3Ni0wLjk5ODg0LTMuMzU0OS0yLjY0NTgtMS4wMzQyYy0xLjQ1NTItMC41Njg3OC00LjYzMDItMS44NDkxLTcuMDU1Ni0yLjg0NTItMi40MjUzLTAuOTk2MDgtNS4xMjQxLTIuMDU2NC01Ljk5NzItMi4zNTYycy0yLjYwNDctMS4wMDQ2LTMuODQ4LTEuNTY2MmMtMi41ODIzLTEuMTY2NC0zLjE3NDYtMS4xMjk2LTEuMTk3NiAwLjA3NDUgMC43Mzc4MSAwLjQ0OTM3IDMuNjA4NiAyLjI5MzEgNi4zNzk0IDQuMDk3MiAyLjc3MDkgMS44MDQxIDUuMzk3MSAzLjI4MDIgNS44MzYxIDMuMjgwMiAwLjQ5NDU2IDAgMS40MDA5IDAuNjM3MzcgMi4zODI5IDEuNjc1NyAxLjc3OTkgMS44ODIgNy44NDYyIDYuMTkwOSA4LjAyNjYgNS43MDEzIDAuMDY0MjktMC4xNzQ0Ny0wLjMzMjU4LTEuODI2OS0wLjg4MTk0LTMuNjcyMXptLTEwLjE4NyA0LjY5MTVjLTAuNzY3NDgtMS4wMDg4LTIuMDY1NC0yLjU1NjYtMi44ODQ0LTMuNDM5Ni0wLjgxODkzLTAuODgyOTUtMS43MzkyLTIuMTIxMy0yLjA0NS0yLjc1MTktMC43NzM4OC0xLjU5NTYtMS4xNTA3LTEuNDMwMy0wLjk2NTcgMC40MjM2NCAwLjEzMjcgMS4zMjk4IDAuMDE5MDEgMS43MDc5LTAuNzQyNTggMi40Njk0LTEuMzk2MyAxLjM5NjMtMi4zOTM0IDEuMTg0My0zLjY1MjMtMC43NzY0Mi0xLjQyMjktMi4yMTYxLTMuMDAwNC01LjM3OTktMi42ODI1LTUuMzc5OSAwLjEzOTA5IDAgMC4wNjIzOS0wLjE5MDUtMC4xNzA0NC0wLjQyMzM0LTAuNTc2MTYtMC41NzYxNi0wLjUzMjA2LTAuOTg3NzcgMC4xMDU4My0wLjk4Nzc3IDAuMjkxMDQgMCAwLjUyOTE3IDAuMTQzNzMgMC41MjkxNyAwLjMxOTRzMC41NTU2MiAwLjk4NDQ0IDEuMjM0NyAxLjc5NzNjMC42NzkxIDAuODEyODMgMS4yMzQ3IDEuODY2MiAxLjIzNDcgMi4zNDA3czAuMzQxODUgMS4zMjUyIDAuNzU5NjYgMS44OTA0YzAuNjA3MzYgMC44MjE0OSAwLjg4ODA4IDAuOTU4NzcgMS40MDAyIDAuNjg0NzEgMC41NjMyOC0wLjMwMTQ2IDAuNjIwNDMtMC43MDM1MiAwLjQ3Mzk2LTMuMzM0OC0wLjEwNDQ1LTEuODc2NC0wLjAzNDYtMi45OTIxIDAuMTg3MzItMi45OTIxIDAuMTk0NjQgMCAwLjM1Mzg4IDAuMTYxMTQgMC4zNTM4OCAwLjM1ODA5czAuNzM1MzQgMS4xMDk4IDEuNjM0MSAyLjAyODVjMC44OTg3NCAwLjkxODcxIDIuMjY3MiAyLjUwMzggMy4wNDEgMy41MjI1IDAuNzczOCAxLjAxODYgMS41NTYgMS44NTIxIDEuNzM4MSAxLjg1MjFzMC4yMzk4OCAwLjE0Nzc5IDAuMTI4MjUgMC4zMjg0Yy0wLjExMTYzIDAuMTgwNjMtMC4wNDE2MiAwLjQyODEyIDAuMTU1NTcgMC41NDk5OSAwLjQ5MjY1IDAuMzA0NDggMC40NDkxOS0wLjQ2NTAxLTAuMTM2MTEtMi40MDk4LTAuNjM1OTUtMi4xMTMxLTAuMjU0OTYtMi4wODU2IDAuNzQ2MjkgMC4wNTM4IDIuNTc1NiA1LjUwMzQgMi4zNDI1IDcuNTM5Mi0wLjQ0Mzc0IDMuODc2OHptLTAuNjg5ODUtMzMuNDQ0Yy0wLjI3NzU5LTAuNDQ5MTUgMC41Mzk3MS0wLjQ0OTE1IDEuMjM0NyAwIDAuNDMwMiAwLjI3ODAyIDAuMzg0NjIgMC4zNDI5OC0wLjI0Mzc2IDAuMzQ3MzgtMC40MjUxMSAzZS0zIC0wLjg3MTA0LTAuMTUzMzUtMC45OTA5Ni0wLjM0NzM4eiIgc3Ryb2tlLXdpZHRoPSIuMzUyNzgiLz4KICA8L2c+Cjwvc3ZnPgo='/></p>

  </main>
</template>
