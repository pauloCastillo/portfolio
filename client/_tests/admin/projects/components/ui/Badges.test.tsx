import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from '@/app/admin/projects/components/ui/Badges'

describe('Badge component', () => {
  it('renders the badge with LIVE status', () => {
    render(<Badge />)

    const liveText = screen.getByText('LIVE')
    expect(liveText).toBeInTheDocument()
    expect(liveText).toHaveClass('font-mono', 'font-bold', 'text-success', 'tracking-wider')
  })

  it('renders the animated ping indicator', () => {
    render(<Badge />)

    const pingElement = document.querySelector('.animate-ping')
    expect(pingElement).toBeInTheDocument()
  })

  it('has proper styling classes for the container', () => {
    render(<Badge />)

    const badgeContainer = document.querySelector('.absolute.top-3.right-3')
    expect(badgeContainer).toBeInTheDocument()
    expect(badgeContainer).toHaveClass('border', 'border-success/30', 'bg-void/90')
  })
})
