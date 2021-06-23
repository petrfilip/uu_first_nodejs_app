# Realizace BE v uuApp Framework I.

Vypracovaná samostatná práce pro běh školení `uuApp Development Standard I. 2021/05-07`.

Postupováno dle [step-by-step guide](https://uuapp.plus4u.net/uu-bookkit-maing01/e884539c8511447a977c7ff070e7f2cf/book/page?code=stepByStepApp)

Přidán uuCmd `sayHello`, který bere `dtoIn` s následujícím shapem:

```js
const sayHelloDtoInType = shape({
  name: string().isRequired()
})

```
Ukázka výstupu:
```json
{
  "output": "Hello  yxcvyxcvyxcy",
  "timeStamp": "2021-06-23T09:10:39.129Z",
  "uuAppErrorMap": {}
}
```

Ukázka nevalidního výstupu:

```json
{
  "uuAppErrorMap": {
    "uu-jokes-main/sayHello/invalidDtoIn": {
      "id": "4b2b5e3f67fae9add59c3c0106274ab4",
      "timestamp": "2021-06-23T09:22:13.771Z",
      "type": "error",
      "message": "DtoIn is not valid.",
      "paramMap": {
        "invalidValueKeyMap": {
          "$": {
            "shape.e002": "The content of shape must be valid."
          }
        },
        "missingKeyMap": {
          "$.name": {
            "isRequired.e001": "The value is required but missing."
          }
        }
      },
      "trace": "InvalidDtoIn: DtoIn is not valid..."
    }
  }
}
```
