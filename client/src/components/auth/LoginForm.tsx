import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CiUnlock } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  loginUserSchema,
  type TLoginUser,
} from '@/validations/user.validations'
import { Field, FieldError, FieldLabel } from '../ui/field'

export function LoginForm() {
  const form = useForm<TLoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<TLoginUser> = (data) => {
    console.log(data)
  }
  return (
    <Card className="w-full max-w-sm ">
      <CardHeader>
        <div className="flex flex-col justify-center items-center gap-2">
          <CiUnlock
            className="text-primary bg-[#BAC3FF] rounded-sm p-1 mb-2"
            size={40}
          />
          <p className="text-xl font-semibold">Welcome Back</p>
          <p className="text-sm text-muted-foreground">
            Access the Edulens Portal to manage assessments.
          </p>
        </div>
      </CardHeader>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <CardContent className="flex flex-col gap-4">
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
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div>
            <p>
              New to Edulens?{' '}
              <Link
                to="/auth/register"
                className="text-primary hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
