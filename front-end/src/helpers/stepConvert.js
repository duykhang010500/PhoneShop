
const convertStatusToStep = (status) => {
    switch (status) {
        case 1:
            return 0
        case 4:
            return 1
        case 2:
            return 2
        case 3: {
            if (status === 5) {
                return 4
            } else {
                return 3
            }
        }
        case 5:
            return 3

        default:
            break;
    }
}

export default convertStatusToStep