"use client"

import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProjectForm } from "./project-form"
import type { Project } from "@/lib/types"

interface ProjectFormDialogProps {
  project?: Project
  trigger: React.ReactNode
}

export function ProjectFormDialog({ project, trigger }: ProjectFormDialogProps) {
  const [open, setOpen] = React.useState(false)

  function handleSuccess() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "New Project"}</DialogTitle>
          <DialogDescription>
            {project
              ? "Update the project details below."
              : "Add a new project to your portfolio."}
          </DialogDescription>
        </DialogHeader>
        <ProjectForm
          project={project}
          onSuccess={handleSuccess}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
