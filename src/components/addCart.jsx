import { useDispatch } from "react-redux"
import { addItem } from "../redux/slice/cartSlice"

const AddToCartButton = ({ item }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addItem(item))
  }

  return (
    <button
      className="block w-full rounded bg-orange-600 text-white p-4 text-sm font-medium transition hover:scale-105"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  )
}

export default AddToCartButton
