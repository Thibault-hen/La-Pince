import { Instagram, Twitter, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import laPinceLogo from '@/assets/logo.png';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  product: [
    { name: 'home.footer.productFonctionalities', href: '#features' },
    { name: 'home.footer.faqs', href: '/faq' },
  ],
  company: [{ name: 'home.footer.links2', href: '#contact' }],
  legal: [
    { name: 'home.footer.confidentiality', href: '/privacy-policy' },
    { name: 'home.footer.conditions', href: '/tos' },
  ],
};

const socialLinks = [
  { icon: Twitter, name: 'Twitter', href: '#' },
  { icon: Instagram, name: 'Instagram', href: '#' },
  { icon: Youtube, name: 'YouTube', href: '#' },
];

export default function Footer01() {
  const { t } = useTranslation();
  return (
    <footer id="footer" className="w-full">
      <div className="px-32 py-6 bg-primary-color md:bg-primary-color">
        <div className="flex flex-col md:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-1 text-primary">
                <img
                  src={laPinceLogo}
                  height={10}
                  width={60}
                  alt="Application logo"
                />
                <span className="text-xl font-bold text-white">
                  {t('home.footer.title')}
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div className="space-y-3">
                <h4 className="text-white font-semibold">
                  {t('home.footer.product')}
                </h4>
                <ul className="space-y-2">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-white hover:text-foreground"
                      >
                        {t(link.name)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-white font-semibold">
                  {t('home.footer.links')}
                </h4>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-white hover:text-foreground"
                      >
                        {t(link.name)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-white font-semibold">
                  {t('home.footer.legal')}
                </h4>
                <ul className="space-y-2">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-white hover:text-foreground"
                      >
                        {t(link.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-accent" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white">{t('home.footer.copyright')}</p>
            <div className="flex items-center space-x-4">
              <ul className="flex items-center gap-4">
                {socialLinks.map(({ icon: Icon, href }, idx) => (
                  <li key={socialLinks[idx].name}>
                    <a
                      href={href}
                      className="group inline-flex cursor-pointer items-center justify-start gap-1 text-white duration-200 hover:text-foreground hover:opacity-90"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
