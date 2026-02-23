import { describe, it, expect } from 'vitest';

import validateConfig from '../validateConfig';

describe('validateConfig', () => {
  it('returns true for valid text fields', () => {
    expect(
      validateConfig([
        { id: '1', type: 'text', label: 'Name', required: false },
      ])
    ).toBe(true);
  });

  it('returns true for valid number fields with min/max', () => {
    expect(
      validateConfig([
        {
          id: '1',
          type: 'number',
          label: 'Age',
          required: true,
          min: 0,
          max: 120,
        },
      ])
    ).toBe(true);
  });

  it('returns true for valid group with children', () => {
    expect(
      validateConfig([
        {
          id: '1',
          type: 'group',
          label: 'Info',
          required: false,
          children: [{ id: '2', type: 'text', label: 'Name', required: true }],
        },
      ])
    ).toBe(true);
  });

  it('returns false for non-array input', () => {
    expect(validateConfig('not an array')).toBe(false);
    expect(validateConfig(null)).toBe(false);
    expect(validateConfig(42)).toBe(false);
  });

  it('returns false when field is missing id', () => {
    expect(
      validateConfig([{ type: 'text', label: 'Name', required: false }])
    ).toBe(false);
  });

  it('returns false for unknown field type', () => {
    expect(
      validateConfig([{ id: '1', type: 'email', label: 'E', required: false }])
    ).toBe(false);
  });

  it('returns false when required is not boolean', () => {
    expect(
      validateConfig([{ id: '1', type: 'text', label: 'E', required: 'yes' }])
    ).toBe(false);
  });

  it('returns false when number min > max', () => {
    expect(
      validateConfig([
        {
          id: '1',
          type: 'number',
          label: 'N',
          required: false,
          min: 10,
          max: 5,
        },
      ])
    ).toBe(false);
  });

  it('returns false when group has no children array', () => {
    expect(
      validateConfig([{ id: '1', type: 'group', label: 'G', required: false }])
    ).toBe(false);
  });

  it('returns false for invalid nested children', () => {
    expect(
      validateConfig([
        {
          id: '1',
          type: 'group',
          label: 'G',
          required: false,
          children: [{ invalid: true }],
        },
      ])
    ).toBe(false);
  });

  it('returns true for empty fields array', () => {
    expect(validateConfig([])).toBe(true);
  });

  it('returns true for deeply nested valid structure', () => {
    expect(
      validateConfig([
        {
          id: '1',
          type: 'group',
          label: 'L1',
          required: false,
          children: [
            {
              id: '2',
              type: 'group',
              label: 'L2',
              required: false,
              children: [
                { id: '3', type: 'text', label: 'Deep', required: true },
              ],
            },
          ],
        },
      ])
    ).toBe(true);
  });
});
