import { products } from '../data/products.js'
import ProductList from '../components/ProductList.jsx'

export default function CollectionScreen() {
  return <ProductList products={products} />
}
