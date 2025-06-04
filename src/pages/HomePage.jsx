import image from '../assets/hero.jpg'
import Button from '../shared/Button'
const HomePage = () => {
  return (
    <section style={{backgroundImage: `url(${image})`}}  className='min-h-[100vh] bg-cover bg-center flex items-center bg-zinc-300 bg-blend-multiply' >
 <div className="container pl-[64px] text-inputs">
        <h1 className="text-[48px]  font-semibold mb-[16px]">
          Campers of your dreams
        </h1>
        <p className="text-[18px] font-medium mb-[40px]">
          You can find everything you want in our catalog
        </p>
        
        <Button text="View Now"/>
      </div>
    </section>
  )
}

export default HomePage