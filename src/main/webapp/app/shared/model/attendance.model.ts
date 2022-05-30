import dayjs from 'dayjs';

export interface IAttendance {
  id?: number;
  logDate?: string | null;
  logTimeFrom?: string | null;
  logTimeTo?: string | null;
  permissionHours?: number | null;
  details?: string | null;
}

export const defaultValue: Readonly<IAttendance> = {};
