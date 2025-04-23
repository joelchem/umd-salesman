<script lang="ts">
  import AutoComplete from "simple-svelte-autocomplete";

  const colors = ["White", "Red", "Yellow", "Green", "Blue", "Black"];
</script>

<main class="bg-white h-full w-full flex justify-center">
  
  <div class="max-w-[40rem] p-8">
    <h1 class="font-bold text-6xl">UMD Salesman</h1>
    <p class="py-10 text-xl">Find the best route between a set of UMD buildings using different approaches to the Traveling Salesman Problem</p>
    <h2 class="font-bold text-2xl">Buildings</h2>

    <ul class="text-lg list-inside">
      <li>ESJ - Edward St. John Learning Center</li>
      <li>IRB - Brendan Iribe Center for CS</li>
    </ul>
    <AutoComplete items={colors}/>
  </div>

</main>

