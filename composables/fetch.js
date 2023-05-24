export const useMyFetch = async (request, opts) => {
    const config = useRuntimeConfig()
    const accessToken = useCookie('access_token')

    let headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json'
    };
  
    if (accessToken) {
      headers = Object.assign( headers, { 'Authorization': 'Bearer ' + accessToken.value })
    }

    return await useFetch(request, { 
      baseURL: config.public.baseURL,
      mode: 'cors',
      headers: headers,
      ...opts })
  }