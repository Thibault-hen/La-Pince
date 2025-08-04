import laPinceLogo from '@/assets/logo.webp';
export const MainLoader = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			{/* Logo placeholder - replace with your actual logo */}
			<div className="mb-4">
				<div className="flex items-center justify-center mt-64">
					<img
						src={laPinceLogo}
						width={80}
						alt="Application chargment en cours"
					/>
				</div>
			</div>

			{/* Modern loading animation */}
			<div className="relative">
				{/* Floating dots */}
				<div className="flex justify-center gap-2 mb-6">
					<div className="w-2 h-2 bg-secondary-color rounded-full animate-bounce-delayed-1"></div>
					<div className="w-2 h-2 bg-secondary-color rounded-full animate-bounce-delayed-2"></div>
					<div className="w-2 h-2 bg-secondary-color rounded-full animate-bounce-delayed-3"></div>
				</div>

				{/* Subtle text */}
				<div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
					<div className="h-full bg-gradient-to-r from-primary-color via-secondary-color to-primary-color rounded-full animate-pulse-flow"></div>
				</div>
			</div>

			<style>{`
        @keyframes pulse-flow {
          0%, 100% { transform: translateX(-100%); opacity: 0; }
          50% { transform: translateX(100%); opacity: 1; }
        }
        
        @keyframes bounce-delayed-1 {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes bounce-delayed-2 {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes bounce-delayed-3 {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        
        .animate-pulse-flow {
          animation: pulse-flow 2s ease-in-out infinite;
        }
        
        .animate-bounce-delayed-1 {
          animation: bounce-delayed-1 1.4s ease-in-out infinite;
        }
        
        .animate-bounce-delayed-2 {
          animation: bounce-delayed-2 1.4s ease-in-out infinite 0.2s;
        }
        
        .animate-bounce-delayed-3 {
          animation: bounce-delayed-3 1.4s ease-in-out infinite 0.4s;
        }
      `}</style>
		</div>
	);
};
