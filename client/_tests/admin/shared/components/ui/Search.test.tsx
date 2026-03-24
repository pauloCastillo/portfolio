import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SearchAdmin from '@/app/admin/shared/components/ui/Search'

describe('SearchAdmin component', () => {
  it('renders the search input', () => {
    render(<SearchAdmin />)

    const input = screen.getByPlaceholderText('Decrypt signal source...')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('renders the search icon', () => {
    render(<SearchAdmin />)

    const searchIcon = document.querySelector('.material-symbols-outlined')
    expect(searchIcon).toBeInTheDocument()
    expect(searchIcon).toHaveClass('left-3', 'top-2.5')
  })

  it('input has proper styling', () => {
    render(<SearchAdmin />)

    const input = screen.getByPlaceholderText('Decrypt signal source...')
    expect(input).toHaveClass(
      'bg-void/50',
      'border',
      'border-white/10',
      'rounded-lg',
      'font-mono'
    )
  })

  it('has focus states', () => {
    render(<SearchAdmin />)

    const input = screen.getByPlaceholderText('Decrypt signal source...')
    expect(input).toHaveClass('focus:border-primary/50', 'focus:ring-1')
  })

  it('container has proper styling', () => {
    render(<SearchAdmin />)

    const container = document.querySelector('.p-4')
    expect(container).toHaveClass('border-b', 'border-white/5')
  })
})
