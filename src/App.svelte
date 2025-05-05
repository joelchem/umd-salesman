<script lang="ts">
  import AutoComplete from "simple-svelte-autocomplete";
  import { buildings } from "./routing/buildings";
  import { tick } from "svelte";

  let selectedBuildings: String[] = $state([]);
  let inpBuilding: String | undefined = $state(undefined);
</script>

<main class="bg-white h-full w-full flex justify-center">
  <div class="max-w-[40rem] p-8">
    <h1 class="font-bold text-6xl">UMD Salesman</h1>
    <p class="py-10 text-xl">
      Find the best route between a set of UMD buildings using different
      approaches to the Traveling Salesman Problem
    </p>

    {#if selectedBuildings.length > 0}
      <h2 class="font-bold text-2xl">Buildings</h2>
      <ul class="text-lg list-inside">
        {#each selectedBuildings as building}
          <li>{building}</li>
        {/each}
      </ul>
    {/if}

    <AutoComplete 
      items={buildings} 
      bind:text={inpBuilding}
      placeholder="Add Building..."
      onChange={async (e: String) => {
        if(e) {
          selectedBuildings.push(e);
          inpBuilding = "";
        }
      }}
      class="w-32"
      />
  </div>
</main>
