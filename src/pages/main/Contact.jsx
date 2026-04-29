import React from "react"
import { BsEnvelopePaperHeart, BsGeoAlt, BsTelephone } from "react-icons/bs"

const Contact = () => {
  return (
    <section className="relative min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#f3eadf] dark:bg-slate-900 font-body pb-20">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-grain opacity-40 mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-200/40 blur-[100px] motion-safe:animate-float-slow pointer-events-none dark:bg-amber-900/20" />
      <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-orange-300/30 blur-[100px] motion-safe:animate-drift pointer-events-none dark:bg-orange-900/10" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          
          {/* Left Column: Story/Header */}
          <div className="space-y-8 animate-fadeUp">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-800 dark:text-amber-200 mb-4">
                Reach Out
              </p>
              <h2 className="font-display text-5xl text-slate-900 dark:text-white md:text-6xl leading-tight">
                Let's start a conversation.
              </h2>
            </div>
            
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-md">
              Whether you have a question about our harvest, need assistance with an order, or want to explore business partnerships, our team is here to listen.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400">
                  <BsEnvelopePaperHeart className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Email</p>
                  <p className="text-sm">hello@tomory.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400">
                  <BsTelephone className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Phone</p>
                  <p className="text-sm">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400">
                  <BsGeoAlt className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Orchard Office</p>
                  <p className="text-sm">Oasis Valley, Middle East</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Container (Replacing Form) */}
          <div className="animate-fadeUp" style={{ animationDelay: '200ms' }}>
            <div className="rounded-[2.5rem] border border-amber-200/60 bg-white/70 p-8 shadow-2xl shadow-amber-900/5 backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/80 sm:p-12">
              <h3 className="font-display text-3xl text-slate-900 dark:text-white mb-6">
                Developer Note
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
                Got a technical issue? Want to send feedback about a beta feature?
                Need details about our architecture? Get in touch with the developer.
              </p>
              
              <a
                rel="noopener noreferrer"
                href="https://3mr5aled.netlify.app/"
                target="_blank"
                className="group relative flex w-full items-center justify-between overflow-hidden rounded-full bg-slate-900 p-2 pr-6 transition-all hover:bg-slate-800 dark:bg-amber-100 dark:hover:bg-white"
              >
                <div className="flex items-center gap-4">
                  <img
                    id="devlogo"
                    src="https://d33wubrfki0l68.cloudfront.net/b3e8b3e14752c6c7e8ea1286fc5c9e83460d90ad/fc5ad/public/assets/icons/facelogo.webp"
                    alt="Developer face icon"
                    className="h-12 w-12 rounded-full object-cover shadow-sm transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="font-semibold tracking-wide text-white dark:text-amber-950">
                    Developer Website
                  </span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:translate-x-1 dark:bg-amber-900/10 dark:text-amber-900">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
