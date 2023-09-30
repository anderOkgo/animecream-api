import {
  generateInCondition,
  generateLikeCondition,
  generateEqualCondition,
  generateLimit,
  generateBetweenCondition,
  generateAndCondition,
} from '../../../../src/helpers/data/mysql/mysql.helper';

describe('generateInCondition', () => {
  it('should generate an IN condition', () => {
    const result = generateInCondition('ids', '1,2,3');
    expect(result).toBe(' AND ids IN (1,2,3)');
  });
});

describe('generateLikeCondition', () => {
  it('should generate a LIKE condition', () => {
    const result = generateLikeCondition('name', 'John,Doe');
    expect(result).toBe(' AND name LIKE "%John,Doe%"');
  });
});

describe('generateEqualCondition', () => {
  it('should generate an equal condition', () => {
    const result = generateEqualCondition('age', '30');
    expect(result).toBe(' AND age = "30"');
  });
});

describe('generateLimit', () => {
  it('should generate a LIMIT condition for values greater than 1000', () => {
    const result = generateLimit('limit', '2000');
    expect(result).toBe(' limit 100');
  });

  it('should generate a LIMIT condition for values less than or equal to 1000', () => {
    const result = generateLimit('limit', '500');
    expect(result).toBe(' limit 500');
  });

  it('should generate a LIMIT condition for undefined values', () => {
    const result = generateLimit('limit', '');
    expect(result).toBe(' limit 100');
  });
});

describe('generateBetweenCondition', () => {
  it('should generate a BETWEEN condition for two values', () => {
    const result = generateBetweenCondition('score', '50,100');
    expect(result).toBe(' AND score BETWEEN 50 and 100');
  });

  it('should generate an equal condition for a single value', () => {
    const result = generateBetweenCondition('score', '50');
    expect(result).toBe(' AND score = 50');
  });
});

describe('generateAndCondition', () => {
  it('should generate an equal condition for a single value', () => {
    const result = generateAndCondition('name', 'John');
    expect(result).toBe(' AND name = "John"');
  });

  it('should generate multiple LIKE conditions for multiple values', () => {
    const result = generateAndCondition('name', 'John,Doe');
    expect(result).toBe(' AND name like "%John%" AND name like "%Doe%"');
  });
});
