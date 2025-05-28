"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card"
import { Divider } from "@heroui/divider"
import { Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"
import { signUpSchema } from "@/schemas/signUpSchema"

export default function SignUpForm() {
  const router = useRouter()
  const { signUp, isLoaded, setActive } = useSignUp()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  )
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return

    setIsSubmitting(true)
    setAuthError(null)

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
      setVerifying(true)
    } catch (error: any) {
      console.error("Sign-up error:", error)
      setAuthError(
        error.errors?.[0]?.message ||
          "An error occurred during sign-up. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerificationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    if (!isLoaded || !signUp) return

    setIsSubmitting(true)
    setVerificationError(null)

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      })

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
        router.push("/dashboard")
      } else {
        console.error("Verification incomplete:", result)
        setVerificationError(
          "Verification could not be completed. Please try again."
        )
      }
    } catch (error: any) {
      console.error("Verification error:", error)
      setVerificationError(
        error.errors?.[0]?.message ||
          "An error occurred during verification. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (verifying) {
    return (
      <div className="w-full max-w-md rounded-xl backdrop-blur-lg shadow-2xl p-8 text-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-100">
          Verify Email
        </h2>
        <p className="text-center text-gray-600 mt-2 mb-6">
          A verification code has been sent to your email.
        </p>
        {verificationError && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{verificationError}</span>
          </div>
        )}
        <form
          onSubmit={handleVerificationSubmit}
          className="space-y-5">
          <Input
            type="text"
            placeholder="Enter your verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full"
          />
          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={isSubmitting}>
            Verify Email
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Didn't receive a code?{" "}
          <button
            onClick={async () => {
              if (signUp) {
                await signUp.prepareEmailAddressVerification({
                  strategy: "email_code",
                })
              }
            }}
            className="text-primary hover:underline">
            Resend code
          </button>
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-xl bg-slate-950 rounded-3xl shadow-2xl p-10 backdrop-blur-xl text-gray-100 font-mono">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-100">Sign Up</h1>
        <p className="text-sm text-gray-100">
          Start securing and managing your content today.
        </p>
      </div>
      {authError && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <p>{authError}</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium ">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            startContent={<Mail className="h-4 w-4 text-gray-400" />}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            {...register("email")}
            className="mt-1 w-full"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium ">
            Password
          </label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            startContent={<Lock className="h-4 w-4 text-gray-400" />}
            endContent={
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                type="button">
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            }
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            {...register("password")}
            className="mt-1 w-full"
          />
        </div>

        <div>
          <label
            htmlFor="passwordConfirmation"
            className="block text-sm font-medium ">
            Confirm Password
          </label>
          <Input
            id="passwordConfirmation"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            startContent={<Lock className="h-4 w-4 text-gray-400" />}
            endContent={
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                type="button">
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            }
            isInvalid={!!errors.passwordConfirmation}
            errorMessage={errors.passwordConfirmation?.message}
            {...register("passwordConfirmation")}
            className="mt-1 w-full"
          />
        </div>

        <div className="flex items-start gap-2 text-sm ">
          <CheckCircle className="h-4 w-4 text-primary mt-1" />
          <p>
            By signing up, you agree to our{" "}
            <span className="font-medium text-primary">Terms of Service</span>{" "}
            and <span className="font-medium text-primary">Privacy Policy</span>
            .
          </p>
        </div>

        <Button
          type="submit"
          color="primary"
          className="w-full"
          isLoading={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-sm  mt-6">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
