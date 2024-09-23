/**
 * Hàm chuyển đổi từ USD sang VND
 * @param usd - Giá trị tiền USD
 * @returns Chuỗi đã được format theo VND
 */

export function convertUSDToVND(usd: number): string {
  const exchangeRate = 23500 // Tỷ giá USD/VND
  const vnd = usd * exchangeRate
  return vnd.toLocaleString(
    'vi-VN'
    // { style: 'currency', currency: 'VND' }
  )
}
