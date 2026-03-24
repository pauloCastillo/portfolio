import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MainChart from '@/app/admin/shared/components/ui/MainChart'

describe('MainChart component', () => {
  it('renders the HeaderChart component', () => {
    render(<MainChart />)

    expect(screen.getByText('Traffic Velocity')).toBeInTheDocument()
    expect(screen.getByText('REQUESTS / HOUR [24H]')).toBeInTheDocument()
  })

  it('renders the ChartArea component', () => {
    render(<MainChart />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders the ActivityFeed component', () => {
    render(<MainChart />)

    expect(screen.getByText('Recent Signals')).toBeInTheDocument()
    expect(screen.getByText('SYSTEM LOGS // LIVE')).toBeInTheDocument()
  })

  it('container has grid layout', () => {
    render(<MainChart />)

    const grid = document.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1', 'lg:grid-cols-3', 'gap-6')
  })

  it('chart section has proper column span', () => {
    render(<MainChart />)

    const chartSection = document.querySelector('.lg\\:col-span-2')
    expect(chartSection).toBeInTheDocument()
  })

  it('feed section has proper column span', () => {
    render(<MainChart />)

    const feedSection = document.querySelector('.lg\\:col-span-1')
    expect(feedSection).toBeInTheDocument()
  })
})
