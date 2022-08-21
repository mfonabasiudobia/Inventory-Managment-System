import { axios } from "../config/services";

export const deleteRow = (row, route) => {
    return new Promise((resolve, reject) => {
         axios.delete(route)
            .then((res) => resolve(res))
            .catch((e) => reject(e.response))
    });
}


export const updateRow = (row, route) => {
    return new Promise((resolve, reject) => {
        axios({
                url: route,
                method: 'PUT',
                data : row
            })
            .then((res) => resolve(res))
            .catch((e) => reject(e.response.data))

    });
}


export const addRow = (row, route) => {
    return new Promise((resolve, reject) => {
        axios({
                url: route,
                method: 'POST',
                data : row
            })
            .then((res) => resolve(res))
            .catch((e) => reject(e.response.data))

    });
}



