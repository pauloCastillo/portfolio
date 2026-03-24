import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectsHeader from '@/app/admin/projects/components/header/ProjectHeader'

describe('ProjectsHeader component', () => {
  it('renders the header title', () => {
    render(<ProjectsHeader />)

    const title = screen.getByText('PROJECTS')
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('font-display', 'font-bold', 'text-2xl')
  })

  it('renders the searchbar component', () => {
    render(<ProjectsHeader />)

    const searchInput = screen.getByPlaceholderText('Search Artifacts...')
    expect(searchInput).toBeInTheDocument()
  })

  it('renders the create button', () => {
    render(<ProjectsHeader />)

    const createButton = screen.getByText('INITIALIZE PROJECT')
    expect(createButton).toBeInTheDocument()
    expect(createButton.closest('button')).toBeInTheDocument()
  })

  it('create button has add icon', () => {
    render(<ProjectsHeader />)

    // Create button renders a FontAwesome add icon
    const button = screen.getByText('INITIALIZE PROJECT').closest('button')
    expect(button?.querySelector('svg')).not.toBeNull()
  })

  it('header has proper sticky styling', () => {
    render(<ProjectsHeader />)

    const header = document.querySelector('header')
    expect(header).toHaveClass('sticky', 'top-0', 'z-30')
    expect(header).toHaveClass('h-20', 'px-8', 'border-b', 'border-border-glass')
  })
})
