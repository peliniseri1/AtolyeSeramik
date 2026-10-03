import { products } from '../data/products.js'
import ProductList from '../components/ProductList.jsx'
import CatalogueQR from '../components/CatalogueQR.jsx'

export default function CollectionScreen() {
  return (
    <>
      <ProductList products={products} />
      <CatalogueQR />
    </>
  )
}
