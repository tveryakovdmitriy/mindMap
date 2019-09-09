const createError = ({status = 500, error, message = ''}) => {
  const data = {...error}
  if (message) {
    data.message = message
  }

  return {
    status: data.status || status,
    errorData
  }
}

export default createError