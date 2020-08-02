export default function baseEndpoint() {
  window.console.log(process.env.REACT_APP_LOCAL_API)
  if (process.env.REACT_APP_LOCAL_API !== undefined) {
    window.console.log('using this 1')
    window.console.log('http://localhost:8003/api')
    return 'http://localhost:8003/api'
  } else {
    window.console.log('using this 2')
    window.console.log('http://stockpricedataapi.xyz/api')
    return 'http://stockpricedataapi.xyz/api'
  }
}
