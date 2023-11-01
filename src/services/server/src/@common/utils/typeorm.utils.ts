import { QueryRunner } from 'typeorm';

export const getOffset = (page: number, limit: number): number => {
  return (page - 1) * limit;
};

export { QueryRunner };
