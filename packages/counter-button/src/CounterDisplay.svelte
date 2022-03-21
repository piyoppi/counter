<svelte:options tag="counter-display" />

<script>
  export let url = window.location.href
  export let apiurl = ''
  export let addition = '0'
  let count = 0
  $: displayedCount = count + parseInt(addition, 10)
  $: valid = url && apiurl

  async function fetchCount() {
    if (!valid) return

    const urlParam = encodeURIComponent(url)
    const response = await fetch(`${apiurl}/current?url=${url}`)
    const responseJson = await response.json()

    count = responseJson.count
  }
</script>

{#if valid }
  {#await fetchCount()}
    <slot name="loading"></slot>
  {:then}
    <span>
      { displayedCount }
    </span>
  {:catch error}
    <slot name="error"></slot>
  {/await}
{/if}

<style>
</style>
