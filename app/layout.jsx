import './globals.css';

export const metadata = {
  title: 'Netinha Gourmet | Painel Corporativo de Confeitaria',
  description: 'Gestão executiva de pedidos, esteira de produção e encomendas da Netinha Gourmet.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50 text-slate-800 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
