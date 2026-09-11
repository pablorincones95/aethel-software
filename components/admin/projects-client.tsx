"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ProjectFormDialog } from "./project-form-dialog"
import { ProjectTableRow } from "./project-table-row"
import type { Project } from "@/lib/types"

interface ProjectsClientProps {
  projects: Project[]
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">All Projects</h2>
          <p className="text-sm text-muted-foreground">
            {projects.length} project{projects.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <ProjectFormDialog
          trigger={
            <Button>
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          }
        />
      </div>

      {projects.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <ProjectTableRow key={project.id} project={project} />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="rounded-md border p-8 text-center">
          <p className="text-muted-foreground">No projects yet.</p>
          <ProjectFormDialog
            trigger={
              <Button variant="outline" className="mt-4">
                <Plus className="h-4 w-4" />
                Create your first project
              </Button>
            }
          />
        </div>
      )}
    </div>
  )
}
