'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    'Calendario',
    'Experiencias', 
    'Team Buildings',
    'Tarjeta Regalo',
    'Sobre nosotros'
  ];

  // Función para manejar el hover del botón
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = '#008C9A';
    target.style.transform = 'scale(1.05)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = '#00A5B5';
    target.style.transform = 'scale(1)';
  };

  // Función para el botón móvil
  const handleMobileMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#008C9A';
  };

  const handleMobileMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#00A5B5';
  };

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      {/* Contenedor principal con bordes redondeados y efecto glass */}
      <div className="bg-[#ffffff57] backdrop-blur-md shadow-lg rounded-2xl border border-white/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href='/'><Image
                src="/logoart.svg"
                alt="Art&Wine Logo"
                width={100}
                height={50}
              /></Link>
            </div>

            {/* Menú Desktop */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white font-medium transition-colors duration-200 py-2 rounded-lg content-center"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Lado derecho: Buscador e Idioma */}
            <div className="flex items-center space-x-4">
              {/* Lupa de búsqueda */}
              <button className="p-2 text-white hover:text-gray-900 transition-colors hover:bg-white/50 rounded-lg">
                <Search size={20} />
              </button>

              {/* Selector de idioma */}
              <div className="flex items-center space-x-1 text-sm font-medium text-white cursor-pointer hover:text-gray-900 py-2 px-3 rounded-lg hover:bg-white/50">
                <span className="font-semibold text-[#00a5b5]">ES</span>
                <span>|</span>
                <span className="text-white">EN</span>
              </div>

              {/* Botón Reserva Ahora */}
              <button 
                className="hidden md:block px-6 py-2.5 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: '#00A5B5' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Reserva ahora
              </button>

              {/* Botón menú móvil */}
              <button 
                className="md:hidden p-2 hover:bg-white/50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 flex flex-col space-y-1">
                  <div 
                    className="h-0.5 w-full bg-white transition-transform duration-200"
                    style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}
                  ></div>
                  <div 
                    className="h-0.5 w-full bg-white transition-opacity duration-200"
                    style={{ opacity: isMenuOpen ? 0 : 1 }}
                  ></div>
                  <div 
                    className="h-0.5 w-full bg-white transition-transform duration-200"
                    style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none' }}
                  ></div>
                </div>
              </button>
            </div>
          </div>

          {/* Menú Móvil con animación */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'
          }`}>
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white hover:text-gray-900 font-medium py-3 px-4 rounded-lg hover:bg-white/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              
              {/* Botón Reserva Ahora en móvil */}
              <button 
                className="mt-4 px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 text-center"
                style={{ backgroundColor: '#00A5B5' }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={handleMobileMouseEnter}
                onMouseLeave={handleMobileMouseLeave}
              >
                Reserva ahora
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;