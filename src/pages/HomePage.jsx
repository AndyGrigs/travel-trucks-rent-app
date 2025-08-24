import { useNavigate } from 'react-router-dom';
import image from '../assets/hero.jpg'
import Button from '../shared/Button'

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <section 
      style={{backgroundImage: `url(${image})`}}  
      className='min-h-[calc(100vh-73px)] sm:min-h-[calc(100vh-81px)] bg-cover bg-center bg-fixed flex items-center bg-zinc-300 bg-blend-multiply overflow-hidden' 
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 text-inputs">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 sm:mb-6 leading-tight">
            Campers of your dreams
          </h1>
          <p className="text-base sm:text-lg lg:text-xl font-medium mb-6 sm:mb-8 lg:mb-10 leading-relaxed">
            You can find everything you want in our catalog
          </p>
          
          <Button 
            onClick={() => navigate('/catalog')} 
            text="View Now"
            className="text-lg sm:text-xl px-8 sm:px-12 lg:px-16 py-4 sm:py-5"
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;