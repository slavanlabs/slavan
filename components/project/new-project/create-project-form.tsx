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
import { useAgency } from "@/store/useAgency";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Search } from "lucide-react";
import { toast } from "sonner";
import { glassCard, glassCardFocus } from "@/lib/custom-style";

const STEPS = [
  {
    title: "Project Details",
  },
  {
    title: "Client Information",
  },
  {
    title: "Assign Members",
  },
];

const formSchema = z.object({
  projectDetails: z.object({
    name: z.string().min(1, "Project name is required"),
    description: z
      .string()
      .max(100, "Description must be most 100 characters")
      .optional(),
    amount: z.number(),
  }),
  clientInformation: z.object({
    name: z.string().min(1, "Client name is required"),
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

  const [step, setstep] = useState<1 | 2 | 3>(1);
  const members = useAgency((state) => state.members);

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  async function handleContinue() {
    const fieldsToValidate = {
      1: "projectDetails",
      2: "clientInformation",
    } as const;

    const field = fieldsToValidate[step as 1 | 2];
    if (field) {
      const valid = await form.trigger(field);
      if (!valid) {
        toast.error("Invalid details provided.");
        return;
      }
    }

    setstep((s) => Math.min(s + 1, 3) as 1 | 2 | 3);
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
      <StepIndicator currentStep={step} steps={STEPS} />
      {/* Actual form */}
      <form
        className={cn("w-full mt-10 min-h-96")}
        onSubmit={form.handleSubmit(onSubmit)}
        id="form-create-project"
      >
        {/* Step 1: Project Details */}
        {step === 1 && (
          <Card className={cn("rounded-2xl py-8! px-4 min-h-96")}>
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
                          className={cn(glassCard, glassCardFocus)}
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
                          className={cn(
                            glassCard,
                            glassCardFocus,
                            "resize-none",
                          )}
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
                          Amount (USD)
                        </FieldLabel>

                        <Input
                          {...field}
                          id="form-create-project-amount"
                          placeholder="Amount decided for project"
                          autoComplete="off"
                          type="number"
                          className={cn(glassCard, glassCardFocus)}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
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

        {step === 2 && (
          <Card className={cn("rounded-lg py-8! px-4 min-h-96")}>
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
                          Client Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-create-project-client-name"
                          aria-invalid={fieldState.invalid}
                          placeholder="Yuvan"
                          autoComplete="off"
                          className={cn(glassCard, glassCardFocus)}
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
                          Billing Email
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-create-project-client-billing-email"
                          type="email"
                          placeholder="yuvan@gmail.com"
                          autoComplete="off"
                          className={cn(glassCard, glassCardFocus)}
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
        {step === 3 && (
          <Card className={cn("rounded-2xl py-8! px-4 min-h-96")}>
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
                  name="assignedMembers"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <div
                          className={cn(
                            glassCard,
                            glassCardFocus,
                            "flex items-center gap-2 px-3 py-1 mb-4 mt-2 w-full rounded-xl",
                          )}
                        >
                          <Search
                            size={15}
                            className="text-neutral-400 dark:text-neutral-500 shrink-0"
                          />
                          <Input
                            className={cn(
                              " bg-transparent! border-none p-0 text-sm",
                              "placeholder:text-neutral-400 dark:placeholder:text-neutral-600",
                              "focus-visible:ring-0 focus-visible:ring-offset-0",
                            )}
                            placeholder="Search Projects..."
                          />
                        </div>
                        <div
                          className={cn(
                            "py-6 px-2.5 rounded-xl",
                            glassCard,
                            "transition-shadow duration-200",
                          )}
                        >
                          {members.map((m) => {
                            const isChecked = field.value.includes(m.id);
                            return (
                              <div
                                key={m.id}
                                className="flex items-center justify-between gap-x-1.5 px-3"
                              >
                                <span className="capitalize font-medium text-neutral-400">
                                  {m.name}
                                </span>
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, m.id]);
                                    } else {
                                      field.onChange(
                                        field.value.filter((id) => id !== m.id),
                                      );
                                    }
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
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

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setstep((s) => Math.max(s - 1, 1) as 1 | 2 | 3)}
              disabled={step === 1}
            >
              <ChevronLeft size={15} />
              Back
            </Button>
            <Button
              variant={"outline"}
              type={step === 3 ? "submit" : "button"}
              onClick={step < 3 ? handleContinue : undefined}
            >
              {step === 3 ? "Create Project" : "Continue"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

type StepIndicatorProps = {
  currentStep: number; // 1-indexed
  steps: { title: string }[];
};

export const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center w-full mt-10">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={step.title} className="flex items-center">
            {/* Dot + label */}
            <div className="flex items-center gap-x-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-colors duration-300",
                  isCompleted || isActive
                    ? "bg-neutral-900 dark:bg-neutral-100"
                    : "bg-neutral-300 dark:bg-neutral-600",
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  isActive
                    ? "text-neutral-900 dark:text-neutral-100"
                    : isCompleted
                      ? "text-neutral-500 dark:text-neutral-400"
                      : "text-neutral-300 dark:text-neutral-600",
                )}
              >
                {step.title}
              </span>
            </div>

            {/* Connector line — not after last step */}
            {index < steps.length - 1 && (
              <div className="relative mx-3 h-px w-30 bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 bg-neutral-900 dark:bg-neutral-100",
                    "transition-[width] duration-500 ease-in-out",
                    isCompleted ? "w-full" : "w-0",
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
