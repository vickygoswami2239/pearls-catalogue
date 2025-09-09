import type { Config } from 'tailwindcss';


export default {
content: [
'./app/**/*.{ts,tsx}',
'./components/**/*.{ts,tsx}',
'./styles/**/*.{css}'
],
theme: {
extend: {
container: { center: true, padding: '1rem' }
}
},
plugins: []
} satisfies Config;