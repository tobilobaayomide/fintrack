export function getMonthLabel(month) {
  return new Date(`${month}-01`).toLocaleString("default", {
    month: "long",
    year: "numeric",
  })
}

export function getPrevMonth(month) {
  const [year, m] = month.split("-").map(Number)
  const date = new Date(year, m - 2)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

export function getNextMonth(month) {
  const [year, m] = month.split("-").map(Number)
  const date = new Date(year, m)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

export function getCurrentMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
}