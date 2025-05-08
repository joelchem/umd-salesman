<script lang="ts">
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import AutoComplete from "simple-svelte-autocomplete";
  import { buildings } from "./routing/buildings";
  import ResultComponent from "./lib/ResultComponent.svelte";
  import { bruteForce, nearestNeighbor, twoOpt } from "./routing/algorithms";
  import type { AlgorithmResults } from "./types";
  import { tick } from "svelte";

  let selectedBuildings: string[] = $state([]);
  let inpBuilding: string | undefined = $state(undefined);

  let bruteForceResults: AlgorithmResults | undefined =  $state(undefined);
  let bruteForceLoading: boolean = $state(false);

  let twoOptResults: AlgorithmResults | undefined =  $state(undefined);
  let twoOptLoading: boolean = $state(false);

  let nearestNeighborResults: AlgorithmResults | undefined =  $state(undefined);
  let nearestNeighborLoading: boolean = $state(false);

  async function runRouting() {
    if(selectedBuildings.length < 2) {
      alert("Please select at least 2 buildings.")
      return;
    }
    bruteForceLoading = true;
    bruteForceResults = undefined;

    twoOptLoading = true;
    twoOptResults = undefined;

    nearestNeighborLoading = true;
    nearestNeighborResults = undefined;

    await tick();
    await new Promise(r => setTimeout(r))

    
    await nearestNeighbor(selectedBuildings).then(res => {
      nearestNeighborResults = res;
      nearestNeighborLoading = false;
    })
    twoOpt(selectedBuildings).then(res => {
      twoOptResults = res;
      twoOptLoading = false;
    })
    bruteForce(selectedBuildings).then(res => {
      bruteForceResults = res;
      bruteForceLoading = false;
    });

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
      <h2 class="font-bold text-2xl">Buildings ({selectedBuildings.length})</h2>
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
      <ResultComponent name="Brute Force" results={bruteForceResults} loading={bruteForceLoading}/>
      <ResultComponent name="2-Opt" results={twoOptResults} loading={twoOptLoading}/>
      <ResultComponent name="Nearest Neighbor" results={nearestNeighborResults} loading={nearestNeighborLoading}/>
    </div>
  </div>
</main>
