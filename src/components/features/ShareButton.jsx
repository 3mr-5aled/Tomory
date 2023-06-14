import React, { useState } from "react"
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaCopy,
  FaWhatsapp,
} from "react-icons/fa"
import { toast } from "react-toastify"
import { BsFillShareFill } from "react-icons/bs"

const ShareButton = ({ product }) => {
  const [showModal, setShowModal] = useState(false)

  const shareUrl = "https://tomory.vercel.app/product/" + product.id
  const shareTitle = product.name

  const shareOnWhatsApp = () => {
    const text = `Check out this product: ${product.name} - ${window.location.href}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, "_blank")
  }

  const copyLink = () => {
    const textField = document.createElement("textarea")
    textField.innerText = window.location.href
    document.body.appendChild(textField)
    textField.select()
    document.execCommand("copy")
    textField.remove()
    toast.success("Link copied to clipboard")
  }

  const handleShare = (platform) => {
    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        )
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(shareTitle)}`,
          "_blank"
        )
        break
      case "linkedin":
        window.open(
          `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
            shareUrl
          )}&title=${encodeURIComponent(shareTitle)}`,
          "_blank"
        )
        break
      default:
        break
    }
  }

  const ShareModal = () => {
    return (
      <div
        className="fixed z-30 inset-0 overflow-y-auto bg-[#00000081] flex items-center justify-center"
        onClick={() => setShowModal(false)}
      >
        <div className="bg-white p-4 rounded-md shadow-lg z-50 w-fit">
          <div className="flex flex-wrap space-x-2">
            <button
              onClick={() => handleShare("facebook")}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-700"
            >
              <FaFacebook />
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="p-2 rounded-full bg-blue-300 text-white hover:bg-blue-400"
            >
              <FaTwitter />
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="p-2 rounded-full bg-blue-800 text-white hover:bg-blue-600"
            >
              <FaLinkedin />
            </button>
            <button
              onClick={shareOnWhatsApp}
              className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition duration-300"
            >
              <FaWhatsapp className="w-5 h-5" />
            </button>
            <button
              onClick={copyLink}
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition duration-300"
            >
              <FaCopy className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-700"
      >
        <BsFillShareFill />
      </button>
      {showModal && <ShareModal />}
    </>
  )
}

export default ShareButton
