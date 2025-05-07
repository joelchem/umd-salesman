<script lang="ts">
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import { getTraveltime } from "../routing/buildings";
  import { Counter, type AlgorithmResults } from "../types";
  import { getTime } from "../routing/algorithms";
  import { Stretch } from "svelte-loading-spinners";

  let {
    results,
    name,
    loading,
  }: { results: AlgorithmResults | undefined; name: string; loading: boolean } =
    $props();
</script>

<div class="flex-1">
  <p class="font-bold text-lg">{name}</p>
  <p class="text-sm text-gray-400 font-bold">
    Lookups: {results?.counter.val ?? "-"}
  </p>
  <p class="text-sm text-gray-400 font-bold">
    Runtime: {results ? results.time + "ms" : "-"}
  </p>
  <p class="mb-6 text-sm text-gray-400 font-bold">
    Route: {results ? getTime(new Counter(), results.order) + " min" : "-"}
  </p>
  
  {#if loading}
    <Stretch size="40" color="#2b7fff" />
  {/if}

  {#if results}
    <span>{results.order[0]}</span>

    {#each results.order.slice(1).concat([results.order[0]]) as building, i}
      <p class="font-bold text-blue-400">|</p>
      <p class="text-sm font-bold text-blue-400">
        {getTraveltime(building, results.order[i])} min
      </p>
      <p class="text-blue-400"><i class="fa-solid fa-arrow-down"></i></p>
      <p>{building}</p>
    {/each}
  {/if}
</div>
