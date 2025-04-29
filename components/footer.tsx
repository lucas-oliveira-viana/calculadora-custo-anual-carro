import { Facebook, Instagram, Twitter, Youtube, Mail, Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Calculadora de Custo Anual de Carro</h3>
            <p className="text-gray-300">Faça escolhas inteligentes para seu bolso e mobilidade</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <Link href="#" className="hover:text-gray-300 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Contato
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 flex items-center justify-center">
            Desenvolvido com <Heart className="h-4 w-4 mx-1 text-blue-400 fill-blue-400" /> para motoristas brasileiros
          </p>
        </div>
      </div>
    </footer>
  )
}
