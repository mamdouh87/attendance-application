export interface IEmployee {
  id?: number;
  nameEn?: string | null;
  nameAr?: string | null;
  email?: string | null;
  employeeCode?: string | null;
  mobileNo?: string | null;
  address?: string | null;
  nationalId?: string | null;
  title?: string | null;
}

export const defaultValue: Readonly<IEmployee> = {};
