const convertNewPrice = (price, discount) => {
    const newPrice = price - (price * discount / 100)
    return Math.floor(newPrice / 1000) * 1000
}

export {
    convertNewPrice
}