import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BodyNavbar from '@/app/admin/projects/components/body/BodyNavbar'

describe('BodyNavbar component', () => {
  it('renders the Filters component', () => {
    render(<BodyNavbar />)

    expect(screen.getByText('ALL SYSTEMS')).toBeInTheDocument()
    expect(screen.getByText('WEB APPS')).toBeInTheDocument()
    expect(screen.getByText('MOBILE UNITS')).toBeInTheDocument()
    expect(screen.getByText('IoT')).toBeInTheDocument()
  })

  it('renders the ProjectStatus component', () => {
    render(<BodyNavbar />)

    expect(screen.getByText('3 LIVE')).toBeInTheDocument()
    expect(screen.getByText('1 DEV')).toBeInTheDocument()
    expect(screen.getByText('1 ARCHIVED')).toBeInTheDocument()
  })

  it('container has responsive flex classes', () => {
    render(<BodyNavbar />)

    const container = document.querySelector('.flex.flex-col.md\\:flex-row')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('justify-between', 'gap-6', 'mb-8')
  })
})
