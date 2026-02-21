import { describe, it, expect } from 'vitest';

import {
  findFieldById,
  addField,
  deleteField,
  updateField,
  moveField,
} from '../fieldOperations';
import { createField } from '../fieldFactory';

import type { FormField, GroupField } from '@/types/fields';

describe('fieldOperations', () => {
  const createTestField = (
    type: 'text' | 'number' | 'group',
    id: string
  ): FormField => {
    const field = createField(type);
    return { ...field, id, label: `${type} field ${id}` };
  };

  const createGroupWithChildren = (
    groupId: string,
    children: FormField[]
  ): GroupField => {
    return {
      ...(createField('group') as GroupField),
      id: groupId,
      label: `Group ${groupId}`,
      children,
    };
  };

  type GroupWithChildren = GroupField;

  describe('findFieldById', () => {
    it('finds field at root level', () => {
      const field1 = createTestField('text', 'field-1');
      const field2 = createTestField('number', 'field-2');
      const fields = [field1, field2];

      expect(findFieldById(fields, 'field-1')).toBe(field1);
      expect(findFieldById(fields, 'field-2')).toBe(field2);
    });

    it('finds field in nested group', () => {
      const childField = createTestField('text', 'child-1');
      const group = createGroupWithChildren('group-1', [childField]);
      const fields = [group];

      expect(findFieldById(fields, 'child-1')).toBe(childField);
    });

    it('finds field in deeply nested structure', () => {
      const deepChild = createTestField('number', 'deep-child');
      const nestedGroup = createGroupWithChildren('nested-group', [deepChild]);
      const parentGroup = createGroupWithChildren('parent-group', [
        nestedGroup,
      ]);
      const fields = [parentGroup];

      expect(findFieldById(fields, 'deep-child')).toBe(deepChild);
    });

    it('returns undefined for non-existent field', () => {
      const fields = [createTestField('text', 'field-1')];
      expect(findFieldById(fields, 'non-existent')).toBeUndefined();
    });
  });

  describe('addField', () => {
    it('adds field to root level when parentId is null', () => {
      const existingField = createTestField('text', 'existing');
      const newField = createTestField('number', 'new');
      const fields = [existingField];

      const result = addField(fields, null, newField);

      expect(result).toHaveLength(2);
      expect(result[0]).toBe(existingField);
      expect(result[1]).toBe(newField);
    });

    it('adds field to specific group', () => {
      const group = createGroupWithChildren('group-1', []);
      const newField = createTestField('text', 'new');
      const fields = [group];

      const result = addField(fields, 'group-1', newField);

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('group');

      const grp = result[0] as GroupWithChildren;
      expect(grp.children).toHaveLength(1);
      expect(grp.children[0]).toBe(newField);
    });

    it('adds field to nested group', () => {
      const nestedGroup = createGroupWithChildren('nested', []);
      const parentGroup = createGroupWithChildren('parent', [nestedGroup]);
      const newField = createTestField('text', 'new');
      const fields = [parentGroup];

      const result = addField(fields, 'nested', newField);

      const parent = result[0] as GroupWithChildren;
      const nested = parent.children[0] as GroupWithChildren;
      expect(nested.children).toHaveLength(1);
      expect(nested.children[0]).toBe(newField);
    });
  });

  describe('deleteField', () => {
    it('deletes field from root level', () => {
      const field1 = createTestField('text', 'field-1');
      const field2 = createTestField('number', 'field-2');
      const fields = [field1, field2];

      const result = deleteField(fields, 'field-1');

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(field2);
    });

    it('deletes field from group', () => {
      const childField = createTestField('text', 'child-1');
      const group = createGroupWithChildren('group-1', [childField]);
      const fields = [group];

      const result = deleteField(fields, 'child-1');

      expect(result).toHaveLength(1);

      const grp = result[0] as GroupWithChildren;
      expect(grp.children).toHaveLength(0);
    });

    it('deletes group and all its children', () => {
      const childField = createTestField('text', 'child-1');
      const group = createGroupWithChildren('group-1', [childField]);
      const otherField = createTestField('number', 'other');
      const fields = [group, otherField];

      const result = deleteField(fields, 'group-1');

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(otherField);
    });

    it('returns unchanged array when field not found', () => {
      const field1 = createTestField('text', 'field-1');
      const fields = [field1];

      const result = deleteField(fields, 'non-existent');

      expect(result).toEqual(fields);
      expect(result).not.toBe(fields);
    });
  });

  describe('updateField', () => {
    it('updates field at root level', () => {
      const field = createTestField('text', 'field-1');
      const fields = [field];

      const result = updateField(fields, 'field-1', {
        label: 'Updated Label',
        required: true,
      });

      expect(result[0]).toEqual({
        ...field,
        label: 'Updated Label',
        required: true,
      });
    });

    it('updates field in nested group', () => {
      const childField = createTestField('number', 'child-1');
      const group = createGroupWithChildren('group-1', [childField]);
      const fields = [group];

      const result = updateField(fields, 'child-1', {
        min: 10,
        max: 100,
      } as Partial<FormField>);

      const grp = result[0] as GroupWithChildren;
      const updatedChild = grp.children[0];
      expect(updatedChild).toEqual({
        ...childField,
        min: 10,
        max: 100,
      });
    });

    it('returns unchanged array when field not found', () => {
      const field = createTestField('text', 'field-1');
      const fields = [field];

      const result = updateField(fields, 'non-existent', { label: 'Updated' });

      expect(result).toEqual(fields);
      expect(result).not.toBe(fields);
    });
  });

  describe('moveField', () => {
    it('moves field up at root level', () => {
      const field1 = createTestField('text', 'field-1');
      const field2 = createTestField('number', 'field-2');
      const fields = [field1, field2];

      const result = moveField(fields, 'field-2', 'up');

      expect(result).toEqual([field2, field1]);
    });

    it('moves field down at root level', () => {
      const field1 = createTestField('text', 'field-1');
      const field2 = createTestField('number', 'field-2');
      const fields = [field1, field2];

      const result = moveField(fields, 'field-1', 'down');

      expect(result).toEqual([field2, field1]);
    });

    it('does not move field up when already first', () => {
      const field1 = createTestField('text', 'field-1');
      const field2 = createTestField('number', 'field-2');
      const fields = [field1, field2];

      const result = moveField(fields, 'field-1', 'up');

      expect(result).toEqual(fields);
      expect(result).not.toBe(fields);
    });

    it('does not move field down when already last', () => {
      const field1 = createTestField('text', 'field-1');
      const field2 = createTestField('number', 'field-2');
      const fields = [field1, field2];

      const result = moveField(fields, 'field-2', 'down');

      expect(result).toEqual(fields);
      expect(result).not.toBe(fields);
    });

    it('moves field within nested group', () => {
      const child1 = createTestField('text', 'child-1');
      const child2 = createTestField('number', 'child-2');
      const group = createGroupWithChildren('group-1', [child1, child2]);
      const fields = [group];

      const result = moveField(fields, 'child-2', 'up');

      const updatedChildren = (result[0] as GroupWithChildren).children;
      expect(updatedChildren).toEqual([child2, child1]);
    });
  });
});
