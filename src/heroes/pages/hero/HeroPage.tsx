import { useParams } from "react-router"


export default function HeroPage() {

  const {idSlug} = useParams();
  
  console.log(idSlug)

  return (
    <div>HeroPage</div>
  )
}
