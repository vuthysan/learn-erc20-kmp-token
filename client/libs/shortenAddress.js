export default function shortenAddress(address) {
  const startAddress = address.substring(0, 4);
  const endAddress = address.substring(42 - 4);
  const shortenAddresss = startAddress + "..." + endAddress;

  return shortenAddresss;
}
