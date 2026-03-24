import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ActivityFeed from '@/app/admin/shared/components/ui/ActivityFeed'

describe('ActivityFeed component', () => {
  it('renders the section title', () => {
    render(<ActivityFeed />)

    expect(screen.getByText('Recent Signals')).toBeInTheDocument()
    expect(screen.getByText('Recent Signals')).toHaveClass('text-xl', 'font-bold')
  })

  it('renders the subtitle', () => {
    render(<ActivityFeed />)

    expect(screen.getByText('SYSTEM LOGS // LIVE')).toBeInTheDocument()
  })

  it('renders all log items', () => {
    render(<ActivityFeed />)

    expect(screen.getByText('Client Inquiery')).toBeInTheDocument()
    expect(screen.getByText('Deploy Success')).toBeInTheDocument()
    expect(screen.getByText('High Latency')).toBeInTheDocument()
    expect(screen.getByText('Backup Complete')).toBeInTheDocument()
  })

  it('renders timestamps for each item', () => {
    render(<ActivityFeed />)

    expect(screen.getByText('2m ago')).toBeInTheDocument()
    expect(screen.getByText('1h ago')).toBeInTheDocument()
    expect(screen.getByText('3h ago')).toBeInTheDocument()
    expect(screen.getByText('4h ago')).toBeInTheDocument()
  })

  it('renders descriptions for each item', () => {
    render(<ActivityFeed />)

    expect(screen.getByText('Project \'Nebula\' proposal request...')).toBeInTheDocument()
    expect(screen.getByText('Portfolio v2.4.1 deployed to production.')).toBeInTheDocument()
  })

  it('container has proper styling', () => {
    render(<ActivityFeed />)

    const container = document.querySelector('.glass-panel')
    expect(container).toHaveClass('rounded-2xl', 'flex', 'flex-col')
  })
})
