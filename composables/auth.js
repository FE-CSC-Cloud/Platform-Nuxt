import sha256 from 'crypto-js/sha256'

export const setAuthToken = async (token) => {
    // Set cookie
    let expiryDate = new Date().getTime() + 43200000 // 12 hours
    const accessToken = useCookie('access_token')
    accessToken.value = token
    accessToken.expires = expiryDate
}

export const setAuthUser = async (user) => {
    // Set cookie
    let expiryDate = new Date().getTime() + 43200000 // 12 hours
    const authorizedUser = useCookie('authorized_user')
    authorizedUser.value = user
    authorizedUser.expires = expiryDate
}

export const logout = () => {
    const accessToken = useCookie('access_token')
    accessToken.value = null

    const authorizedUser = useCookie('authorized_user')
    authorizedUser.value = null

    navigateTo('/login')
}

export const getHashedString = (string) => {
    return sha256(string).toString()
}