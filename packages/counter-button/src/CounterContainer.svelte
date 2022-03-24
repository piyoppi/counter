<svelte:options tag="counter-container" />

<script>
  import { onMount } from 'svelte'

  export let url = window.location.href
  export let apiurl = ''

  let el = null

  const setAttributeToChild = (childElement, attr, value) => {
    const current = childElement.getAttribute(attr)
    if ( value !== current ) {
      childElement.setAttribute(attr, value)
    }
  }

  const connectChildElement = () => {
    if (!apiurl || !el) return

    const button = el.getRootNode().host.getElementsByTagName('counter-increment-button')[0]
    const display = el.getRootNode().host.getElementsByTagName('counter-display')[0]

    if (button) {
      setAttributeToChild(button, 'url', url)
      setAttributeToChild(button, 'apiurl', apiurl)

      button.addEventListener('incrementing', () => {
        const addition = parseInt(display.getAttribute('addition'), 10) || 0
        display.setAttribute('addition', (addition + 1).toString())
      })
    }

    if (display) {
      setAttributeToChild(display, 'url', url)
      setAttributeToChild(display, 'apiurl', apiurl)
    }
  }

  $: { connectChildElement() }

  onMount(() => {
    const observer = new MutationObserver(connectChildElement);
    observer.observe(el.getRootNode().host, {attributes: false, childList: true})

    connectChildElement()
  })
</script>

<slot bind:this={el}></slot>

<style>
</style>
