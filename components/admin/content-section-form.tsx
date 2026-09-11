"use client"

import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { updateContentSection } from "@/app/admin/actions/content"
import type { SiteContent } from "@/lib/types"

interface ContentSectionFormProps {
  section: SiteContent
  onSuccess: () => void
}

export function ContentSectionForm({ section, onSuccess }: ContentSectionFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [content, setContent] = React.useState<Record<string, unknown>>(
    section.content
  )

  function updateField(key: string, value: unknown) {
    setContent((prev) => ({ ...prev, [key]: value }))
  }

  function updateArrayItem(
    arrayKey: string,
    index: number,
    itemKey: string,
    value: unknown
  ) {
    const array = content[arrayKey] as Record<string, unknown>[]
    if (!array) return

    const newArray = [...array]
    newArray[index] = { ...newArray[index], [itemKey]: value }
    updateField(arrayKey, newArray)
  }

  function addArrayItem(arrayKey: string, template: Record<string, unknown>) {
    const array = (content[arrayKey] as Record<string, unknown>[]) || []
    updateField(arrayKey, [...array, template])
  }

  function removeArrayItem(arrayKey: string, index: number) {
    const array = content[arrayKey] as Record<string, unknown>[]
    if (!array) return

    updateField(
      arrayKey,
      array.filter((_, i) => i !== index)
    )
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await updateContentSection(section.section_key, content)

    setIsSubmitting(false)

    if (result.success) {
      toast.success("Content updated")
      onSuccess()
    } else {
      toast.error(result.error || "Failed to update content")
    }
  }

  function renderSectionFields() {
    switch (section.section_key) {
      case "hero":
        return (
          <>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                value={(content.title as string) || ""}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Subtitle</FieldLabel>
              <Textarea
                value={(content.subtitle as string) || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
                className="min-h-[80px]"
              />
            </Field>
            <Field>
              <FieldLabel>Metrics</FieldLabel>
              <FieldDescription>Key performance indicators</FieldDescription>
              <div className="space-y-3">
                {((content.metrics as Record<string, string>[]) || []).map(
                  (metric, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Label"
                        value={metric.label || ""}
                        onChange={(e) =>
                          updateArrayItem("metrics", index, "label", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Value"
                        value={metric.value || ""}
                        onChange={(e) =>
                          updateArrayItem("metrics", index, "value", e.target.value)
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeArrayItem("metrics", index)}
                      >
                        &times;
                      </Button>
                    </div>
                  )
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    addArrayItem("metrics", { label: "", value: "" })
                  }
                >
                  Add Metric
                </Button>
              </div>
            </Field>
          </>
        )

      case "services":
        return (
          <>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                value={(content.title as string) || ""}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Subtitle</FieldLabel>
              <Textarea
                value={(content.subtitle as string) || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
                className="min-h-[80px]"
              />
            </Field>
            <Field>
              <FieldLabel>Services</FieldLabel>
              <FieldDescription>List of services offered</FieldDescription>
              <div className="space-y-4">
                {((content.items as Record<string, string>[]) || []).map(
                  (item, index) => (
                    <div key={index} className="rounded-md border p-3 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Title"
                          value={item.title || ""}
                          onChange={(e) =>
                            updateArrayItem("items", index, "title", e.target.value)
                          }
                        />
                        <Input
                          placeholder="Icon name"
                          value={item.icon || ""}
                          onChange={(e) =>
                            updateArrayItem("items", index, "icon", e.target.value)
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("items", index)}
                        >
                          &times;
                        </Button>
                      </div>
                      <Textarea
                        placeholder="Description"
                        value={item.description || ""}
                        onChange={(e) =>
                          updateArrayItem("items", index, "description", e.target.value)
                        }
                        className="min-h-[60px]"
                      />
                    </div>
                  )
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    addArrayItem("items", {
                      title: "",
                      description: "",
                      icon: "",
                    })
                  }
                >
                  Add Service
                </Button>
              </div>
            </Field>
          </>
        )

      case "process":
        return (
          <>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                value={(content.title as string) || ""}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Subtitle</FieldLabel>
              <Textarea
                value={(content.subtitle as string) || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
                className="min-h-[80px]"
              />
            </Field>
            <Field>
              <FieldLabel>Phases</FieldLabel>
              <FieldDescription>Engineering process phases</FieldDescription>
              <div className="space-y-4">
                {((content.phases as Record<string, string>[]) || []).map(
                  (phase, index) => (
                    <div key={index} className="rounded-md border p-3 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Number"
                          value={phase.number || ""}
                          onChange={(e) =>
                            updateArrayItem("phases", index, "number", e.target.value)
                          }
                          className="w-20"
                        />
                        <Input
                          placeholder="Title"
                          value={phase.title || ""}
                          onChange={(e) =>
                            updateArrayItem("phases", index, "title", e.target.value)
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("phases", index)}
                        >
                          &times;
                        </Button>
                      </div>
                      <Textarea
                        placeholder="Description"
                        value={phase.description || ""}
                        onChange={(e) =>
                          updateArrayItem("phases", index, "description", e.target.value)
                        }
                        className="min-h-[60px]"
                      />
                    </div>
                  )
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    addArrayItem("phases", {
                      number: "",
                      title: "",
                      description: "",
                    })
                  }
                >
                  Add Phase
                </Button>
              </div>
            </Field>
          </>
        )

      case "contact":
        return (
          <>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                value={(content.title as string) || ""}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Subtitle</FieldLabel>
              <Textarea
                value={(content.subtitle as string) || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
                className="min-h-[80px]"
              />
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                value={(content.email as string) || ""}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Response Time</FieldLabel>
              <Input
                value={(content.response_time as string) || ""}
                onChange={(e) => updateField("response_time", e.target.value)}
                placeholder="24h"
              />
            </Field>
          </>
        )

      default:
        return (
          <Field>
            <FieldLabel>Content (JSON)</FieldLabel>
            <Textarea
              value={JSON.stringify(content, null, 2)}
              onChange={(e) => {
                try {
                  setContent(JSON.parse(e.target.value))
                } catch {
                  // Invalid JSON, ignore
                }
              }}
              className="min-h-[200px] font-mono text-sm"
            />
          </Field>
        )
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <FieldGroup>
        {renderSectionFields()}
        <Separator />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
