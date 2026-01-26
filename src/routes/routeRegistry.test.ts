/**
 * Route Registry Contract Tests
 * 
 * Ensures the route registry maintains critical invariants:
 * - Path uniqueness (no duplicate routes)
 * - Navigation label completeness
 * - Auth requirements for protected paths
 * - Navigation reference integrity
 */

import { routeRegistry } from './routeRegistry';

type TestResult = {
  passed: boolean;
  message: string;
};

function assert(condition: boolean, message: string): TestResult {
  return {
    passed: condition,
    message: condition ? `✓ ${message}` : `✗ ${message}`,
  };
}

function runTests(): void {
  const results: TestResult[] = [];
  let totalTests = 0;
  let passedTests = 0;

  console.log('\n🧪 Running Route Registry Contract Tests\n');

  // Test 1: All path values are unique
  {
    totalTests++;
    const paths = routeRegistry.map((r) => r.path);
    const uniquePaths = new Set(paths);
    const hasDuplicates = paths.length !== uniquePaths.size;
    
    if (hasDuplicates) {
      const duplicates = paths.filter((path, index) => paths.indexOf(path) !== index);
      results.push(assert(false, `All paths must be unique. Duplicates found: ${[...new Set(duplicates)].join(', ')}`));
    } else {
      results.push(assert(true, `All ${paths.length} paths are unique`));
      passedTests++;
    }
  }

  // Test 2: Every route with nav.header has a non-empty label
  {
    totalTests++;
    const headerRoutes = routeRegistry.filter((r) => r.nav.header);
    const invalidRoutes = headerRoutes.filter((r) => !r.nav.label || r.nav.label.trim() === '');
    
    if (invalidRoutes.length > 0) {
      const invalidIds = invalidRoutes.map((r) => r.id).join(', ');
      results.push(assert(false, `All header routes must have non-empty labels. Invalid routes: ${invalidIds}`));
    } else {
      results.push(assert(true, `All ${headerRoutes.length} header routes have valid labels`));
      passedTests++;
    }
  }

  // Test 3: Any path starting with /portal or /admin has auth.required === true
  {
    totalTests++;
    const protectedPaths = routeRegistry.filter((r) => 
      r.path.startsWith('/portal') || r.path.startsWith('/admin')
    );
    const unprotectedRoutes = protectedPaths.filter((r) => !r.auth || !r.auth.required);
    
    if (unprotectedRoutes.length > 0) {
      const unprotectedIds = unprotectedRoutes.map((r) => `${r.id} (${r.path})`).join(', ');
      results.push(assert(false, `All /portal and /admin paths must require auth. Unprotected: ${unprotectedIds}`));
    } else {
      if (protectedPaths.length > 0) {
        results.push(assert(true, `All ${protectedPaths.length} portal/admin routes require authentication`));
      } else {
        results.push(assert(true, 'No portal/admin routes to validate (none exist yet)'));
      }
      passedTests++;
    }
  }

  // Test 4: No nav path points to a missing route
  {
    totalTests++;
    const navRoutes = routeRegistry.filter((r) => 
      r.nav.header || r.nav.mobile || r.nav.footer
    );
    const allPaths = new Set(routeRegistry.map((r) => r.path));
    const redirectPaths = new Set(routeRegistry.filter((r) => r.redirectTo).map((r) => r.redirectTo));
    
    // Check that navigation routes either have elements or are redirects pointing to valid paths
    const brokenNavRoutes = navRoutes.filter((r) => {
      // If it has an element, it's valid
      if (r.element) return false;
      
      // If it's a redirect, check the target exists
      if (r.redirectTo) {
        return !allPaths.has(r.redirectTo);
      }
      
      // No element and no redirect = broken
      return true;
    });
    
    if (brokenNavRoutes.length > 0) {
      const brokenIds = brokenNavRoutes.map((r) => {
        if (r.redirectTo) {
          return `${r.id} (redirects to missing ${r.redirectTo})`;
        }
        return `${r.id} (${r.path} - missing element)`;
      }).join(', ');
      results.push(assert(false, `All nav routes must have valid elements or redirect targets. Broken: ${brokenIds}`));
    } else {
      results.push(assert(true, `All ${navRoutes.length} navigation routes are valid`));
      passedTests++;
    }
  }

  // Print results
  results.forEach((result) => console.log(result.message));

  console.log(`\n📊 Results: ${passedTests}/${totalTests} tests passed\n`);

  // Exit with error if any tests failed
  if (passedTests !== totalTests) {
    (globalThis as any).process?.exit(1);
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${(globalThis as any).process?.argv[1]}`) {
  runTests();
}

export { runTests };
