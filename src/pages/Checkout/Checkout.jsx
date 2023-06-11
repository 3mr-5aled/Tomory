import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice"
import logo from "../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import { CountrySelect } from "../../components/"
import {
  selectIsLoggedIn,
  selectUserEmail,
  selectUserName,
} from "../../redux/slice/authSlice"

function Checkout() {
  const [payState, setPayState] = useState("")
  const [country, setCountry] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  const handlePayChoice = (e) => {
    setPayState(e.target.value)
  }

  const handlePay = (e) => {
    e.preventDefault()
    if (validateInputs()) {
      if (payState == "payWithCard") {
        payWithCard()
      }
      if (payState == "payOnShip") {
        navigate("/checkout/success", {
          state: {
            firstName,
            lastName,
            country,
            email,
            phoneNumber,
            postalCode,
          },
        })
      }
    }
  }

  useEffect(() => {
    handlePayChoice({ target: { value: "payOnShip" } })
  }, []) // Empty dependency array to run effect only once on mount

  const validateInputs = () => {
    if (firstName === "") {
      alert("Please enter your first name")
      return false
    }
    if (lastName === "") {
      alert("Please enter your last name")
      return false
    }
    if (phoneNumber === "") {
      alert("Please enter your phone number")
      return false
    }
    // add validation for other inputs
    return true
  }

  const handleCountrySelect = (e) => {
    setCountry(e.target.value)
  }

  const payWithCard = async () => {
    if (isLoggedIn) {
      const API = import.meta.env.VITE_PAYMOB_API
      const integrationID = import.meta.env.VITE_INTEGRATION_ID

      async function firstStep() {
        let data = {
          api_key: API,
        }

        let request = await fetch("https://accept.paymob.com/api/auth/tokens", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        let response = await request.json()

        let token = response.token

        secondStep(token)
      }

      async function secondStep(token) {
        let data = {
          auth_token: token,
          delivery_needed: "false",
          amount_cents: Math.round(cartTotalAmount * 100),
          currency: "EGP",
          items: cartItems.map((item) => ({
            name: item.title,
            amount_cents: Math.round(item.price * item.quantity * 100),
            description: item.description,
            quantity: item.quantity,
          })),
        }

        let request = await fetch(
          "https://accept.paymob.com/api/ecommerce/orders",
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        )

        let response = await request.json()
        console.log(response)

        let id = response.id

        thirdStep(token, id)
      }

      async function thirdStep(token, id) {
        let data = {
          auth_token: token,
          amount_cents: Math.round(cartTotalAmount * 100),
          expiration: 3600,
          order_id: id,
          billing_data: {
            email: email,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            country: country,
            postal_code: postalCode,
            shipping_method: "PKG",
            city: "Cairo",
            apartment: "803",
            floor: "42",
            street: "Ethan Land",
            building: "8028",
            state: "EGY",
          },
          currency: "EGP",
          integration_id: integrationID,
        }

        let request = await fetch(
          "https://accept.paymob.com/api/acceptance/payment_keys",
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        )

        let response = await request.json()
        console.log(response)

        let TheToken = response.token

        cardPayment(TheToken)
      }

      async function cardPayment(token) {
        let iframeURL = `https://accept.paymob.com/api/acceptance/iframes/749887?payment_token=${token}`

        location.href = iframeURL
      }

      firstStep()
    } else {
      navigate("/login")
    }
  }
  return (
    <section>
      <h1 className="sr-only">Checkout</h1>

      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
        <div className="bg-gray-50 py-12 md:py-24">
          <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <button className="text-orange-400 text-2xl hover:text-gray-500">
                <Link to="/cart">
                  <BsFillArrowLeftCircleFill />
                </Link>
              </button>
              <img
                className="h-10 w-10 rounded-full rotate-12 bg-orange-200"
                src={logo}
              />

              <h2 className="font-medium text-gray-900">Tomory</h2>
            </div>

            <div>
              <p className="text-2xl font-medium tracking-tight text-orange-500">
                {cartTotalAmount} $
              </p>

              <p className="mt-1 text-sm text-gray-600">For the purchase of</p>
            </div>

            <div>
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-100">
                  {cartItems.map((item, index) => (
                    <li className="flex items-center gap-4 py-4" key={item.id}>
                      <img
                        src={item.imageUrl}
                        className="h-16 w-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">{item.name}</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">Price: </dt>
                            <dd className="inline font-bold text-orange-400">
                              {item.price} $
                            </dd>
                          </div>
                          <div>
                            <dt className="inline">Quantity: </dt>
                            <dd className="inline font-bold text-orange-400">
                              {item.cartQuantity} KG
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-12 md:py-24">
          <div className="mx-auto max-w-lg px-4 lg:px-8">
            {/* <h1 className="font-bold text-2xl text-center -mt-20 mb-7 underline">
              Checkout Form
            </h1> */}
            <form className="grid grid-cols-6 gap-4">
              <div className="col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-xs font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  required
                  type="text"
                  id="FirstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-xs font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  required
                  type="text"
                  id="LastName"
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-xs font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  required
                  type="email"
                  id="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Phone"
                  className="block text-xs font-medium text-gray-700"
                >
                  Phone
                </label>

                <input
                  required
                  type="tel"
                  id="Phone"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </div>

              {/* <fieldset className="col-span-6">
                <legend className="block text-sm font-medium text-gray-700">
                  Card Details
                </legend>

                <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                  <div>
                    <label htmlFor="CardNumber" className="sr-only">
                      Card Number
                    </label>

                    <input
                      type="text"
                      id="CardNumber"
                      placeholder="Card Number"
                      className="relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                    />
                  </div>

                  <div className="flex -space-x-px">
                    <div className="flex-1">
                      <label htmlFor="CardExpiry" className="sr-only">
                        Card Expiry
                      </label>

                      <input
                        type="text"
                        id="CardExpiry"
                        placeholder="Expiry Date"
                        className="relative w-full rounded-bl-md border-gray-200 focus:z-10 sm:text-sm"
                      />
                    </div>

                    <div className="flex-1">
                      <label htmlFor="CardCVC" className="sr-only">
                        Card CVC
                      </label>

                      <input
                        type="text"
                        id="CardCVC"
                        placeholder="CVC"
                        className="relative w-full rounded-br-md border-gray-200 focus:z-10 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </fieldset> */}

              <fieldset className="col-span-6">
                <legend className="block text-sm font-medium text-gray-700">
                  Billing Address
                </legend>

                <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                  <CountrySelect
                    onCountrySelect={handleCountrySelect}
                    selectedCountry={country}
                  />

                  {/* show on shipping */}

                  <div>
                    <label className="sr-only" htmlFor="PostalCode">
                      ZIP/Post Code
                    </label>

                    <input
                      required
                      type="text"
                      id="PostalCode"
                      placeholder="ZIP/Post Code"
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>
              </fieldset>
              <div>
                <h3 className="whitespace-nowrap text-orange-400 font-bold">
                  Options to Pay:
                </h3>
                <label className="flex flex-row items-center my-5">
                  <input
                    className=""
                    type="radio"
                    name="payWithCard"
                    id="payWithCard"
                    value="payWithCard"
                    checked={payState === "payWithCard"}
                    onChange={handlePayChoice}
                  />
                  <span className="mx-5 w-full whitespace-nowrap">
                    Pay with a Credit card 💳
                  </span>
                </label>
                <label className="flex flex-row items-center my-5">
                  <input
                    className=""
                    type="radio"
                    name="payOnShip"
                    id="payOnShip"
                    value="payOnShip"
                    checked={payState === "payOnShip"}
                    onChange={handlePayChoice}
                  />
                  <span className="mx-5 w-full whitespace-nowrap">
                    Pay on Delivery 📦
                  </span>
                </label>
              </div>
              <div className="col-span-6">
                <button
                  className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
                  onClick={handlePay}
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout
