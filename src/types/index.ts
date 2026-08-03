export type RegistrationStatus = 'pending' | 'verified' | 'rejected' | 'finalist'

export interface RegistrationFormData {
  full_name: string
  email: string
  phone: string
  date_of_birth: string
  place_of_birth: string
  gender: 'Laki-laki' | 'Perempuan'
  nim: string
  faculty: string
  study_program: string
  semester: number
  address: string
  city: string
  province: string
  height_cm: number
  weight_kg: number
  occupation: string
  education: string
  instagram: string
  tiktok: string
  facebook: string
  essay: string
  consent: boolean
}
