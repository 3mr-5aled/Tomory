import React from "react"
import logo from "../../assets/logo.png"
import { BsGithub, BsLinkedin } from "react-icons/bs"

const Footer = () => {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer className="relative overflow-hidden bg-slate-950 py-16 font-body text-slate-300">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-amber-500/10 blur-[100px]"></div>
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-orange-600/10 blur-[100px]"></div>

      <div className="mx-auto w-full container px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="flex items-center mb-6 group">
              <div className="p-2 bg-slate-900/50 rounded-xl border border-slate-800 group-hover:border-amber-500/30 transition-colors duration-500 shadow-2xl">
                <img src={logo} className="h-10 w-auto rotate-12 group-hover:rotate-0 transition-transform duration-500" alt="Tomory Logo" />
              </div>
              <span className="ml-3 text-2xl font-display font-bold tracking-tight text-white">
                Tomory
              </span>
            </a>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Exceptional dates and premium organic products, sourced with integrity and delivered with care. Experience the essence of nature.
            </p>
            <div className="flex mt-6 space-x-5">
              <a
                href="https://github.com/3mr-5aled"
                className="text-slate-500 hover:text-amber-500 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsGithub size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/3mr5aled/"
                className="text-slate-500 hover:text-amber-500 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsLinkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 md:grid-cols-3 col-span-1 md:col-span-3 gap-8">
            <div>
              <h2 className="mb-6 text-sm font-display font-bold text-white uppercase tracking-widest">
                Resources
              </h2>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="https://flowbite.com/" className="hover:text-amber-500 transition-colors duration-300">
                    Flowbite
                  </a>
                </li>
                <li>
                  <a href="https://tailwindcss.com/" className="hover:text-amber-500 transition-colors duration-300">
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-display font-bold text-white uppercase tracking-widest">
                Connect
              </h2>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="https://github.com/3mr-5aled" className="hover:text-amber-500 transition-colors duration-300">
                    Github
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/3mr5aled/" className="hover:text-amber-500 transition-colors duration-300">
                    Linkedin
                  </a>
                </li>
                <li>
                  <a href="https://3mr5aled.netlify.app/" className="hover:text-amber-500 transition-colors duration-300">
                    Portfolio
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-display font-bold text-white uppercase tracking-widest">
                Legal
              </h2>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#" className="hover:text-amber-500 transition-colors duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-500 transition-colors duration-300">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs tracking-wider text-slate-500">
            © {year} <span className="text-slate-400 font-display font-bold">Tomory</span>. All Rights Reserved.
          </span>
          <span className="text-xs tracking-wider text-slate-500">
            Handcrafted by{" "}
            <a 
              className="text-amber-500/80 hover:text-amber-500 font-medium transition-colors duration-300" 
              href="https://3mr5aled.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @3mr 5aled
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
