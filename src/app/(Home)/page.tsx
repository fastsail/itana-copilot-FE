import Documents from './_features/Documents';
import Footer from './_features/Footer';
import Hero from './_features/Hero';
import InpersonConsultation from './_features/InpersonConsultation';
import Pricing from './_features/Pricing';
import StartConsulting from './_features/StartConsulting';
import Stats from './_features/Stats';
import Testimonials from './_features/Testimonials';

export default function Home() {
	return (
		<main className='min-h-screen'>
			<Hero />
			<StartConsulting />
			<Documents />
			<InpersonConsultation />
			<Testimonials />
			<Stats />
			<Pricing />
			<Footer />
		</main>
	);
}
