import Contact from "@/components/blocks/contact";
import Footer01 from "@/components/blocks/footer-01";
import Hero05 from "@/components/blocks/hero-05";
import Problem01 from "@/components/blocks/problem-01";
import Header from "@/components/homePage/header.tsx";

export const Home = () => {
	return (
		<>
			<div className="w-full place-items-center ">
				<Header />
				<Hero05 />
				<Problem01 />
				<Contact />
				<Footer01 />
			</div>
		</>
	);
};
