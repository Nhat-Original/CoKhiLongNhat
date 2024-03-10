import { Button } from 'flowbite-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 h-full mt-8">
      <h2 className="text-5xl font-semibold">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">
        <Button color="gray">Go to Home</Button>
      </Link>
    </div>
  )
}
