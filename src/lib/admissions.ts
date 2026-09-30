export const admissionClasses = [
  ...Array.from({ length: 4 }, (_, index) => `Class ${index + 9}`),
];

export function getAdmissionStreams(classApplying: string): string[] {
  const classNumber = Number(classApplying.match(/^Class (\d+)$/)?.[1]);
  if (!Number.isInteger(classNumber) || classNumber < 9 || classNumber > 12) return [];
  if (classNumber <= 10) return ['Secondary'];
  return ['Science', 'Arts'];
}
