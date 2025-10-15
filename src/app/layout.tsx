import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Calculadora de Renda Fixa',
  description: 'Simule seus investimentos em CDB, Poupança e outros produtos de renda fixa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}
