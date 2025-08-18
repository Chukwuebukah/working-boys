'use client'

import Features from "../components/Features"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"



export default function ClientLayout() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <Footer />
    </main>
  )
}
