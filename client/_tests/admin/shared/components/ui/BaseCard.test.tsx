import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BaseCard from '@/app/admin/shared/components/ui/BaseCard'
import { faEye } from '@fortawesome/free-solid-svg-icons'

describe('BaseCard component', () => {
  const mockCard = {
    title: 'Total Views',
    value: 12.5,
    suffix: 'K',
    icon: faEye,
    iconClass: 'text-cyan-500',
    subvalue: 14.5,
    subvalueSuffix: '%',
  }

  it('renders the card title', () => {
    render(<BaseCard card={mockCard} />)

    expect(screen.getByText('Total Views')).toBeInTheDocument()
    expect(screen.getByText('Total Views')).toHaveClass('font-mono', 'text-xs', 'uppercase')
  })

  it('renders the card value', () => {
    render(<BaseCard card={mockCard} />)

    expect(screen.getByText('12.5')).toBeInTheDocument()
    expect(screen.getByText('12.5')).toHaveClass('text-4xl', 'font-bold')
  })

  it('renders the suffix', () => {
    render(<BaseCard card={mockCard} />)

    expect(screen.getByText('K')).toBeInTheDocument()
  })

  it('renders the subvalue', () => {
    render(<BaseCard card={mockCard} />)

    expect(screen.getByText('14.5 %')).toBeInTheDocument()
    expect(screen.getByText('14.5 %')).toHaveClass('text-emerald-500')
  })

  it('renders the icon', () => {
    render(<BaseCard card={mockCard} />)

    const icon = document.querySelector('.fa-eye')
    expect(icon).toBeInTheDocument()
  })

  it('does not render suffix when not provided', () => {
    const cardWithoutSuffix = { ...mockCard, suffix: undefined }
    render(<BaseCard card={cardWithoutSuffix} />)

    expect(screen.queryByText('K')).not.toBeInTheDocument()
  })

  it('does not render subvalue when not provided', () => {
    const cardWithoutSubvalue = { ...mockCard, subvalue: undefined, subvalueSuffix: undefined }
    render(<BaseCard card={cardWithoutSubvalue} />)

    expect(screen.queryByText('14.5')).not.toBeInTheDocument()
  })

  it('container has proper styling', () => {
    render(<BaseCard card={mockCard} />)

    const container = document.querySelector('.glass-panel')
    expect(container).toHaveClass('rounded-2xl', 'p-6', 'transition-all')
  })
})
