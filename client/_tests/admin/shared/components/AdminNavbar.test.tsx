import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AdminNavbar from '@/app/admin/shared/components/AdminNavbar'

describe('AdminNavbar component', () => {
  const mockSection = {
    title: 'Main Menu',
    items: [
      {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: {} as any,
        itemActive: true,
        iconClass: 'text-primary',
      },
      {
        title: 'Projects',
        href: '/admin/projects',
        icon: {} as any,
        iconClass: 'text-primary',
      },
    ],
  }

  it('renders the section title', () => {
    render(<AdminNavbar section={mockSection} />)

    expect(screen.getByText('Main Menu')).toBeInTheDocument()
    expect(screen.getByText('Main Menu')).toHaveClass('font-mono', 'uppercase', 'tracking-widest')
  })

  it('renders all navigation items', () => {
    render(<AdminNavbar section={mockSection} />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders items as links', () => {
    render(<AdminNavbar section={mockSection} />)

    const dashboardLink = screen.getByText('Dashboard').closest('a')
    expect(dashboardLink).toHaveAttribute('href', '/admin/dashboard')

    const projectsLink = screen.getByText('Projects').closest('a')
    expect(projectsLink).toHaveAttribute('href', '/admin/projects')
  })

  it('marks active item with indicator', () => {
    render(<AdminNavbar section={mockSection} />)

    const activeItem = screen.getByText('Dashboard').closest('.relative')
    expect(activeItem?.querySelector('.left-0')).toBeInTheDocument()
  })

  it('nav container has proper styling', () => {
    render(<AdminNavbar section={mockSection} />)

    const nav = document.querySelector('nav')
    expect(nav).toHaveClass('flex-1', 'flex', 'flex-col', 'gap-1', 'p-4')
  })
})
