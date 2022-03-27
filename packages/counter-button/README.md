# @piyoppi/counter-button

Custom elements that increment counts, display counts.

This elements call API provided by [@piyoppi/counter-api](../counter).
The API must be deployed previously.

## Example

Displays the count of the page on which this element is placed. It also places a vote button.

```html
<counter-container
  apiurl="https://api.example.com"
  >
  <counter-increment-button>
    <span>
      &#x1f31f;
      <counter-display>
        <span slot="loading">...</span>
      </counter-display>
    </span>
  </counter-increment-button>
</counter-container>
```

## `counter-increment-button`

The button is used to increment the counter. The API (`POST /count`) is called when the button is clicked.

### Attributes

| attribute | detail |
| --- | --- |
| apiurl | The url of API (ex: `https://api.example.com`) |
| url (optional) | The url of a current page  (default `window.location.href`) |


## `counter-display`

The element displays the counted value. The API (`GET /current`) is called when the element is shown.

### Attributes

| attribute | detail |
| --- | --- |
| apiurl | The url of API (ex: `https://api.example.com`) |
| addition (optional) | Additional count values. The element is displayed the value provided by api + addition value|
| url (optional) | The url of a current page (default `window.location.href`) |

### Slots

| name | detail |
| --- | --- |
| loading | Displayed when calling api. |
| error | Displayed when api call fails. |

## `counter-container`

This element integrates `counter-increment-button` and `counter-display`.

- Attribute `apiurl` and `url` on this element is applied in the child elements.
- When the counter display button in this element is clicked, the attribute `addition` is incremented by the `counter-display`.


### Attributes

| attribute | detail |
| --- | --- |
| apiurl | The url of API (ex: `https://api.example.com`) |
| url (optional) | The url of a current page (default `window.location.href`) |

