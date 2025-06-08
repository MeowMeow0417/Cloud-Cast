// styles/fonts.ts
import { Chathura, Iceland, Electrolize } from 'next/font/google'

export const chathura = Chathura({
  weight: ['300', '400', '700', '800'],
  subsets: ['latin'],
});

export const iceland = Iceland({
  weight: ['400'],
  subsets: ['latin'],
});

export const electrolize = Electrolize({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-electrolize',
    display: 'swap',
});