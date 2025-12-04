// // // Utility function to show loading state
// // function showLoading(buttonId, resultId) {
// //     const button = document.querySelector(`#${buttonId} button[type="submit"]`);
// //     const resultDiv = document.getElementById(resultId);
    
// //     button.disabled = true;
// //     button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Scraping...';
// //     resultDiv.innerHTML = `
// //         <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-2xl p-6 shadow-lg animate-fade-in">
// //             <div class="flex items-center">
// //                 <div class="relative">
// //                     <i class="fas fa-spinner fa-spin text-blue-600 text-3xl mr-4"></i>
// //                     <div class="absolute inset-0 bg-blue-400 blur-xl opacity-30 animate-pulse"></div>
// //                 </div>
// //                 <div>
// //                     <p class="font-bold text-blue-900 text-lg">Scraping in progress...</p>
// //                     <p class="text-sm text-blue-700 mt-1">This may take a few moments. Please wait.</p>
// //                     <div class="flex gap-1 mt-3">
// //                         <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
// //                         <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
// //                         <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     `;
// // }

// // // Utility function to reset button
// // function resetButton(buttonId, text) {
// //     const button = document.querySelector(`#${buttonId} button[type="submit"]`);
// //     button.disabled = false;
// //     button.innerHTML = `<i class="fas fa-play mr-2"></i>${text}`;
// // }

// // // Utility function to extract timestamp from file path
// // function extractTimestamp(filePath) {
// //     const match = filePath.match(/Artifacts[\/\\](\d+_\d+_\d+_\d+_\d+_\d+)/);
// //     return match ? match[1] : null;
// // }

// // // Utility function to count URLs from file
// // async function getUrlCountFromFile(downloadUrl) {
// //     try {
// //         const response = await fetch(downloadUrl);
// //         if (response.ok) {
// //             const data = await response.json();
// //             let count = 0;
            
// //             // Handle different JSON structures
// //             if (Array.isArray(data)) {
// //                 count = data.length;
// //             } else if (data.urls && typeof data.urls === 'object') {
// //                 // Structure: { "urls": { "search_term": [...] } }
// //                 count = Object.values(data.urls).reduce((total, urls) => {
// //                     return total + (Array.isArray(urls) ? urls.length : 0);
// //                 }, 0);
// //             } else if (typeof data === 'object') {
// //                 // Structure: { "search_term": [...] }
// //                 count = Object.values(data).reduce((total, urls) => {
// //                     return total + (Array.isArray(urls) ? urls.length : 0);
// //                 }, 0);
// //             }
            
// //             return count;
// //         }
// //     } catch (error) {
// //         console.error('Error fetching URL count:', error);
// //     }
// //     return 0;
// // }

// // // Utility function to show result
// // async function showResult(resultId, success, data) {
// //     const resultDiv = document.getElementById(resultId);
    
// //     console.log('Complete Response Data:', JSON.stringify(data, null, 2));
    
// //     if (success) {
// //         let timestamp = '';
// //         if (data.url_artifact && data.url_artifact.url_file_path) {
// //             timestamp = extractTimestamp(data.url_artifact.url_file_path);
// //         } else if (data.product_artifact && data.product_artifact.product_file_path) {
// //             timestamp = extractTimestamp(data.product_artifact.product_file_path);
// //         }
        
// //         // Always build download URLs if file paths exist
// //         let urlDownloadUrl = null;
// //         let productDownloadUrl = null;
        
// //         if (data.url_artifact && data.url_artifact.url_file_path) {
// //             urlDownloadUrl = data.url_artifact.download_url || `/api/download/url-data/${timestamp}`;
// //         }
        
// //         if (data.product_artifact && data.product_artifact.product_file_path) {
// //             productDownloadUrl = data.product_artifact.download_url || `/api/download/product-data/${timestamp}`;
// //         }
        
// //         let content = `
// //             <div class="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-8 shadow-2xl animate-fade-in">
// //                 <div class="flex items-start">
// //                     <div class="relative">
// //                         <i class="fas fa-check-circle text-green-500 text-4xl mr-4 mt-1"></i>
// //                         <div class="absolute inset-0 bg-green-400 blur-xl opacity-30 animate-pulse"></div>
// //                     </div>
// //                     <div class="flex-1">
// //                         <h3 class="font-extrabold text-green-900 text-2xl mb-6 flex items-center">
// //                             <span>✅ Scraping Completed Successfully!</span>
// //                             <span class="ml-3 px-3 py-1 bg-green-500 text-white text-xs rounded-full animate-pulse">DONE</span>
// //                         </h3>
// //         `;
        
// //         // Download Buttons Section - ALWAYS SHOW if files exist
// //         if (urlDownloadUrl || productDownloadUrl) {
// //             content += `
// //                 <div class="mb-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-dashed border-indigo-300 shadow-lg">
// //                     <div class="flex items-center justify-between mb-5">
// //                         <div class="flex items-center gap-3">
// //                             <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
// //                                 <i class="fas fa-download text-white text-xl"></i>
// //                             </div>
// //                             <div>
// //                                 <p class="text-lg font-bold text-gray-900">Download Your Files</p>
// //                                 <p class="text-xs text-gray-600">Click below to download scraped data</p>
// //                             </div>
// //                         </div>
// //                         <div class="animate-bounce">
// //                             <i class="fas fa-arrow-down text-2xl text-purple-500"></i>
// //                         </div>
// //                     </div>
// //                     <div class="flex flex-wrap gap-4">
// //             `;
            
// //             // URL Download Button - show if URL file exists
// //             if (urlDownloadUrl) {
// //                 content += `
// //                     <a href="${urlDownloadUrl}" 
// //                        download="urls_${timestamp}.json"
// //                        class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden">
// //                         <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
// //                         <i class="fas fa-link mr-3 text-xl group-hover:rotate-12 transition-transform"></i>
// //                         <div class="text-left">
// //                             <span class="block text-sm">Download</span>
// //                             <span class="block text-xs opacity-90">URLs JSON</span>
// //                         </div>
// //                     </a>
// //                 `;
// //             }
            
// //             // Product Download Button - show if product file exists
// //             if (productDownloadUrl) {
// //                 content += `
// //                     <a href="${productDownloadUrl}" 
// //                        download="products_${timestamp}.json"
// //                        class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden">
// //                         <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
// //                         <i class="fas fa-box mr-3 text-xl group-hover:rotate-12 transition-transform"></i>
// //                         <div class="text-left">
// //                             <span class="block text-sm">Download</span>
// //                             <span class="block text-xs opacity-90">Products JSON</span>
// //                         </div>
// //                     </a>
// //                 `;
// //             }
            
// //             content += `
// //                     </div>
// //                     <div class="mt-4 flex items-center gap-2 text-xs text-gray-600">
// //                         <i class="fas fa-info-circle text-blue-500"></i>
// //                         <span>Files are saved in JSON format and ready for download</span>
// //                     </div>
// //                 </div>
// //             `;
// //         }
        
// //         // File Paths
// //         if (data.url_artifact) {
// //             content += `
// //                 <div class="mb-5 bg-white rounded-xl p-5 border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow">
// //                     <div class="flex items-center gap-3 mb-3">
// //                         <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
// //                             <i class="fas fa-folder text-blue-600 text-lg"></i>
// //                         </div>
// //                         <p class="font-bold text-gray-800">📁 URL File Path</p>
// //                     </div>
// //                     <p class="text-xs text-gray-600 bg-gray-50 px-4 py-3 rounded-lg font-mono break-all border border-gray-200">
// //                         ${data.url_artifact.url_file_path}
// //                     </p>
// //                 </div>
// //             `;
// //         }
        
// //         if (data.product_artifact) {
// //             content += `
// //                 <div class="mb-5 bg-white rounded-xl p-5 border-l-4 border-purple-500 shadow-md hover:shadow-lg transition-shadow">
// //                     <div class="flex items-center gap-3 mb-3">
// //                         <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
// //                             <i class="fas fa-folder text-purple-600 text-lg"></i>
// //                         </div>
// //                         <p class="font-bold text-gray-800">📁 Product File Path</p>
// //                     </div>
// //                     <p class="text-xs text-gray-600 bg-gray-50 px-4 py-3 rounded-lg font-mono break-all border border-gray-200">
// //                         ${data.product_artifact.product_file_path}
// //                     </p>
// //                 </div>
// //             `;
// //         }
        
// //         // Product Data (show if returned)
// //         if (data.product_data) {
// //             const productData = data.product_data;
            
// //             if (productData.total_scraped !== undefined) {
// //                 content += `
// //                     <div class="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-lg">
// //                         <div class="flex items-center justify-between">
// //                             <div>
// //                                 <p class="text-sm font-medium text-green-800 mb-2 flex items-center gap-2">
// //                                     <i class="fas fa-chart-line"></i>
// //                                     Products Successfully Scraped
// //                                 </p>
// //                                 <p class="text-5xl font-extrabold text-green-600 animate-pulse">${productData.total_scraped}</p>
// //                             </div>
// //                             ${productData.total_failed > 0 ? `
// //                             <div class="text-right">
// //                                 <p class="text-sm font-medium text-red-800 mb-2">Failed</p>
// //                                 <p class="text-3xl font-bold text-red-600">${productData.total_failed}</p>
// //                             </div>
// //                             ` : `
// //                             <div class="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
// //                                 <i class="fas fa-trophy text-white text-3xl"></i>
// //                             </div>
// //                             `}
// //                         </div>
// //                     </div>
// //                 `;
// //             }
            
// //             // Display product details
// //             if (productData.products) {
// //                 content += `<div class="mt-6 border-t-2 border-green-300 pt-6">`;
// //                 content += `
// //                     <div class="flex items-center gap-3 mb-5">
// //                         <div class="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
// //                             <i class="fas fa-box-open text-white"></i>
// //                         </div>
// //                         <p class="text-lg font-bold text-gray-900">Product Details</p>
// //                     </div>
// //                 `;
                
// //                 Object.keys(productData.products).forEach((searchTerm, index) => {
// //                     const products = productData.products[searchTerm];
                    
// //                     content += `
// //                         <div class="mb-6 ${index > 0 ? 'mt-6 pt-6 border-t border-gray-200' : ''}">
// //                             <div class="bg-gradient-to-r from-orange-50 via-yellow-50 to-green-50 rounded-xl p-4 mb-4 border border-orange-200 shadow-sm">
// //                                 <div class="flex items-center justify-between">
// //                                     <div class="flex items-center gap-3">
// //                                         <div class="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
// //                                             <i class="fas fa-search text-white"></i>
// //                                         </div>
// //                                         <div>
// //                                             <p class="font-bold text-gray-900">
// //                                                 Search: <span class="text-orange-600">"${searchTerm}"</span>
// //                                             </p>
// //                                             <p class="text-xs text-gray-600 mt-1 flex items-center gap-1">
// //                                                 <i class="fas fa-check-circle text-green-500"></i>
// //                                                 Found ${products.length} product(s)
// //                                             </p>
// //                                         </div>
// //                                     </div>
// //                                     <div class="px-4 py-2 bg-white rounded-lg shadow-sm">
// //                                         <p class="text-2xl font-bold text-orange-600">${products.length}</p>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                     `;
                    
// //                     // Show first product details
// //                     if (products.length > 0) {
// //                         const firstProduct = products[0];
// //                         content += `
// //                             <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 product-card">
// //                                 <div class="flex items-start justify-between mb-4">
// //                                     <h4 class="font-bold text-gray-900 text-base flex-1 mr-2 leading-snug">
// //                                         ${firstProduct['Product Name'] || 'N/A'}
// //                                     </h4>
// //                                 </div>
                                
// //                                 <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
// //                                     <div>
// //                                         <p class="text-sm text-gray-500 mb-1">Price</p>
// //                                         <p class="text-green-600 font-extrabold text-2xl">
// //                                             ${firstProduct['Product Price'] || 'N/A'}
// //                                         </p>
// //                                     </div>
// //                                     <div class="text-right">
// //                                         <p class="text-sm text-gray-500 mb-1">Rating</p>
// //                                         <div class="flex items-center gap-2">
// //                                             <i class="fas fa-star text-yellow-500 text-lg"></i>
// //                                             <span class="font-bold text-xl text-gray-900">${firstProduct['Ratings'] || 'N/A'}</span>
// //                                         </div>
// //                                         <p class="text-xs text-gray-500 mt-1">
// //                                             ${firstProduct['Total Reviews'] || ''}
// //                                         </p>
// //                                     </div>
// //                                 </div>
                                
// //                                 <div class="mb-4">
// //                                     <div class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 rounded-lg border border-blue-200">
// //                                         <i class="fas fa-tag text-blue-500"></i>
// //                                         <span class="text-sm font-medium text-gray-700">Category: <span class="text-blue-600 font-bold">${firstProduct['Category'] || 'N/A'}</span></span>
// //                                     </div>
// //                                 </div>
// //                         `;
                        
// //                         // Show technical details if available
// //                         if (firstProduct['Technical Details']) {
// //                             const techDetails = firstProduct['Technical Details'];
// //                             const keys = Object.keys(techDetails).slice(0, 6);
                            
// //                             if (keys.length > 0) {
// //                                 content += `
// //                                     <div class="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
// //                                         <p class="font-bold text-gray-800 mb-3 text-sm flex items-center gap-2">
// //                                             <i class="fas fa-info-circle text-blue-500"></i>
// //                                             Key Specifications
// //                                         </p>
// //                                         <div class="grid grid-cols-1 gap-2 text-xs">
// //                                 `;
                                
// //                                 keys.forEach(key => {
// //                                     content += `
// //                                         <div class="flex items-start bg-white px-3 py-2 rounded-lg">
// //                                             <span class="text-gray-600 font-semibold min-w-[140px]">${key}:</span>
// //                                             <span class="text-gray-900 ml-2">${techDetails[key]}</span>
// //                                         </div>
// //                                     `;
// //                                 });
                                
// //                                 const remainingCount = Object.keys(techDetails).length - 6;
// //                                 if (remainingCount > 0) {
// //                                     content += `
// //                                         <div class="text-gray-500 italic text-center py-2">
// //                                             <i class="fas fa-ellipsis-h mr-2"></i>
// //                                             + ${remainingCount} more specifications
// //                                         </div>
// //                                     `;
// //                                 }
                                
// //                                 content += `
// //                                         </div>
// //                                     </div>
// //                                 `;
// //                             }
// //                         }
                        
// //                         // Show customer reviews count
// //                         if (firstProduct['Customer Reviews']) {
// //                             content += `
// //                                 <div class="mt-4 flex items-center gap-2 bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
// //                                     <i class="fas fa-comments text-blue-500 text-lg"></i>
// //                                     <span class="text-sm font-medium text-gray-700">
// //                                         <span class="font-bold text-blue-600">${firstProduct['Customer Reviews'].length}</span> Customer Reviews scraped
// //                                     </span>
// //                                 </div>
// //                             `;
// //                         }
                        
// //                         // Product URL
// //                         content += `
// //                                 <div class="mt-5 pt-4 border-t border-gray-200">
// //                                     <a href="${firstProduct['Product URL']}" target="_blank" 
// //                                        class="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105">
// //                                         <i class="fas fa-external-link-alt"></i>
// //                                         <span>View on Amazon</span>
// //                                     </a>
// //                                 </div>
// //                             </div>
// //                         `;
                        
// //                         // If more products, show count
// //                         if (products.length > 1) {
// //                             content += `
// //                                 <div class="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-xl border-2 border-blue-200 text-center">
// //                                     <p class="text-sm text-gray-700 flex items-center justify-center gap-2">
// //                                         <i class="fas fa-plus-circle text-blue-500"></i>
// //                                         <span class="font-bold text-blue-600">${products.length - 1}</span> more product(s) scraped in this category
// //                                     </p>
// //                                 </div>
// //                             `;
// //                         }
// //                     }
                    
// //                     content += `</div>`;
// //                 });
                
// //                 content += `</div>`;
// //             }
// //         }
        
// //         // URL Data Display - ALWAYS show count if URL file exists
// //         if (data.url_artifact && urlDownloadUrl) {
// //             let urlCount = 0;
// //             let urlsByCategory = {};
// //             let hasUrlData = false;
            
// //             // If URL data is returned in response, use it
// //             if (data.url_data) {
// //                 console.log('URL Data:', data.url_data);
// //                 hasUrlData = true;
                
// //                 if (Array.isArray(data.url_data)) {
// //                     urlCount = data.url_data.length;
// //                     urlsByCategory = { 'All URLs': data.url_data };
// //                 } else if (typeof data.url_data === 'object') {
// //                     if (data.url_data.urls) {
// //                         urlsByCategory = data.url_data.urls;
// //                     } else {
// //                         urlsByCategory = data.url_data;
// //                     }
                    
// //                     urlCount = Object.values(urlsByCategory).reduce((total, urls) => {
// //                         return total + (Array.isArray(urls) ? urls.length : 0);
// //                     }, 0);
// //                 }
// //             } else {
// //                 // Fetch count from file if data not returned
// //                 urlCount = await getUrlCountFromFile(urlDownloadUrl);
// //             }
            
// //             content += `
// //                 <div class="mb-4 mt-6 border-t-2 border-blue-300 pt-6">
// //                     <div class="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
// //                         <div class="flex items-center justify-between mb-4">
// //                             <div class="flex items-center gap-4">
// //                                 <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
// //                                     <i class="fas fa-link text-white text-2xl"></i>
// //                                 </div>
// //                                 <div>
// //                                     <p class="text-sm font-medium text-gray-600">URLs Scraped</p>
// //                                     <p class="text-4xl font-extrabold text-blue-600 mt-1">${urlCount}</p>
// //                                 </div>
// //                             </div>
// //                             <div class="text-right">
// //                                 <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
// //                                     <i class="fas fa-check text-blue-600 text-2xl"></i>
// //                                 </div>
// //                             </div>
// //                         </div>
// //             `;
            
// //             // Show URL details if data is returned
// //             if (hasUrlData && urlCount > 0 && Object.keys(urlsByCategory).length > 0) {
// //                 content += `
// //                     <div class="mt-4 space-y-3">
// //                         <p class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
// //                             <i class="fas fa-list text-blue-500"></i>
// //                             URLs by Search Term
// //                         </p>
// //                 `;
                
// //                 Object.keys(urlsByCategory).forEach((searchTerm) => {
// //                     const urls = urlsByCategory[searchTerm];
// //                     if (Array.isArray(urls) && urls.length > 0) {
// //                         content += `
// //                             <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
// //                                 <div class="flex items-center justify-between mb-3">
// //                                     <p class="font-bold text-gray-900 text-sm">
// //                                         <i class="fas fa-search text-blue-500 mr-2"></i>
// //                                         "${searchTerm}"
// //                                     </p>
// //                                     <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
// //                                         ${urls.length} URLs
// //                                     </span>
// //                                 </div>
// //                                 <div class="mt-2 max-h-60 overflow-y-auto space-y-2">
// //                         `;
                        
// //                         urls.slice(0, 10).forEach((url, idx) => {
// //                             content += `
// //                                 <div class="text-xs bg-white px-3 py-2 rounded border border-gray-200 hover:border-blue-400 hover:shadow-sm transition">
// //                                     <div class="flex items-start gap-2">
// //                                         <span class="text-gray-400 font-mono">${idx + 1}.</span>
// //                                         <a href="${url}" target="_blank" class="text-blue-600 hover:text-blue-800 break-all flex-1">
// //                                             ${url}
// //                                         </a>
// //                                         <a href="${url}" target="_blank" class="text-gray-400 hover:text-blue-500">
// //                                             <i class="fas fa-external-link-alt"></i>
// //                                         </a>
// //                                     </div>
// //                                 </div>
// //                             `;
// //                         });
                        
// //                         if (urls.length > 10) {
// //                             content += `
// //                                 <div class="text-xs text-gray-600 italic text-center py-2 bg-blue-50 rounded">
// //                                     <i class="fas fa-ellipsis-h mr-2"></i>
// //                                     + ${urls.length - 10} more URLs (download file to view all)
// //                                 </div>
// //                             `;
// //                         }
                        
// //                         content += `
// //                                 </div>
// //                             </div>
// //                         `;
// //                     }
// //                 });
                
// //                 content += `</div>`;
// //             } else if (!hasUrlData && urlCount > 0) {
// //                 // Show message when data not returned but count fetched from file
// //                 content += `
// //                     <div class="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-300">
// //                         <div class="flex items-start gap-3">
// //                             <i class="fas fa-info-circle text-blue-600 text-lg mt-0.5"></i>
// //                             <div>
// //                                 <p class="font-bold text-blue-900 text-sm mb-1">URLs Saved to File</p>
// //                                 <p class="text-xs text-blue-700">
// //                                     ${urlCount} URL(s) have been saved. To view them here, check the <strong>"Return URL data in response"</strong> checkbox next time, or download the file above.
// //                                 </p>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 `;
// //             }
            
// //             content += `
// //                     </div>
// //                 </div>
// //             `;
// //         }
        
// //         content += `
// //                     </div>
// //                 </div>
// //             </div>
// //         `;
        
// //         resultDiv.innerHTML = content;
// //     } else {
// //         resultDiv.innerHTML = `
// //             <div class="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl p-8 shadow-2xl animate-fade-in">
// //                 <div class="flex items-start">
// //                     <div class="relative">
// //                         <i class="fas fa-exclamation-circle text-red-500 text-4xl mr-4 mt-1"></i>
// //                         <div class="absolute inset-0 bg-red-400 blur-xl opacity-30 animate-pulse"></div>
// //                     </div>
// //                     <div>
// //                         <h3 class="font-extrabold text-red-900 text-2xl mb-3">❌ Error Occurred</h3>
// //                         <div class="bg-white rounded-lg p-4 border-l-4 border-red-500">
// //                             <p class="text-sm text-red-700 font-medium">${data.detail || 'An error occurred during scraping.'}</p>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         `;
// //     }
// // }

// // // Main Scraper Form
// // document.getElementById('mainScrapeForm')?.addEventListener('submit', async (e) => {
// //     e.preventDefault();
    
// //     const searchTerms = document.getElementById('mainSearchTerms').value.split('\n').filter(t => t.trim());
// //     const targetLinks = parseInt(document.getElementById('mainTargetLinks').value);
// //     const headless = document.getElementById('mainHeadless').checked;
// //     const returnUrlData = document.getElementById('mainReturnUrl').checked;
// //     const returnProdData = document.getElementById('mainReturnProd').checked;
    
// //     if (searchTerms.length === 0) {
// //         alert('⚠️ Please enter at least one search term');
// //         return;
// //     }
    
// //     showLoading('mainScrapeForm', 'mainResult');
    
// //     try {
// //         const response = await fetch('/api/mainscrape', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify({
// //                 search_terms: searchTerms,
// //                 target_links: targetLinks,
// //                 headless: headless,
// //                 return_url_data: returnUrlData,
// //                 return_prod_data: returnProdData
// //             })
// //         });
        
// //         const data = await response.json();
// //         console.log('Main Scrape Response:', data);
        
// //         if (response.ok) {
// //             await showResult('mainResult', true, data);
// //         } else {
// //             await showResult('mainResult', false, data);
// //         }
// //     } catch (error) {
// //         await showResult('mainResult', false, { detail: error.message });
// //     } finally {
// //         resetButton('mainScrapeForm', 'Start Scraping');
// //     }
// // });

// // // URL Scraper Form
// // document.getElementById('urlScrapeForm')?.addEventListener('submit', async (e) => {
// //     e.preventDefault();
    
// //     const searchTerms = document.getElementById('urlSearchTerms').value.split('\n').filter(t => t.trim());
// //     const targetLinks = parseInt(document.getElementById('urlTargetLinks').value);
// //     const headless = document.getElementById('urlHeadless').checked;
// //     const returnUrlData = document.getElementById('urlReturnData').checked;
    
// //     if (searchTerms.length === 0) {
// //         alert('⚠️ Please enter at least one search term');
// //         return;
// //     }
    
// //     showLoading('urlScrapeForm', 'urlResult');
    
// //     try {
// //         const response = await fetch('/api/urlscrape', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify({
// //                 search_terms: searchTerms,
// //                 target_links: targetLinks,
// //                 headless: headless,
// //                 return_url_data: returnUrlData
// //             })
// //         });
        
// //         const data = await response.json();
// //         console.log('URL Scrape Response:', data);
        
// //         if (response.ok) {
// //             await showResult('urlResult', true, data);
// //         } else {
// //             await showResult('urlResult', false, data);
// //         }
// //     } catch (error) {
// //         await showResult('urlResult', false, { detail: error.message });
// //     } finally {
// //         resetButton('urlScrapeForm', 'Start Scraping');
// //     }
// // });

// // // Product Scraper Form
// // const fileInput = document.getElementById('productFile');
// // fileInput?.addEventListener('change', (e) => {
// //     const fileName = e.target.files[0]?.name;
// //     const fileNameDisplay = document.getElementById('fileName');
// //     if (fileName) {
// //         fileNameDisplay.innerHTML = `
// //             <div class="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
// //                 <i class="fas fa-check-circle text-green-500"></i>
// //                 <span class="text-green-700 font-medium">Selected: ${fileName}</span>
// //             </div>
// //         `;
// //     } else {
// //         fileNameDisplay.textContent = '';
// //     }
// // });

// // document.getElementById('productScrapeForm')?.addEventListener('submit', async (e) => {
// //     e.preventDefault();
    
// //     const fileInput = document.getElementById('productFile');
// //     const file = fileInput.files[0];
    
// //     if (!file) {
// //         alert('⚠️ Please select a JSON file');
// //         return;
// //     }
    
// //     const headless = document.getElementById('productHeadless').checked;
// //     const returnProdData = document.getElementById('productReturnData').checked;
    
// //     showLoading('productScrapeForm', 'productResult');
    
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     formData.append('headless', headless);
// //     formData.append('return_prod_data', returnProdData);
    
// //     try {
// //         const response = await fetch('/api/productscrape', {
// //             method: 'POST',
// //             body: formData
// //         });
        
// //         const data = await response.json();
// //         console.log('Product Scrape Response:', data);
        
// //         if (response.ok) {
// //             await showResult('productResult', true, data);
// //         } else {
// //             await showResult('productResult', false, data);
// //         }
// //     } catch (error) {
// //         await showResult('productResult', false, { detail: error.message });
// //     } finally {
// //         resetButton('productScrapeForm', 'Start Scraping');
// //     }
// // });


// // Utility function to show loading state
// function showLoading(buttonId, resultId) {
//     const button = document.querySelector(`#${buttonId} button[type="submit"]`);
//     const resultDiv = document.getElementById(resultId);
    
//     button.disabled = true;
//     button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Scraping...';
//     resultDiv.innerHTML = `
//         <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-2xl p-6 shadow-lg animate-fade-in">
//             <div class="flex items-center">
//                 <div class="relative">
//                     <i class="fas fa-spinner fa-spin text-blue-600 text-3xl mr-4"></i>
//                     <div class="absolute inset-0 bg-blue-400 blur-xl opacity-30 animate-pulse"></div>
//                 </div>
//                 <div>
//                     <p class="font-bold text-blue-900 text-lg">Scraping in progress...</p>
//                     <p class="text-sm text-blue-700 mt-1">This may take a few moments. Please wait.</p>
//                     <div class="flex gap-1 mt-3">
//                         <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
//                         <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
//                         <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
// }

// // Utility function to reset button
// function resetButton(buttonId, text) {
//     const button = document.querySelector(`#${buttonId} button[type="submit"]`);
//     button.disabled = false;
//     button.innerHTML = `<i class="fas fa-play mr-2"></i>${text}`;
// }

// // Utility function to extract timestamp from file path
// function extractTimestamp(filePath) {
//     const match = filePath.match(/Artifacts[\/\\](\d+_\d+_\d+_\d+_\d+_\d+)/);
//     return match ? match[1] : null;
// }

// // Utility function to get URL data from content endpoint
// async function getUrlDataFromFile(timestamp) {
//     try {
//         const response = await fetch(`/api/content/url-data/${timestamp}`);
//         if (response.ok) {
//             const data = await response.json();
//             let count = 0;
//             let urlsByCategory = {};
            
//             // Handle different JSON structures
//             if (Array.isArray(data)) {
//                 count = data.length;
//                 urlsByCategory = { 'All URLs': data };
//             } else if (data.urls && typeof data.urls === 'object') {
//                 urlsByCategory = data.urls;
//                 count = Object.values(data.urls).reduce((total, urls) => {
//                     return total + (Array.isArray(urls) ? urls.length : 0);
//                 }, 0);
//             } else if (typeof data === 'object') {
//                 urlsByCategory = data;
//                 count = Object.values(data).reduce((total, urls) => {
//                     return total + (Array.isArray(urls) ? urls.length : 0);
//                 }, 0);
//             }
            
//             return { count, urlsByCategory, success: true };
//         }
//     } catch (error) {
//         console.error('Error fetching URL data:', error);
//     }
//     return { count: 0, urlsByCategory: {}, success: false };
// }

// // Utility function to parse URL data from response
// function parseUrlData(urlData) {
//     let urlCount = 0;
//     let urlsByCategory = {};
    
//     if (Array.isArray(urlData)) {
//         urlCount = urlData.length;
//         urlsByCategory = { 'All URLs': urlData };
//     } else if (typeof urlData === 'object') {
//         if (urlData.urls && typeof urlData.urls === 'object') {
//             urlsByCategory = urlData.urls;
//         } else {
//             urlsByCategory = urlData;
//         }
        
//         urlCount = Object.values(urlsByCategory).reduce((total, urls) => {
//             return total + (Array.isArray(urls) ? urls.length : 0);
//         }, 0);
//     }
    
//     return { urlCount, urlsByCategory };
// }

// // Utility function to show result
// async function showResult(resultId, success, data) {
//     const resultDiv = document.getElementById(resultId);
    
//     console.log('Complete Response Data:', JSON.stringify(data, null, 2));
    
//     if (success) {
//         let timestamp = '';
//         if (data.url_artifact && data.url_artifact.url_file_path) {
//             timestamp = extractTimestamp(data.url_artifact.url_file_path);
//         } else if (data.product_artifact && data.product_artifact.product_file_path) {
//             timestamp = extractTimestamp(data.product_artifact.product_file_path);
//         }
        
//         // Build download URLs
//         let urlDownloadUrl = null;
//         let productDownloadUrl = null;
        
//         if (data.url_artifact && data.url_artifact.url_file_path) {
//             urlDownloadUrl = `/api/download/url-data/${timestamp}`;
//         }
        
//         if (data.product_artifact && data.product_artifact.product_file_path) {
//             productDownloadUrl = `/api/download/product-data/${timestamp}`;
//         }
        
//         let content = `
//             <div class="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-8 shadow-2xl animate-fade-in">
//                 <div class="flex items-start">
//                     <div class="relative">
//                         <i class="fas fa-check-circle text-green-500 text-4xl mr-4 mt-1"></i>
//                         <div class="absolute inset-0 bg-green-400 blur-xl opacity-30 animate-pulse"></div>
//                     </div>
//                     <div class="flex-1">
//                         <h3 class="font-extrabold text-green-900 text-2xl mb-6 flex items-center">
//                             <span>✅ Scraping Completed Successfully!</span>
//                             <span class="ml-3 px-3 py-1 bg-green-500 text-white text-xs rounded-full animate-pulse">DONE</span>
//                         </h3>
//         `;
        
//         // Download Buttons Section
//         if (urlDownloadUrl || productDownloadUrl) {
//             content += `
//                 <div class="mb-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-dashed border-indigo-300 shadow-lg">
//                     <div class="flex items-center justify-between mb-5">
//                         <div class="flex items-center gap-3">
//                             <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
//                                 <i class="fas fa-download text-white text-xl"></i>
//                             </div>
//                             <div>
//                                 <p class="text-lg font-bold text-gray-900">Download Your Files</p>
//                                 <p class="text-xs text-gray-600">Click below to download scraped data</p>
//                             </div>
//                         </div>
//                         <div class="animate-bounce">
//                             <i class="fas fa-arrow-down text-2xl text-purple-500"></i>
//                         </div>
//                     </div>
//                     <div class="flex flex-wrap gap-4">
//             `;
            
//             if (urlDownloadUrl) {
//                 content += `
//                     <a href="${urlDownloadUrl}" 
//                        download="urls_${timestamp}.json"
//                        class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden">
//                         <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
//                         <i class="fas fa-link mr-3 text-xl group-hover:rotate-12 transition-transform"></i>
//                         <div class="text-left">
//                             <span class="block text-sm">Download</span>
//                             <span class="block text-xs opacity-90">URLs JSON</span>
//                         </div>
//                     </a>
//                 `;
//             }
            
//             if (productDownloadUrl) {
//                 content += `
//                     <a href="${productDownloadUrl}" 
//                        download="products_${timestamp}.json"
//                        class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden">
//                         <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
//                         <i class="fas fa-box mr-3 text-xl group-hover:rotate-12 transition-transform"></i>
//                         <div class="text-left">
//                             <span class="block text-sm">Download</span>
//                             <span class="block text-xs opacity-90">Products JSON</span>
//                         </div>
//                     </a>
//                 `;
//             }
            
//             content += `
//                     </div>
//                     <div class="mt-4 flex items-center gap-2 text-xs text-gray-600">
//                         <i class="fas fa-info-circle text-blue-500"></i>
//                         <span>Files are saved in JSON format and ready for download</span>
//                     </div>
//                 </div>
//             `;
//         }
        
//         // File Paths
//         if (data.url_artifact) {
//             content += `
//                 <div class="mb-5 bg-white rounded-xl p-5 border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow">
//                     <div class="flex items-center gap-3 mb-3">
//                         <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
//                             <i class="fas fa-folder text-blue-600 text-lg"></i>
//                         </div>
//                         <p class="font-bold text-gray-800">📁 URL File Path</p>
//                     </div>
//                     <p class="text-xs text-gray-600 bg-gray-50 px-4 py-3 rounded-lg font-mono break-all border border-gray-200">
//                         ${data.url_artifact.url_file_path}
//                     </p>
//                 </div>
//             `;
//         }
        
//         if (data.product_artifact) {
//             content += `
//                 <div class="mb-5 bg-white rounded-xl p-5 border-l-4 border-purple-500 shadow-md hover:shadow-lg transition-shadow">
//                     <div class="flex items-center gap-3 mb-3">
//                         <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
//                             <i class="fas fa-folder text-purple-600 text-lg"></i>
//                         </div>
//                         <p class="font-bold text-gray-800">📁 Product File Path</p>
//                     </div>
//                     <p class="text-xs text-gray-600 bg-gray-50 px-4 py-3 rounded-lg font-mono break-all border border-gray-200">
//                         ${data.product_artifact.product_file_path}
//                     </p>
//                 </div>
//             `;
//         }
        
//         // Product Data
//         if (data.product_data) {
//             const productData = data.product_data;
            
//             if (productData.total_scraped !== undefined) {
//                 content += `
//                     <div class="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-lg">
//                         <div class="flex items-center justify-between">
//                             <div>
//                                 <p class="text-sm font-medium text-green-800 mb-2 flex items-center gap-2">
//                                     <i class="fas fa-chart-line"></i>
//                                     Products Successfully Scraped
//                                 </p>
//                                 <p class="text-5xl font-extrabold text-green-600 animate-pulse">${productData.total_scraped}</p>
//                             </div>
//                             ${productData.total_failed > 0 ? `
//                             <div class="text-right">
//                                 <p class="text-sm font-medium text-red-800 mb-2">Failed</p>
//                                 <p class="text-3xl font-bold text-red-600">${productData.total_failed}</p>
//                             </div>
//                             ` : `
//                             <div class="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
//                                 <i class="fas fa-trophy text-white text-3xl"></i>
//                             </div>
//                             `}
//                         </div>
//                     </div>
//                 `;
//             }
            
//             // Display product details
//             if (productData.products) {
//                 content += `<div class="mt-6 border-t-2 border-green-300 pt-6">`;
//                 content += `
//                     <div class="flex items-center gap-3 mb-5">
//                         <div class="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
//                             <i class="fas fa-box-open text-white"></i>
//                         </div>
//                         <p class="text-lg font-bold text-gray-900">Product Details</p>
//                     </div>
//                 `;
                
//                 Object.keys(productData.products).forEach((searchTerm, index) => {
//                     const products = productData.products[searchTerm];
                    
//                     content += `
//                         <div class="mb-6 ${index > 0 ? 'mt-6 pt-6 border-t border-gray-200' : ''}">
//                             <div class="bg-gradient-to-r from-orange-50 via-yellow-50 to-green-50 rounded-xl p-4 mb-4 border border-orange-200 shadow-sm">
//                                 <div class="flex items-center justify-between">
//                                     <div class="flex items-center gap-3">
//                                         <div class="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
//                                             <i class="fas fa-search text-white"></i>
//                                         </div>
//                                         <div>
//                                             <p class="font-bold text-gray-900">
//                                                 Search: <span class="text-orange-600">"${searchTerm}"</span>
//                                             </p>
//                                             <p class="text-xs text-gray-600 mt-1 flex items-center gap-1">
//                                                 <i class="fas fa-check-circle text-green-500"></i>
//                                                 Found ${products.length} product(s)
//                                             </p>
//                                         </div>
//                                     </div>
//                                     <div class="px-4 py-2 bg-white rounded-lg shadow-sm">
//                                         <p class="text-2xl font-bold text-orange-600">${products.length}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                     `;
                    
//                     if (products.length > 0) {
//                         const firstProduct = products[0];
//                         content += `
//                             <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 product-card">
//                                 <h4 class="font-bold text-gray-900 text-base mb-4 leading-snug">
//                                     ${firstProduct['Product Name'] || 'N/A'}
//                                 </h4>
                                
//                                 <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
//                                     <div>
//                                         <p class="text-sm text-gray-500 mb-1">Price</p>
//                                         <p class="text-green-600 font-extrabold text-2xl">
//                                             ${firstProduct['Product Price'] || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div class="text-right">
//                                         <p class="text-sm text-gray-500 mb-1">Rating</p>
//                                         <div class="flex items-center gap-2">
//                                             <i class="fas fa-star text-yellow-500 text-lg"></i>
//                                             <span class="font-bold text-xl text-gray-900">${firstProduct['Ratings'] || 'N/A'}</span>
//                                         </div>
//                                         <p class="text-xs text-gray-500 mt-1">${firstProduct['Total Reviews'] || ''}</p>
//                                     </div>
//                                 </div>
                                
//                                 <div class="mb-4">
//                                     <div class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 rounded-lg border border-blue-200">
//                                         <i class="fas fa-tag text-blue-500"></i>
//                                         <span class="text-sm font-medium text-gray-700">Category: <span class="text-blue-600 font-bold">${firstProduct['Category'] || 'N/A'}</span></span>
//                                     </div>
//                                 </div>
//                         `;
                        
//                         if (firstProduct['Technical Details']) {
//                             const techDetails = firstProduct['Technical Details'];
//                             const keys = Object.keys(techDetails).slice(0, 6);
                            
//                             if (keys.length > 0) {
//                                 content += `
//                                     <div class="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
//                                         <p class="font-bold text-gray-800 mb-3 text-sm flex items-center gap-2">
//                                             <i class="fas fa-info-circle text-blue-500"></i>
//                                             Key Specifications
//                                         </p>
//                                         <div class="grid grid-cols-1 gap-2 text-xs">
//                                 `;
                                
//                                 keys.forEach(key => {
//                                     content += `
//                                         <div class="flex items-start bg-white px-3 py-2 rounded-lg">
//                                             <span class="text-gray-600 font-semibold min-w-[140px]">${key}:</span>
//                                             <span class="text-gray-900 ml-2">${techDetails[key]}</span>
//                                         </div>
//                                     `;
//                                 });
                                
//                                 const remainingCount = Object.keys(techDetails).length - 6;
//                                 if (remainingCount > 0) {
//                                     content += `<div class="text-gray-500 italic text-center py-2">+ ${remainingCount} more specifications</div>`;
//                                 }
                                
//                                 content += `</div></div>`;
//                             }
//                         }
                        
//                         if (firstProduct['Customer Reviews']) {
//                             content += `
//                                 <div class="mt-4 flex items-center gap-2 bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
//                                     <i class="fas fa-comments text-blue-500 text-lg"></i>
//                                     <span class="text-sm font-medium text-gray-700">
//                                         <span class="font-bold text-blue-600">${firstProduct['Customer Reviews'].length}</span> Customer Reviews scraped
//                                     </span>
//                                 </div>
//                             `;
//                         }
                        
//                         content += `
//                                 <div class="mt-5 pt-4 border-t border-gray-200">
//                                     <a href="${firstProduct['Product URL']}" target="_blank" 
//                                        class="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105">
//                                         <i class="fas fa-external-link-alt"></i>
//                                         <span>View on Amazon</span>
//                                     </a>
//                                 </div>
//                             </div>
//                         `;
                        
//                         if (products.length > 1) {
//                             content += `
//                                 <div class="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-xl border-2 border-blue-200 text-center">
//                                     <p class="text-sm text-gray-700 flex items-center justify-center gap-2">
//                                         <i class="fas fa-plus-circle text-blue-500"></i>
//                                         <span class="font-bold text-blue-600">${products.length - 1}</span> more product(s) scraped
//                                     </p>
//                                 </div>
//                             `;
//                         }
//                     }
                    
//                     content += `</div>`;
//                 });
                
//                 content += `</div>`;
//             }
//         }
        
//         // URL Data Display - ALWAYS show if URL artifact exists
//         if (data.url_artifact && timestamp) {
//             let urlCount = 0;
//             let urlsByCategory = {};
//             let hasUrlData = false;
            
//             // First try to use url_data from response
//             if (data.url_data) {
//                 console.log('URL Data from response:', data.url_data);
//                 hasUrlData = true;
//                 const parsed = parseUrlData(data.url_data);
//                 urlCount = parsed.urlCount;
//                 urlsByCategory = parsed.urlsByCategory;
//             }
            
//             // If no url_data in response, fetch from file
//             if (!hasUrlData || urlCount === 0) {
//                 console.log('Fetching URL data from file...');
//                 const fileData = await getUrlDataFromFile(timestamp);
//                 if (fileData.success) {
//                     urlCount = fileData.count;
//                     if (!hasUrlData) {
//                         urlsByCategory = fileData.urlsByCategory;
//                     }
//                 }
//             }
            
//             content += `
//                 <div class="mb-4 mt-6 border-t-2 border-blue-300 pt-6">
//                     <div class="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
//                         <div class="flex items-center justify-between mb-4">
//                             <div class="flex items-center gap-4">
//                                 <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
//                                     <i class="fas fa-link text-white text-2xl"></i>
//                                 </div>
//                                 <div>
//                                     <p class="text-sm font-medium text-gray-600">URLs Scraped</p>
//                                     <p class="text-4xl font-extrabold text-blue-600 mt-1">${urlCount}</p>
//                                 </div>
//                             </div>
//                             <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
//                                 <i class="fas fa-check text-blue-600 text-2xl"></i>
//                             </div>
//                         </div>
//             `;
            
//             // Show URL list if we have data and count > 0
//             if (urlCount > 0 && Object.keys(urlsByCategory).length > 0 && hasUrlData) {
//                 content += `
//                     <div class="mt-4 space-y-3">
//                         <p class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
//                             <i class="fas fa-list text-blue-500"></i>
//                             URLs by Search Term
//                         </p>
//                 `;
                
//                 Object.keys(urlsByCategory).forEach((searchTerm) => {
//                     const urls = urlsByCategory[searchTerm];
//                     if (Array.isArray(urls) && urls.length > 0) {
//                         content += `
//                             <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
//                                 <div class="flex items-center justify-between mb-3">
//                                     <p class="font-bold text-gray-900 text-sm">
//                                         <i class="fas fa-search text-blue-500 mr-2"></i>"${searchTerm}"
//                                     </p>
//                                     <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
//                                         ${urls.length} URLs
//                                     </span>
//                                 </div>
//                                 <div class="mt-2 max-h-60 overflow-y-auto space-y-2">
//                         `;
                        
//                         urls.slice(0, 10).forEach((url, idx) => {
//                             content += `
//                                 <div class="text-xs bg-white px-3 py-2 rounded border border-gray-200 hover:border-blue-400 hover:shadow-sm transition">
//                                     <div class="flex items-start gap-2">
//                                         <span class="text-gray-400 font-mono">${idx + 1}.</span>
//                                         <a href="${url}" target="_blank" class="text-blue-600 hover:text-blue-800 break-all flex-1">${url}</a>
//                                         <a href="${url}" target="_blank" class="text-gray-400 hover:text-blue-500">
//                                             <i class="fas fa-external-link-alt"></i>
//                                         </a>
//                                     </div>
//                                 </div>
//                             `;
//                         });
                        
//                         if (urls.length > 10) {
//                             content += `
//                                 <div class="text-xs text-gray-600 italic text-center py-2 bg-blue-50 rounded">
//                                     + ${urls.length - 10} more URLs (download file to view all)
//                                 </div>
//                             `;
//                         }
                        
//                         content += `</div></div>`;
//                     }
//                 });
                
//                 content += `</div>`;
//             } else if (urlCount > 0 && !hasUrlData) {
//                 // Show info message when count fetched from file but no detailed data
//                 content += `
//                     <div class="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-300">
//                         <div class="flex items-start gap-3">
//                             <i class="fas fa-info-circle text-blue-600 text-lg mt-0.5"></i>
//                             <div>
//                                 <p class="font-bold text-blue-900 text-sm mb-1">${urlCount} URLs Saved</p>
//                                 <p class="text-xs text-blue-700">
//                                     To view URLs here, check <strong>"Return URL data in response"</strong> next time, or download the file above.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//             }
            
//             content += `</div></div>`;
//         }
        
//         content += `</div></div></div>`;
        
//         resultDiv.innerHTML = content;
//     } else {
//         resultDiv.innerHTML = `
//             <div class="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl p-8 shadow-2xl animate-fade-in">
//                 <div class="flex items-start">
//                     <i class="fas fa-exclamation-circle text-red-500 text-4xl mr-4 mt-1"></i>
//                     <div>
//                         <h3 class="font-extrabold text-red-900 text-2xl mb-3">❌ Error Occurred</h3>
//                         <div class="bg-white rounded-lg p-4 border-l-4 border-red-500">
//                             <p class="text-sm text-red-700 font-medium">${data.detail || 'An error occurred during scraping.'}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }
// }

// // Main Scraper Form
// document.getElementById('mainScrapeForm')?.addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const searchTerms = document.getElementById('mainSearchTerms').value.split('\n').filter(t => t.trim());
//     const targetLinks = parseInt(document.getElementById('mainTargetLinks').value);
//     const headless = document.getElementById('mainHeadless').checked;
//     const returnUrlData = document.getElementById('mainReturnUrl').checked;
//     const returnProdData = document.getElementById('mainReturnProd').checked;
    
//     if (searchTerms.length === 0) {
//         alert('⚠️ Please enter at least one search term');
//         return;
//     }
    
//     showLoading('mainScrapeForm', 'mainResult');
    
//     try {
//         const response = await fetch('/api/mainscrape', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 search_terms: searchTerms,
//                 target_links: targetLinks,
//                 headless: headless,
//                 return_url_data: returnUrlData,
//                 return_prod_data: returnProdData
//             })
//         });
        
//         const data = await response.json();
//         console.log('Main Scrape Response:', data);
        
//         await showResult('mainResult', response.ok, data);
//     } catch (error) {
//         await showResult('mainResult', false, { detail: error.message });
//     } finally {
//         resetButton('mainScrapeForm', 'Start Scraping');
//     }
// });

// // URL Scraper Form
// document.getElementById('urlScrapeForm')?.addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const searchTerms = document.getElementById('urlSearchTerms').value.split('\n').filter(t => t.trim());
//     const targetLinks = parseInt(document.getElementById('urlTargetLinks').value);
//     const headless = document.getElementById('urlHeadless').checked;
//     const returnUrlData = document.getElementById('urlReturnData').checked;
    
//     if (searchTerms.length === 0) {
//         alert('⚠️ Please enter at least one search term');
//         return;
//     }
    
//     showLoading('urlScrapeForm', 'urlResult');
    
//     try {
//         const response = await fetch('/api/urlscrape', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 search_terms: searchTerms,
//                 target_links: targetLinks,
//                 headless: headless,
//                 return_url_data: returnUrlData
//             })
//         });
        
//         const data = await response.json();
//         console.log('URL Scrape Response:', data);
        
//         await showResult('urlResult', response.ok, data);
//     } catch (error) {
//         await showResult('urlResult', false, { detail: error.message });
//     } finally {
//         resetButton('urlScrapeForm', 'Start Scraping');
//     }
// });

// // Product Scraper Form
// const fileInput = document.getElementById('productFile');
// fileInput?.addEventListener('change', (e) => {
//     const fileName = e.target.files[0]?.name;
//     const fileNameDisplay = document.getElementById('fileName');
//     if (fileName) {
//         fileNameDisplay.innerHTML = `
//             <div class="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
//                 <i class="fas fa-check-circle text-green-500"></i>
//                 <span class="text-green-700 font-medium">Selected: ${fileName}</span>
//             </div>
//         `;
//     } else {
//         fileNameDisplay.textContent = '';
//     }
// });

// document.getElementById('productScrapeForm')?.addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const fileInput = document.getElementById('productFile');
//     const file = fileInput.files[0];
    
//     if (!file) {
//         alert('⚠️ Please select a JSON file');
//         return;
//     }
    
//     const headless = document.getElementById('productHeadless').checked;
//     const returnProdData = document.getElementById('productReturnData').checked;
    
//     showLoading('productScrapeForm', 'productResult');
    
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('headless', headless);
//     formData.append('return_prod_data', returnProdData);
    
//     try {
//         const response = await fetch('/api/productscrape', {
//             method: 'POST',
//             body: formData
//         });
        
//         const data = await response.json();
//         console.log('Product Scrape Response:', data);
        
//         await showResult('productResult', response.ok, data);
//     } catch (error) {
//         await showResult('productResult', false, { detail: error.message });
//     } finally {
//         resetButton('productScrapeForm', 'Start Scraping');
//     }
// });

// Utility function to show loading state
function showLoading(buttonId, resultId) {
    const button = document.querySelector(`#${buttonId} button[type="submit"]`);
    const resultDiv = document.getElementById(resultId);
    
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Scraping...';
    resultDiv.innerHTML = `
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-2xl p-6 shadow-lg animate-fade-in">
            <div class="flex items-center">
                <div class="relative">
                    <i class="fas fa-spinner fa-spin text-blue-600 text-3xl mr-4"></i>
                    <div class="absolute inset-0 bg-blue-400 blur-xl opacity-30 animate-pulse"></div>
                </div>
                <div>
                    <p class="font-bold text-blue-900 text-lg">Scraping in progress...</p>
                    <p class="text-sm text-blue-700 mt-1">This may take a few moments. Please wait.</p>
                    <div class="flex gap-1 mt-3">
                        <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                        <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                        <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Utility function to reset button
function resetButton(buttonId, text) {
    const button = document.querySelector(`#${buttonId} button[type="submit"]`);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-play mr-2"></i>${text}`;
}

// Utility function to extract timestamp from file path
function extractTimestamp(filePath) {
    const match = filePath.match(/Artifacts[\/\\](\d+_\d+_\d+_\d+_\d+_\d+)/);
    return match ? match[1] : null;
}

// Utility function to show result
function showResult(resultId, success, data) {
    const resultDiv = document.getElementById(resultId);
    
    console.log('Complete Response Data:', JSON.stringify(data, null, 2));
    
    if (success) {
        let timestamp = '';
        if (data.url_artifact && data.url_artifact.url_file_path) {
            timestamp = extractTimestamp(data.url_artifact.url_file_path);
        } else if (data.product_artifact && data.product_artifact.product_file_path) {
            timestamp = extractTimestamp(data.product_artifact.product_file_path);
        }
        
        // Build download URLs
        let urlDownloadUrl = null;
        let productDownloadUrl = null;
        
        if (data.url_artifact && data.url_artifact.url_file_path) {
            urlDownloadUrl = `/api/download/url-data/${timestamp}`;
        }
        
        if (data.product_artifact && data.product_artifact.product_file_path) {
            productDownloadUrl = `/api/download/product-data/${timestamp}`;
        }
        
        let content = `
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-8 shadow-2xl animate-fade-in">
                <div class="flex items-start">
                    <div class="relative">
                        <i class="fas fa-check-circle text-green-500 text-4xl mr-4 mt-1"></i>
                        <div class="absolute inset-0 bg-green-400 blur-xl opacity-30 animate-pulse"></div>
                    </div>
                    <div class="flex-1">
                        <h3 class="font-extrabold text-green-900 text-2xl mb-6 flex items-center">
                            <span>✅ Scraping Completed Successfully!</span>
                            <span class="ml-3 px-3 py-1 bg-green-500 text-white text-xs rounded-full animate-pulse">DONE</span>
                        </h3>
        `;
        
        // Download Buttons Section
        if (urlDownloadUrl || productDownloadUrl) {
            content += `
                <div class="mb-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-dashed border-indigo-300 shadow-lg">
                    <div class="flex items-center justify-between mb-5">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <i class="fas fa-download text-white text-xl"></i>
                            </div>
                            <div>
                                <p class="text-lg font-bold text-gray-900">Download Your Files</p>
                                <p class="text-xs text-gray-600">Click below to download scraped data</p>
                            </div>
                        </div>
                        <div class="animate-bounce">
                            <i class="fas fa-arrow-down text-2xl text-purple-500"></i>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-4">
            `;
            
            if (urlDownloadUrl) {
                content += `
                    <a href="${urlDownloadUrl}" 
                       download="urls_${timestamp}.json"
                       class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
                        <i class="fas fa-link mr-3 text-xl group-hover:rotate-12 transition-transform"></i>
                        <div class="text-left">
                            <span class="block text-sm">Download</span>
                            <span class="block text-xs opacity-90">URLs JSON</span>
                        </div>
                    </a>
                `;
            }
            
            if (productDownloadUrl) {
                content += `
                    <a href="${productDownloadUrl}" 
                       download="products_${timestamp}.json"
                       class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
                        <i class="fas fa-box mr-3 text-xl group-hover:rotate-12 transition-transform"></i>
                        <div class="text-left">
                            <span class="block text-sm">Download</span>
                            <span class="block text-xs opacity-90">Products JSON</span>
                        </div>
                    </a>
                `;
            }
            
            content += `
                    </div>
                    <div class="mt-4 flex items-center gap-2 text-xs text-gray-600">
                        <i class="fas fa-info-circle text-blue-500"></i>
                        <span>Files are saved in JSON format and ready for download</span>
                    </div>
                </div>
            `;
        }
        
        // File Paths
        if (data.url_artifact) {
            content += `
                <div class="mb-5 bg-white rounded-xl p-5 border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <i class="fas fa-folder text-blue-600 text-lg"></i>
                        </div>
                        <p class="font-bold text-gray-800">📁 URL File Path</p>
                    </div>
                    <p class="text-xs text-gray-600 bg-gray-50 px-4 py-3 rounded-lg font-mono break-all border border-gray-200">
                        ${data.url_artifact.url_file_path}
                    </p>
                </div>
            `;
        }
        
        if (data.product_artifact) {
            content += `
                <div class="mb-5 bg-white rounded-xl p-5 border-l-4 border-purple-500 shadow-md hover:shadow-lg transition-shadow">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <i class="fas fa-folder text-purple-600 text-lg"></i>
                        </div>
                        <p class="font-bold text-gray-800">📁 Product File Path</p>
                    </div>
                    <p class="text-xs text-gray-600 bg-gray-50 px-4 py-3 rounded-lg font-mono break-all border border-gray-200">
                        ${data.product_artifact.product_file_path}
                    </p>
                </div>
            `;
        }
        
        // Product Data
        if (data.product_data) {
            const productData = data.product_data;
            
            if (productData.total_scraped !== undefined) {
                content += `
                    <div class="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-green-800 mb-2 flex items-center gap-2">
                                    <i class="fas fa-chart-line"></i>
                                    Products Successfully Scraped
                                </p>
                                <p class="text-5xl font-extrabold text-green-600 animate-pulse">${productData.total_scraped}</p>
                            </div>
                            ${productData.total_failed > 0 ? `
                            <div class="text-right">
                                <p class="text-sm font-medium text-red-800 mb-2">Failed</p>
                                <p class="text-3xl font-bold text-red-600">${productData.total_failed}</p>
                            </div>
                            ` : `
                            <div class="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                                <i class="fas fa-trophy text-white text-3xl"></i>
                            </div>
                            `}
                        </div>
                    </div>
                `;
            }
            
            // Display product details
            if (productData.products) {
                content += `<div class="mt-6 border-t-2 border-green-300 pt-6">`;
                content += `
                    <div class="flex items-center gap-3 mb-5">
                        <div class="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                            <i class="fas fa-box-open text-white"></i>
                        </div>
                        <p class="text-lg font-bold text-gray-900">Product Details</p>
                    </div>
                `;
                
                Object.keys(productData.products).forEach((searchTerm, index) => {
                    const products = productData.products[searchTerm];
                    
                    content += `
                        <div class="mb-6 ${index > 0 ? 'mt-6 pt-6 border-t border-gray-200' : ''}">
                            <div class="bg-gradient-to-r from-orange-50 via-yellow-50 to-green-50 rounded-xl p-4 mb-4 border border-orange-200 shadow-sm">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                                            <i class="fas fa-search text-white"></i>
                                        </div>
                                        <div>
                                            <p class="font-bold text-gray-900">
                                                Search: <span class="text-orange-600">"${searchTerm}"</span>
                                            </p>
                                            <p class="text-xs text-gray-600 mt-1 flex items-center gap-1">
                                                <i class="fas fa-check-circle text-green-500"></i>
                                                Found ${products.length} product(s)
                                            </p>
                                        </div>
                                    </div>
                                    <div class="px-4 py-2 bg-white rounded-lg shadow-sm">
                                        <p class="text-2xl font-bold text-orange-600">${products.length}</p>
                                    </div>
                                </div>
                            </div>
                    `;
                    
                    if (products.length > 0) {
                        const firstProduct = products[0];
                        content += `
                            <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 product-card">
                                <h4 class="font-bold text-gray-900 text-base mb-4 leading-snug">
                                    ${firstProduct['Product Name'] || 'N/A'}
                                </h4>
                                
                                <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                    <div>
                                        <p class="text-sm text-gray-500 mb-1">Price</p>
                                        <p class="text-green-600 font-extrabold text-2xl">
                                            ${firstProduct['Product Price'] || 'N/A'}
                                        </p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-sm text-gray-500 mb-1">Rating</p>
                                        <div class="flex items-center gap-2">
                                            <i class="fas fa-star text-yellow-500 text-lg"></i>
                                            <span class="font-bold text-xl text-gray-900">${firstProduct['Ratings'] || 'N/A'}</span>
                                        </div>
                                        <p class="text-xs text-gray-500 mt-1">${firstProduct['Total Reviews'] || ''}</p>
                                    </div>
                                </div>
                                
                                <div class="mb-4">
                                    <div class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 rounded-lg border border-blue-200">
                                        <i class="fas fa-tag text-blue-500"></i>
                                        <span class="text-sm font-medium text-gray-700">Category: <span class="text-blue-600 font-bold">${firstProduct['Category'] || 'N/A'}</span></span>
                                    </div>
                                </div>
                        `;
                        
                        if (firstProduct['Technical Details']) {
                            const techDetails = firstProduct['Technical Details'];
                            const keys = Object.keys(techDetails).slice(0, 6);
                            
                            if (keys.length > 0) {
                                content += `
                                    <div class="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <p class="font-bold text-gray-800 mb-3 text-sm flex items-center gap-2">
                                            <i class="fas fa-info-circle text-blue-500"></i>
                                            Key Specifications
                                        </p>
                                        <div class="grid grid-cols-1 gap-2 text-xs">
                                `;
                                
                                keys.forEach(key => {
                                    content += `
                                        <div class="flex items-start bg-white px-3 py-2 rounded-lg">
                                            <span class="text-gray-600 font-semibold min-w-[140px]">${key}:</span>
                                            <span class="text-gray-900 ml-2">${techDetails[key]}</span>
                                        </div>
                                    `;
                                });
                                
                                const remainingCount = Object.keys(techDetails).length - 6;
                                if (remainingCount > 0) {
                                    content += `<div class="text-gray-500 italic text-center py-2">+ ${remainingCount} more specifications</div>`;
                                }
                                
                                content += `</div></div>`;
                            }
                        }
                        
                        if (firstProduct['Customer Reviews']) {
                            content += `
                                <div class="mt-4 flex items-center gap-2 bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
                                    <i class="fas fa-comments text-blue-500 text-lg"></i>
                                    <span class="text-sm font-medium text-gray-700">
                                        <span class="font-bold text-blue-600">${firstProduct['Customer Reviews'].length}</span> Customer Reviews scraped
                                    </span>
                                </div>
                            `;
                        }
                        
                        content += `
                                <div class="mt-5 pt-4 border-t border-gray-200">
                                    <a href="${firstProduct['Product URL']}" target="_blank" 
                                       class="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                                        <i class="fas fa-external-link-alt"></i>
                                        <span>View on Amazon</span>
                                    </a>
                                </div>
                            </div>
                        `;
                        
                        if (products.length > 1) {
                            content += `
                                <div class="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-xl border-2 border-blue-200 text-center">
                                    <p class="text-sm text-gray-700 flex items-center justify-center gap-2">
                                        <i class="fas fa-plus-circle text-blue-500"></i>
                                        <span class="font-bold text-blue-600">${products.length - 1}</span> more product(s) scraped
                                    </p>
                                </div>
                            `;
                        }
                    }
                    
                    content += `</div>`;
                });
                
                content += `</div>`;
            }
        }
        
        // URL Data Display - Handle the actual structure: url_data.products.{searchTerm}.urls
        if (data.url_data) {
            let urlCount = 0;
            let urlsByCategory = {};
            
            // Handle the actual structure: url_data.products.{searchTerm}.urls
            if (data.url_data.products && typeof data.url_data.products === 'object') {
                // Use total_urls if available
                urlCount = data.url_data.total_urls || 0;
                
                // Build urlsByCategory from products
                Object.keys(data.url_data.products).forEach(searchTerm => {
                    const productData = data.url_data.products[searchTerm];
                    if (productData && productData.urls && Array.isArray(productData.urls)) {
                        urlsByCategory[searchTerm] = productData.urls;
                        if (!data.url_data.total_urls) {
                            urlCount += productData.urls.length;
                        }
                    }
                });
            } else if (Array.isArray(data.url_data)) {
                // Fallback: direct array
                urlCount = data.url_data.length;
                urlsByCategory = { 'All URLs': data.url_data };
            } else if (data.url_data.urls && typeof data.url_data.urls === 'object') {
                // Fallback: { urls: { searchTerm: [...] } }
                urlsByCategory = data.url_data.urls;
                urlCount = Object.values(data.url_data.urls).reduce((total, urls) => {
                    return total + (Array.isArray(urls) ? urls.length : 0);
                }, 0);
            }
            
            if (urlCount > 0) {
                content += `
                    <div class="mb-4 mt-6 border-t-2 border-blue-300 pt-6">
                        <div class="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-4">
                                    <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                                        <i class="fas fa-link text-white text-2xl"></i>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-600">URLs Scraped</p>
                                        <p class="text-4xl font-extrabold text-blue-600 mt-1">${urlCount}</p>
                                    </div>
                                </div>
                                <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                                    <i class="fas fa-check text-blue-600 text-2xl"></i>
                                </div>
                            </div>
                            
                            <div class="mt-4 space-y-3">
                                <p class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <i class="fas fa-list text-blue-500"></i>
                                    URLs by Search Term
                                </p>
                `;
                
                Object.keys(urlsByCategory).forEach((searchTerm) => {
                    const urls = urlsByCategory[searchTerm];
                    if (Array.isArray(urls) && urls.length > 0) {
                        content += `
                            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                                <div class="flex items-center justify-between mb-3">
                                    <p class="font-bold text-gray-900 text-sm">
                                        <i class="fas fa-search text-blue-500 mr-2"></i>"${searchTerm}"
                                    </p>
                                    <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                                        ${urls.length} URLs
                                    </span>
                                </div>
                                <div class="mt-2 max-h-60 overflow-y-auto space-y-2">
                        `;
                        
                        urls.slice(0, 10).forEach((url, idx) => {
                            content += `
                                <div class="text-xs bg-white px-3 py-2 rounded border border-gray-200 hover:border-blue-400 hover:shadow-sm transition">
                                    <div class="flex items-start gap-2">
                                        <span class="text-gray-400 font-mono">${idx + 1}.</span>
                                        <a href="${url}" target="_blank" class="text-blue-600 hover:text-blue-800 break-all flex-1">${url}</a>
                                        <a href="${url}" target="_blank" class="text-gray-400 hover:text-blue-500">
                                            <i class="fas fa-external-link-alt"></i>
                                        </a>
                                    </div>
                                </div>
                            `;
                        });
                        
                        if (urls.length > 10) {
                            content += `
                                <div class="text-xs text-gray-600 italic text-center py-2 bg-blue-50 rounded">
                                    + ${urls.length - 10} more URLs (download file to view all)
                                </div>
                            `;
                        }
                        
                        content += `</div></div>`;
                    }
                });
                
                content += `</div></div></div>`;
            }
        }
        
        content += `</div></div></div>`;
        
        resultDiv.innerHTML = content;
    } else {
        resultDiv.innerHTML = `
            <div class="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl p-8 shadow-2xl animate-fade-in">
                <div class="flex items-start">
                    <i class="fas fa-exclamation-circle text-red-500 text-4xl mr-4 mt-1"></i>
                    <div>
                        <h3 class="font-extrabold text-red-900 text-2xl mb-3">❌ Error Occurred</h3>
                        <div class="bg-white rounded-lg p-4 border-l-4 border-red-500">
                            <p class="text-sm text-red-700 font-medium">${data.detail || 'An error occurred during scraping.'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Main Scraper Form
document.getElementById('mainScrapeForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const searchTerms = document.getElementById('mainSearchTerms').value.split('\n').filter(t => t.trim());
    const targetLinks = parseInt(document.getElementById('mainTargetLinks').value);
    const headless = document.getElementById('mainHeadless').checked;
    const returnUrlData = document.getElementById('mainReturnUrl').checked;
    const returnProdData = document.getElementById('mainReturnProd').checked;
    
    if (searchTerms.length === 0) {
        alert('⚠️ Please enter at least one search term');
        return;
    }
    
    showLoading('mainScrapeForm', 'mainResult');
    
    try {
        const response = await fetch('/api/mainscrape', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                search_terms: searchTerms,
                target_links: targetLinks,
                headless: headless,
                return_url_data: returnUrlData,
                return_prod_data: returnProdData
            })
        });
        
        const data = await response.json();
        console.log('Main Scrape Response:', data);
        
        showResult('mainResult', response.ok, data);
    } catch (error) {
        showResult('mainResult', false, { detail: error.message });
    } finally {
        resetButton('mainScrapeForm', 'Start Scraping');
    }
});

// URL Scraper Form
document.getElementById('urlScrapeForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const searchTerms = document.getElementById('urlSearchTerms').value.split('\n').filter(t => t.trim());
    const targetLinks = parseInt(document.getElementById('urlTargetLinks').value);
    const headless = document.getElementById('urlHeadless').checked;
    const returnUrlData = document.getElementById('urlReturnData').checked;
    
    if (searchTerms.length === 0) {
        alert('⚠️ Please enter at least one search term');
        return;
    }
    
    showLoading('urlScrapeForm', 'urlResult');
    
    try {
        const response = await fetch('/api/urlscrape', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                search_terms: searchTerms,
                target_links: targetLinks,
                headless: headless,
                return_url_data: returnUrlData
            })
        });
        
        const data = await response.json();
        console.log('URL Scrape Response:', data);
        
        showResult('urlResult', response.ok, data);
    } catch (error) {
        showResult('urlResult', false, { detail: error.message });
    } finally {
        resetButton('urlScrapeForm', 'Start Scraping');
    }
});

// Product Scraper Form
const fileInput = document.getElementById('productFile');
fileInput?.addEventListener('change', (e) => {
    const fileName = e.target.files[0]?.name;
    const fileNameDisplay = document.getElementById('fileName');
    if (fileName) {
        fileNameDisplay.innerHTML = `
            <div class="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                <i class="fas fa-check-circle text-green-500"></i>
                <span class="text-green-700 font-medium">Selected: ${fileName}</span>
            </div>
        `;
    } else {
        fileNameDisplay.textContent = '';
    }
});

document.getElementById('productScrapeForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('productFile');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('⚠️ Please select a JSON file');
        return;
    }
    
    const headless = document.getElementById('productHeadless').checked;
    const returnProdData = document.getElementById('productReturnData').checked;
    
    showLoading('productScrapeForm', 'productResult');
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('headless', headless);
    formData.append('return_prod_data', returnProdData);
    
    try {
        const response = await fetch('/api/productscrape', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        console.log('Product Scrape Response:', data);
        
        showResult('productResult', response.ok, data);
    } catch (error) {
        showResult('productResult', false, { detail: error.message });
    } finally {
        resetButton('productScrapeForm', 'Start Scraping');
    }
});
