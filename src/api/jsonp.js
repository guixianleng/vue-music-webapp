import originJsonp from 'jsonp'

export default function jsonp2 (url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param2(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param2 (data) {
  let url = ''
  for (let k in data) {
    let vlaue = data[k] != undefined ? data[k] : '' // eslint-disable-line
    url += '&' + k + '=' + encodeURIComponent(vlaue)
  }

  return url ? url.substring(1) : ''
}
