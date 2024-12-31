// visitors.js - Handles the visitor counter functionality

// We'll store our API endpoint URL here - you'll need to replace this with your actual API Gateway URL
const API_ENDPOINT = 'https://your-api-gateway-url-here.execute-api.us-east-1.amazonaws.com/prod/visitors';

// Function to format the visitor count (e.g., adding commas for thousands)
function formatCount(count) {
    return new Intl.NumberFormat().format(count);
}

// Function to update the DOM with the visitor count
function updateVisitorCount(count) {
    // Check if the counter element exists, create it if it doesn't
    let counterElement = document.getElementById('visitor-counter');
    if (!counterElement) {
        // Create the counter container
        const container = document.createElement('div');
        container.className = 'visitor-counter';
        
        // Create the heading
        const heading = document.createElement('h3');
        heading.textContent = 'Visitor Count';
        
        // Create the counter display
        counterElement = document.createElement('span');
        counterElement.id = 'visitor-counter';
        counterElement.className = 'visitor-count';
        
        // Assemble the elements
        container.appendChild(heading);
        container.appendChild(counterElement);
        
        // Add the counter to the about section
        const aboutSection = document.querySelector('#about .resume-section-content');
        if (aboutSection) {
            aboutSection.appendChild(container);
        }
    }
    
    // Update the counter text
    counterElement.textContent = formatCount(count);
}

// Function to handle errors
function handleError(error) {
    console.error('Error updating visitor count:', error);
    // You could add user-friendly error handling here if desired
}

// Main function to fetch and update the visitor count
async function getAndUpdateVisitorCount() {
    try {
        // Make the API call
        const response = await fetch(API_ENDPOINT, {
            method: 'POST', // We use POST to increment the counter
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        updateVisitorCount(data.count);
    } catch (error) {
        handleError(error);
    }
}

// Initialize the counter when the page loads
document.addEventListener('DOMContentLoaded', getAndUpdateVisitorCount);