/* eslint-disable */

const initDtoInType = shape({
  uuAppProfileAuthorities: uri().isRequired("uuBtLocationUri"),
  uuBtLocationUri: uri(),
  name: uu5String(512),
  sysState: oneOf(["active","restricted","readOnly"]),
  adviceNote: shape({
    message: uu5String().isRequired(),
    severity: oneOf(["debug", "info", "warning", "error", "fatal"]),
    estimatedEndTime: datetime(),
  }),
});

const sayHelloDtoInType = shape({
  name: string().isRequired()
})

const jokeCreateDtoInType = shape({
  name: string(255).isRequired(),
  text: string(4000)
});

const jokeListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(0, null),
    pageSize: integer(0, null)
  })
});

const jokeGetDtoInType = shape({
  id: id().isRequired()
})

const jokeDeleteDtoInType = shape({
  id: id().isRequired()
});

const jokeUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(255),
  text: uu5String(4000),
})
