import { HOLYDAYS } from './types/IHoliday';
import { Holiday } from './types/festivos-colombia-typescript';

/**
 * Formatea una fecha en una cadena con el formato "YYYY-MM-DD".
 *
 * @param date - La fecha a formatear.
 * @returns {string} La cadena de fecha formateada.
 */
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * El algoritmo se basa en el algoritmo de Gauss para calcular la fecha de Pascua.
 * para cualquier año entre 1583 y 4099.
 *
 * @see https://en.wikipedia.org/wiki/Computus#Anonymous_Gregorian_algorithm
 *
 * @param year: el año para calcular el Domingo de Pascua.
 * @returns {Date} La fecha del Domingo de Pascua para el año especificado.
 */
const getEasterSunday = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = Math.floor((h + l - 7 * m + 114) / 31);
  const p = (h + l - 7 * m + 114) % 31;

  return new Date(year, n - 1, p + 1);
};

/**
 * Regresa el próximo lunes a partir de la fecha indicada.
 * @param date: la fecha a partir de la cual se calcula el próximo lunes.
 * @returns {Date} El próximo lunes como objeto Fecha.
 */
const getNextMonday = (date: Date): Date => {
  const day = date.getDay();
  const daysToNextMonday = day === 0 ? 1 : 8 - day;
  return sumDays(date.toDateString(), daysToNextMonday);
};

/**
 * Agrega el número especificado de días a una fecha determinada.
 * @param stringDate: la representación de cadena de la fecha.
 * @param days: el número de días que se van a agregar.
 * @returns {Date} La fecha resultante después de sumar el número de días especificado.
 */
const sumDays = (stringDate: string, days: number): Date => {
  const date = new Date(stringDate);
  date.setDate(date.getDate() + days);
  return date;
};

/**
 * Obtiene el nombre del día de la semana para una fecha dada.
 * @param date La fecha para la cual se desea obtener el nombre del día.
 * @returns {string} El nombre del día de la semana en formato de texto.
 */
const getNameDay = (date: string): string => {
  const days = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sababado',
    'Domingo',
  ];
  const day = new Date(date).getDay();
  day === 0 ? 6 : day - 1;
  return days[day];
};

/**
 * Obtiene los días festivos por año.
 * @param year El año para el cual se desean obtener los días festivos.
 * @returns {Holiday[]} Un arreglo de objetos Holiday que representan los días festivos del año especificado.
 */
export const getHolidaysByYear = (year: number) => {
  const holidays: Holiday[] = [];

  // Obtenemos el Domingo de Pascua para el año especificado.
  const easterSunday = getEasterSunday(year);

  HOLYDAYS.forEach(holiday => {
    let date: Date;

    if (!holiday.daysToSum) {
      date = new Date(`${year}-${holiday.date}`);
    } else {
      date = sumDays(easterSunday.toDateString(), holiday.daysToSum);
    }

    if (holiday.nextMonday) {
      date = getNextMonday(date);
    }

    holiday.nameDay = getNameDay(formatDate(date));

    holidays.push({
      name: holiday.name,
      date: formatDate(date),
      static: holiday.nextMonday,
      nameDay: holiday.nameDay,
    });
  });

  return holidays;
};
