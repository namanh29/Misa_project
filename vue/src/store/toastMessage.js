export const toastMessage = {
    state: {
        toast: {}
    },
    mutations: {
        setToast(state, newToast){
            state.toast = newToast;
        }
    }
}