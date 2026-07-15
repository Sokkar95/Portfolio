import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { SelectedWorks } from "@/components/SelectedWorks"
import { LetsTalk } from "@/components/LetsTalk"

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWorks />
      <About />
      <LetsTalk />
    </>
  )
}
