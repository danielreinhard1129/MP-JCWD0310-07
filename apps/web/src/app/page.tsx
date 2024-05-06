import BrowseEvents from "@/components/BrowseEvents";
import CategoriesCards from "@/components/Categories";
import Hero from "@/components/Hero";
import TopEvent from "@/components/TopEvent";

export default function Home() {
  return (
   <>
   <Hero />
   <BrowseEvents />
   <CategoriesCards />
   <TopEvent />
   </>
  )
}
