export const ACT_ADD_TO_COMPARE = 'ACT_ADD_TO_COMPARE'
export const ACT_REMOVE_COMPARE = 'ACT_REMOVE_COMPARE'
export const ACT_REMOVE_ALL_COMPARE = 'ACT_REMOVE_ALL_COMPARE'
export const ACT_SHOW_COMPARE = 'ACT_SHOW_COMPARE'

export const actAddToCompare = ({ product }) => {
    return {
        type: ACT_ADD_TO_COMPARE,
        payload: { product }
    }
}

export const actRemoveCompare = (id) => {
    return {
        type: ACT_REMOVE_COMPARE,
        payload: { id }
    }
}

export const actRemoveAllCompare = () => {
    return {
        type: ACT_REMOVE_ALL_COMPARE,
        payload: {}
    }
}

export const actShowCompare = () => {
    return {
        type: ACT_SHOW_COMPARE
    }
}