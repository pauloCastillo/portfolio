import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeaderMainContent from '@/app/admin/shared/components/ui/HeaderContent'

describe('HeaderMainContent component', () => {
  it('renders the title', () => {
    render(<HeaderMainContent title="Dashboard" subtitle="System Telemetry" />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toHaveClass('text-3xl', 'font-bold')
  })

  it('renders the subtitle', () => {
    render(<HeaderMainContent title="Dashboard" subtitle="System Telemetry" />)

    expect(screen.getByText('System Telemetry')).toBeInTheDocument()
    expect(screen.getByText('System Telemetry')).toHaveClass('font-mono', 'text-xs', 'uppercase', 'text-primary')
  })

  it('renders the system status pill', () => {
    render(<HeaderMainContent title="Dashboard" subtitle="System Telemetry" />)

    expect(screen.getByText('SYSTEM OPERATIONAL')).toBeInTheDocument()
  })

  it('renders the animated status indicator', () => {
    render(<HeaderMainContent title="Dashboard" subtitle="System Telemetry" />)

    const pingElement = document.querySelector('.animate-ping')
    expect(pingElement).toBeInTheDocument()
  })

  it('status pill has proper styling', () => {
    render(<HeaderMainContent title="Dashboard" subtitle="System Telemetry" />)

    const statusPill = screen.getByText('SYSTEM OPERATIONAL').parentElement
    expect(statusPill).toHaveClass('rounded-full', 'px-4', 'py-2', 'border-neon-emerald/20')
  })

  it('header has proper layout', () => {
    render(<HeaderMainContent title="Dashboard" subtitle="System Telemetry" />)

    const header = document.querySelector('header')
    expect(header).toHaveClass('h-20', 'px-8', 'py-5', 'flex', 'items-center', 'justify-between')
  })
})
