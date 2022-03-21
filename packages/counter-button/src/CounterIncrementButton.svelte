<svelte:options tag="counter-increment-button" />

<script>
  import { createEventDispatcher } from 'svelte';
  import { get_current_component } from 'svelte/internal';

  const dispatch = createEventDispatcher()
  const component = get_current_component()

  export let apiurl = ''
  export let url = window.location.href
  let incrementing = false

  async function increment() {
    if (incrementing) return

    incrementing = true

    dispatch('incrementing')
    component.dispatchEvent(new CustomEvent('incrementing'))

    await fetch(
      `${apiurl}/count`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          url
        })
      }
    )

    dispatch('incremented')
    component.dispatchEvent(new CustomEvent('incremented'))

    incrementing = false
  }
</script>

<button on:click={increment}>
  <slot></slot>
</button>

<style>
  button {
    border: none;
    cursor: pointer;
    background: none;
  }
</style>
