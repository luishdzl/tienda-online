import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-800 py-10 px-5 md:px-10">
      {/* Primera fila: 5 columnas responsivas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-8">
        {/* Columna 1: Marca y redes sociales */}
        <div>
          <h2 className="text-gray-900 text-lg font-semibold mb-3">art&wine</h2>
          <p className="text-sm text-gray-600 mb-4">by JEAN D</p>
          {/* Redes sociales responsivas: flex-wrap para evitar desbordes */}
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">Facebook</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">Instagram</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">LinkedIn</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">YouTube</a>
          </div>
        </div>

        {/* Columna 2: Experiencias */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-3">Experiencias</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Classic / Fluorescent</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Pouring</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Sculpture</a></li>
          </ul>
        </div>

        {/* Columna 3: Calendario y más */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-3">Opciones</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Calendario</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Formación de equipos</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Tarjeta de regalo</a></li>
          </ul>
        </div>

        {/* Columna 4: Sobre Nosotras */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-3">Sobre Nosotros</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Sobre Nosotros</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Artist</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">News</a></li>
          </ul>
        </div>

        {/* Columna 5: Contacto */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-3">Contacta Con Nosotros</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:info@artwine.es" className="text-gray-600 hover:text-gray-900 transition">info@artwine.es</a></li>
            <li><a href="tel:+34651572435" className="text-gray-600 hover:text-gray-900 transition">+34 651 57 24 35</a></li>
            <li className="text-gray-600">
              Carrer de la Mare de Déu dels Desemparats, 14,<br />
              Gràcia, 08012 Barcelona
            </li>
          </ul>
        </div>
      </div>

      {/* Segunda fila: Copyright y Política de Privacidad */}
      <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        <p>Art&Wine © 2023. All rights reserved.</p>
        <a href="#" className="hover:text-gray-900 transition mt-2 sm:mt-0">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;