import './theme.css'

const COLORS = {
    '--color-white': '#FFF',
    '--color-black': '#000',
    '--color-gray': '#BDBDBD',
    '--color-granite-gray': '#666667',
    '--color-picton-blue': '#3AABEA',
    '--color-milk': '#FFFDF5',
    '--color-alice-blue': '#F5F6F7',
    '--color-whisper': '#EEE',
    '--color-eerie-black': '#161625',
    '--color-dark-gunmetal': '#1E1E30',
    '--color-aurometalsaurus': '#6C757D',
    '--color-black-rock': '#2D2D3B',
    '--color-gun-powder': '#454551'
}

export const LIGHT = {
    '--color-bg': COLORS['--color-white'],
    '--color-text-primary': COLORS['--color-black'],
    '--color-text-secondary': COLORS['--color-granite-gray'],
    '--color-primary': COLORS['--color-picton-blue'],
    '--color-divider': COLORS['--color-gray'],
    '--color-highlight': COLORS['--color-milk'],
    '--color-highlight-bg': COLORS['--color-white'],
    '--color-backgroundColor': COLORS['--color-alice-blue'],
    '--color-foregroundColor': COLORS['--color-whisper']
}

export const DARK = {
    '--color-bg': COLORS['--color-eerie-black'],
    '--color-text-primary': COLORS['--color-gray'],
    '--color-text-secondary': COLORS['--color-granite-gray'],
    '--color-primary': COLORS['--color-picton-blue'],
    '--color-divider': COLORS['--color-gray'],
    '--color-highlight': COLORS['--color-black-rock'],
    '--color-highlight-bg': COLORS['--color-dark-gunmetal'],
    '--color-backgroundColor': COLORS['--color-black-rock'],
    '--color-foregroundColor': COLORS['--color-gun-powder']
}