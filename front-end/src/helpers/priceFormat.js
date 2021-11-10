const convertNewPrice = (price, discount) => {
    const newPrice = price - (price * discount / 100)
    return Math.floor(newPrice / 1000) * 1000
}

const formatVND = (money) => {
    const price = money.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
    return price
}

export {
    convertNewPrice,
    formatVND
}

