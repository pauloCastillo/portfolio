import React from "react";

export type ChildrenType = {
    children: React.ReactNode;
};

export type Project = {
    id: number;
    name: string;
    title: string;
    imageUrl: string;
    description: string;
    stack: string[];
};