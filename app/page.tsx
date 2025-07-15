"use client"
import "../styles/globals.css"
import { useEffect, useState } from "react"
import { Button } from "@heroui/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"
import { Card, CardBody } from "@heroui/card"
import {
  CloudUpload,
  Shield,
  Folder,
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  Lock,
  Zap,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Head from "next/head"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50 w-full h-full">
        <CustomLoader />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-default-50 overflow-hidden animate-fadeIn transition-opacity duration-1000 ease-in-out poppins-regular">
      <Head>
        <title>Droply - Store your images with ease</title>
      </Head>

      <Navbar />

      <main className="flex-1 relative z-10 poppins-regular">
        {/* Hero section */}
        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left animate-fadeInUp">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-default-900 leading-tight ">
                    Store your <span className="text-primary">images</span> with
                    ease
                  </h1>
                  <p className="text-lg md:text-xl text-default-800 ">
                    Simple. Secure. Fast.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start poppins-regular">
                  <SignedOut>
                    <Link
                      href="/sign-up"
                      passHref>
                      <Button
                        size="lg"
                        variant="solid"
                        color="primary"
                      className="poppins-bold">
                        Get Started
                      </Button>
                    </Link>
                    <Link
                      href="/sign-in"
                      passHref>
                      <Button
                        size="lg"
                        variant="flat"
                        color="primary"
                      className="poppins-bold">
                        Sign In
                      </Button>
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link
                      href="/dashboard"
                      passHref>
                      <Button
                        size="lg"
                        variant="solid"
                        color="primary"
                        endContent={<ArrowRight className="h-4 w-4" />}
                      className="poppins-bold">
                        Go to Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                </div>
              </div>

              <div className="flex justify-center order-first lg:order-last animate-float">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-primary/10 rounded-xl blur-3xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-24 md:h-32 w-24 md:w-32 text-primary/70 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-default-50">
          <div className="container mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-default-900">
                What You Get
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {[
                // Card data array to reduce repetition
                {
                  icon: CloudUpload,
                  title: "Quick Uploads",
                  desc: "Drag, drop, done.",
                  delay: "animate-zoomIn",
                },
                {
                  icon: Folder,
                  title: "Smart Organization",
                  desc: "Keep it tidy, find it fast.",
                  delay: "animate-zoomIn delay-100",
                },
                {
                  icon: Shield,
                  title: "Locked Down",
                  desc: "Your images, your eyes only.",
                  delay: "animate-zoomIn delay-200",
                },
                {
                  icon: Sparkles,
                  title: "AI Enhancement",
                  desc: "Smarter images, sharper memories.",
                  delay: "animate-zoomIn delay-[300ms]",
                },
                {
                  icon: Lock,
                  title: "End-to-End Encryption",
                  desc: "Only you and those you choose see your data.",
                  delay: "animate-zoomIn delay-[400ms]",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  desc: "No lag, no wait. Instant access.",
                  delay: "animate-zoomIn delay-[500ms]",
                },
              ].map(({ icon: Icon, title, desc, delay }, i) => (
                <Card
                  key={i}
                  className={`border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow animate-zoomIn ${delay} rounded-md cursor-pointer hover:scale-[1.03] duration-300 ease-in-out`}>
                  <CardBody className="p-6 text-center">
                    <Icon className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-default-900 poppins-bold">
                      {title}
                    </h3>
                    <p className="text-default-700 poppins-medium">{desc}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-12 md:py-20 px-4 md:px-6 bg-default-50">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-default-900 poppins-bold">
              Ready?
            </h2>
            <SignedOut>
              <div className="flex flex-wrap justify-center gap-4 mt-8 poppins-meduim">
                <Link
                  href="/sign-up"
                  passHref>
                  <Button
                    size="lg"
                    variant="solid"
                    color="primary"
                    endContent={<ArrowRight className="h-4 w-4" />}>
                    Let's Go...
                  </Button>
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                passHref>
                <Button
                  size="lg"
                  variant="solid"
                  color="primary"
                  endContent={<ArrowRight className="h-4 w-4" />}>
                  Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </section>
      </main>

      {/* Simple footer */}
      <footer className="bg-default-50 border-t border-default-200 py-4 md:py-6 relative z-10 poppins-bold">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CloudUpload className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold font-sans">Droply</h2>
            </div>
            <p className=" text-sm font-mono">
              &copy; {new Date().getFullYear()} Droply
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function CustomLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg">
        {/* Morphing Blob Shape */}
        <path fill="#3b82f6">
          <animate
            attributeName="d"
            dur="4s"
            repeatCount="indefinite"
            values="
              M150 50 C190 20, 230 90, 200 130 C170 170, 130 170, 100 130 C70 90, 110 20, 150 50 Z;
              M150 60 C200 10, 240 100, 190 140 C160 180, 120 180, 90 140 C50 100, 100 10, 150 60 Z;
              M150 50 C190 20, 230 90, 200 130 C170 170, 130 170, 100 130 C70 90, 110 20, 150 50 Z
            "
          />
        </path>

        {/* Droply Text Outline Animation */}
        <text
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="Verdana"
          fontSize="76"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2">
          <tspan>
            <animate
              attributeName="stroke-dasharray"
              from="0,300"
              to="300,0"
              dur="5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              from="300"
              to="0"
              dur="5s"
              repeatCount="indefinite"
            />
            DROPLY
          </tspan>

        </text>
      </svg>

      {/* <div className="mt-6 text-gray-600 font-medium tracking-wide animate-pulse">
        Loading...
      </div> */}
    </div>
  )
}

