import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Filters from '@/app/admin/projects/components/body/Filters'

describe('Filters component', () => {
  it('renders all filter buttons', () => {
    render(<Filters />)

    expect(screen.getByText('ALL SYSTEMS')).toBeInTheDocument()
    expect(screen.getByText('WEB APPS')).toBeInTheDocument()
    expect(screen.getByText('MOBILE UNITS')).toBeInTheDocument()
    expect(screen.getByText('IoT')).toBeInTheDocument()
  })

  it('marks ALL SYSTEMS as the active filter', () => {
    render(<Filters />)

    const allSystemsButton = screen.getByText('ALL SYSTEMS')
    expect(allSystemsButton).toHaveClass('bg-primary/20', 'text-primary', 'shadow-[0_0_10px_rgba(6,182,212,0.1)]')
  })

  it('other filters have inactive styling', () => {
    render(<Filters />)

    const webAppsButton = screen.getByText('WEB APPS')
    expect(webAppsButton).toHaveClass('text-text-muted')
    expect(webAppsButton).not.toHaveClass('bg-primary/20')
  })

  it('container has proper styling', () => {
    render(<Filters />)

    const container = document.querySelector('.flex.p-1')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('bg-white/5', 'border', 'border-border-glass')
  })
})
