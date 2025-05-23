const container = document.querySelector('.container');
const layers = document.querySelectorAll('.layer');
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;
let currentZoom = 1;

// Zoom boundaries for each layer
const ZOOM_LEVELS = {
    layer1: { min: 1, max: 1.5, fadeStart: 1.5, fadeEnd: 3 },
    layer2: { min: 1.5, max: 5.5, fadeStart: 5.5, fadeEnd: 10 },
    layer3: { min: 5.5, max: 10 }
};

// Handle mouse wheel zoom
container.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    // Get mouse position relative to viewport
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Get container dimensions and position
    const rect = container.getBoundingClientRect();
    
    // Calculate relative mouse position within container
    const x = (mouseX - rect.left + container.scrollLeft) / currentZoom;
    const y = (mouseY - rect.top + container.scrollTop) / currentZoom;
    
    // Calculate zoom
    const delta = e.deltaY * -0.001;
    const newZoom = Math.max(1, Math.min(10, currentZoom * (1 + delta)));
    
    // Calculate new scroll position
    const newScrollX = x * newZoom - mouseX + rect.left;
    const newScrollY = y * newZoom - mouseY + rect.top;
    
    // Update zoom level
    currentZoom = newZoom;
    
    // Handle layer visibility based on zoom level
    updateLayerVisibility(currentZoom);
    
    // Apply zoom transformation with transform origin at mouse position
    layers.forEach(layer => {
        layer.style.transformOrigin = '0 0';
        layer.style.transform = `scale(${currentZoom})`;
    });
    
    // Apply the new scroll position
    container.scrollLeft = newScrollX;
    container.scrollTop = newScrollY;
});

// Handle layer visibility and opacity
function updateLayerVisibility(zoom) {
    // Layer 1
    if (zoom <= ZOOM_LEVELS.layer1.max) {
        layers[0].style.opacity = '1';
    } else {
        const opacity = Math.max(0, 1 - (zoom - ZOOM_LEVELS.layer1.fadeStart) / 
            (ZOOM_LEVELS.layer1.fadeEnd - ZOOM_LEVELS.layer1.fadeStart));
        layers[0].style.opacity = opacity.toString();
    }
    
    // Layer 2
    if (zoom >= ZOOM_LEVELS.layer1.fadeStart && zoom <= ZOOM_LEVELS.layer2.max) {
        const opacity = Math.min(1, (zoom - ZOOM_LEVELS.layer1.fadeStart) / 
            (ZOOM_LEVELS.layer1.fadeEnd - ZOOM_LEVELS.layer1.fadeStart));
        layers[1].style.opacity = opacity.toString();
    } else if (zoom > ZOOM_LEVELS.layer2.max) {
        const opacity = Math.max(0, 1 - (zoom - ZOOM_LEVELS.layer2.fadeStart) / 
            (ZOOM_LEVELS.layer2.fadeEnd - ZOOM_LEVELS.layer2.fadeStart));
        layers[1].style.opacity = opacity.toString();
    }
    
    // Layer 3
    if (zoom >= ZOOM_LEVELS.layer2.fadeStart) {
        const opacity = Math.min(1, (zoom - ZOOM_LEVELS.layer2.fadeStart) / 
            (ZOOM_LEVELS.layer2.fadeEnd - ZOOM_LEVELS.layer2.fadeStart));
        layers[2].style.opacity = opacity.toString();
    }
}

// Handle dragging
container.addEventListener('mousedown', (e) => {
    isDragging = true;
    container.style.cursor = 'grabbing';
    startX = e.pageX - container.offsetLeft;
    startY = e.pageY - container.offsetTop;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
});

container.addEventListener('mouseleave', () => {
    isDragging = false;
    container.style.cursor = 'default';
});

container.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = 'default';
});

container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const y = e.pageY - container.offsetTop;
    const moveX = (x - startX) * 2;
    const moveY = (y - startY) * 2;
    
    container.scrollLeft = scrollLeft - moveX;
    container.scrollTop = scrollTop - moveY;
});