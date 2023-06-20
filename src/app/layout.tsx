import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '📖 KDC 한국십진분류표 📖',
  description: 'KDC 한국십진분류표입니다. 쉽게 분류코드를 찾기위해 만들었습니다😎',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
