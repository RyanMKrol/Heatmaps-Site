export default function baseEndpoint() {
  if (process.env.REACT_APP_LOCAL_API !== undefined) {
    return 'http://localhost:8002'
  } else {
    return 'http://stocktickersapi.xyz'
  }
}
