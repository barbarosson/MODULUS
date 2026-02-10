'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TurkishProvinceSelect } from '@/components/turkish-province-select'
import { TurkishBankSelect } from '@/components/turkish-bank-select'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { useTenant } from '@/contexts/tenant-context'
import { useLanguage } from '@/contexts/language-context'

interface AddCustomerDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddCustomerDialog({ isOpen, onClose, onSuccess }: AddCustomerDialogProps) {
  const { tenantId } = useTenant()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    company_title: '',
    name: '',
    account_type: 'customer',
    tax_office: '',
    tax_number: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    postal_code: '',
    country: '',
    payment_terms: 0,
    payment_terms_type: 'net',
    bank_name: '',
    bank_account_holder: '',
    bank_account_number: '',
    bank_iban: '',
    bank_branch: '',
    bank_swift: '',
    website: '',
    industry: '',
    notes: '',
    e_invoice_enabled: false,
    status: 'active'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.company_title.trim()) {
      newErrors.company_title = t.validation.companyTitleRequired
    }

    if (!formData.name.trim()) {
      newErrors.name = t.validation.contactNameRequired
    }

    if (!formData.tax_number.trim()) {
      newErrors.tax_number = t.validation.taxNumberRequired
    } else if (!/^\d{10}$/.test(formData.tax_number)) {
      newErrors.tax_number = t.validation.taxNumberMustBe10Digits
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.validation.invalidEmailFormat
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = t.validation.invalidPhoneFormat
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData?.user?.id) {
        throw new Error(t.inventory.authRequired)
      }

      const tenant_id = userData.user.id

      const { data, error } = await supabase
        .from('customers')
        .insert([{ ...formData, tenant_id }])
        .select()

      if (error) {
        throw error
      }

      toast.success(t.toast.customerAdded)
      onSuccess()
      handleClose()
    } catch (error: any) {
      console.error('Error adding customer:', error)
      toast.error(error.message || t.toast.customerError)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      company_title: '',
      name: '',
      account_type: 'customer',
      tax_office: '',
      tax_number: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      district: '',
      postal_code: '',
      country: '',
      payment_terms: 0,
      payment_terms_type: 'net',
      bank_name: '',
      bank_account_holder: '',
      bank_account_number: '',
      bank_iban: '',
      bank_branch: '',
      bank_swift: '',
      website: '',
      industry: '',
      notes: '',
      e_invoice_enabled: false,
      status: 'active'
    })
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.customers.addCustomer}</DialogTitle>
          <DialogDescription>
            {t.customers.customerDetails}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">{t.customers.basicInfo}</TabsTrigger>
              <TabsTrigger value="address">{t.customers.address}</TabsTrigger>
              <TabsTrigger value="payment">{t.common.payment}</TabsTrigger>
              <TabsTrigger value="bank">{t.customers.bankInfo}</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company_title">
                  {t.customers.companyTitle} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="company_title"
                  value={formData.company_title}
                  onChange={(e) => setFormData({ ...formData, company_title: e.target.value })}
                  placeholder={t.placeholders.acmeCorporation}
                  className={errors.company_title ? 'border-red-500' : ''}
                />
                {errors.company_title && (
                  <p className="text-xs text-red-500">{errors.company_title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">
                  {t.customers.contactName} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.placeholders.johnDoe}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account_type">{t.customers.accountType}</Label>
              <Select
                value={formData.account_type}
                onValueChange={(value) => setFormData({ ...formData, account_type: value })}
              >
                <SelectTrigger id="account_type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">{t.customers.typeCustomer}</SelectItem>
                  <SelectItem value="vendor">{t.customers.typeVendor}</SelectItem>
                  <SelectItem value="both">{t.customers.typeBoth}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tax_office">{t.customers.taxOffice}</Label>
                <Input
                  id="tax_office"
                  value={formData.tax_office}
                  onChange={(e) => setFormData({ ...formData, tax_office: e.target.value })}
                  placeholder={t.placeholders.kadikoyTaxOffice}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tax_number">
                  {t.customers.taxNumber} (VKN/TCKN) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="tax_number"
                  value={formData.tax_number}
                  onChange={(e) => setFormData({ ...formData, tax_number: e.target.value })}
                  placeholder="1234567890"
                  maxLength={10}
                  className={errors.tax_number ? 'border-red-500' : ''}
                />
                {errors.tax_number && (
                  <p className="text-xs text-red-500">{errors.tax_number}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t.customers.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.placeholders.contactEmail}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t.customers.phone}</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t.placeholders.phoneNumber}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">{t.customers.website}</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder={t.placeholders.websiteUrl}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">{t.customers.industry}</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder={t.placeholders.industryExample}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="e_invoice">{t.customers.eInvoiceIntegration}</Label>
                <p className="text-xs text-gray-500">
                  {t.customers.enableEInvoice}
                </p>
              </div>
              <Switch
                id="e_invoice"
                checked={formData.e_invoice_enabled}
                onCheckedChange={(checked) => setFormData({ ...formData, e_invoice_enabled: checked })}
              />
            </div>
          </TabsContent>

          <TabsContent value="address" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="address">{t.customers.streetAddress}</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder={t.placeholders.streetName}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">{t.customers.city}</Label>
                <TurkishProvinceSelect
                  value={formData.city}
                  onValueChange={(value) => setFormData({ ...formData, city: value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">{t.customers.district}</Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder={t.placeholders.districtName}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postal_code">{t.customers.postalCode}</Label>
                <Input
                  id="postal_code"
                  value={formData.postal_code}
                  onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                  placeholder="34000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">{t.customers.country}</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder={t.placeholders.turkeyCountry}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payment_terms">{t.customers.paymentTerms}</Label>
                <Input
                  id="payment_terms"
                  type="number"
                  value={formData.payment_terms}
                  onChange={(e) => setFormData({ ...formData, payment_terms: parseInt(e.target.value) || 0 })}
                  placeholder="30"
                />
                <p className="text-xs text-gray-500">{t.customers.paymentTermsHelp}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment_terms_type">{t.customers.paymentTermsType}</Label>
                <Select
                  value={formData.payment_terms_type}
                  onValueChange={(value) => setFormData({ ...formData, payment_terms_type: value })}
                >
                  <SelectTrigger id="payment_terms_type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="net">{t.campaigns.net}</SelectItem>
                    <SelectItem value="eom">{t.campaigns.eom}</SelectItem>
                    <SelectItem value="days">{t.campaigns.daysFromInvoiceDate}</SelectItem>
                    <SelectItem value="immediate">{t.campaigns.immediate}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">{t.customers.internalNotes}</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={t.customers.internalNotesPlaceholder}
                rows={4}
              />
            </div>
          </TabsContent>

          <TabsContent value="bank" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="bank_name">{t.settings.bankName}</Label>
              <TurkishBankSelect
                value={formData.bank_name}
                onValueChange={(value) => setFormData({ ...formData, bank_name: value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bank_account_holder">{t.customers.accountHolderName}</Label>
                <Input
                  id="bank_account_holder"
                  value={formData.bank_account_holder}
                  onChange={(e) => setFormData({ ...formData, bank_account_holder: e.target.value })}
                  placeholder={t.placeholders.companyOrPersonName}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank_branch">{t.customers.bankBranch}</Label>
                <Input
                  id="bank_branch"
                  value={formData.bank_branch}
                  onChange={(e) => setFormData({ ...formData, bank_branch: e.target.value })}
                  placeholder={t.placeholders.branchNameOrCode}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank_iban">{t.customers.iban}</Label>
              <Input
                id="bank_iban"
                value={formData.bank_iban}
                onChange={(e) => setFormData({ ...formData, bank_iban: e.target.value })}
                placeholder={t.placeholders.ibanExample}
                maxLength={32}
              />
              <p className="text-xs text-gray-500">{t.customers.ibanHelp}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bank_account_number">{t.customers.accountNumber}</Label>
                <Input
                  id="bank_account_number"
                  value={formData.bank_account_number}
                  onChange={(e) => setFormData({ ...formData, bank_account_number: e.target.value })}
                  placeholder="0000000000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank_swift">{t.customers.swiftBic}</Label>
                <Input
                  id="bank_swift"
                  value={formData.bank_swift}
                  onChange={(e) => setFormData({ ...formData, bank_swift: e.target.value })}
                  placeholder={t.placeholders.swiftExample}
                />
              </div>
            </div>
          </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              {t.common.cancel}
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#2ECC71] hover:bg-[#27AE60]"
            >
              {loading ? t.common.adding : t.customers.addCustomer}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
