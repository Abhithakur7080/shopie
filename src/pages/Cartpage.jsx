import Cart from '../components/cart/Cart'

const Cartpage = ({cart, setCart}) => {
  return (
    <div>
      <Cart cart={cart} setCart={setCart}/>
    </div>
  )
}

export default Cartpage