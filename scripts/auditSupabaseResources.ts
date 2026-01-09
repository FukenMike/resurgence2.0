#!/usr/bin/env node
/**
 * Supabase Resource Schema Audit Script
 * 
 * Performs static analysis of DB schema vs TypeScript types
 * No database connection required - parses files only
 * 
 * Exit codes:
 *   0 = All checks passed
 *   1 = Mismatches found
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface EnumDefinition {
  name: string;
  values: string[];
}

interface FieldDefinition {
  name: string;
  dbType: string;
  dbValues?: string[];
  tsType: string;
  tsValues?: string[];
}

interface AuditResult {
  field: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  dbType: string;
  tsType: string;
  issues: string[];
}

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Parse enum definitions from migration SQL
 */
function parseEnumsFromMigration(migrationPath: string): Map<string, EnumDefinition> {
  const content = readFileSync(migrationPath, 'utf-8');
  const enums = new Map<string, EnumDefinition>();
  
  // Regex to match: CREATE TYPE "public"."enum_name" AS ENUM (...);
  const enumRegex = /CREATE TYPE "public"\."(\w+)" AS ENUM \(([\s\S]*?)\);/g;
  
  let match;
  while ((match = enumRegex.exec(content)) !== null) {
    const enumName = match[1];
    const valuesBlock = match[2];
    
    // Extract values between quotes
    const valueMatches = valuesBlock.matchAll(/'([^']+)'/g);
    const values = Array.from(valueMatches, m => m[1]);
    
    enums.set(enumName, { name: enumName, values });
  }
  
  return enums;
}

/**
 * Parse TypeScript type definitions from types.ts
 */
function parseTypesFromTypeScript(typesPath: string): Map<string, string[]> {
  const content = readFileSync(typesPath, 'utf-8');
  const types = new Map<string, string[]>();
  
  // Match: export type TypeName = 'value1' | 'value2' | ...;
  const typeRegex = /export type (\w+) = ([^;]+);/g;
  
  let match;
  while ((match = typeRegex.exec(content)) !== null) {
    const typeName = match[1];
    const typeDefinition = match[2];
    
    // Extract string literals between quotes
    const valueMatches = typeDefinition.matchAll(/'([^']+)'/g);
    const values = Array.from(valueMatches, m => m[1]);
    
    types.set(typeName, values);
  }
  
  return types;
}

/**
 * Parse Resource interface from types.ts
 */
function parseResourceInterface(typesPath: string): Map<string, string> {
  const content = readFileSync(typesPath, 'utf-8');
  const fields = new Map<string, string>();
  
  // Find Resource interface block
  const interfaceMatch = content.match(/export interface Resource \{([\s\S]*?)\n\}/);
  if (!interfaceMatch) {
    throw new Error('Could not find Resource interface in types.ts');
  }
  
  const interfaceBody = interfaceMatch[1];
  
  // Match field definitions: fieldName: type;
  const fieldRegex = /(\w+)[\?]?: ([^;]+);/g;
  
  let match;
  while ((match = fieldRegex.exec(interfaceBody)) !== null) {
    const fieldName = match[1];
    const fieldType = match[2].trim();
    fields.set(fieldName, fieldType);
  }
  
  return fields;
}

/**
 * Main audit function
 */
function runAudit(): AuditResult[] {
  const repoRoot = join(__dirname, '..');
  const migrationPath = join(repoRoot, 'supabase', 'migrations', '20260107153902_remote_schema.sql');
  const typesPath = join(repoRoot, 'src', 'lib', 'types.ts');
  
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('  Supabase Resource Schema Audit', 'bold');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');
  
  // Parse DB schema
  log('📊 Parsing database schema...', 'blue');
  const dbEnums = parseEnumsFromMigration(migrationPath);
  
  // Parse TypeScript types
  log('📝 Parsing TypeScript types...', 'blue');
  const tsTypes = parseTypesFromTypeScript(typesPath);
  const resourceFields = parseResourceInterface(typesPath);
  
  const results: AuditResult[] = [];
  
  // Define field mappings: DB enum -> TS type -> Resource field
  const fieldMappings: Array<{
    field: string;
    dbEnum: string;
    tsType: string;
    resourceField: string;
  }> = [
    { field: 'access', dbEnum: 'access_type', tsType: 'AccessType', resourceField: 'access' },
    { field: 'cost', dbEnum: 'cost_type', tsType: 'CostType', resourceField: 'cost' },
    { field: 'status', dbEnum: 'resource_status', tsType: 'ResourceStatus', resourceField: 'status' },
    { field: 'verification', dbEnum: 'verification_status', tsType: 'VerificationStatus', resourceField: 'verification' },
    { field: 'category', dbEnum: 'resource_category', tsType: 'ResourceCategory', resourceField: 'category' },
  ];
  
  log('\n🔍 Analyzing field mappings...\n', 'blue');
  
  for (const mapping of fieldMappings) {
    const dbEnum = dbEnums.get(mapping.dbEnum);
    const tsValues = tsTypes.get(mapping.tsType);
    const resourceFieldType = resourceFields.get(mapping.resourceField);
    
    const issues: string[] = [];
    let status: 'PASS' | 'FAIL' | 'WARNING' = 'PASS';
    
    if (!dbEnum) {
      issues.push(`DB enum '${mapping.dbEnum}' not found in migration`);
      status = 'FAIL';
    }
    
    if (!tsValues && mapping.tsType !== 'ResourceCategory') {
      issues.push(`TypeScript type '${mapping.tsType}' not found in types.ts`);
      status = 'FAIL';
    }
    
    if (!resourceFieldType) {
      issues.push(`Field '${mapping.resourceField}' not found in Resource interface`);
      status = 'FAIL';
    }
    
    // Check value mismatches
    if (dbEnum && tsValues) {
      const dbSet = new Set(dbEnum.values);
      const tsSet = new Set(tsValues);
      
      // Values in TS but not in DB
      const extraInTs = tsValues.filter(v => !dbSet.has(v));
      if (extraInTs.length > 0) {
        issues.push(`TS has extra values not in DB: ${extraInTs.map(v => `'${v}'`).join(', ')}`);
        status = 'FAIL';
      }
      
      // Values in DB but not in TS
      const missingInTs = dbEnum.values.filter(v => !tsSet.has(v));
      if (missingInTs.length > 0) {
        issues.push(`TS missing DB values: ${missingInTs.map(v => `'${v}'`).join(', ')}`);
        status = 'FAIL';
      }
      
      // Check for case differences
      if (status === 'PASS') {
        const caseIssues: string[] = [];
        for (const tsVal of tsValues) {
          const dbMatch = dbEnum.values.find(dbVal => dbVal.toLowerCase() === tsVal.toLowerCase());
          if (dbMatch && dbMatch !== tsVal) {
            caseIssues.push(`'${tsVal}' (TS) vs '${dbMatch}' (DB)`);
          }
        }
        if (caseIssues.length > 0) {
          issues.push(`Case mismatch: ${caseIssues.join(', ')}`);
          status = 'WARNING';
        }
      }
    }
    
    // Special check for 'access' field (ENUM vs string/array)
    if (mapping.field === 'access' && resourceFieldType === 'string') {
      issues.push(`DB uses ENUM (single value), but TS type is 'string' (code treats as JSON array)`);
      status = 'FAIL';
    }
    
    // Special check for 'category' field (ENUM vs string)
    if (mapping.field === 'category' && resourceFieldType === 'string') {
      issues.push(`DB uses ENUM, but TS type is loose 'string' (not type-safe)`);
      status = 'WARNING';
    }
    
    results.push({
      field: mapping.field,
      status,
      dbType: dbEnum ? `${mapping.dbEnum}: [${dbEnum.values.join(', ')}]` : 'N/A',
      tsType: tsValues ? `${mapping.tsType}: [${tsValues.join(', ')}]` : resourceFieldType || 'N/A',
      issues,
    });
  }
  
  return results;
}

/**
 * Display results
 */
function displayResults(results: AuditResult[]): void {
  let failCount = 0;
  let warnCount = 0;
  let passCount = 0;
  
  for (const result of results) {
    const icon = result.status === 'PASS' ? '✅' : result.status === 'WARNING' ? '⚠️ ' : '❌';
    const color = result.status === 'PASS' ? 'green' : result.status === 'WARNING' ? 'yellow' : 'red';
    
    log(`${icon} ${result.field}`, color);
    log(`   DB:  ${result.dbType}`, 'reset');
    log(`   TS:  ${result.tsType}`, 'reset');
    
    if (result.issues.length > 0) {
      for (const issue of result.issues) {
        log(`   ⮕  ${issue}`, color);
      }
    }
    log('');
    
    if (result.status === 'FAIL') failCount++;
    else if (result.status === 'WARNING') warnCount++;
    else passCount++;
  }
  
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');
  log(`Summary: ${passCount} passed, ${warnCount} warnings, ${failCount} failed`, 'bold');
  
  if (failCount > 0) {
    log('\n❌ CRITICAL MISMATCHES FOUND', 'red');
    log('   See docs/RESOURCE_SCHEMA_AUDIT.md for fix plans\n', 'yellow');
  } else if (warnCount > 0) {
    log('\n⚠️  WARNINGS DETECTED', 'yellow');
    log('   Review docs/RESOURCE_SCHEMA_AUDIT.md for details\n', 'yellow');
  } else {
    log('\n✅ ALL CHECKS PASSED\n', 'green');
  }
}

/**
 * Main execution
 */
try {
  const results = runAudit();
  displayResults(results);
  
  const failCount = results.filter(r => r.status === 'FAIL').length;
  process.exit(failCount > 0 ? 1 : 0);
} catch (error) {
  log(`\n❌ Audit failed: ${error instanceof Error ? error.message : String(error)}\n`, 'red');
  process.exit(1);
}
