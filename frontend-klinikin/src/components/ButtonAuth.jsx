"use client"
import { useRouter } from "next/navigation"

export default function ButtonAuth({ text, link}) {
    const router = useRouter()

    return (
        <button onClick={() => router.push(link)} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 cursor-pointer">
            {text}
        </button>
    )
} 
