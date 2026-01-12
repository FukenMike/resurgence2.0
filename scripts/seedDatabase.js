import { createClient } from '@supabase/supabase-js';
import { resources } from '../src/data/resources.seed.js';

const supabaseUrl = 'https://kkavyqtcvobrzlcztbpj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYXZ5cXRjdm9icnpsY3p0YnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NzgwODcsImV4cCI6MjA4MzA1NDA4N30.vJB6lRJXArvthkQEovrB1Mg5geF5rZt3hOT70WDri5Y';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mapping from seed data structure to database structure
function mapAccessType(type) {
  const mapping = {
    'Walk-in': 'walk_in',
    'Appointment': 'appointment',
    'Referral': 'referral',
    'Online': 'online'
  };
  return mapping[type] || type.toLowerCase().replace('-', '_');
}

function mapCostType(cost) {
  return cost === 'sliding-scale' ? 'sliding' : cost;
}

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Step 1: Create organizations
    console.log('1️⃣  Creating organizations...');
    const orgMap = new Map();
    
    for (const resource of resources) {
      const orgName = resource.name.split(' - ')[0] || resource.name;
      if (!orgMap.has(orgName)) {
        const orgData = {
          id: crypto.randomUUID(),
          name: orgName,
          website: resource.contactInfo.website,
          phone: resource.contactInfo.phone,
          email: resource.contactInfo.email,
          description: resource.description.substring(0, 200)
        };
        orgMap.set(orgName, orgData);
      }
    }

    const orgs = Array.from(orgMap.values());
    const { data: createdOrgs, error: orgError } = await supabase
      .from('organizations')
      .upsert(orgs, { onConflict: 'name' })
      .select();

    if (orgError) {
      console.error('❌ Error creating organizations:', orgError);
      throw orgError;
    }
    console.log(`✅ Created ${orgs.length} organizations\n`);

    // Create a map of org names to IDs
    const orgNameToId = new Map();
    (createdOrgs || []).forEach(org => {
      orgNameToId.set(org.name, org.id);
    });

    // Step 2: Create resources
    console.log('2️⃣  Creating resources...');
    const resourcesData = resources.map(resource => {
      const orgName = resource.name.split(' - ')[0] || resource.name;
      const orgId = orgNameToId.get(orgName);
      
      // Pick the first access type as the main one (since DB expects single ENUM)
      const primaryAccess = resource.accessType && resource.accessType.length > 0
        ? mapAccessType(resource.accessType[0])
        : 'appointment';

      return {
        id: crypto.randomUUID(),
        slug: resource.slug,
        title: resource.name,
        category: resource.category,
        summary: resource.description,
        details: resource.whatTheyProvide.join('\n\n'),
        cost: mapCostType(resource.cost),
        access: primaryAccess,
        eligibility: JSON.stringify(resource.eligibility),
        how_to_apply: JSON.stringify(resource.howToApply),
        requirements: JSON.stringify(resource.requiredDocuments),
        hours: resource.hours,
        status: 'active',
        verification: resource.verificationStatus,
        last_verified_at: resource.lastVerified,
        org_id: orgId
      };
    });

    const { data: createdResources, error: resourceError } = await supabase
      .from('resources')
      .upsert(resourcesData, { onConflict: 'slug' })
      .select();

    if (resourceError) {
      console.error('❌ Error creating resources:', resourceError);
      throw resourceError;
    }
    console.log(`✅ Created ${resourcesData.length} resources\n`);

    // Step 3: Create service areas
    console.log('3️⃣  Creating service areas...');
    const serviceAreas = [];
    
    createdResources?.forEach((dbResource, index) => {
      const seedResource = resources[index];
      const area = seedResource.serviceArea;
      
      if (area) {
        // Determine coverage type
        let coverage = 'state';
        if (area.city) coverage = 'city';
        else if (area.county) coverage = 'county';
        
        serviceAreas.push({
          resource_id: dbResource.id,
          coverage: coverage,
          state_code: area.state?.substring(0, 2).toUpperCase() || 'CA',
          county_fips: null,
          city_name: area.city || null,
          zip: null
        });
      }
    });

    if (serviceAreas.length > 0) {
      const { error: saError } = await supabase
        .from('resource_service_areas')
        .upsert(serviceAreas);

      if (saError) {
        console.error('❌ Error creating service areas:', saError);
        throw saError;
      }
      console.log(`✅ Created ${serviceAreas.length} service areas\n`);
    }

    // Step 4: Add some ZIP codes for demo
    console.log('4️⃣  Adding sample ZIP codes...');
    const sampleZips = [
      { zip: '90001', state_code: 'CA', primary_city: 'Los Angeles' },
      { zip: '90210', state_code: 'CA', primary_city: 'Beverly Hills' },
      { zip: '94102', state_code: 'CA', primary_city: 'San Francisco' },
      { zip: '10001', state_code: 'NY', primary_city: 'New York' },
      { zip: '60601', state_code: 'IL', primary_city: 'Chicago' }
    ];

    const { error: zipError } = await supabase
      .from('geo_zipcodes')
      .upsert(sampleZips, { onConflict: 'zip' });

    if (zipError) {
      console.error('❌ Error creating ZIP codes:', zipError);
    } else {
      console.log(`✅ Created ${sampleZips.length} sample ZIP codes\n`);
    }

    // Step 5: Add some states
    console.log('5️⃣  Adding states...');
    const states = [
      { state_code: 'CA', state_name: 'California' },
      { state_code: 'NY', state_name: 'New York' },
      { state_code: 'IL', state_name: 'Illinois' },
      { state_code: 'TX', state_name: 'Texas' },
      { state_code: 'FL', state_name: 'Florida' }
    ];

    const { error: stateError } = await supabase
      .from('geo_states')
      .upsert(states, { onConflict: 'state_code' });

    if (stateError) {
      console.error('❌ Error creating states:', stateError);
    } else {
      console.log(`✅ Created ${states.length} states\n`);
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Organizations: ${orgs.length}`);
    console.log(`   - Resources: ${resourcesData.length}`);
    console.log(`   - Service Areas: ${serviceAreas.length}`);
    console.log(`   - ZIP Codes: ${sampleZips.length}`);
    console.log(`   - States: ${states.length}`);

  } catch (error) {
    console.error('❌ Fatal error during seeding:', error);
    process.exit(1);
  }
}

seedDatabase();
