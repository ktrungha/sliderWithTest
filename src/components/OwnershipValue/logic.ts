export const calculateOwnership = (initialInvestment: number, monthlyInvestment: number, monthsRenting: number) => {
  return initialInvestment + (monthlyInvestment * monthsRenting)
}
