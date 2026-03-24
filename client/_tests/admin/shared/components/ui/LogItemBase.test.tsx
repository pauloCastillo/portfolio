import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LogItemBase from '@/app/admin/shared/components/ui/LogItemBase'
import { faRocket } from '@fortawesome/free-solid-svg-icons'

describe('LogItemBase component', () => {
  const mockProps = {
    icon: faRocket,
    title: 'Deploy Success',
    time: '1h ago',
    description: 'Portfolio v2.4.1 deployed to production.',
    bgColor: 'bg-cyan-500',
    textColor: 'text-neon-emerald',
    hoverBorderColor: 'border-neon-emerald',
  }

  it('renders the title', () => {
    render(<LogItemBase {...mockProps} />)

    expect(screen.getByText('Deploy Success')).toBeInTheDocument()
  })

  it('renders the time', () => {
    render(<LogItemBase {...mockProps} />)

    expect(screen.getByText('1h ago')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<LogItemBase {...mockProps} />)

    expect(screen.getByText('Portfolio v2.4.1 deployed to production.')).toBeInTheDocument()
  })

  it('renders the icon', () => {
    render(<LogItemBase {...mockProps} />)

    const icon = document.querySelector('.fa-rocket')
    expect(icon).toBeInTheDocument()
  })

  it('icon container has proper styling', () => {
    render(<LogItemBase {...mockProps} />)

    const iconContainer = document.querySelector('.h-8.w-8')
    expect(iconContainer).toHaveClass('rounded', 'bg-cyan-500/20', 'text-neon-emerald')
  })

  it('item has hover effect', () => {
    render(<LogItemBase {...mockProps} />)

    const item = document.querySelector('.group')
    expect(item).toHaveClass('border', 'border-transparent', 'bg-white/5', 'p-3')
  })

  it('description has line-clamp class', () => {
    render(<LogItemBase {...mockProps} />)

    const description = screen.getByText('Portfolio v2.4.1 deployed to production.')
    expect(description).toHaveClass('line-clamp-1')
  })
})
