import Contact from '@/components/homepage/Contact';
import Footer from '@/components/homepage/Footer';
import Header from '@/components/homepage/Header';
import HeroSection from '@/components/homepage/HeroSection';
import ProblemSection from '@/components/homepage/ProblemSection';
import { PageMeta } from '@/components/PageMeta';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';

const Home = () => {
  return (
    <>
      <PageMeta
        titleKey="home.meta.title"
        descriptionKey="home.meta.description"
      />
      <DefaultWrapper>
        <div className="w-full place-items-center ">
          <Header />
          <HeroSection />
          <ProblemSection />
          <Contact />
          <Footer />
        </div>
      </DefaultWrapper>
    </>
  );
};

export default Home;
