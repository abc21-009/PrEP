document.addEventListener('DOMContentLoaded', () => {
  const regionSelect = document.getElementById('region-select');
  const locationResults = document.getElementById('location-results');
  
  // Sample data for PrEP locations in Botswana
  // In a real application, this would come from a database or API
  const prepLocations = {
    gaborone: [
      {
        name: 'Princess Marina Hospital',
        address: 'Queens Road, Gaborone',
        phone: '+267 3621400',
        hours: 'Mon-Fri: 7:30 AM - 4:30 PM',
        services: ['PrEP Consultation', 'HIV Testing', 'STI Screening']
      },
      {
        name: 'Bontleng Clinic',
        address: 'Bontleng, Gaborone',
        phone: '+267 3952541',
        hours: 'Mon-Fri: 7:30 AM - 4:30 PM',
        services: ['PrEP Consultation', 'HIV Testing']
      },
      {
        name: 'Tebelopele VCT Centre - Gaborone Main',
        address: 'Ext. 12, Gaborone',
        phone: '+267 3901919',
        hours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 1:00 PM',
        services: ['PrEP Consultation', 'HIV Testing', 'Counseling']
      }
    ],
    francistown: [
      {
        name: 'Nyangabgwe Referral Hospital',
        address: 'Area S, Francistown',
        phone: '+267 2410000',
        hours: 'Mon-Fri: 7:30 AM - 4:30 PM',
        services: ['PrEP Consultation', 'HIV Testing', 'STI Screening']
      },
      {
        name: 'Tebelopele VCT Centre - Francistown',
        address: 'Blue Jacket Street, Francistown',
        phone: '+267 2412516',
        hours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 1:00 PM',
        services: ['PrEP Consultation', 'HIV Testing', 'Counseling']
      }
    ],
    molepolole: [
      {
        name: 'Scottish Livingstone Hospital',
        address: 'Main Road, Molepolole',
        phone: '+267 5921222',
        hours: 'Mon-Fri: 7:30 AM - 4:30 PM',
        services: ['PrEP Consultation', 'HIV Testing']
      }
    ],
    maun: [
      {
        name: 'Letsholathebe II Memorial Hospital',
        address: 'Hospital Road, Maun',
        phone: '+267 6861444',
        hours: 'Mon-Fri: 7:30 AM - 4:30 PM',
        services: ['PrEP Consultation', 'HIV Testing', 'STI Screening']
      },
      {
        name: 'Tebelopele VCT Centre - Maun',
        address: 'Old Mall, Maun',
        phone: '+267 6860764',
        hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
        services: ['PrEP Consultation', 'HIV Testing', 'Counseling']
      }
    ],
    serowe: [
      {
        name: 'Sekgoma Memorial Hospital',
        address: 'Main Road, Serowe',
        phone: '+267 4630333',
        hours: 'Mon-Fri: 7:30 AM - 4:30 PM',
        services: ['PrEP Consultation', 'HIV Testing']
      }
    ],
    jwaneng: [
      {
        name: 'Jwaneng Mine Hospital',
        address: 'Township, Jwaneng',
        phone: '+267 5880333',
        hours: 'Mon-Fri: 7:30 AM - 4:30 PM',
        services: ['PrEP Consultation', 'HIV Testing', 'STI Screening']
      }
    ],
    lobatse: [
      {
        name: 'Athlone Hospital',
        address: 'Main Street, Lobatse',
        phone: '+267 5330333',
        hours: 'Mon-Fri: 7:30 AM - 4:30 PM',
        services: ['PrEP Consultation', 'HIV Testing']
      },
      {
        name: 'Tebelopele VCT Centre - Lobatse',
        address: 'Main Mall, Lobatse',
        phone: '+267 5332516',
        hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
        services: ['PrEP Consultation', 'HIV Testing', 'Counseling']
      }
    ]
  };
  
  if (regionSelect && locationResults) {
    // Handle region selection change
    regionSelect.addEventListener('change', function() {
      const selectedRegion = this.value;
      
      // Clear previous results
      locationResults.innerHTML = '';
      
      if (!selectedRegion) {
        locationResults.innerHTML = '<p>Please select a region to see available PrEP services.</p>';
        return;
      }
      
      const locations = prepLocations[selectedRegion];
      
      if (!locations || locations.length === 0) {
        locationResults.innerHTML = '<p>No PrEP service locations found in this region.</p>';
        return;
      }
      
      // Display the locations
      locations.forEach(location => {
        const locationEl = document.createElement('div');
        locationEl.className = 'location-item animate-fadeIn';
        
        const servicesHTML = location.services.map(service => `<span>${service}</span>`).join(', ');
        
        locationEl.innerHTML = `
          <h4>${location.name}</h4>
          <p>${location.address}</p>
          <div class="location-item-details">
            <div class="location-item-detail">
              <i class="fas fa-phone"></i>
              <span>${location.phone}</span>
            </div>
            <div class="location-item-detail">
              <i class="fas fa-clock"></i>
              <span>${location.hours}</span>
            </div>
          </div>
          <div class="location-item-services">
            <p><strong>Services:</strong> ${servicesHTML}</p>
          </div>
        `;
        
        locationResults.appendChild(locationEl);
      });
      
      // Add a note about calling ahead
      const noteEl = document.createElement('div');
      noteEl.className = 'location-note';
      noteEl.innerHTML = `
        <p><i class="fas fa-info-circle"></i> <em>We recommend calling ahead to confirm service availability and to schedule an appointment.</em></p>
      `;
      
      locationResults.appendChild(noteEl);
    });
    
    // Set default text
    locationResults.innerHTML = '<p>Please select a region to see available PrEP services.</p>';
  }
});