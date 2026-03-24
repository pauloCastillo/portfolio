import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeaderChart from '@/app/admin/shared/components/ui/HeaderChart'

describe('HeaderChart component', () => {
  it('renders the chart title', () => {
    render(<HeaderChart />)

    expect(screen.getByText('Traffic Velocity')).toBeInTheDocument()
    expect(screen.getByText('Traffic Velocity')).toHaveClass('text-xl', 'font-bold')
  })

  it('renders the subtitle', () => {
    render(<HeaderChart />)

    expect(screen.getByText('REQUESTS / HOUR [24H]')).toBeInTheDocument()
    expect(screen.getByText('REQUESTS / HOUR [24H]')).toHaveClass('font-mono', 'text-xs')
  })

  it('renders all time filter buttons', () => {
    render(<HeaderChart />)

    expect(screen.getByText('24H')).toBeInTheDocument()
    expect(screen.getByText('7D')).toBeInTheDocument()
    expect(screen.getByText('30D')).toBeInTheDocument()
  })

  it('24H button is active', () => {
    render(<HeaderChart />)

    const activeButton = screen.getByText('24H')
    expect(activeButton).toHaveClass('bg-neon-cyan', 'text-void')
  })

  it('other buttons are inactive', () => {
    render(<HeaderChart />)

    const inactiveButton = screen.getByText('7D')
    expect(inactiveButton).toHaveClass('text-slate-400')
    expect(inactiveButton).not.toHaveClass('bg-neon-cyan')
  })

  it('container has proper layout', () => {
    render(<HeaderChart />)

    const container = document.querySelector('.flex.items-center.justify-between')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('mb-6')
  })
})
