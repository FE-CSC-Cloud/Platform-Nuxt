export default function (arr: Array<any>) {
    if(arr.response._data === 'Token Invalid' || arr.response.status === 401){
        navigateTo('/auth/logout');
    }
}