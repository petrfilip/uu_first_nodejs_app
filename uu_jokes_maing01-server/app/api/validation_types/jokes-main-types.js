/* eslint-disable */

const jokeCreateDtoInType = shape({
  name: string(255).isRequired(),
  text: string(4000),
  image: binary()
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

const jokeGetImageDataDtoInType = shape ({
  image: code().isRequired(),
  contentDisposition: oneOf(["inline", "attachment"])
});
