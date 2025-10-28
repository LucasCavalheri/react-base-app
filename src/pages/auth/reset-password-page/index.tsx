import { Card, CardContent } from '@/components/ui/card'
import { FormImage } from '@/components/form-image'
import { ResetPasswordForm } from './components/reset-password-form'

export function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <FormImage />
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}
