export type ChildrenType = {
    children: React.ReactNode;
};

export type Project = {
    id: number;
    title: string;
    description: string;
    content: string | null;
    image_file: string | null;
    project_link: string | null;
    github_link: string | null;
    tech_stack: string | null;
    published: boolean;
    published_date: string;
    updated_at: string;
};

export type Post = {
    id: number;
    title: string;
    content: string;
    image_file: string | null;
    author_id: string;
    published: boolean;
    published_date: string;
};

export type Experience = {
    id: number;
    company: string;
    role: string;
    description: string;
    start_date: string;
    end_date: string | null;
    url: string | null;
    user_id: string;
    published: boolean;
    updated_at: string;
};

export type Skill = {
    id: number;
    name: string;
    level: number;
    updated_at: string;
};
