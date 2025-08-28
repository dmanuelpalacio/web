/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				'montserrat': ['Montserrat', 'sans-serif'],
			},
			colors: {
				// Núcleo Colectivo brand colors
				'nuclear-yellow': '#FEE440',
				'nuclear-black': '#000000',
				'nuclear-white': '#FFFFFF',
				'nuclear-purple': '#9D4EDD',
				'nuclear-violet': '#7B2CBF',
				
				// Tailwind system colors
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#9D4EDD',
					foreground: '#FFFFFF',
				},
				secondary: {
					DEFAULT: '#7B2CBF',
					foreground: '#FFFFFF',
				},
				accent: {
					DEFAULT: '#FEE440',
					foreground: '#000000',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'pulse-nuclear': {
					'0%, 100%': {
						transform: 'scale(1)',
						opacity: '0.8',
					},
					'50%': {
						transform: 'scale(1.05)',
						opacity: '1',
					},
				},
				'glow-connection': {
					'0%': {
						filter: 'drop-shadow(0 0 5px #9D4EDD)',
					},
					'100%': {
						filter: 'drop-shadow(0 0 15px #7B2CBF)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-nuclear': 'pulse-nuclear 3s ease-in-out infinite',
				'glow-connection': 'glow-connection 2s ease-in-out infinite alternate',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}