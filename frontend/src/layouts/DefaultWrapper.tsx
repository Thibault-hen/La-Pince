import { motion } from 'framer-motion';

export const DefaultWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, ease: 'easeInOut' }}
		>
			{children}
		</motion.div>
	);
};
