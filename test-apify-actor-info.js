#!/usr/bin/env node

// Get information about the Apify actor
async function getActorInfo() {
  const apifyToken = 'YOUR_APIFY_TOKEN';
  const actorId = 'QMiUxpsg3FjsdctsM';
  
  console.log('Getting information about Apify actor:', actorId);
  
  try {
    const response = await fetch(`https://api.apify.com/v2/acts/${actorId}`, {
      headers: {
        'Authorization': `Bearer ${apifyToken}`
      }
    });
    
    if (response.ok) {
      const actor = await response.json();
      console.log('\nActor Information:');
      console.log('Name:', actor.data.name);
      console.log('Title:', actor.data.title);
      console.log('Description:', actor.data.description);
      console.log('Username:', actor.data.username);
      console.log('Version:', actor.data.version);
      
      // Get the actor's input schema if available
      if (actor.data.version) {
        const versionResponse = await fetch(`https://api.apify.com/v2/acts/${actorId}/versions/${actor.data.version}`, {
          headers: {
            'Authorization': `Bearer ${apifyToken}`
          }
        });
        
        if (versionResponse.ok) {
          const version = await versionResponse.json();
          if (version.data && version.data.inputSchema) {
            console.log('\nInput Schema:', JSON.stringify(version.data.inputSchema, null, 2));
          }
        }
      }
    } else {
      console.log('Error:', response.status, await response.text());
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getActorInfo().catch(console.error);