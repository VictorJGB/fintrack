export default function useLocalStorage(key: string) {
  const item = localStorage.getItem(key) || ''

  function setItem(value: string) {
    const item = localStorage.setItem(key, value)

    return item
  }

  function removeItem() {
    localStorage.removeItem(key)
  }

  return { item, setItem, removeItem }
}