import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ChartArea from '@/app/admin/shared/components/ui/ChartArea'

describe('ChartArea component', () => {
  it('renders the SVG chart', () => {
    render(<ChartArea />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders the gradient definition', () => {
    render(<ChartArea />)

    const gradient = document.querySelector('#chartGradient')
    expect(gradient).toBeInTheDocument()
  })

  it('renders the area path', () => {
    render(<ChartArea />)

    const areaPath = document.querySelector('path[fill="url(#chartGradient)"]')
    expect(areaPath).toBeInTheDocument()
  })

  it('renders the line path', () => {
    render(<ChartArea />)

    const linePaths = document.querySelectorAll('path')
    expect(linePaths.length).toBeGreaterThanOrEqual(2)
  })

  it('renders grid lines', () => {
    render(<ChartArea />)

    const gridLines = document.querySelectorAll('.border-t.border-dashed')
    expect(gridLines.length).toBe(5)
  })

  it('renders the hover crosshair', () => {
    render(<ChartArea />)

    const crosshair = document.querySelector('.left-\\[60\\%\\]')
    expect(crosshair).toBeInTheDocument()
  })

  it('renders the tooltip', () => {
    render(<ChartArea />)

    expect(screen.getByText('14:30 PM')).toBeInTheDocument()
    expect(screen.getByText('432 Req/s')).toBeInTheDocument()
  })

  it('container has proper styling', () => {
    render(<ChartArea />)

    const container = document.querySelector('.relative.flex-1')
    expect(container).toHaveClass('rounded-lg', 'overflow-hidden', 'border', 'border-glass-border/30')
  })
})
