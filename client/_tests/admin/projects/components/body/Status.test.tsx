import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectStatus from '@/app/admin/projects/components/body/Status'

describe('ProjectStatus component', () => {
  it('renders all status indicators', () => {
    render(<ProjectStatus />)

    expect(screen.getByText('3 LIVE')).toBeInTheDocument()
    expect(screen.getByText('1 DEV')).toBeInTheDocument()
    expect(screen.getByText('1 ARCHIVED')).toBeInTheDocument()
  })

  it('LIVE status has success color', () => {
    render(<ProjectStatus />)

    const liveStatus = screen.getByText('3 LIVE')
    const container = liveStatus.closest('.flex.items-center.gap-2')
    expect(container).toBeInTheDocument()
    expect(container?.querySelector('.bg-success')).toBeInTheDocument()
  })

  it('DEV status has warning color', () => {
    render(<ProjectStatus />)

    const devStatus = screen.getByText('1 DEV')
    const container = devStatus.closest('.flex.items-center.gap-2')
    expect(container).toBeInTheDocument()
    expect(container?.querySelector('.bg-warning')).toBeInTheDocument()
  })

  it('ARCHIVED status has muted color', () => {
    render(<ProjectStatus />)

    const archivedStatus = screen.getByText('1 ARCHIVED')
    const container = archivedStatus.closest('.flex.items-center.gap-2')
    expect(container).toBeInTheDocument()
    expect(container?.querySelector('.bg-text-muted')).toBeInTheDocument()
  })

  it('container has proper styling', () => {
    render(<ProjectStatus />)

    const container = document.querySelector('.flex.items-center.gap-4')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('text-xs', 'font-mono', 'text-text-muted')
  })
})
