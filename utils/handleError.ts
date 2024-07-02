export default function (arr: Array<any>) {
    if (arr.response._data === 'Token Invalid') {
        window.location.href = '/auth/logout';
    }
}