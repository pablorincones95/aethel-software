"use client"

import * as React from "react"
import { toast } from "sonner"
import { Mail, Building2, Trash2, CheckCircle2, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { updateLeadStatus, deleteLead } from "@/app/admin/actions/leads"
import type { ContactLead } from "@/lib/types"

interface LeadsClientProps {
  leads: ContactLead[]
}

export function LeadsClient({ leads }: LeadsClientProps) {
  const [isPending, startTransition] = React.useTransition()

  function handleStatusChange(id: string, status: "new" | "contacted" | "closed") {
    startTransition(async () => {
      const res = await updateLeadStatus(id, status)
      if (res.success) {
        toast.success("Estado de lead actualizado")
      } else {
        toast.error(res.error || "Error al actualizar estado")
      }
    })
  }

  function handleDelete(id: string) {
    if (!confirm("¿Seguro que deseas eliminar este registro de lead?")) return
    startTransition(async () => {
      const res = await deleteLead(id)
      if (res.success) {
        toast.success("Lead eliminado")
      } else {
        toast.error(res.error || "Error al eliminar")
      }
    })
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-lg border p-12 text-center text-muted-foreground">
        <Mail className="mx-auto h-8 w-8 opacity-40 mb-3" />
        <p className="font-medium text-foreground">No hay solicitudes de contacto aún.</p>
        <p className="text-xs text-muted-foreground mt-1">
          Las solicitudes enviadas desde la landing page aparecerán aquí inmediatamente.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contacto</TableHead>
            <TableHead>Empresa & Servicio</TableHead>
            <TableHead>Presupuesto</TableHead>
            <TableHead>Detalles</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="w-[70px] text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const dateStr = new Date(lead.created_at).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })

            return (
              <TableRow key={lead.id}>
                <TableCell>
                  <div className="font-semibold text-foreground">{lead.name}</div>
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-xs text-[#00e5ff] hover:underline"
                  >
                    {lead.email}
                  </a>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 font-medium text-xs">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{lead.organization}</span>
                  </div>
                  {lead.service && (
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {lead.service}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <span className="font-mono text-xs text-[#e2c974]">
                    {lead.budget || "N/A"}
                  </span>
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="line-clamp-2 text-xs text-muted-foreground" title={lead.details || ""}>
                    {lead.details || "Sin notas adicionales"}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      lead.status === "new"
                        ? "default"
                        : lead.status === "contacted"
                        ? "secondary"
                        : "outline"
                    }
                    className="capitalize"
                  >
                    {lead.status === "new"
                      ? "Nuevo"
                      : lead.status === "contacted"
                      ? "Contactado"
                      : "Cerrado"}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                  {dateStr}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" disabled={isPending}>
                        ...
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(lead.id, "contacted")}
                      >
                        <Clock className="mr-2 h-4 w-4 text-secondary" />
                        Marcar Contactado
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(lead.id, "closed")}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-400" />
                        Marcar Cerrado
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(lead.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
