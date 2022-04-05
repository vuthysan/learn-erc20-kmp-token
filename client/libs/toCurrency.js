export default function toCurrency(_number, symbol) {
  return parseInt(_number || 0).toLocaleString("en-US", {
    style: "currency",
    currency: symbol ? symbol : "XXX",
  });
}
