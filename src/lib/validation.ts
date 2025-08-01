import { z } from "zod";

export const oprionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: oprionalString,
  description: oprionalString,
});

export type GeneralInfoValue = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less than 4MB",
    ),
  firstName: oprionalString,
  lastName: oprionalString,
  jobTitle: oprionalString,
  city: oprionalString,
  country: oprionalString,
  phone: oprionalString,
  email: oprionalString,
});

export type PersonalInfoValue = z.infer<typeof personalInfoSchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};
