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



## Development and Usage

See following guidelines:

- [uuAppg01Devkit Documentation](https://uuapp.plus4u.net/uu-bookkit-maing01/e884539c8511447a977c7ff070e7f2cf/book)
- [uuSubApp Instance Descriptor](https://uuapp.plus4u.net/uu-bookkit-maing01/289fcd2e11d34f3e9b2184bedb236ded/book/page?code=uuSubAppInstanceDescriptor)
- [uuApp Server Project (NodeJs)](https://uuapp.plus4u.net/uu-bookkit-maing01/2590bf997d264d959b9d6a88ee1d0ff5/book/page?code=getStarted)
- [uuApp Client Project (UU5)](https://uuapp.plus4u.net/uu-bookkit-maing01/ed11ec379073476db0aa295ad6c00178/book/page?code=getStartedHooks)
