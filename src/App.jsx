import { useState } from 'react'
import CompareButton from './components/CompareButton'
import ProductCard from './components/ProductCard'
import ResultCard from './components/ResultCard'
import { calculateCostPerMeter, findWinners } from './utils/calculate'

const MIN_PRODUCTS = 2
const MAX_PRODUCTS = 3

function createEmptyProduct() {
  return {
    id: crypto.randomUUID(),
    name: '',
    rolls: '',
    metersPerRoll: '',
    price: '',
    layers: '',
  }
}

function App() {
  const [products, setProducts] = useState([createEmptyProduct(), createEmptyProduct()])

  function updateProduct(id, field, value) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  function addProduct() {
    setProducts((prev) => (prev.length < MAX_PRODUCTS ? [...prev, createEmptyProduct()] : prev))
  }

  function removeProduct(id) {
    setProducts((prev) => (prev.length > MIN_PRODUCTS ? prev.filter((p) => p.id !== id) : prev))
  }

  function reset() {
    setProducts([createEmptyProduct(), createEmptyProduct()])
  }

  const results = products.map((p) => {
    const calc = calculateCostPerMeter({
      rolls: Number(p.rolls),
      metersPerRoll: Number(p.metersPerRoll),
      price: Number(p.price),
      layers: p.layers === '' ? null : Number(p.layers),
    })
    return {
      id: p.id,
      calc,
      comparisonValue: calc ? calc.costPerLayerMeter ?? calc.costPerMeter : null,
    }
  })

  const winnerIds = findWinners(results)

  return (
    <div className="min-h-screen bg-bg text-white flex flex-col items-center px-4 py-8 gap-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold text-primary">Papelón</h1>
        <p className="text-sm text-white/60">
          Compará precios de papel higiénico y encontrá la opción más conveniente
        </p>
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        {products.map((product, index) => {
          const result = results.find((r) => r.id === product.id)
          return (
            <div key={product.id} className="flex flex-col gap-2">
              <ProductCard
                product={product}
                index={index}
                onChange={updateProduct}
                onRemove={removeProduct}
                canRemove={products.length > MIN_PRODUCTS}
              />
              <ResultCard calc={result.calc} isWinner={winnerIds.includes(product.id)} />
            </div>
          )
        })}
      </div>

      <CompareButton onAdd={addProduct} onReset={reset} canAdd={products.length < MAX_PRODUCTS} />
    </div>
  )
}

export default App
