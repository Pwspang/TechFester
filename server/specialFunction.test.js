const convertTo24Hour = require("./specialFunction");

describe('convertTo24Hour', () => {
    test.each([
      {
        input: { timeStr: '12:00 AM' },
        output: '00:00',
      },
      {
        input: { timeStr: '11:45 PM' },
        output: '23:45',
      },
      {
        input: { timeStr: '06:30 PM' },
        output: '18:30',
      },
      {
        input: { timeStr: '04:15 AM' },
        output: '04:15',
      },
      {
        input: { timeStr: '09:55 AM' },
        output: '09:55',
      },
    ])('converts time string', ({ input, output }) => {
      expect(convertTo24Hour(input.timeStr)).toBe(output);
    });
  });