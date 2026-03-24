import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Breadcrumb from '@/app/admin/projects/components/ui/Breadcrumb'

describe('Breadcrumb component', () => {
  it('renders the breadcrumb navigation', () => {
    render(<Breadcrumb />)

    const link = screen.getByText('Project Nexus')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#')
  })

  it('renders the separator', () => {
    render(<Breadcrumb />)

    const separator = screen.getByText('/')
    expect(separator).toBeInTheDocument()
    expect(separator).toHaveClass('text-gray-600')
  })

  it('renders the current page indicator', () => {
    render(<Breadcrumb />)

    const currentPage = screen.getByText('Edit Protocol: 001')
    expect(currentPage).toBeInTheDocument()
    expect(currentPage).toHaveClass('text-primary')
  })

  it('has proper container styling', () => {
    render(<Breadcrumb />)

    const container = document.querySelector('.flex-none')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('border-b', 'border-surface-border', 'bg-void/50')
  })
})
