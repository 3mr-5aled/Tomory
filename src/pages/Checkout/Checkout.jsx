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
  const [payState, setPayState] = useState("payOnShip")
  const [country, setCountry] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
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
      if (payState === "payWithCard") {
        payWithCard()
      }
      if (payState === "payOnShip") {
        navigate("/checkout/status", {
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

  const validateInputs = () => {
    if (!firstName || !lastName || !phoneNumber || !email || !country) {
      alert("Please fill in all required fields")
      return false
    }
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
    <main className="relative min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#f7f1e8] pb-20 dark:bg-slate-900 font-body">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-20" />
      <div className="absolute -left-20 -top-20 h-96 w-96 animate-drift rounded-full bg-amber-200/40 blur-[100px] dark:bg-amber-900/20" />
      <div className="absolute -right-20 -bottom-20 h-96 w-96 animate-drift rounded-full bg-orange-200/30 blur-[100px] dark:bg-orange-900/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <Link
            to="/cart"
            className="group flex items-center gap-2 text-stone-600 transition-colors hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-400"
          >
            <BsFillArrowLeftCircleFill className="text-2xl transition-transform group-hover:-translate-x-1" />
            <span className="font-semibold uppercase tracking-wider text-sm">Back to Cart</span>
          </Link>
          <div className="flex items-center gap-3">
            <img className="h-10 w-10 rotate-12 rounded-xl bg-white p-1.5 shadow-md dark:bg-slate-800" src={logo} alt="Logo" />
            <span className="font-display text-2xl font-bold text-stone-900 dark:text-amber-50">Tomory</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="rounded-[2rem] border border-amber-200/50 bg-white/70 p-8 shadow-xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80">
              <h2 className="font-display mb-6 text-3xl font-bold text-stone-900 dark:text-white">Order Summary</h2>
              
              <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <ul className="divide-y divide-amber-100 dark:divide-slate-700">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex gap-4 py-6 first:pt-0">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-amber-100 bg-white dark:border-slate-700">
                        <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <h3 className="font-display text-lg font-bold text-stone-900 dark:text-white">{item.name}</h3>
                        <div className="mt-1 flex items-center justify-between">
                          <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
                            {item.cartQuantity} KG × <span className="text-amber-700 dark:text-amber-400">${item.price}</span>
                          </p>
                          <p className="font-bold text-stone-900 dark:text-white">${(item.price * item.cartQuantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-amber-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-stone-600 dark:text-stone-400">Total Amount</span>
                  <span className="font-display text-4xl font-bold text-amber-700 dark:text-amber-400">${cartTotalAmount.toFixed(2)}</span>
                </div>
                <p className="mt-2 text-center text-sm text-stone-500">Secure transaction via Paymob</p>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[2rem] border border-amber-200/50 bg-white/70 p-8 shadow-xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80">
              <h2 className="font-display mb-8 text-3xl font-bold text-stone-900 dark:text-white">Shipping Details</h2>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="FirstName" className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-300">First Name</label>
                    <input
                      required
                      type="text"
                      id="FirstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-2xl border-stone-200 bg-white/50 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="LastName" className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-300">Last Name</label>
                    <input
                      required
                      type="text"
                      id="LastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-2xl border-stone-200 bg-white/50 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="md:col-span-1">
                    <label htmlFor="Email" className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-300">Email Address</label>
                    <input
                      required
                      type="email"
                      id="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border-stone-200 bg-white/50 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label htmlFor="Phone" className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-300">Phone Number</label>
                    <input
                      required
                      type="tel"
                      id="Phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full rounded-2xl border-stone-200 bg-white/50 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white"
                      placeholder="+20 123 456 7890"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="md:col-span-1">
                    <label className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-300">Country</label>
                    <div className="relative">
                      <CountrySelect onCountrySelect={handleCountrySelect} selectedCountry={country} />
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <label htmlFor="PostalCode" className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-300">ZIP / Post Code</label>
                    <input
                      required
                      type="text"
                      id="PostalCode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full rounded-2xl border-stone-200 bg-white/50 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white"
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="mb-4 font-display text-xl font-bold text-stone-900 dark:text-white">Payment Method</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className={`relative flex cursor-pointer flex-col rounded-2xl border-2 p-4 transition-all ${payState === "payOnShip" ? "border-amber-600 bg-amber-50/50 dark:bg-amber-900/10" : "border-stone-100 bg-white/30 hover:border-amber-200 dark:border-slate-700"}`}>
                      <input
                        type="radio"
                        name="payMethod"
                        value="payOnShip"
                        checked={payState === "payOnShip"}
                        onChange={handlePayChoice}
                        className="sr-only"
                      />
                      <span className="font-bold text-stone-900 dark:text-white">Pay on Delivery 📦</span>
                      <span className="mt-1 text-xs text-stone-500">Pay when you receive your order</span>
                    </label>

                    <label className={`relative flex cursor-pointer flex-col rounded-2xl border-2 p-4 transition-all ${payState === "payWithCard" ? "border-amber-600 bg-amber-50/50 dark:bg-amber-900/10" : "border-stone-100 bg-white/30 hover:border-amber-200 dark:border-slate-700"}`}>
                      <input
                        type="radio"
                        name="payMethod"
                        value="payWithCard"
                        checked={payState === "payWithCard"}
                        onChange={handlePayChoice}
                        className="sr-only"
                      />
                      <span className="font-bold text-stone-900 dark:text-white">Credit Card 💳</span>
                      <span className="mt-1 text-xs text-stone-500">Secure online payment via Paymob</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handlePay}
                  className="w-full animate-shimmer rounded-full bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 bg-[length:200%_100%] py-4 text-center text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:shadow-amber-900/20 active:scale-[0.98]"
                >
                  Pay Now ${cartTotalAmount.toFixed(2)}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Checkout
