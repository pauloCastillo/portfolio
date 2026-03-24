import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SidebarContainer from '@/app/admin/shared/components/SidebarContainer'

describe('SidebarContainer component', () => {
  it('renders the logo section', () => {
    render(<SidebarContainer />)

    const h1 = screen.getByText('DEV', { exact: false })
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveClass('font-mono', 'text-xl', 'font-bold')
  })

  it('renders the AdminNavbar component', () => {
    render(<SidebarContainer />)

    expect(screen.getByText('Main Menu')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders the user profile section', () => {
    render(<SidebarContainer />)

    expect(screen.getByText('Admin User')).toBeInTheDocument()
    expect(screen.getByText('System Admin')).toBeInTheDocument()
  })

  it('renders the connection status', () => {
    render(<SidebarContainer />)

    expect(screen.getByText('CONNECTED')).toBeInTheDocument()
  })

  it('renders the user image', () => {
    render(<SidebarContainer />)

    const image = screen.getByAltText('User profile picture showing a focused developer in a dark room')
    expect(image).toBeInTheDocument()
  })

  it('aside has proper styling', () => {
    render(<SidebarContainer />)

    const aside = document.querySelector('aside')
    expect(aside).toHaveClass('w-72', 'h-full', 'bg-void', 'border-r', 'border-border-glass')
  })
})
