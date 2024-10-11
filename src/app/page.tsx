'use client'
'use client'

import { useState } from "react"
import { FlipWords } from "@/components/ui/flip-words"
// import { insertUser } from "./actions"
import { useFormStatus } from "react-dom"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="p-2 bg-blue-500 text-whte rounded\\\" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}

export default function Home() {
  const words: string[] = ["good", "litty", "sigma", "Alpha"]
  const [message, setMessage] = useState("")

  async function handleSubmit(formData: FormData) {
    // const result = await insertUser(formData)
   // setMessage(result.message)
  }

  return (
    <div className="bg-no-repeat bg-[url('/background_image.avif')] bg-blend-screen dark:bg-blend-overlay dark:bg-black/75 bg-white/75 bg-cover">
      <div className="flex flex-col h-[calc(100vh-60px)] items-center justify-center">
        <h1 className="font-bold text-5xl ">
          Taking drugs is not
          <FlipWords words={words} />
        </h1>
        <form action={handleSubmit} className="flex flex-col mt-10">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          
          <div className="mb-4">
            <label className="mr-4 ">Are you a drug dealer?</label>
            <label className="mr-2">
              <input
                type="radio"
                name="isDrugDealer"
                value="true"
                className="mr-1"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isDrugDealer"
                value="false"
                className="mr-1"
              />
              No
            </label>
          </div>

          <SubmitButton />
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  )
}