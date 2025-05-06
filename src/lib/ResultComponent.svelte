<script lang="ts">
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import { getTraveltime } from "../routing/buildings";

  let { order, name }: { order: string[], name: string } = $props();
</script>

<div>
  {#if order.length > 0}
    <p class="font-bold text-lg">{name}</p>
    <p class="text-sm text-gray-400 font-bold">3234 lookups</p>
    <p class="mb-6   text-sm text-gray-400 font-bold">65 min total</p>
    <span>{order[0]}</span>
  {/if}

  {#each order.slice(1) as building, i}
    <p class="font-bold text-blue-400">|</p>
    <p class="text-sm font-bold text-blue-400">{getTraveltime(building, order[i])} min</p>
    <p class="text-blue-400"><i class="fa-solid fa-arrow-down"></i></p>
    <p>{building}</p>
  {/each}
</div>