import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MainContent from '@/app/admin/shared/components/MainContent'

describe('MainContent component', () => {
  it('renders the dashboard title', () => {
    render(<MainContent />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toHaveClass('text-3xl', 'font-bold')
  })

  it('renders the subtitle', () => {
    render(<MainContent />)

    expect(screen.getByText('System Telemetry // Active')).toBeInTheDocument()
  })

  it('renders all metric cards', () => {
    render(<MainContent />)

    expect(screen.getByText('Total Views')).toBeInTheDocument()
    expect(screen.getByText('System Uptime')).toBeInTheDocument()
    expect(screen.getByText('Active Leads')).toBeInTheDocument()
    expect(screen.getByText('Deploy Speed')).toBeInTheDocument()
  })

  it('renders the chart component', () => {
    render(<MainContent />)

    expect(screen.getByText('Traffic Velocity')).toBeInTheDocument()
  })

  it('renders the activity feed', () => {
    render(<MainContent />)

    expect(screen.getByText('Recent Signals')).toBeInTheDocument()
  })

  it('main container has proper styling', () => {
    render(<MainContent />)

    const main = document.querySelector('main')
    expect(main).toHaveClass('flex-1', 'bg-void', 'relative', 'overflow-hidden')
  })

  it('grid has responsive columns', () => {
    render(<MainContent />)

    const grid = document.querySelector('.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4')
    expect(grid).toBeInTheDocument()
  })
})
