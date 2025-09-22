const https = require('https');

async function testPage(pageNum) {
    return new Promise((resolve) => {
        const url = `https://million-pages.catsluvusboardinghotel.workers.dev/${pageNum}`;
        
        https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                const hasTitle = data.includes('<title>') && !data.includes('Page not found');
                const hasContent = data.includes('Welcome to page') && data.length > 5000;
                const hasNavigation = data.includes('Table of Contents');
                
                resolve({
                    page: pageNum,
                    status: res.statusCode,
                    hasTitle,
                    hasContent,
                    hasNavigation,
                    contentLength: data.length,
                    working: res.statusCode === 200 && hasTitle && hasContent && hasNavigation
                });
            });
        }).on('error', (err) => {
            resolve({
                page: pageNum,
                status: 'ERROR',
                working: false,
                error: err.message
            });
        });
    });
}

async function validatePages() {
    console.log('Testing sample pages across the full range...\n');
    
    // Test strategic sample pages
    const testPages = [
        1, 2, 3, 100, 500, 1000, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 48000, 48500, 48900, 48990, 48995, 48996, 48997, 48998, 48999, 49000
    ];
    
    let workingCount = 0;
    let brokenCount = 0;
    let firstBrokenPage = null;
    
    for (const pageNum of testPages) {
        const result = await testPage(pageNum);
        
        if (result.working) {
            console.log(`✅ Page ${pageNum}: Working (${result.contentLength} chars)`);
            workingCount++;
        } else {
            console.log(`❌ Page ${pageNum}: BROKEN (Status: ${result.status})`);
            brokenCount++;
            if (!firstBrokenPage) firstBrokenPage = pageNum;
        }
        
        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\n=== VALIDATION RESULTS ===`);
    console.log(`Working pages tested: ${workingCount}`);
    console.log(`Broken pages found: ${brokenCount}`);
    console.log(`First broken page: ${firstBrokenPage || 'None in sample'}`);
    
    if (firstBrokenPage && firstBrokenPage < 48999) {
        console.log(`\n⚠️  WARNING: Pages break before 48,999!`);
        console.log(`Actual working range appears to be 1-${firstBrokenPage - 1}`);
    } else if (brokenCount === 0) {
        console.log(`\n✅ All sampled pages work - but this doesn't prove all 48,999 work!`);
    }
}

validatePages().catch(console.error);
