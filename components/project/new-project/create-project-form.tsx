"use client";

import * as z from "zod";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  projectDetails: z.object({
    name: z.string(),
    description: z
      .string()
      .max(100, "Description must be most 100 characters")
      .optional(),
    amount: z.number(),
  }),
  clientInformation: z.object({
    name: z.string(),
    billingEmail: z.email(),
  }),
  assignedMembers: z.array(z.string()),
});

export const CreateProjectForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectDetails: {
        name: "",
        description: "",
        amount: 0.0,
      },
      clientInformation: {
        name: "",
        billingEmail: "",
      },
      assignedMembers: [],
    },
  });

  const [haveProjectDetails, setHaveProjectDetails] = useState(false);
  const [haveClientInformation, setHaveClientInformation] = useState(false);
  const [haveAssignedMembers, setHaveAssignedMembers] = useState(false);

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  function handleContinue() {
    if (!haveProjectDetails) {
      setHaveProjectDetails(true);
    } else if (!haveClientInformation) {
      setHaveClientInformation(true);
    } else if (!haveAssignedMembers) {
      setHaveAssignedMembers(true);
    }
  }

  return (
    <div className={cn("flex flex-col w-full h-full max-w-2xl mx-auto mt-20")}>
      <div>
        <h1 className={cn("text-2xl font-bold text-left")}>Create a Project</h1>
        <h4 className={cn("text-muted-foreground text-sm text-left")}>
          Set up your project details, client info, and assign your team.
        </h4>
      </div>

      {/* Current step indicator */}
      <div className={cn("flex items-center gap-2 mt-10 w-full")}>
        <div className={cn("flex items-center gap-x-2 w-fit")}>
          <div className="w-2 h-2 bg-neutral-900 dark:bg-neutral-100 rounded-full" />
          <div className="text-sm font-medium">Project Details</div>
        </div>

        <div className="h-px bg-neutral-300 dark:bg-neutral-500 w-30" />
        <div className={cn("flex items-center gap-x-2 w-fit")}>
          <div className="w-2 h-2 bg-neutral-900 dark:bg-neutral-100 rounded-full" />
          <div className="text-sm font-medium">Client Information</div>
        </div>

        <div className="h-px bg-neutral-300 dark:bg-neutral-500 w-30" />
        <div className={cn("flex items-center gap-x-2 w-fit")}>
          <div className="w-2 h-2 bg-neutral-900 dark:bg-neutral-100 rounded-full" />
          <div className="text-sm font-medium">Assign Members</div>
        </div>
      </div>

      {/* Actual form */}
      <form
        className={cn("w-full mt-10 min-h-96")}
        onSubmit={form.handleSubmit(onSubmit)}
        id="form-create-project"
      >
        {/* Step 1: Project Details */}
        {!haveProjectDetails && (
          <Card className={cn("rounded-lg py-8! px-4")}>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Provide the basic information about your project.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Form fields for project details */}
              <FieldGroup>
                <Controller
                  name="projectDetails.name"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-create-project-name">
                          Project Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-create-project-name"
                          aria-invalid={fieldState.invalid}
                          placeholder="Project Name"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />

                <Controller
                  name="projectDetails.description"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-create-project-description">
                          Description
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id="form-create-project-description"
                          placeholder="Brief Description of your project. Like what the project is about..."
                          autoComplete="off"
                          className="resize-none"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />

                <Controller
                  name="projectDetails.amount"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-create-project-amount">
                          Amount (in USDC)
                        </FieldLabel>

                        <Input
                          {...field}
                          id="form-create-project-amount"
                          placeholder="Amount decided for project"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </CardContent>
          </Card>
        )}

        {haveProjectDetails && !haveClientInformation && (
          <Card className={cn("rounded-lg py-8! px-4")}>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
              <CardDescription>
                The client who will be invoiced for this project.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Form fields for project details */}
              <FieldGroup>
                <Controller
                  name="clientInformation.name"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-create-project-client-name">
                          Project Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-create-project-client-name"
                          aria-invalid={fieldState.invalid}
                          placeholder="Yuvan"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />

                <Controller
                  name="clientInformation.billingEmail"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-create-project-client-billing-email">
                          Description
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-create-project-client-billing-email"
                          type="email"
                          placeholder="yuvan@gmail.com"
                          autoComplete="off"
                          className="resize-none"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </CardContent>
          </Card>
        )}
        {haveProjectDetails &&
          haveClientInformation &&
          !haveAssignedMembers && (
            <Card className={cn("rounded-lg py-8! px-4")}>
              <CardHeader>
                <CardTitle>Assign Team Members</CardTitle>
                <CardDescription>
                  Select who will work on this project.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Form fields for project details */}
                <FieldGroup>
                  <Controller
                    name="clientInformation.name"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-create-project-client-name">
                            Project Name
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-create-project-client-name"
                            aria-invalid={fieldState.invalid}
                            placeholder="Yuvan"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />

                  <Controller
                    name="clientInformation.billingEmail"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-create-project-client-billing-email">
                            Description
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-create-project-client-billing-email"
                            type="email"
                            placeholder="yuvan@gmail.com"
                            autoComplete="off"
                            className="resize-none"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </FieldGroup>
              </CardContent>
            </Card>
          )}

        <div className={cn("flex items-center justify-between mt-10")}>
          <Button variant={"outline"}>Cancel</Button>

          <Button variant={"outline"} onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};
