export const setAuthToken = async (token) => {
    // Set cookie
    let expiryDate = new Date().getTime() + 43200000 // 12 hours
    const accessToken = useCookie('access_token');
    accessToken.value = token;
    accessToken.expires = expiryDate;
}

export const setAuthUser = async (user) => {
    // Set cookie
    let expiryDate = new Date().getTime() + 43200000 // 12 hours
    const oAuthorizedUser = useCookie('authorized_user');
    oAuthorizedUser.value = user;
    oAuthorizedUser.expires = expiryDate;
}