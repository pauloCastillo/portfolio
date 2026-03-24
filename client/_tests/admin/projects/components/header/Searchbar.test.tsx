import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Searchbar from '@/app/admin/projects/components/header/Searchbar'

describe('Searchbar component', () => {
  it('renders the search input', () => {
    render(<Searchbar />)

    const input = screen.getByPlaceholderText('Search Artifacts...')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('renders the search icon', () => {
    render(<Searchbar />)

    // Searchbar renders a FontAwesome search icon
    const searchbar = document.querySelector('.relative.group')
    expect(searchbar?.querySelector('svg')).not.toBeNull()
  })

  it('input has proper styling classes', () => {
    render(<Searchbar />)

    const input = screen.getByPlaceholderText('Search Artifacts...')
    expect(input).toHaveClass(
      'min-w-80',
      'bg-white/5',
      'border',
      'border-border-glass',
      'rounded-lg',
      'font-mono'
    )
  })

  it('has focus states defined', () => {
    render(<Searchbar />)

    const input = screen.getByPlaceholderText('Search Artifacts...')
    expect(input).toHaveClass('focus:border-primary/50', 'focus:ring-1', 'focus:ring-primary/50')
  })

  it('container has group class for hover effects', () => {
    render(<Searchbar />)

    const container = document.querySelector('.relative.group')
    expect(container).toBeInTheDocument()
  })
})
