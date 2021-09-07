
export function formatVND(money) {
   
    const price = money.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
    return price
}

