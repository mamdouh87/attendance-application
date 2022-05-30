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
  manager?: IEmployee | null;
}

export const defaultValue: Readonly<IEmployee> = {};
