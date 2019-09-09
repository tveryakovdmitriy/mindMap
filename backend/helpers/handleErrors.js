const handleErrors = (errorMessage = '') => (err, res) => {
  if (err) {
    return {data: null, err: `${errorMessage} ${err}`}
  }

  return {data: res, err: null}
}

export default handleErrors