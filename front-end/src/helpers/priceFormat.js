const convertNewPrice = (price, discount) => {
    const newPrice = price - (price * discount / 100)
    return newPrice
}

export {
    convertNewPrice
}