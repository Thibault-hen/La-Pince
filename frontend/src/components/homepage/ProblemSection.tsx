import { Brain, Shield, Sparkles, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Problem01() {
  const { t } = useTranslation();

  const problems = [
    {
      title: 'home.card.title1',
      description: 'home.card.description1',
      icon: <Zap className="w-7 h-7 text-secondary-color" />,
    },
    {
      title: 'home.card.title2',
      description: 'home.card.description2',
      icon: <Shield className="w-7 h-7 text-secondary-color" />,
    },
    {
      title: 'home.card.title3',
      description: 'home.card.description3',
      icon: <Brain className="w-7 h-7 text-secondary-color" />,
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-primary-color w-full py-26"
    >
      {/* Background Effects */}

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-secondary-color/30 to-primary-color/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-primary-color/20 to-secondary-color/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 px-6 md:px-12 lg:px-16 xl:px-24">
        {/* Header Section */}
        <div className="text-center space-y-6 pb-20 mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-color/10 border border-secondary-color text-secondary-color font-medium text-sm">
            <Sparkles className="w-4 h-4 text-secondary-color" />
            {t('home.card.discover')}
          </div>
          <h2 className="text-white mx-auto mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              {t('home.card.mainTitle')}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
            {t('home.card.mainDescription')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
          {problems.map((problem, _index) => (
            <div
              key={problem.title}
              className="group relative transform transition-all duration-700 ease-out hover:scale-105"
            >
              {/* Card Background with Glassmorphism */}
              <div className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 h-full transition-all duration-500 group-hover:bg-white/15 group-hover:border-white/30 group-hover:shadow-2xl">
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300 items-center justify-center flex">
                    <div className="p-2 bg-secondary-color/25 border border-secondary-color rounded-lg">
                      {problem.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg lg:text-xl font-bold mb-4 text-white leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-300">
                    {t(problem.title)}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-base leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {t(problem.description)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
