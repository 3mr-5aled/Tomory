import React from "react"
import { BsDisplayFill, BsFillStarFill, BsLightningFill } from "react-icons/bs"
import { FaCalendarDay } from "react-icons/fa"

const Features = () => {
  return (
    <section className="bg-white dark:bg-slate-800">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Designed for Tasty Dates
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            Here is some of the features of our products and our Website that
            provides the user with the best quality and experience to make the
            user satisfied.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-12 md:space-y-0">
          <div>
            <div className="bg-orange-600 text-white flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <FaCalendarDay />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Fresh</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Fresh dates are sourced daily from our farms in the Middle East
              and delivered directly to our online store. We take great care in
              storing them using the latest technologies to ensure that they
              maintain their exceptional quality until they reach your doorstep.
            </p>
          </div>
          <div>
            <div className="bg-orange-600 text-white flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <BsLightningFill />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Fast</h3>
            <p className="text-gray-500 dark:text-gray-400">
              A fast website ensures that web pages load swiftly, reducing the
              waiting time for users. It optimizes elements such as images,
              scripts, and code to minimize file sizes and improve loading
              speed.
            </p>
          </div>

          <div>
            <div className="bg-orange-600 text-white flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <BsDisplayFill />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Simple Design
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Products with simple design exhibit clean lines and smooth,
              unbroken contours. The absence of intricate details or elaborate
              patterns gives them a sleek and timeless appearance.
            </p>
          </div>
          <div>
            <div className="bg-orange-600 text-white flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <BsFillStarFill />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Trust Worthy
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Trustworthy solutions prioritize data security and employ robust
              measures to protect sensitive information. This includes
              encryption, access controls, regular security audits, and
              compliance with industry standards and regulations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
