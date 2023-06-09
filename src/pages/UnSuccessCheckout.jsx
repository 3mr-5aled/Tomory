import React from "react"

const UnSuccessCheckout = () => {
  return (
    <div className="bg-white dark:bg-slate-800 dark:text-gray-300 flex justify-center items-center h-[70vh]">
      <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-800 p-6  md:mx-auto">
        <img
          src="data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEyMi44OCAxMjIuODgiPjxwYXRoIGQ9Ik02MS40NCAwQTYxLjQ0IDYxLjQ0IDAgMTEwIDYxLjQ0IDYxLjQ0IDYxLjQ0IDAgMDE2MS40NCAweiIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjZWIwMTAwIi8+PHBhdGggZD0iTTM1LjM4IDQ5LjcyYy0yLjE2LTIuMTMtMy45LTMuNDctMS4xOS02LjFsOC43NC04LjUzYzIuNzctMi44IDQuMzktMi42NiA3IDBsMTEuNzUgMTEuNzcgMTEuNzEtMTEuNzFjMi4xNC0yLjE3IDMuNDctMy45MSA2LjEtMS4yTDg4IDQyLjY5YzIuOCAyLjc3IDIuNjYgNC40IDAgN0w3Ni4yNyA2MS40NCA4OCA3My4yMWMyLjY1IDIuNTggMi43OSA0LjIxIDAgN2wtOC41NCA4Ljc0Yy0yLjYzIDIuNzEtNCAxLTYuMS0xLjE5TDYxLjY4IDc2IDQ5LjkgODcuODFjLTIuNTggMi42NC00LjIgMi43OC03IDBsLTguNzQtOC41M2MtMi43MS0yLjYzLTEtNCAxLjE5LTYuMUw0Ny4xIDYxLjQ0IDM1LjM4IDQ5LjcyeiIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+"
          alt=""
          srcset=""
          height="25%"
          width="25%"
          className="m-5"
        />
        <h3 className="md:text-2xl text-base text-gray-900 dark:text-white font-semibold text-center">
          Fail Operation!
        </h3>
        <p className="text-gray-600 dark:text-gray-500 my-2">
          Something went wrong please try again.
        </p>
        <div className="py-10 text-center">
          <a
            href="/"
            className="px-12 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  )
}

export default UnSuccessCheckout
