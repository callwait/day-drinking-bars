import RNFetchBlob from 'rn-fetch-blob'

export const sampleApi = function(paginate) {
  return new Promise((resolve, reject) => {
    RNFetchBlob.fetch('GET', `http://localhost:5001/api/v1/bars?paginate=${paginate}&perPage=20`)
      .then((res) => {
        let status = res.info().status;

        if(status === 200) {
          // the conversion is done in native code
          // let base64Str = res.base64()
          // the following conversions are done in js, it's SYNC
          let text = res.text()
          let json = res.json()
          return resolve(json);
        } else {
          // handle other status codes
          return resolve(false);
        }
      })
      // Something went wrong:
      .catch((errorMessage, statusCode) => {
        // error handling
        return reject(errorMessage);
      })
  })
}