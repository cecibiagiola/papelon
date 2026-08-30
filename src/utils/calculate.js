const TIE_PRECISION = 4

export function calculateCostPerMeter({ rolls, metersPerRoll, price, layers }) {
  const totalMeters = rolls * metersPerRoll
  if (!Number.isFinite(totalMeters) || totalMeters <= 0) return null
  if (!Number.isFinite(price) || price <= 0) return null

  const costPerMeter = price / totalMeters

  const costPerLayerMeter =
    layers && Number.isFinite(layers) && layers > 0
      ? price / (totalMeters * layers)
      : null

  return { totalMeters, costPerMeter, costPerLayerMeter }
}

export function findWinners(results) {
  const valid = results.filter((r) => r.comparisonValue != null)
  if (valid.length < 2) return []

  const rounded = valid.map((r) => ({
    id: r.id,
    value: Number(r.comparisonValue.toFixed(TIE_PRECISION)),
  }))
  const min = Math.min(...rounded.map((r) => r.value))

  return rounded.filter((r) => r.value === min).map((r) => r.id)
}

export function getFieldError(field, value) {
  if (value === '') return null

  const num = Number(value)
  if (!Number.isFinite(num)) return 'Ingresá un número válido'

  if (field === 'rolls' && (!Number.isInteger(num) || num <= 0)) {
    return 'Debe ser un entero mayor a 0'
  }
  if ((field === 'metersPerRoll' || field === 'price') && num <= 0) {
    return 'Debe ser mayor a 0'
  }
  if (field === 'layers' && ![1, 2, 3].includes(num)) {
    return 'Debe ser 1, 2 o 3'
  }

  return null
}
