export const redirectUser = (email) => {
    const router = useRouter()
    let path = '/login/credentials'

    // Insert logic to determine if user should use federation

    // Replace data.email with the email sent back from the API
    router.push({
        path: path,
        query: { email: email },
    });
}