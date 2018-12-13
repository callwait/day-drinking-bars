import RNFetchBlob from 'rn-fetch-blob'

export const sampleApi = function() {
  return new Promise((resolve, reject) => {
    RNFetchBlob.fetch('GET', 'http://192.168.23.211:5001/api/v1/bars?paginate=0&perPage=1000')
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