"use client"

import { useEffect } from "react"

export default function TutorError({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {

    useEffect(() => {
        console.error(error)
    }, [])
    return (
        <div>
            <h1>Something went wrong</h1>
            <button onClick={() => reset()}>Retry</button>
        </div>
    )
}