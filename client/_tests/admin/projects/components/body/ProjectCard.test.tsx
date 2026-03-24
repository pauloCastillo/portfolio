import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '@/app/admin/projects/components/body/ProjectCard'
import { useRouter } from 'next/navigation'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}))

describe('ProjectCard component', () => {
  const mockProjects = [
    {
      imageUrl: 'https://example.com/image.jpg',
      title: 'Test Project',
      description: 'Test description',
      stack: ['React', 'Node.js'],
    },
  ]

  it('renders the project card with image', () => {
    render(<Card projects={mockProjects} />)

    const image = screen.getByAltText('Test Project')
    expect(image).toBeInTheDocument()
  })

  it('renders the project title', () => {
    render(<Card projects={mockProjects} />)

    const title = screen.getByText('Test Project')
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('font-display', 'font-bold', 'text-white')
  })

  it('renders the project description', () => {
    render(<Card projects={mockProjects} />)

    const description = screen.getByText('Test description')
    expect(description).toBeInTheDocument()
    expect(description).toHaveClass('text-text-muted', 'line-clamp-2')
  })

  it('renders all tech stack items', () => {
    render(<Card projects={mockProjects} />)

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('renders the edit button', () => {
    render(<Card projects={mockProjects} />)

    const editButton = document.querySelector('button[title="Edit Artifact"]')
    expect(editButton).toBeInTheDocument()
  })

  it('renders the view button', () => {
    render(<Card projects={mockProjects} />)

    const viewButton = document.querySelector('button[title="View Live"]')
    expect(viewButton).toBeInTheDocument()
  })

  it('renders the LIVE status badge', () => {
    render(<Card projects={mockProjects} />)

    expect(screen.getByText('LIVE')).toBeInTheDocument()
  })

  it('calls router.push on edit button click', () => {
    const pushMock = vi.fn()
    vi.mocked(useRouter).mockReturnValueOnce({ push: pushMock } as any)

    render(<Card projects={mockProjects} />)

    const editButton = document.querySelector('button[title="Edit Artifact"]')
    editButton?.click()

    expect(pushMock).toHaveBeenCalledWith('/admin/projects/edit')
  })

  it('calls router.push on view button click', () => {
    const pushMock = vi.fn()
    vi.mocked(useRouter).mockReturnValueOnce({ push: pushMock } as any)

    render(<Card projects={mockProjects} />)

    const viewButton = document.querySelector('button[title="View Live"]')
    viewButton?.click()

    expect(pushMock).toHaveBeenCalledWith('/admin/projects/view')
  })
})
