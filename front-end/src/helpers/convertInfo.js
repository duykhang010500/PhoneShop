
const convertProductInfo = (info) => {
    switch (info) {
        case 'screen':
            return 'Màn hình'
        case 'rear_camera':
            return 'Camera sau'
        case 'selfie_camera':
            return 'Camera trước'
        case 'ram':
            return 'Ram'
        case 'internal_memory':
            return 'Bộ nhớ trong'
        case 'cpu':
            return 'CPU'
        case 'gpu':
            return 'GPU'
        case 'battery':
            return 'Pin'
        case 'sim':
            return 'Sim'
        case 'os':
            return 'Hệ điều hành'
        case 'made':
            return 'Nơi sản xuất'
        case 'time':
            return 'Thời gian sản xuất'
        default:
            return
    }
}

export {
    convertProductInfo
}