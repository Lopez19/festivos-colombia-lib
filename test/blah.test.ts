import { getHolidaysByYear } from '../src';

describe('getHolidaysByYear', () => {
  it('should return an array of holidays', () => {
    const holidays = getHolidaysByYear(2024);
    expect(holidays).toBeDefined();
    expect(holidays.length).toBeGreaterThan(0);
  });

  it('should return an array of holidays with the correct name', () => {
    const holidays = getHolidaysByYear(2024);
    expect(holidays[0].name).toBe('Año Nuevo');
  });

  it('should return an array of holidays with the correct date', () => {
    const holidays = getHolidaysByYear(2024);
    expect(holidays[0].date).toBe('2024-01-01');
  });

  it('should return an array of holidays with the correct static', () => {
    const holidays = getHolidaysByYear(2024);
    expect(holidays[0].static).toBe(false);
  });
});
