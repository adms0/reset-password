import {Ref, CSSProperties} from 'react'

export interface ComponentProps<RefType = any> {
  className?: string
  ref?: Ref<RefType>
  children?: JSX.Element | JSX.Element[]
  submit?: any
}

export enum PasswordStrength {
  STRONG = 'Strong',
  MEDIUM = 'Medium',
  WEAK = 'Weak',
}

export type TypePasswordProps = {
  password?: string;
}

export interface FormForgotPasswordType {
  newPassword?: string
  confirmPassword?: string
}

export interface NalysaLogoProps {
  width?: number
  height?: number
  color?: 'white' | 'dark'
  alt?: string
  className?: string
  style?: CSSProperties
}