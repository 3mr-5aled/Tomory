import { useDispatch } from "react-redux"
// import { ADD_TO_CART } from "../redux/slice/cartSlice"

const AddToCartButton = ({ id, name, image, price }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    // dispatch(ADD_TO_CART({ id, name, image, price }))
  }

  return <div>add to cart</div>
}

export default AddToCartButton
