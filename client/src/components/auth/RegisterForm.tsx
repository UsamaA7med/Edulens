import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaRegUser } from 'react-icons/fa'
import { LuGraduationCap } from 'react-icons/lu'

import {
  createUserSchema,
  type TCreateUser,
} from '@/validations/user.validations'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

export function RegisterForm() {
  const form = useForm<TCreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      role: 'student',
    },
  })

  const onSubmit: SubmitHandler<TCreateUser> = (data) => {
    console.log(data)
  }
  return (
    <Card className="w-full max-w-sm ">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">Create Account</p>
          <p className="text-sm text-muted-foreground">
            Join the Edulens community today.
          </p>
        </div>
      </CardHeader>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">I am a...</p>
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <ToggleGroup
                    className="w-full"
                    type="single"
                    variant="outline"
                    size="sm"
                    value={field.value}
                    onValueChange={(val) => {
                      if (val) field.onChange(val)
                    }}
                  >
                    <ToggleGroupItem value="student" className="w-1/2">
                      <FaRegUser />
                      Student
                    </ToggleGroupItem>
                    <ToggleGroupItem value="teacher" className="w-1/2">
                      <LuGraduationCap />
                      Teacher
                    </ToggleGroupItem>
                  </ToggleGroup>
                </Field>
              )}
            />
          </div>
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs" />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="example@edulens.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs" />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="password"
                  placeholder="Enter your password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs" />
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="password"
                  placeholder="Confirm password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs" />
                )}
              </Field>
            )}
          />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Create Account
          </Button>
          <div>
            <p>
              Already have an account?{' '}
              <Link to="/auth/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
