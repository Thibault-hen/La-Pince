import Contact from '@/components/homepage/contact';
import Footer from '@/components/homepage/Footer';
import Header from '@/components/homepage/Header';
import HeroSection from '@/components/homepage/HeroSection';
import ProblemSection from '@/components/homepage/ProblemSection';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';

export const Home = () => {
  return (
    <DefaultWrapper>
      <div className="w-full place-items-center ">
        <Header />
        <HeroSection />
        <ProblemSection />
        <Contact />
        <Footer />
      </div>
    </DefaultWrapper>
  );
};
