<script lang="ts">
  import { getTraveltime } from "../routing/buildings";

  let { order }: { order: string[] } = $props();
</script>

<div>
  {#if order.length > 0}
    <span>{order[0]}</span>
  {/if}

  {#each order.slice(1) as building, i}
    <p>⬇️ {getTraveltime(building, order[i])}min 🕒</p>
    <p>{building}</p>
  {/each}
</div>