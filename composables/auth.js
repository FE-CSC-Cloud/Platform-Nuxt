import sha256 from 'crypto-js/sha256'

export const setAuthToken = async (token) => {
    let expiryDate = new Date().getTime() + 43200000 // 12 hours
    // Get cookie, set value and expiry date
    const accessToken = useCookie('access_token')
    accessToken.value = token
    accessToken.expires = expiryDate
}

export const setAuthUser = async (user) => {
    let expiryDate = new Date().getTime() + 43200000 // 12 hours
    // Get cookie, set value and expiry date
    const authorizedUser = useCookie('authorized_user')
    authorizedUser.value = user
    authorizedUser.expires = expiryDate
}

// Remove values from existing cookies which makes auth checks fail
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