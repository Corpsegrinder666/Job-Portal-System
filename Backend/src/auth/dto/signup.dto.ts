import {
  IsString,
  IsEmail,
  IsDateString,
  IsEnum,
  MinLength,
  Matches,
  ValidateIf,
  IsNotEmpty,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum Role {
  HR = 'hr',
  ADMIN = 'admin',
}

// Custom validator to check if confirmPassword matches password
@ValidatorConstraint({ async: false })
export class ConfirmPasswordMatch implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const object = args.object as SignupDto;
    return confirmPassword === object.password;
  }
  defaultMessage(args: ValidationArguments): string {
    return 'Confirm password must match password';
  }
}

// Custom validator to check age >= 18 based on dob
@ValidatorConstraint({ async: false })
export class IsAdult implements ValidatorConstraintInterface {
  validate(dob: string) {
    const birthDate = new Date(dob);
    const today = new Date();
    const ageDifMs = today.getTime() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age >= 18;
  }
  defaultMessage(args: ValidationArguments): string {
    return 'You must be at least 18 years old to register';
  }
}

export class SignupDto {
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @IsEnum(Gender, { message: 'Gender must be male, female, or other' })
  gender: Gender;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsDateString({}, { message: 'Date of birth must be a valid date string' })
  @Validate(IsAdult)
  dob: string;

  @IsString()
  @Matches(/^(bachelors|masters|phd)$/i, {
    message: 'Educational qualification must be bachelors, masters, or phd',
  })
  educationalQualification: string;

  @IsEnum(Role, { message: 'Role must be hr or admin' })
  role: Role;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least one number and one special character',
  })
  password: string;

  @IsString()
  @ValidateIf((o) => o.password)
  @Validate(ConfirmPasswordMatch)
  confirmPassword: string;
}
