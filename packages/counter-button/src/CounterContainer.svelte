<svelte:options tag="counter-container" />

<script>
  export let url = window.location.href
  export let apiurl = ''
  $: {
    const button = document.getElementsByTagName('counter-increment-button')[0]
    const display = document.getElementsByTagName('counter-display')[0]

    if (button && display && apiurl) {
      display.setAttribute('url', url)
      display.setAttribute('apiurl', apiurl)
      button.setAttribute('url', url)
      button.setAttribute('apiurl', apiurl)

      button.addEventListener('incrementing', () => {
        const addition = parseInt(display.getAttribute('addition'), 10) || 0
        display.setAttribute('addition', (addition + 1).toString())
      })
    }
  }
</script>

<slot></slot>

<style>
</style>
