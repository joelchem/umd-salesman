<script lang="ts">
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import AutoComplete from "simple-svelte-autocomplete";
  import { buildings } from "./routing/buildings";
  import ResultComponent from "./lib/ResultComponent.svelte";
  import { bruteForce } from "./routing/algorithms";

  let selectedBuildings: string[] = $state([]);
  let inpBuilding: string | undefined = $state(undefined);

  async function runRouting() {
    bruteForce(selectedBuildings).then(res => console.log(res));
  }
</script>

<main class="bg-white h-full w-full flex justify-center">
  <div class="max-w-[40rem] p-8 flex flex-col">
    <h1 class="font-bold text-6xl">UMD Salesman</h1>
    <p class="py-8 text-xl">
      Find the best route between a set of UMD buildings using different
      approaches to the Traveling Salesman Problem
    </p>

    {#if selectedBuildings.length > 0}
      <h2 class="font-bold text-2xl">Buildings</h2>
      <ul class="text-lg list-inside">
        {#each selectedBuildings as building}
          <li>
            {building}
            <button
              aria-label="remove {building}"
              onclick={() => {
                selectedBuildings = selectedBuildings.filter(
                  (b) => b != building
                );
              }}
              class="border-0 hover:border-0 bg-transparent cursor-pointer ml-2 outline-0"
            >
              <i class="fa-solid fa-xmark text-gray-300"></i>
            </button>
          </li>
        {/each}
      </ul>
    {/if}

    <div>
      <AutoComplete
        items={buildings.sort()}
        bind:text={inpBuilding}
        placeholder="Add Destination..."
        onChange={async (e: string) => {
          if (e && !selectedBuildings.find((b) => b == e)) {
            selectedBuildings.push(e);
          }
          inpBuilding = "";
        }}
        className="w-[20rem] border-1 justify-start rounded-md border-gray-400 mt-4 mb-2"
        inputClassName="p-2"
      />
    </div>

    <div class="mt-4">
      <button
        class="mb-2 py-2 px-8 text-white rounded-md bg-blue-500 font-bold hover:bg-blue-600 cursor-pointer focus:border-0"
        onclick={runRouting}
        >Generate Routes</button
      >
    </div>

    <div class="flex flex-row gap-4 w-full mt-4 justify-between">
      <ResultComponent order={selectedBuildings} name="Brute Force"/>
      <ResultComponent order={selectedBuildings} name="2-Opt"/>
      <ResultComponent order={selectedBuildings} name="Nearest Neighbor"/>
    </div>
  </div>
</main>
